# Styled-components visitor benchmark

Generated: 2026-10-09T08:07:39.464Z

v24.20.0 · darwin/arm64 · Apple M5 Max

1 fresh processes per variant/corpus; 2 warmups + 3 measured iterations per process. One iteration processes four files. Median = median of process medians; range = min–max process median.

Timing includes plugin state, visitor setup, traversal and edits. Parsing, cloning, printing, validation and disposal are outside the timer. ts-morph's internal text synchronization remains inside its transform call. Memory is **whole-worker** peak RSS and maximum sampled post-iteration heap (includes imports/setup/printing; not walker-only allocated memory). No client/server split: each sample is one Node process.

This measures a scoped displayName/componentId transform on generated JS modules, not the full official styled-components plugin, production-project performance, or an all-workload winner. Foreign AST rows are separate and must not be interpreted as a same-AST ranking.

## dense

### Shared ESTree input

| Implementation | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
|---|---|---:|---:|---:|---:|
| oxc-walker | ESTree | 0.811 | 0.811–0.811 | 148.0 | 43.5 |
| oxc-visitor | ESTree | 0.905 | 0.905–0.905 | 148.7 | 33.2 |
| estree-walker | ESTree | 0.932 | 0.932–0.932 | 149.1 | 43.4 |
| acorn-recursive | ESTree | 1.029 | 1.029–1.029 | 148.7 | 43.4 |
| acorn-simple | ESTree | 1.280 | 1.280–1.280 | 147.9 | 43.4 |
| yuku-ast | ESTree | 1.300 | 1.300–1.300 | 147.2 | 32.9 |
| acorn-full | ESTree | 1.356 | 1.356–1.356 | 149.2 | 43.4 |
| esrecurse | ESTree | 1.360 | 1.360–1.360 | 147.8 | 32.7 |
| estraverse | ESTree | 1.665 | 1.665–1.665 | 146.9 | 36.0 |
| zimmerframe | ESTree | 1.737 | 1.737–1.737 | 149.8 | 37.7 |
| swc-next | ESTree | 2.377 | 2.377–2.377 | 150.1 | 48.1 |
| esquery | ESTree | 2.472 | 2.472–2.472 | 150.0 | 46.8 |
| estree-toolkit | ESTree | 3.070 | 3.070–3.070 | 148.6 | 47.9 |
| estree-toolkit-scope | ESTree | 5.960 | 5.960–5.960 | 153.4 | 39.6 |
| ast-types | ESTree | 7.404 | 7.404–7.404 | 155.1 | 21.3 |
| jscodeshift | ESTree | 7.916 | 7.916–7.916 | 288.5 | 115.3 |

### Native AST inputs — NOT ESTree

| Implementation | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
|---|---|---:|---:|---:|---:|
| swc-visitor | SWC AST (not ESTree) | 0.759 | 0.759–0.759 | 163.1 | 47.8 |
| typescript | TypeScript 6 AST (not ESTree) | 1.703 | 1.703–1.703 | 215.1 | 59.7 |
| babel-no-scope | Babel AST (not ESTree) | 2.566 | 2.566–2.566 | 262.2 | 97.1 |
| tsquery | TypeScript 6 AST (not ESTree) | 5.066 | 5.066–5.066 | 252.6 | 61.5 |
| babel | Babel AST (not ESTree) | 6.751 | 6.751–6.751 | 241.6 | 75.6 |
| ts-morph | TypeScript AST (not ESTree) | 12.190 | 12.190–12.190 | 302.9 | 117.9 |

## sparse

### Shared ESTree input

| Implementation | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
|---|---|---:|---:|---:|---:|
| oxc-visitor | ESTree | 1.617 | 1.617–1.617 | 218.9 | 65.0 |
| oxc-walker | ESTree | 1.734 | 1.734–1.734 | 218.7 | 50.8 |
| acorn-recursive | ESTree | 1.785 | 1.785–1.785 | 214.3 | 62.6 |
| estree-walker | ESTree | 1.835 | 1.835–1.835 | 215.3 | 62.6 |
| acorn-full | ESTree | 2.265 | 2.265–2.265 | 212.1 | 50.6 |
| esrecurse | ESTree | 2.265 | 2.265–2.265 | 219.0 | 50.6 |
| acorn-simple | ESTree | 2.269 | 2.269–2.269 | 210.5 | 50.9 |
| zimmerframe | ESTree | 2.772 | 2.772–2.772 | 234.7 | 82.4 |
| estraverse | ESTree | 2.796 | 2.796–2.796 | 252.8 | 60.8 |
| esquery | ESTree | 3.511 | 3.511–3.511 | 249.8 | 61.7 |
| swc-next | ESTree | 3.642 | 3.642–3.642 | 231.7 | 77.1 |
| yuku-ast | ESTree | 3.646 | 3.646–3.646 | 219.4 | 51.1 |
| estree-toolkit | ESTree | 6.285 | 6.285–6.285 | 251.7 | 54.4 |
| estree-toolkit-scope | ESTree | 15.419 | 15.419–15.419 | 238.9 | 67.9 |
| jscodeshift | ESTree | 16.989 | 16.989–16.989 | 343.6 | 149.9 |
| ast-types | ESTree | 22.017 | 22.017–22.017 | 246.7 | 71.7 |

### Native AST inputs — NOT ESTree

| Implementation | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
|---|---|---:|---:|---:|---:|
| swc-visitor | SWC AST (not ESTree) | 0.935 | 0.935–0.935 | 187.1 | 23.0 |
| typescript | TypeScript 6 AST (not ESTree) | 1.461 | 1.461–1.461 | 306.7 | 107.1 |
| babel-no-scope | Babel AST (not ESTree) | 5.190 | 5.190–5.190 | 300.7 | 99.3 |
| tsquery | TypeScript 6 AST (not ESTree) | 10.596 | 10.596–10.596 | 325.4 | 107.9 |
| ts-morph | TypeScript AST (not ESTree) | 12.894 | 12.894–12.894 | 332.0 | 145.5 |
| babel | Babel AST (not ESTree) | 14.298 | 14.298–14.298 | 305.0 | 133.8 |

`direct-ast` is a task-specific top-level edit loop, with no visitor API or child-key table. It skips unrelated subtrees and does not implement general nested traversal.

All measured outputs were printed, reparsed and compared with independently generated expected source outside the timer. Raw per-process samples and hashes are in the adjacent JSON. See README for API capabilities, corpus scope and exclusions.
