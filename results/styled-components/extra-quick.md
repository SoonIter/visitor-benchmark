# Styled-components visitor benchmark

Generated: 2026-10-09T08:08:46.683Z

v24.20.0 · darwin/arm64 · Apple M5 Max

1 fresh processes per variant/corpus; 2 warmups + 3 measured iterations per process. One iteration processes four files. Median = median of process medians; range = min–max process median.

Timing includes plugin state, visitor setup, traversal and edits. Parsing, cloning, printing, validation and disposal are outside the timer. ts-morph's internal text synchronization remains inside its transform call. Memory is **whole-worker** peak RSS and maximum sampled post-iteration heap (includes imports/setup/printing; not walker-only allocated memory). No client/server split: each sample is one Node process.

This measures a scoped displayName/componentId transform on generated JS modules, not the full official styled-components plugin, production-project performance, or an all-workload winner. Foreign AST rows are separate and must not be interpreted as a same-AST ranking.

## dense

### Shared ESTree input

| Implementation | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
|---|---|---:|---:|---:|---:|
| typescript-eslint | ESTree | 1.491 | 1.491–1.491 | 212.5 | 56.6 |
| estree-util-visit | ESTree | 5.103 | 5.103–5.103 | 148.4 | 38.4 |

### Native AST inputs — NOT ESTree

| Implementation | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
|---|---|---:|---:|---:|---:|
| babel-fast | Babel AST (not ESTree) | 0.634 | 0.634–0.634 | 155.0 | 31.4 |
| babel-types | Babel AST (not ESTree) | 0.637 | 0.637–0.637 | 154.9 | 49.0 |

## sparse

### Shared ESTree input

| Implementation | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
|---|---|---:|---:|---:|---:|
| typescript-eslint | ESTree | 2.689 | 2.689–2.689 | 329.9 | 116.3 |
| estree-util-visit | ESTree | 10.543 | 10.543–10.543 | 252.3 | 54.1 |

### Native AST inputs — NOT ESTree

| Implementation | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
|---|---|---:|---:|---:|---:|
| babel-fast | Babel AST (not ESTree) | 1.169 | 1.169–1.169 | 189.1 | 65.4 |
| babel-types | Babel AST (not ESTree) | 1.339 | 1.339–1.339 | 190.2 | 66.5 |

`direct-ast` is a task-specific top-level edit loop, with no visitor API or child-key table. It skips unrelated subtrees and does not implement general nested traversal.

All measured outputs were printed, reparsed and compared with independently generated expected source outside the timer. Raw per-process samples and hashes are in the adjacent JSON. See README for API capabilities, corpus scope and exclusions.
