import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const root = new URL('../../', import.meta.url);
const data = JSON.parse(readFileSync(new URL('results/i18n/latest.json', root)));
if (data.astPreparation !== "fresh-parse-v1") throw new Error("Regenerate i18n results using fresh parser output before reporting");
const manifest = data.corpus;
for (const run of data.runs.filter(r => r.status === 'passed')) {
  if (run.samplesMs.length !== data.iterations || run.samplesMs.some(x => !Number.isFinite(x) || x < 0)) throw new Error('Invalid i18n samples');
}
for (const kind of ['original', 'javascript']) {
  const passed = data.runs.filter(r => r.kind === kind && r.status === 'passed');
  for (const key of ['outputHash', 'sourceHash', 'matches']) if (new Set(passed.map(r => r[key])).size !== 1) throw new Error(`i18n parity mismatch: ${kind}/${key}`);
  if (new Set(passed.filter(r => r.ast === 'ESTree').map(r => r.astHash)).size !== 1) throw new Error(`i18n AST mismatch: ${kind}`);
}
const median = a => { const s = a.slice().sort((a,b)=>a-b); return (s[Math.floor((s.length-1)/2)] + s[Math.floor(s.length/2)])/2; };
const groups = new Map();
for (const run of data.runs.filter(r=>r.status === 'passed')) {
  const key = `${run.kind}:${run.id}`;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(run);
}
const rows = [...groups.values()].map(runs => {
  if (new Set(runs.map(r=>r.repeat)).size !== data.repeats || runs.length !== data.repeats) throw new Error(`Incomplete run: ${runs[0].id}`);
  const medians = runs.map(r=>median(r.samplesMs));
  return { id: runs[0].id, kind: runs[0].kind, ast: runs[0].ast, medianMs: median(medians), minMs: Math.min(...medians), maxMs: Math.max(...medians), setupMs: median(runs.map(r=>median(r.setupMs))), observedHeapMiB: Math.max(...runs.map(r=>r.observedHeapMiB)), observedRssMiB: Math.max(...runs.map(r=>r.observedRssMiB)), peakRssMiB: Math.max(...runs.map(r=>r.peakRssMiB)), normalizedFiles: Math.max(...runs.map(r=>r.normalizedFiles)) };
}).sort((a,b)=>a.medianMs-b.medianMs);
const unsupported = data.runs.filter(r=>r.status !== 'passed');
const summary = { cpu: data.cpu, node: data.node, rows, unsupported };
writeFileSync(new URL('results/i18n/summary.json', root), JSON.stringify(summary, null, 2)+'\n');
execFileSync(process.env.PYTHON || 'python3', [new URL('./charts.py', import.meta.url).pathname], { stdio: 'inherit' });
const row = (id, kind='original') => rows.find(r=>r.id === id && r.kind === kind);
const bestESTree = rows.find(r=>r.kind === 'original' && r.ast === 'ESTree');
const baseline = row('babel-traverse-v7'), fast = row('babel-types-traverse-fast-v7'), noScope = row('babel-traverse-no-scope-v7');
const ratio = r => (baseline.medianMs/r.medianMs).toFixed(1);
const originalBytes = manifest.files.reduce((sum,f)=>sum+f.originalBytes,0);
const headlineIds = [bestESTree.id, 'oxc-walker', 'swc-next', 'yuku-ast', 'babel-traverse-v7', 'babel-traverse-no-scope-v7', 'babel-types-traverse-fast-v7'];
const headlines = [...new Set(headlineIds)].map(id=>row(id));
const readme = `# Read-only AST visitor benchmark

Collect real i18n keys from **64 business modules** using **30 JavaScript traversal variants**. Based on the application's actual Rspack loader; no source edits or code generation inside the benchmark.

[Full results & compatibility](docs/i18n/results.md) · [Corpus manifest](docs/i18n/corpus.json) · [Collector implementations](src/i18n/plugins) · [Styled-components benchmark](docs/styled-components/README.md)

[Acorn vs Yuku: CPU profiles and controlled ablations](docs/i18n-dispatch/README.md) explain the historical measured gap. The main benchmark now includes the static destructuring-key fix; the study keeps its original measured source.

## The task

\`\`\`js
const usedKeys = [];
traverse(ast, {
  StringLiteral(path) {
    if (allKeysSet.has(path.node.value)) usedKeys.push(path.node.value);
  },
});
\`\`\`

All string literal positions count, including nested code, imports and object keys. Preserve order and duplicates. This requires neither scope analysis nor AST editing.

Case names identify the API and Babel major version: the **babel-traverse** prefix means **@babel/traverse**; **babel-types** means **@babel/types**. The **v7** cases resolve dependencies from the business workspace; **v8** uses this benchmark's pinned dependencies.

## Results

**${bestESTree.id} leads the shared-ESTree original-source group at ${bestESTree.medianMs.toFixed(3)} ms / 64 files.** AST families are ranked separately: a native-AST result measures its tree layout as well as its traversal API.

For the existing Babel loader, the smallest measured changes are **\`noScope: true\` (${ratio(noScope)}×)** or **\`@babel/types.traverseFast\` (${ratio(fast)}×)**, relative to its installed Babel 7.27.3 traverse. These are collection-stage speedups, not loader/build speedups.

| Original TS/TSX | AST | Collection, ms |
| :-- | :-- | --: |
${headlines.map(r=>`| ${r.id} | ${r.ast} | ${r.medianMs.toFixed(3)} |`).join('\n')}

Each chart groups one AST family. Left: original TS/TSX; right: the same modules pre-transpiled to ES2022 JavaScript. Implementation rows align across panels. Unsupported combinations show a label, never a zero-valued bar; implementations unsupported in both tracks are listed in the compatibility report.

![Shared ESTree](charts/i18n/estree.svg)

Babel and TypeScript use native ASTs, **not ESTree**. These rows are not a same-AST walker ranking.

![Native ASTs](charts/i18n/native.svg)

The JavaScript compatibility track expands coverage to JS-only walkers. Transpilation happens before measurement and changes the available strings and AST shape; **do not compare timings between tracks**.

## Corpus & measurement

- **${(originalBytes/1024).toFixed(1)} KiB** of original source: 40 TS + 24 TSX files, deterministically sampled from four application layers, without selecting by match count. 11 files contain matches.
- **18,868 dictionary keys**, from the actual domestic configuration (\`zh\` + \`zh-Hant\`). Original source: **59 matches**; JavaScript: **58 matches**. No synthetic i18n strings are injected.
- ESTree participants receive fresh, structurally identical parser output on every iteration, without cloning: Oxc TS-ESTree for original source, Acorn ESTree for JavaScript. Babel, SWC and TypeScript participants prepare their own ASTs, explicitly labeled **not ESTree**.
- **3 isolated processes × 5 warmups + 12 measured iterations**, per variant and track; rotated process order. Each iteration collects all 64 files. Bars are medians of process medians, with min–max whiskers.
- Fresh parsing/AST preparation occurs **outside each timed collection** to avoid warm NodePath/scope caches. Hook construction, scope analysis when enabled, traversal, \`Set.has\` and result allocation are timed. GC during collection is included.
- Ordered arrays are checked against the Babel oracle per file, every iteration. The oracle was also checked against the business repository's installed Babel 7.27.3. Unsupported or mismatching implementations are excluded, not assigned zero time.
- Corpus parity is not universal Babel compatibility. In particular, ESTree \`Literal\` includes directive strings, while Babel \`StringLiteral\` excludes directives. The actual dictionary/corpus passes; adapting arbitrary future inputs needs a separate semantic audit.

These measurements use SWC Next snapshot **[${data.swcNext.commit.slice(0,7)}](${data.swcNext.repository}/commit/${data.swcNext.commit})**. No before/after variants. \`direct-ast\` recursively inspects AST properties itself, with no package visitor or visitor-key table; it does not assume top-level declarations. The removed \`handwritten\` case is not restored.

Fresh parser output is used for every iteration, without AST cloning. Earlier results through [8143bc9](https://github.com/SoonIter/visitor-benchmark/tree/8143bc994901c2321b31ad271c83bbcb6e5cf4ca) used cloned ASTs in editing and original-source i18n; do not interpret changes from those results as implementation speedups.

## Reproduce

Requires Node 24+, the local business checkout (source + locale files), and its installed Babel dependencies. Private source and dictionary values remain in ignored \`.cache/i18n/\`; only paths, hashes and aggregate results are tracked.

\`\`\`sh
npm ci
export FLOW_WEB_ROOT=/absolute/path/to/flow-web-monorepo
npm run i18n:prepare
npm test
npm run i18n:validate
npm run i18n:bench
python3 -m venv .cache/charts-venv
.cache/charts-venv/bin/pip install -r scripts/requirements-charts.txt
PYTHON=.cache/charts-venv/bin/python npm run i18n:report
\`\`\`

\`i18n:bench\` uses the committed SWC Next snapshot. \`npm run sync:swc\` refreshes PR #840 via \`gh\`. For the committed snapshot, run \`node scripts/i18n/bench.mjs\` directly. \`i18n:prepare\` intentionally resamples the current checkout; compare its manifest hashes before treating reruns as the same corpus.

Measured on **${data.cpu} · ${data.platform} · Node ${data.node}**. The sample contains original repository source, not captured loader inputs or a full Rspack build. [Raw samples](results/i18n/latest.json) include preparation time, heap, process RSS and peak RSS.
`;
writeFileSync(new URL('docs/i18n/README.md', root), readme.replaceAll('](docs/i18n/', '](').replaceAll('](docs/', '](../').replaceAll('](src/', '](../../src/').replaceAll('](charts/', '](../../charts/').replaceAll('](results/', '](../../results/'));
let detail = `# Detailed i18n collection results\n\n[Overview](../../README.md) · [Raw samples](../../results/i18n/latest.json) · [Dependency versions](../../package.json)\n\nBenchmark implementation: \`${data.benchmarkCommit}\`. Time is milliseconds per 64-file collection. Range is the minimum and maximum process median, not a confidence interval. Small overlapping differences should not be treated as stable winners.\n\n`;
for (const kind of ['original','javascript']) {
 detail += `## ${kind === 'original' ? 'Original TS / TSX' : 'Pre-transpiled JavaScript'}\n\n`;
 for (const shared of [true,false]) {
  detail += `### ${shared ? 'Shared ESTree' : 'Native ASTs — not ESTree'}\n\n| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |\n| :-- | --: | :-- | --: | --: | --: |\n`;
  detail += rows.filter(r=>r.kind===kind && (r.ast==='ESTree')===shared).map(r=>`| ${r.id} | ${r.medianMs.toFixed(3)} | ${r.minMs.toFixed(3)}–${r.maxMs.toFixed(3)} | ${r.setupMs.toFixed(2)} | ${r.peakRssMiB.toFixed(1)} | ${r.observedHeapMiB.toFixed(1)} |`).join('\n')+'\n\n';
 }
}
detail += `## Compatibility failures\n\nThese are failures of the installed API on this shared AST and collection contract, not claims that the library cannot support the syntax with extensions. No custom TS visitor-key tables or AST-schema adapters are added.\n\n| Variant | Track | Reason |\n| :-- | :-- | :-- |\n${unsupported.map(r=>`| ${r.id} | ${r.kind} | ${r.reason.replaceAll('|',' / ').replaceAll('`','')} |`).join('\n')}\n\n`;
detail += `## Interpretation\n\n- Acorn now handles static destructuring keys; the public fixture verifies this. The historical dispatch study retains its original source and measurements.\n- Native API implementations live in separate modules. Acorn's native base walker is extended to visit static string keys and module names that it otherwise skips; that work is part of collection.\n- The old SWC JavaScript Visitor reverses some string visitation order (method body before method key), and its TS visitor is incomplete. The public contract fixture excludes it from both rankings.\n- ast-types and jscodeshift fill default AST fields during traversal and reject the corpus's PropertyDefinition nodes. Their callbacks are read-only, but their traversal machinery is not structurally read-only.\n- Original-source estree-toolkit/esquery/typescript-eslint results fail on this Oxc AST shape. These are recorded instead of silently sharing a custom universal walker.\n- Set lookup and allocation are part of the business task, so numbers are not pure per-node dispatch throughput. No source parsing, printing, module loading, dictionary loading, Rspack buildInfo work, or I/O is inside the timed region.\n- Original Babel uses 7.27.3 from the business workspace; the installed standalone Babel variants use the versions in package.json. \`babel-types-traverse-fast-v7\` resolves @babel/types from that original traverse dependency tree (${data.businessDependencies.types}).\n- All memory values cover the complete worker process, including imports, corpus, parsers, AST preparation and untimed correctness checks. Client RSS equals total RSS; there is no server process (N/A). Peak RSS is the OS high-water mark; heap/RSS samples are observed at iteration boundaries, not exact allocation peaks. See summary.json for all RSS fields.\n- This is a cold-AST, warm-code collection benchmark. It neither measures parser speed nor proves the same ranking on a cached AST, a larger corpus, a different dictionary, or a full build.\n`;
writeFileSync(new URL('docs/i18n/results.md', root), detail);
console.log('Updated docs/i18n/README.md, detailed results and both charts.');
