# remove-debugger results

2026-10-12T07:04:40.896Z · Apple M5 Max · darwin/arm64 · Node v24.20.0

3 isolated processes × 8 warmups + 20 measured iterations per track. Each iteration processes four files. Bars/tables show the median of process medians; ranges are min–max, not confidence intervals.

Preparation, parsing, cloning, external printing, validation and disposal are excluded. Traversal setup, scope analysis where enabled, queries and edits are included. Internal ts-morph text updates remain timed. Memory covers the entire worker, including untimed preparation and validation; it is not traversal-only allocation. There is no server process.

## dense

1280 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| oxc-walker | ESTree | 0.290 | 0.286–0.298 | 136.0 | 40.7 |
| estree-walker | ESTree | 0.328 | 0.327–0.359 | 136.8 | 40.7 |
| oxc-visitor | ESTree | 0.368 | 0.366–0.371 | 139.2 | 41.5 |
| acorn-recursive | ESTree | 0.375 | 0.372–0.376 | 136.4 | 40.7 |
| esrecurse | ESTree | 0.440 | 0.432–0.442 | 136.7 | 40.8 |
| estraverse | ESTree | 0.486 | 0.472–0.531 | 136.7 | 37.3 |
| yuku-ast | ESTree | 0.514 | 0.505–0.551 | 136.7 | 41.2 |
| zimmerframe | ESTree | 0.520 | 0.515–0.527 | 137.6 | 41.5 |
| typescript-eslint | ESTree | 0.528 | 0.515–0.567 | 205.7 | 65.6 |
| swc-next | ESTree | 0.554 | 0.550–0.554 | 136.3 | 41.0 |
| direct-ast | ESTree | 0.604 | 0.604–0.672 | 136.4 | 35.8 |
| acorn-simple | ESTree | 0.620 | 0.605–0.620 | 136.3 | 40.7 |
| acorn-full | ESTree | 0.627 | 0.618–0.635 | 136.6 | 36.6 |
| estree-toolkit | ESTree | 1.271 | 1.266–1.309 | 138.5 | 42.1 |
| esquery | ESTree | 1.846 | 1.817–1.867 | 138.9 | 40.4 |
| estree-util-visit | ESTree | 2.073 | 2.071–2.081 | 137.4 | 40.9 |
| estree-toolkit-scope | ESTree | 3.172 | 3.054–3.180 | 138.9 | 41.2 |
| jscodeshift | ESTree | 3.520 | 3.504–3.538 | 302.2 | 153.0 |
| ast-types | ESTree | 3.700 | 3.677–4.469 | 153.4 | 50.7 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| swc-visitor | SWC AST (not ESTree) | 0.262 | 0.237–0.285 | 116.8 | 26.7 |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.280 | 0.277–0.287 | 153.4 | 45.2 |
| babel-types-traverse | Babel AST (not ESTree) | 0.305 | 0.297–0.319 | 152.0 | 44.5 |
| typescript | TypeScript 6 AST (not ESTree) | 0.502 | 0.488–0.642 | 304.8 | 99.6 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 1.288 | 1.272–1.374 | 286.2 | 123.8 |
| tsquery | TypeScript 6 AST (not ESTree) | 2.904 | 2.663–2.916 | 344.8 | 129.5 |
| babel-traverse | Babel AST (not ESTree) | 3.177 | 3.127–3.415 | 303.9 | 146.6 |
| ts-morph | TypeScript AST (not ESTree) | 4.844 | 4.180–5.880 | 346.8 | 158.2 |

## sparse

240 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| oxc-walker | ESTree | 0.620 | 0.601–0.670 | 221.2 | 79.7 |
| oxc-visitor | ESTree | 0.696 | 0.687–0.760 | 238.4 | 84.1 |
| estree-walker | ESTree | 0.719 | 0.692–0.740 | 220.9 | 80.5 |
| acorn-recursive | ESTree | 0.768 | 0.759–0.782 | 219.2 | 80.6 |
| estraverse | ESTree | 0.966 | 0.960–1.147 | 254.9 | 111.3 |
| esrecurse | ESTree | 0.970 | 0.947–0.985 | 219.7 | 80.6 |
| yuku-ast | ESTree | 1.107 | 1.079–1.112 | 219.3 | 80.1 |
| acorn-simple | ESTree | 1.121 | 1.069–1.166 | 220.3 | 80.6 |
| swc-next | ESTree | 1.139 | 1.090–1.166 | 220.7 | 80.6 |
| acorn-full | ESTree | 1.155 | 1.147–1.168 | 251.5 | 112.5 |
| zimmerframe | ESTree | 1.189 | 1.180–1.219 | 239.8 | 91.3 |
| typescript-eslint | ESTree | 1.266 | 1.263–1.298 | 310.5 | 131.0 |
| direct-ast | ESTree | 1.744 | 1.653–1.750 | 220.3 | 83.3 |
| estree-toolkit | ESTree | 2.272 | 2.266–2.287 | 251.0 | 97.7 |
| esquery | ESTree | 3.765 | 3.706–3.791 | 250.6 | 113.8 |
| estree-util-visit | ESTree | 5.486 | 5.353–5.569 | 219.1 | 68.0 |
| estree-toolkit-scope | ESTree | 5.708 | 5.627–6.089 | 219.9 | 72.8 |
| ast-types | ESTree | 8.398 | 7.706–8.540 | 258.2 | 115.1 |
| jscodeshift | ESTree | 9.236 | 8.777–9.372 | 401.2 | 224.5 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| swc-visitor | SWC AST (not ESTree) | 0.482 | 0.475–0.512 | 236.0 | 78.3 |
| typescript | TypeScript 6 AST (not ESTree) | 0.719 | 0.712–0.746 | 369.0 | 171.8 |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.757 | 0.753–0.778 | 267.7 | 98.6 |
| babel-types-traverse | Babel AST (not ESTree) | 0.814 | 0.790–0.829 | 248.6 | 91.5 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 2.486 | 2.455–2.506 | 351.4 | 179.3 |
| tsquery | TypeScript 6 AST (not ESTree) | 4.765 | 4.670–4.801 | 414.9 | 214.3 |
| babel-traverse | Babel AST (not ESTree) | 6.248 | 6.030–6.517 | 370.1 | 199.0 |
| ts-morph | TypeScript AST (not ESTree) | 9.439 | 9.426–10.075 | 427.0 | 222.1 |

## Implementations

| API | Strategy |
| :-- | :-- |
| direct-ast | recursive direct AST edits; no visitor API or child-key table |
| swc-next | native remove for lists; replacement for single statement slots |
| yuku-ast | native remove for lists; replacement for single statement slots |
| estree-walker | native remove for lists; replacement for single statement slots |
| oxc-walker | native remove for lists; replacement for single statement slots |
| oxc-visitor | native traversal + manual statement-slot edits |
| acorn-simple | native traversal + manual statement-slot edits |
| acorn-recursive | native traversal + manual statement-slot edits |
| acorn-full | native traversal + manual statement-slot edits |
| estraverse | native remove for lists; replacement for single statement slots |
| esrecurse | native traversal + manual statement-slot edits |
| estree-toolkit | native remove for lists; replacement for single statement slots |
| estree-toolkit-scope | native remove for lists; replacement for single statement slots |
| ast-types | native remove for lists; replacement for single statement slots |
| zimmerframe | native traversal + manual statement-slot edits |
| jscodeshift | native remove for lists; replacement for single statement slots |
| esquery | query statement containers + manual slot edits |
| estree-util-visit | native traversal + manual statement-slot edits |
| typescript-eslint | native traversal + manual statement-slot edits |
| babel-types-traverse | native traversal + manual statement-slot edits |
| babel-types-traverse-fast | native traversal + manual statement-slot edits |
| babel-traverse | native remove for lists; replacement for single statement slots |
| babel-traverse-no-scope | native remove for lists; replacement for single statement slots |
| swc-visitor | native traversal + manual statement-slot edits |
| typescript | compiler transform; undefined for lists, EmptyStatement for single slots |
| tsquery | compiler transform; undefined for lists, EmptyStatement for single slots |
| ts-morph | one SourceFile.transform + factory statement-list updates; internal text synchronization timed |

Every measured output is printed, reparsed and compared to independently authored expected code. The adjacent JSON records all samples, execution order, dependency versions, SWC Next SHA and source hashes.
