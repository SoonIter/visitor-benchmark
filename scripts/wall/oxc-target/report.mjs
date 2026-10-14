import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { median } from '../../shared/report.mjs';
const data = JSON.parse(readFileSync(process.argv[2] ?? 'results/oxc-target/comparison.json'));
assert.equal(data.complete, true);
assert.equal(data.runs.length, 44 * data.repetitions);
const keys = [...new Set(data.runs.map(r => `${r.scenario}/${r.kind}`))];
const cell = (key, label, operations = 'original') => {
  const runs = data.runs.filter(r => `${r.scenario}/${r.kind}` === key && r.label === label && r.operations === operations);
  assert.equal(runs.length, data.repetitions);
  const values = runs.map(r => median(r.samplesMs));
  return { ms: median(values), min: Math.min(...values), max: Math.max(...values), processMedians: values };
};
const rows = keys.map(key => ({ key, ...Object.fromEntries(['previous', 'candidate', 'oxc-visitor', 'oxc-walker'].map(label => [label, cell(key, label)])) }));
const matched = keys.filter(key => !key.startsWith('i18n/')).map(key => ({ key, previous: cell(key, 'previous', 'matched'), candidate: cell(key, 'candidate', 'matched'), oxc: cell(key, 'oxc-visitor') }));
const targets = Object.fromEntries(['previous', 'candidate'].map(label => [label, Object.fromEntries(['oxc-visitor', 'oxc-walker'].map(oxc => [oxc, rows.filter(row => row[label].ms <= row[oxc].ms).length]))]));
// Verify that the archived, executable sources are exactly those measured.
for (const label of ['baseline', 'candidate']) for (const [path, hash] of Object.entries(data[label].sha256)) {
  const name = path.split('/').at(-1);
  assert.equal(createHash('sha256').update(readFileSync(`results/oxc-target/${label}/${name}`)).digest('hex'), hash);
}
const regressions = rows.filter(row => row.candidate.ms > row.previous.ms).length;
const summary = { accepted: false, reason: `Archived stop-unwind experiment, not adopted. ${regressions}/8 original tracks are slower by point estimate; ${targets.candidate['oxc-visitor']}/8 meet the Oxc Visitor target.`, targets, rows, matched };
writeFileSync('results/oxc-target/summary.json', JSON.stringify(summary, null, 2) + '\n');
const table = rows.map(r => `| ${r.key.replace('/', ' / ')} | ${r.previous.ms.toFixed(3)} | ${r.candidate.ms.toFixed(3)} | ${r['oxc-visitor'].ms.toFixed(3)} | ${r['oxc-walker'].ms.toFixed(3)} |`).join('\n');
const mutationTable = matched.map(r => {
 const original = rows.find(row => row.key === r.key).previous;
 return `| ${r.key.replace('/', ' / ')} | ${original.ms.toFixed(3)} | ${r.previous.ms.toFixed(3)} | ${r.oxc.ms.toFixed(3)} |`;
}).join('\n');
writeFileSync('docs/oxc-target.md', `# Oxc target: not reached

**No candidate was adopted.** The production walker and main leaderboard remain unchanged. This study compares the previous SWC implementation with Oxc Visitor and Oxc Walker separately. "Oxc" is not one performance target.

Current SWC is faster by point estimate in **${targets.previous['oxc-walker']}/8 tracks against Oxc Walker**, but only **${targets.previous['oxc-visitor']}/8 against Oxc Visitor**. These are workload-specific comparisons, not a general ranking of libraries.

## Original business adapters

Normal JIT, ${data.environment.cpu}, ${data.environment.node}. Five independent processes per cell, rotated/reversed execution order, original workers: 8 warmups + 20 samples for edits; 5 + 12 for i18n. Fresh parsing and validation are outside timing. Values are medians of process medians in **ms per corpus**; lower is better. All 220 runs passed input, ESTree and output hash parity.

| Scenario / track | SWC current | SWC candidate (rejected) | Oxc Visitor | Oxc Walker |
| :-- | --: | --: | --: | --: |
${table}

The candidate removes per-edge stop checks and unwinds traversal only after a hook calls stop(). Existing unit, type and integration tests pass, but ${regressions} original tracks regress by point estimate. It fails the performance target and has been removed from the SWC checkout. No new production API or semantics were accepted.

[Raw samples and manifests](../results/oxc-target/comparison.json) · [Process ranges](../results/oxc-target/summary.json) · [Rejected candidate patch](../results/oxc-target/candidate.patch)

Min–max process medians are not confidence intervals. Desktop background load is not controlled; small differences and near ties do not establish a stable ordering. No single best run is selected.

## Is the business adapter responsible?

**Partly, not entirely.** The following separate diagnostic keeps the current SWC walker and switches its callbacks to the exact mutation helpers and hook positions used by Oxc Visitor. Main adapters are unchanged.

| Scenario / track | SWC original operations | SWC matched operations | Oxc Visitor |
| :-- | --: | --: | --: |
${mutationTable}

- **styled-components:** original SWC builds two object spreads and calls ctx.replace(); matched SWC and Oxc both call edit() and update node.init.tag in place. Copying/replacement explains part of the dense-case gap, but a residual gap remains.
- **coverage:** original SWC copies an IfStatement, updates a WeakSet and uses replace/skip; matched SWC and Oxc both call editIf(node, state.plan(node)). Matching operations does not close the gap.
- **remove-debugger:** original SWC removes a DebuggerStatement with its context; matched SWC and Oxc both register parent exit hooks and call editSlots(). This makes SWC slower here. The original adapters were doing different traversal/callback work; the difference is not consistently biased in one direction.
- **i18n:** both already perform the same Literal filtering and collection. SWC walk still supplies an editing context; Oxc Visitor does not. Its residual gap cannot be blamed on replacement objects.

Matching business operations does not match every API feature: SWC still offers position, ancestors, skip/stop, insertion and replacement semantics. This study does not prove those features make the remaining gap unavoidable.

## What was tried

[Exploratory sources and samples](../results/oxc-target/experiments/index.json) include complete generated editing functions with numeric hook slots, unobserved-node specialization, shorter dispatch paths, local depth passing, child switches, hot-node guards and scalar-leaf bypass. None established the requested win. Most are one-process screens, not independent evidence of a universal slowdown. The larger inline/numeric experiment has three process repetitions.

An explicitly invalid no-ancestors ablation was also recorded; it is never eligible for adoption. Read-only generated variants were explored separately and not promoted into the walk ranking. Removing capabilities or switching to visit() cannot count as a faster editing walk.

The [initial CPU profiles](../results/oxc-target/profiles/README.md) put SWC's generic visit path and styled-components replacement construction among the sampled hot functions. Those samples identify work to investigate, not causal percentages. The rejected generated variants show that copying Oxc's numeric-slot syntax alone is insufficient evidence of an optimization.

## Reproduce

The archived baseline is commit \`${data.baselineProvenance.commit}\`; the candidate is that baseline plus the saved patch. Executable snapshots match the measured runtime hashes. The prepared private i18n corpus and business Babel dependencies are required; do not resample fixtures between comparisons.

\`\`\`sh
node scripts/wall/oxc-target/bench.mjs \\
  --baseline=results/oxc-target/baseline/index.js \\
  --candidate=results/oxc-target/candidate/index.js \\
  --output=.cache/oxc-target/recheck.json
node scripts/wall/oxc-target/report.mjs .cache/oxc-target/recheck.json
\`\`\`

Future candidates must preserve editing semantics, beat the current walker without material regressions, and be measured against both Oxc implementations in the same process schedule. A successful target claim needs repeated wins on the original adapters; matched-operation and read-only results remain separately labeled diagnostics.
`);
console.log(JSON.stringify({ accepted: summary.accepted, targets }, null, 2));
