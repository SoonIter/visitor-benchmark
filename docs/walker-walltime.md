# SWC Next walker: normal-JIT wall time

Same machine, same original workers, same business adapters and fresh ASTs. Old and new SWC walkers run in separate processes in the same rotated/reversed schedule as all competitors. **No read-only replacement or precompiled hooks are used in the main ranking.**

Apple M5 Max · darwin/arm64 · Node v24.20.0. Three processes per cell; original 8 warmups + 20 samples for editing, 5 + 12 for i18n. Parsing and validation remain outside timing. Values are medians of process medians, not best samples.

Baseline walker: `a4c4343d5ed4863884521ed96209d5e56dfd56df`. Candidate walker: `c9a29d656d43ab1e060cbea139eed50876f452c9`. Exact source hashes, execution order, samples and parity hashes: [raw comparison](../results/wall-walker/comparison.json).

## SWC Next ranking

Ranks compare ESTree libraries only, excluding direct-ast. Old and new ranks use the **same freshly measured competitors**, replacing only the SWC row. Smaller time/rank is better.

| Scenario / track | Old, ms | New, ms | Speedup | Library rank | Process ranges overlap? |
| :-- | --: | --: | --: | :-- | :-- |
| styled-components / dense | 0.648 | 0.621 | 1.04× | 4 → 3 | Yes |
| styled-components / sparse | 0.651 | 0.525 | 1.24× | 3 → 2 | No |
| remove-debugger / dense | 0.242 | 0.234 | 1.03× | 3 → 3 | No |
| remove-debugger / sparse | 0.437 | 0.374 | 1.17× | 3 → 3 | No |
| rstest-coverage / runtime | 0.286 | 0.280 | 1.02× | 4 → 4 | Yes |
| rstest-coverage / tooling | 0.255 | 0.244 | 1.05× | 4 → 4 | Yes |
| i18n / original | 1.645 | 1.462 | 1.13× | 4 → 4 | No |
| i18n / javascript | 0.757 | 0.712 | 1.06× | 3 → 3 | No |

Ranges are min–max process medians, not confidence intervals. Rank changes near ties are not proof of a stable ordering. The complete native-AST charts remain separate; cross-AST timings are not a pure walker comparison.

## Implementation

- Generate scalar/list child traversal instead of probing every child with Array.isArray.
- Generate a shorter route for node types without hooks; return immediately for unobserved leaves.
- Use shared enter/leave dispatch functions, preserving the existing editing context and mutation rules.
- Add createWalker(hooks) for explicit reusable compilation and visit(root, hooks, state) for read-only consumers. Neither API substitutes for walk in this comparison.
- Reject the first large-switch/numeric-slot experiment: it regressed several normal-JIT tracks. Numeric indexing alone was not a win here.

The three runtime modules grow from 64,008 to 135,113 bytes (7,412 to 12,394 bytes when concatenated and gzipped) because the unobserved-node traversal is specialized. This is a source-size comparison, not a bundler measurement. The benchmark excludes module loading and does not establish a cold-start win.

## Reproduce

```sh
node scripts/wall/prepare-baseline.mjs
node scripts/wall/compare.mjs
node scripts/wall/report.mjs
PYTHON=.cache/charts-venv/bin/python npm run report
```

The prepared private i18n corpus and business Babel dependencies are required. Do not resample the corpus for a before/after comparison. Use --only=swc-next for a focused experiment; only a complete matrix may publish main results.

## Supplementary API check

Collect two strings from each of 500 freshly parsed small modules. Same callback work, three processes × eight warmups + twenty samples. Parsing is excluded. createWalker compiles once before the loop; walk and visit compile per file. These results do not enter the main ranking. [Samples](../results/wall-walker/api-check.json).

| API | Median, ms / 500 files |
| :-- | --: |
| walk | 0.389 |
| createWalker().walk | 0.220 |
| visit | 0.323 |
