# Oxc target: not reached

**No candidate was adopted.** The production walker and main leaderboard remain unchanged. This study compares the previous SWC implementation with Oxc Visitor and Oxc Walker separately. "Oxc" is not one performance target.

Current SWC is faster by point estimate in **7/8 tracks against Oxc Walker**, but only **1/8 against Oxc Visitor**. These are workload-specific comparisons, not a general ranking of libraries.

## Original business adapters

Normal JIT, Apple M5 Max, v24.20.0. Five independent processes per cell, rotated/reversed execution order, original workers: 8 warmups + 20 samples for edits; 5 + 12 for i18n. Fresh parsing and validation are outside timing. Values are medians of process medians in **ms per corpus**; lower is better. All 220 runs passed input, ESTree and output hash parity.

| Scenario / track | SWC current | SWC candidate (rejected) | Oxc Visitor | Oxc Walker |
| :-- | --: | --: | --: | --: |
| styled-components / dense | 0.704 | 0.661 | 0.435 | 0.747 |
| styled-components / sparse | 0.556 | 0.574 | 0.608 | 0.970 |
| remove-debugger / dense | 0.235 | 0.247 | 0.171 | 0.274 |
| remove-debugger / sparse | 0.365 | 0.360 | 0.301 | 0.578 |
| rstest-coverage / runtime | 0.299 | 0.287 | 0.184 | 0.427 |
| rstest-coverage / tooling | 0.259 | 0.247 | 0.178 | 0.371 |
| i18n / original | 1.538 | 1.586 | 1.327 | 0.936 |
| i18n / javascript | 0.746 | 0.772 | 0.617 | 1.291 |

The candidate removes per-edge stop checks and unwinds traversal only after a hook calls stop(). Existing unit, type and integration tests pass, but 4 original tracks regress by point estimate. It fails the performance target and has been removed from the SWC checkout. No new production API or semantics were accepted.

[Raw samples and manifests](../results/oxc-target/comparison.json) · [Process ranges](../results/oxc-target/summary.json) · [Rejected candidate patch](../results/oxc-target/candidate.patch)

Min–max process medians are not confidence intervals. Desktop background load is not controlled; small differences and near ties do not establish a stable ordering. No single best run is selected.

## Is the business adapter responsible?

**Partly, not entirely.** The following separate diagnostic keeps the current SWC walker and switches its callbacks to the exact mutation helpers and hook positions used by Oxc Visitor. Main adapters are unchanged.

| Scenario / track | SWC original operations | SWC matched operations | Oxc Visitor |
| :-- | --: | --: | --: |
| styled-components / dense | 0.704 | 0.574 | 0.435 |
| styled-components / sparse | 0.556 | 0.517 | 0.608 |
| remove-debugger / dense | 0.235 | 0.283 | 0.171 |
| remove-debugger / sparse | 0.365 | 0.408 | 0.301 |
| rstest-coverage / runtime | 0.299 | 0.285 | 0.184 |
| rstest-coverage / tooling | 0.259 | 0.249 | 0.178 |

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

The archived baseline is commit `4a30364ddf3e3e95cb71564a2948e3e12f9c7c11`; the candidate is that baseline plus the saved patch. Executable snapshots match the measured runtime hashes. The prepared private i18n corpus and business Babel dependencies are required; do not resample fixtures between comparisons.

```sh
node scripts/wall/oxc-target/bench.mjs \
  --baseline=results/oxc-target/baseline/index.js \
  --candidate=results/oxc-target/candidate/index.js \
  --output=.cache/oxc-target/recheck.json
node scripts/wall/oxc-target/report.mjs .cache/oxc-target/recheck.json
```

Future candidates must preserve editing semantics, beat the current walker without material regressions, and be measured against both Oxc implementations in the same process schedule. A successful target claim needs repeated wins on the original adapters; matched-operation and read-only results remain separately labeled diagnostics.
