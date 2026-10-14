import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { median } from '../shared/report.mjs';
import { scenarios } from '../../src/scenarios.mjs';
import { businessDependencies } from '../../src/i18n/engine.mjs';
import { createHash } from 'node:crypto';
const path = process.argv[2] ?? 'results/wall-walker/comparison.json';
const data = JSON.parse(readFileSync(path));
if (!data.completedAt) throw new Error('Comparison is incomplete');
const provenance = JSON.parse(readFileSync('vendor/provenance.json'));
for (const [file, hash] of Object.entries(provenance.sha256)) {
  const bytes = readFileSync(file);
  if (createHash('sha256').update(bytes).digest('hex') !== hash) throw new Error('Vendor snapshot is dirty');
  if (!Object.values(data.candidate.sha256).includes(hash)) throw new Error('Published vendor does not match measured candidate');
}

const groups = new Map();
for (const run of data.runs) {
  if (run.status && run.status !== 'passed') continue;
  const key = `${run.scenario}/${run.kind}/${run.id}/${run.version}`;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(run);
}
const rows = [...groups.values()].map(runs => {
  if (runs.length !== data.repetitions || new Set(runs.map(r => r.repetition)).size !== data.repetitions) throw new Error('Missing repetitions');
  const values = runs.map(r => median(r.samplesMs));
  return { scenario: runs[0].scenario, kind: runs[0].kind, id: runs[0].id, ast: runs[0].ast, version: runs[0].version, median: median(values), min: Math.min(...values), max: Math.max(...values), processes: values };
});
const comparisons = [];
for (const base of rows.filter(r => r.version === 'baseline')) {
  const current = rows.find(r => r.scenario === base.scenario && r.kind === base.kind && r.id === 'swc-next' && r.version === 'candidate');
  const peers = rows.filter(r => r.scenario === base.scenario && r.kind === base.kind && r.ast === 'ESTree' && r.version === 'candidate' && r.id !== 'swc-next');
  const libraries = peers.filter(r => r.id !== 'direct-ast');
  const rank = (r, peers) => 1 + peers.filter(p => p.median < r.median).length;
  comparisons.push({ scenario: base.scenario, kind: base.kind, baselineMs: base.median, candidateMs: current.median, speedup: base.median / current.median, reductionPct: (1 - current.median / base.median) * 100, baselineRank: rank(base, libraries), candidateRank: rank(current, libraries), baselineRankWithDirect: rank(base, peers), candidateRankWithDirect: rank(current, peers), overlappingProcessRanges: Math.max(base.min, current.min) <= Math.min(base.max, current.max) });
}
writeFileSync('results/wall-walker/summary.json', JSON.stringify({ rows, comparisons }, null, 2) + '\n');
let md = `# SWC Next walker: normal-JIT wall time\n\nSame machine, same original workers, same business adapters and fresh ASTs. Old and new SWC walkers run in separate processes in the same rotated/reversed schedule as all competitors. **No read-only replacement or precompiled hooks are used in the main ranking.**\n\n${data.environment.cpu} · ${data.environment.platform}/${data.environment.arch} · Node ${data.environment.node}. Three processes per cell; original 8 warmups + 20 samples for editing, 5 + 12 for i18n. Parsing and validation remain outside timing. Values are medians of process medians, not best samples.\n\nBaseline walker: \`${data.baselineProvenance.commit}\`. Candidate walker: \`${data.candidateGit.commit}\`. Exact source hashes, execution order, samples and parity hashes: [raw comparison](../results/wall-walker/comparison.json).\n\n## SWC Next ranking\n\nRanks compare ESTree libraries only, excluding direct-ast. Old and new ranks use the **same freshly measured competitors**, replacing only the SWC row. Smaller time/rank is better.\n\n| Scenario / track | Old, ms | New, ms | Speedup | Library rank | Process ranges overlap? |\n| :-- | --: | --: | --: | :-- | :-- |\n`;
for (const row of comparisons) md += `| ${row.scenario} / ${row.kind} | ${row.baselineMs.toFixed(3)} | ${row.candidateMs.toFixed(3)} | ${row.speedup.toFixed(2)}× | ${row.baselineRank} → ${row.candidateRank} | ${row.overlappingProcessRanges ? 'Yes' : 'No'} |\n`;
md += `\nRanges are min–max process medians, not confidence intervals. Rank changes near ties are not proof of a stable ordering. The complete native-AST charts remain separate; cross-AST timings are not a pure walker comparison.\n\n## Implementation\n\n- Generate scalar/list child traversal instead of probing every child with Array.isArray.\n- Generate a shorter route for node types without hooks; return immediately for unobserved leaves.\n- Use shared enter/leave dispatch functions, preserving the existing editing context and mutation rules.\n- Add createWalker(hooks) for explicit reusable compilation and visit(root, hooks, state) for read-only consumers. Neither API substitutes for walk in this comparison.\n- Reject the first large-switch/numeric-slot experiment: it regressed several normal-JIT tracks. Numeric indexing alone was not a win here.\n\nThe three runtime modules grow from 64,008 to 135,113 bytes (7,412 to 12,394 bytes when concatenated and gzipped) because the unobserved-node traversal is specialized. This is a source-size comparison, not a bundler measurement. The benchmark excludes module loading and does not establish a cold-start win.\n\n## Reproduce\n\n\`\`\`sh\nnode scripts/wall/prepare-baseline.mjs\nnode scripts/wall/compare.mjs\nnode scripts/wall/report.mjs\nPYTHON=.cache/charts-venv/bin/python npm run report\n\`\`\`\n\nThe prepared private i18n corpus and business Babel dependencies are required. Do not resample the corpus for a before/after comparison. Use --only=swc-next for a focused experiment; only a complete matrix may publish main results.\n`;
const api = JSON.parse(readFileSync('results/wall-walker/api-check.json'));
md += `\n## Supplementary API check\n\nCollect two strings from each of 500 freshly parsed small modules. Same callback work, three processes × eight warmups + twenty samples. Parsing is excluded. createWalker compiles once before the loop; walk and visit compile per file. These results do not enter the main ranking. [Samples](../results/wall-walker/api-check.json).\n\n| API | Median, ms / 500 files |\n| :-- | --: |\n${api.summary.map(r => `| ${r.mode === 'compiled' ? 'createWalker().walk' : r.mode} | ${r.ms.toFixed(3)} |`).join('\n')}\n`;
writeFileSync('docs/walker-walltime.md', md);
// Publish only a complete, parity-checked matrix into the original report format.
for (const scenario of scenarios) {
  const { variants } = await import(`../../src/${scenario.id}/registry.mjs`);
  const kinds = scenario.id === 'i18n' ? ['original', 'javascript'] : (await import(`../../src/${scenario.id}/workload.mjs`)).tracks ?? ['dense', 'sparse'];
  for (const variant of variants) for (const kind of kinds) {
    const runs = data.runs.filter(r => r.scenario === scenario.id && r.kind === kind && r.id === variant.id && r.version === 'candidate');
    if (!runs.length || ((!runs[0].status || runs[0].status === 'passed') && runs.length !== data.repetitions)) throw new Error(`Incomplete matrix: ${scenario.id}/${kind}/${variant.id}`);
  }
}
for (const scenario of scenarios) {
  const filename = `results/${scenario.id}/latest.json`;
  const previous = JSON.parse(readFileSync(filename));
  const runs = data.runs.filter(r => r.scenario === scenario.id && r.version === 'candidate');
  const next = { ...previous, sourceManifest: data.sourceManifest, runs };
  if (scenario.id === 'i18n') {
    next.businessDependencies = businessDependencies();
    next.corpus = JSON.parse(readFileSync('docs/i18n/corpus.json'));
    next.timestamp = data.createdAt;
    next.benchmarkCommit = data.sourceManifest.commit;
    next.node = data.environment.node;
    next.cpu = data.environment.cpu;
    next.platform = `${data.environment.platform} ${data.environment.arch}`;
    next.swcNext = provenance;
    next.repeats = data.repetitions;
    next.warmups = 5;
    next.iterations = 12;
    next.runs = runs.map(r => ({ ...r, repeat: r.repetition }));
  } else {
    next.createdAt = data.createdAt;
    next.environment = data.environment;
    next.provenance = provenance;
    next.config = { ...previous.config, repetitions: data.repetitions, warmups: 8, iterations: 20 };
    next.order = runs.map(r => ({ rep: r.repetition, kind: r.kind, id: r.id }));
  }
  next.measurement = { runner: 'scripts/wall/compare.mjs', comparison: '../wall-walker/comparison.json', completedAt: data.completedAt };
  writeFileSync(filename, JSON.stringify(next, null, 2) + '\n');
}
console.log(JSON.stringify(comparisons, null, 2));
