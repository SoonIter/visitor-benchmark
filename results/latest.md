# Styled-components visitor benchmark

Generated: 2026-10-09T08:51:20.414Z

v24.20.0 · darwin/arm64 · Apple M5 Max

3 fresh processes per variant/corpus; 8 warmups + 20 measured iterations per process. One iteration processes four files. Median = median of process medians; range = min–max process median.

Timing includes plugin state, visitor setup, traversal and edits. Parsing, cloning, printing, validation and disposal are outside the timer. ts-morph's internal text synchronization remains inside its transform call. Memory is **whole-worker** peak RSS and maximum sampled post-iteration heap (includes imports/setup/printing; not walker-only allocated memory). No client/server split: each sample is one Node process.

This measures a scoped displayName/componentId transform on generated JS modules, not the full official styled-components plugin, production-project performance, or an all-workload winner. Foreign AST rows are separate and must not be interpreted as a same-AST ranking.

## dense

### Shared ESTree input

| Implementation | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
|---|---|---:|---:|---:|---:|
| direct-ast | ESTree | 0.338 | 0.336–0.352 | 220.0 | 57.6 |
| oxc-walker | ESTree | 0.852 | 0.754–0.854 | 222.2 | 86.8 |
| estree-walker | ESTree | 0.892 | 0.881–0.941 | 241.7 | 103.0 |
| acorn-recursive | ESTree | 0.996 | 0.986–1.099 | 239.6 | 79.7 |
| oxc-visitor | ESTree | 1.014 | 0.990–1.066 | 242.9 | 82.7 |
| acorn-full | ESTree | 1.135 | 1.114–1.314 | 249.0 | 79.7 |
| esrecurse | ESTree | 1.284 | 1.168–1.337 | 239.6 | 79.7 |
| acorn-simple | ESTree | 1.319 | 1.304–1.433 | 240.7 | 80.8 |
| estraverse | ESTree | 1.326 | 1.246–1.328 | 252.5 | 95.8 |
| zimmerframe | ESTree | 1.327 | 1.292–1.383 | 240.5 | 90.8 |
| yuku-ast | ESTree | 1.367 | 1.322–1.470 | 241.4 | 100.0 |
| swc-next | ESTree | 1.486 | 1.269–1.562 | 246.2 | 83.7 |
| typescript-eslint | ESTree | 1.627 | 1.533–1.638 | 277.9 | 86.4 |
| esquery | ESTree | 1.958 | 1.784–2.360 | 242.0 | 106.3 |
| estree-toolkit | ESTree | 3.155 | 3.133–3.288 | 219.2 | 78.1 |
| estree-util-visit | ESTree | 5.166 | 5.161–5.410 | 251.1 | 98.8 |
| estree-toolkit-scope | ESTree | 6.068 | 5.824–6.392 | 253.4 | 107.8 |
| jscodeshift | ESTree | 7.082 | 6.882–7.155 | 382.8 | 213.9 |
| ast-types | ESTree | 7.230 | 6.672–8.273 | 238.0 | 96.8 |

### Native AST inputs — NOT ESTree

| Implementation | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
|---|---|---:|---:|---:|---:|
| babel-types | Babel AST (not ESTree) | 0.642 | 0.587–0.763 | 240.5 | 85.6 |
| babel-fast | Babel AST (not ESTree) | 0.643 | 0.555–0.659 | 242.0 | 98.9 |
| swc-visitor | SWC AST (not ESTree) | 0.685 | 0.673–0.811 | 236.6 | 84.6 |
| typescript | TypeScript 6 AST (not ESTree) | 1.133 | 1.121–1.149 | 359.9 | 165.4 |
| babel-no-scope | Babel AST (not ESTree) | 2.466 | 2.314–2.517 | 349.5 | 190.8 |
| tsquery | TypeScript 6 AST (not ESTree) | 3.772 | 3.698–3.851 | 392.4 | 189.5 |
| babel | Babel AST (not ESTree) | 4.968 | 4.732–6.093 | 354.2 | 176.4 |
| ts-morph | TypeScript AST (not ESTree) | 8.617 | 8.351–9.269 | 426.3 | 240.5 |

## sparse

### Shared ESTree input

| Implementation | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
|---|---|---:|---:|---:|---:|
| direct-ast | ESTree | 0.122 | 0.100–0.133 | 297.4 | 142.3 |
| oxc-walker | ESTree | 1.124 | 1.078–1.241 | 291.5 | 127.0 |
| oxc-visitor | ESTree | 1.295 | 1.187–1.609 | 322.6 | 150.7 |
| estree-walker | ESTree | 1.307 | 1.289–1.331 | 294.2 | 126.9 |
| acorn-recursive | ESTree | 1.490 | 1.302–1.530 | 294.4 | 126.7 |
| esrecurse | ESTree | 1.753 | 1.709–1.942 | 287.7 | 132.5 |
| acorn-full | ESTree | 1.921 | 1.709–1.957 | 293.7 | 126.7 |
| yuku-ast | ESTree | 1.988 | 1.890–2.049 | 280.6 | 102.2 |
| acorn-simple | ESTree | 2.012 | 1.877–2.044 | 294.5 | 126.7 |
| swc-next | ESTree | 2.068 | 1.976–2.074 | 278.5 | 115.7 |
| estraverse | ESTree | 2.111 | 2.035–2.505 | 253.4 | 100.0 |
| zimmerframe | ESTree | 2.193 | 2.176–2.293 | 299.9 | 128.1 |
| typescript-eslint | ESTree | 2.643 | 2.590–2.874 | 354.5 | 157.0 |
| esquery | ESTree | 3.097 | 3.068–3.201 | 311.5 | 147.4 |
| estree-toolkit | ESTree | 6.468 | 6.374–6.563 | 310.0 | 114.9 |
| estree-util-visit | ESTree | 10.044 | 9.870–10.300 | 305.8 | 143.7 |
| estree-toolkit-scope | ESTree | 10.854 | 10.556–11.655 | 307.0 | 145.8 |
| ast-types | ESTree | 14.880 | 14.425–15.115 | 265.7 | 99.4 |
| jscodeshift | ESTree | 15.542 | 15.102–15.552 | 469.4 | 291.6 |

### Native AST inputs — NOT ESTree

| Implementation | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
|---|---|---:|---:|---:|---:|
| swc-visitor | SWC AST (not ESTree) | 0.764 | 0.726–0.839 | 289.0 | 117.2 |
| babel-fast | Babel AST (not ESTree) | 1.133 | 1.117–1.354 | 288.9 | 127.4 |
| typescript | TypeScript 6 AST (not ESTree) | 1.235 | 1.160–1.250 | 401.5 | 183.7 |
| babel-types | Babel AST (not ESTree) | 1.294 | 1.112–1.300 | 301.5 | 117.4 |
| babel-no-scope | Babel AST (not ESTree) | 4.623 | 4.268–4.661 | 414.3 | 203.1 |
| tsquery | TypeScript 6 AST (not ESTree) | 8.731 | 8.352–9.331 | 450.9 | 223.9 |
| ts-morph | TypeScript AST (not ESTree) | 9.660 | 8.457–9.846 | 515.5 | 294.6 |
| babel | Babel AST (not ESTree) | 12.525 | 10.707–12.532 | 414.8 | 209.0 |

`direct-ast` is a task-specific top-level edit loop, with no visitor API or child-key table. It skips unrelated subtrees and does not implement general nested traversal.

All measured outputs were printed, reparsed and compared with independently generated expected source outside the timer. Raw per-process samples and hashes are in the adjacent JSON. See README for API capabilities, corpus scope and exclusions.
