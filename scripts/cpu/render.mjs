import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { median, inThousands, ranks, spearman } from './metrics.mjs';
import { scenarios } from '../../src/scenarios.mjs';
const data = JSON.parse(readFileSync(process.argv[2] ?? 'results/cpu/latest.json'));
assert.ok(data.completedAt, 'Refusing to publish an incomplete run');
const rows = data.jobs.map(job => {
  const check = data.checks.find(c => c.name === job.name);
  if (check.status !== 'passed') return { ...job, status: check.status };
  const runs = data.runs.filter(r => r.name === job.name);
  assert.equal(runs.length, data.repetitions, `Missing repeats: ${job.name}`);
  const row = { ...job, status: 'passed' };
  for (const metric of ['Ir', 'Ct', 'wall']) {
    const values = runs.map(r => metric === 'wall' ? median(r.samplesMs) : r[metric]);
    row[metric] = { median: median(values), min: Math.min(...values), max: Math.max(...values) };
    row[metric].spreadPct = (row[metric].max - row[metric].min) / row[metric].median * 100;
  }
  return row;
});
const comparisons = [];
for (const scenario of scenarios) for (const kind of new Set(rows.filter(r => r.scenario === scenario.id).map(r => r.kind))) {
  const track = rows.filter(r => r.scenario === scenario.id && r.kind === kind);
  for (const ast of new Set(track.map(r => r.ast))) {
    const group = track.filter(r => r.ast === ast && r.status === 'passed');
    for (const metric of ['Ir', 'Ct', 'wall']) {
      const ranked = ranks(group.map(r => r[metric].median));
      group.forEach((r, i) => { (r.rank ??= {})[metric] = ranked[i]; });
    }
    if (group.length < 2) continue;
    comparisons.push({ scenario: scenario.id, kind, ast, count: group.length,
      Ir: spearman(group.map(r => r.Ir.median), group.map(r => r.wall.median)),
      Ct: spearman(group.map(r => r.Ct.median), group.map(r => r.wall.median)),
      winners: Object.fromEntries(['Ir', 'Ct', 'wall'].map(m => [m, group.filter(r => r.rank[m] === Math.min(...group.map(r => r.rank[m]))).map(r => r.id)])) });
  }
}
mkdirSync('docs/cpu', { recursive: true }); mkdirSync('charts/cpu', { recursive: true });
writeFileSync('results/cpu/summary.json', JSON.stringify({ rows, comparisons }, null, 2) + '\n');
const fmt = n => n === null ? 'n/a' : n.toFixed(3);
const tables = [];
for (const scenario of scenarios) {
  tables.push(`## ${scenario.title}\n`);
  for (const kind of new Set(rows.filter(r => r.scenario === scenario.id).map(r => r.kind))) {
    tables.push(`### ${kind}\n`);
    for (const ast of new Set(rows.filter(r => r.scenario === scenario.id && r.kind === kind).map(r => r.ast))) {
      const group = rows.filter(r => r.scenario === scenario.id && r.kind === kind && r.ast === ast)
        .sort((a,b) => (a.Ct?.median ?? Infinity) - (b.Ct?.median ?? Infinity));
      tables.push(`**${ast}**\n\n| Implementation | Ir (K) | Ct (K) | Wall (ms) | Rank: Ir / Ct / wall |\n| :-- | --: | --: | --: | :-- |`);
      for (const r of group) tables.push(r.status !== 'passed' ? `| ${r.id} | Unsupported | — | — | — |`
        : `| ${r.id} | ${fmt(inThousands('Ir', r.Ir.median))} | ${fmt(inThousands('Ct', r.Ct.median))} | ${fmt(r.wall.median)} | ${r.rank.Ir} / ${r.rank.Ct} / ${r.rank.wall} |`);
      tables.push('');
    }
  }
}
writeFileSync('docs/cpu/results.md', '# CPU simulation results\n\nLower is better. Ranks are local to the input track and exact AST family. Native AST results are not an ESTree walker ranking.\n\n' + tables.join('\n'));
const estree = comparisons.filter(c => c.ast === 'ESTree');
const summaryTable = ['| Scenario / track | Ir ↔ wall ρ | Ct ↔ wall ρ | Ir winner | Ct winner | Wall winner |', '| :-- | --: | --: | :-- | :-- | :-- |',
  ...estree.map(c => `| ${c.scenario} / ${c.kind} | ${fmt(c.Ir)} | ${fmt(c.Ct)} | ${c.winners.Ir.join(', ')} | ${c.winners.Ct.join(', ')} | ${c.winners.wall.join(', ')} |`) ].join('\n');
const measured = rows.filter(r => r.status === 'passed');
const spreads = Object.fromEntries(['Ir','Ct','wall'].map(m => [m, { median: median(measured.map(r => r[m].spreadPct)), max: Math.max(...measured.map(r => r[m].spreadPct)) }]));
const introduction = `# JavaScript AST traversal benchmarks\n\n**Four workloads. CPU instruction counts (Ir), simulated throughput cycles (Ct), and a paired wall-time control.**\n\n${data.environment.node} · ${data.environment.platform}/${data.environment.arch} · ${data.environment.cpu} · ${data.environment.codspeed} · ${data.createdAt.slice(0,10)}\n\n${measured.length} supported combinations; ${rows.length - measured.length} explicit compatibility failures. Each has ${data.repetitions} isolated CPU runs and ${data.repetitions} normal-JIT wall-time runs. Private i18n source stays local.\n\n## Do the rankings agree?\n\nSame-ESTree comparisons only. Spearman ρ = 1 means identical ordering; 0 means no monotonic relationship. Near-ties can swap ranks.\n\n${summaryTable}\n\nProcess min–max spread, as a percentage of the median (median across all supported combinations / worst combination): **Ir ${fmt(spreads.Ir.median)}% / ${fmt(spreads.Ir.max)}%; Ct ${fmt(spreads.Ct.median)}% / ${fmt(spreads.Ct.max)}%; wall ${fmt(spreads.wall.median)}% / ${fmt(spreads.wall.max)}%.** These are observed ranges, not confidence intervals.\n\n**Simulation is a different execution mode.** CodSpeed disables TurboFan; this suite also disables Maglev, following [SWC Next #747](https://github.com/swc-project/swc-next/pull/747). Ir counts executed instructions; Ct estimates throughput cycles. Neither is a measurement of normal-JIT elapsed time. Use these counters for reproducible cost comparisons, and retain wall time to evaluate real runtime performance.\n\n[All numbers and per-family ranks](docs/cpu/results.md) · [Method and reproduction](docs/cpu/README.md) · [Raw measurements](results/cpu/latest.json) · [Previous wall-time report](docs/cpu/wall-time-baseline.md)\n`;
const figures = [];
for (const scenario of scenarios) {
  figures.push(`## ${scenario.title}\n\n[Workload and editing strategy](docs/${scenario.id}/README.md). Bars show Ir (K) and Ct (K), lower is better; rows share the Ct ordering.\n`);
  for (const group of ['estree','native']) {
    if (group === 'native') figures.push('<details>\n<summary>Native ASTs — not an ESTree comparison</summary>\n');
    for (const kind of new Set(rows.filter(r => r.scenario === scenario.id).map(r => r.kind))) {
      figures.push(`![${scenario.title}: ${kind}, ${group}](charts/cpu/${scenario.id}-${kind}-${group}.svg)\n`);
    }
    if (group === 'native') figures.push('</details>\n');
  }
}
writeFileSync('README.md', introduction + '\n' + figures.join('\n') + '\nPresentation inspired by [Native ECMAScript Parser Benchmark](https://github.com/yuku-toolchain/ecmascript-parser-benchmark-native).\n');
execFileSync(process.env.PYTHON ?? 'python3', ['scripts/cpu/chart.py'], { stdio: 'inherit' });
console.log('Updated CPU comparisons, charts, and README.');
