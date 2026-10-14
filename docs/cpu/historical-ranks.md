# Comparison with the previous wall-time ranking

The committed macOS results are kept intact. These comparisons first verify fresh-parser preparation, identical input-source hashes, and unchanged business adapters / vendored walker runtime. Only supported ESTree participants in the same track are compared.

The old run used macOS, per-file timing and no explicit GC before every sample. The paired control uses Linux, whole-corpus batches and pre-measurement GC. Thus changes versus the old ranking include environment and harness effects; they cannot be attributed solely to the metric. The same-environment paired comparison in the main README is the primary control.

Spearman ρ uses all supported ESTree rows; winners exclude the manual direct-ast baseline.

| Scenario / track | Ir ↔ old wall ρ | Ct ↔ old wall ρ | New ↔ old wall ρ | Old wall library | New wall library | Ct library |
| :-- | --: | --: | --: | :-- | :-- | :-- |
| styled-components / dense | 0.877 | 0.846 | 0.882 | oxc-visitor | oxc-visitor | acorn-recursive |
| styled-components / sparse | 0.861 | 0.839 | 0.833 | acorn-recursive | oxc-visitor | acorn-recursive |
| remove-debugger / dense | 0.851 | 0.847 | 0.846 | oxc-visitor | oxc-visitor | acorn-recursive |
| remove-debugger / sparse | 0.875 | 0.865 | 0.881 | oxc-visitor | oxc-visitor | acorn-recursive |
| rstest-coverage / runtime | 0.868 | 0.849 | 0.877 | oxc-visitor | oxc-visitor | acorn-recursive |
| rstest-coverage / tooling | 0.847 | 0.837 | 0.856 | oxc-visitor | oxc-visitor | acorn-recursive |
| i18n / original | 0.810 | 0.714 | 0.833 | oxc-walker | oxc-visitor | estree-walker |
| i18n / javascript | 0.863 | 0.858 | 0.919 | acorn-recursive | oxc-visitor | acorn-recursive |

[Raw comparisons and historical environment](../../results/cpu/historical-ranks.json) · [Previous charts and method](wall-time-baseline.md).
