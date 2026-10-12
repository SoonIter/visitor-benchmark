# remove-debugger results

2026-10-12T09:05:12.100Z · Apple M5 Max · darwin/arm64 · Node v24.20.0

3 isolated processes × 8 warmups + 20 measured iterations per track. Each iteration processes four files. Bars/tables show the median of process medians; ranges are min–max, not confidence intervals.

Preparation, parsing, cloning, external printing, validation and disposal are excluded. Traversal setup, scope analysis where enabled, queries and edits are included. Internal ts-morph text updates and tsquery.map printing/reparsing remain timed. Memory covers the entire worker, including untimed preparation and validation; it is not traversal-only allocation. There is no server process.

## dense

1280 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| oxc-walker | ESTree | 0.289 | 0.283–0.301 | 136.1 | 39.7 |
| estree-walker | ESTree | 0.337 | 0.325–0.339 | 136.5 | 40.7 |
| oxc-visitor | ESTree | 0.377 | 0.372–0.414 | 140.4 | 41.6 |
| acorn-recursive | ESTree | 0.385 | 0.367–0.411 | 136.9 | 40.0 |
| esrecurse | ESTree | 0.446 | 0.438–0.485 | 136.4 | 40.5 |
| estraverse | ESTree | 0.490 | 0.466–0.496 | 136.6 | 37.3 |
| yuku-ast | ESTree | 0.509 | 0.508–0.567 | 136.8 | 40.9 |
| typescript-eslint | ESTree | 0.529 | 0.518–0.559 | 203.9 | 65.6 |
| swc-next | ESTree | 0.549 | 0.548–0.604 | 136.3 | 40.8 |
| acorn-simple | ESTree | 0.608 | 0.608–0.650 | 135.9 | 40.8 |
| acorn-full | ESTree | 0.625 | 0.620–0.656 | 136.7 | 37.3 |
| direct-ast | ESTree | 0.630 | 0.623–0.646 | 135.9 | 36.1 |
| estree-toolkit | ESTree | 1.381 | 1.286–1.447 | 138.7 | 42.1 |
| zimmerframe | ESTree | 1.832 | 1.778–1.909 | 137.9 | 41.1 |
| esquery | ESTree | 1.878 | 1.811–1.888 | 139.0 | 40.5 |
| estree-util-visit | ESTree | 2.094 | 2.062–2.124 | 137.7 | 40.4 |
| estree-toolkit-scope | ESTree | 3.160 | 3.033–3.204 | 139.0 | 41.3 |
| ast-types | ESTree | 3.656 | 3.522–3.702 | 153.3 | 53.3 |
| jscodeshift | ESTree | 3.783 | 3.486–3.808 | 303.5 | 153.0 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| swc-visitor | SWC AST (not ESTree) | 0.241 | 0.234–0.280 | 116.9 | 26.5 |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.280 | 0.276–0.303 | 152.7 | 45.2 |
| babel-types-traverse | Babel AST (not ESTree) | 0.294 | 0.293–0.317 | 140.2 | 44.0 |
| typescript | TypeScript 6 AST (not ESTree) | 0.489 | 0.480–0.527 | 303.4 | 99.6 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 1.266 | 1.259–1.378 | 285.7 | 128.8 |
| babel-traverse | Babel AST (not ESTree) | 3.119 | 3.106–3.340 | 309.0 | 152.6 |
| ts-morph | TypeScript AST (not ESTree) | 4.297 | 4.212–4.397 | 346.4 | 133.9 |
| tsquery | TypeScript 6 AST (not ESTree) | 6.663 | 6.271–6.790 | 327.4 | 139.3 |

## sparse

240 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| oxc-walker | ESTree | 0.647 | 0.594–0.650 | 220.6 | 79.9 |
| estree-walker | ESTree | 0.718 | 0.672–0.720 | 221.3 | 80.5 |
| oxc-visitor | ESTree | 0.788 | 0.724–0.803 | 238.2 | 80.7 |
| acorn-recursive | ESTree | 0.884 | 0.737–0.960 | 219.1 | 80.6 |
| estraverse | ESTree | 0.956 | 0.953–0.966 | 252.1 | 111.3 |
| esrecurse | ESTree | 0.965 | 0.962–1.074 | 220.9 | 80.6 |
| yuku-ast | ESTree | 1.068 | 1.052–1.174 | 217.2 | 78.6 |
| swc-next | ESTree | 1.099 | 1.090–1.174 | 219.7 | 80.8 |
| acorn-simple | ESTree | 1.199 | 1.079–1.220 | 218.1 | 80.6 |
| typescript-eslint | ESTree | 1.254 | 1.249–1.279 | 310.7 | 130.8 |
| acorn-full | ESTree | 1.308 | 1.111–1.633 | 255.4 | 112.5 |
| zimmerframe | ESTree | 1.455 | 1.448–1.460 | 218.6 | 82.2 |
| direct-ast | ESTree | 1.626 | 1.616–1.751 | 221.1 | 82.0 |
| estree-toolkit | ESTree | 2.387 | 2.313–2.392 | 252.8 | 97.7 |
| esquery | ESTree | 3.707 | 3.679–3.721 | 250.9 | 113.1 |
| estree-util-visit | ESTree | 5.409 | 5.306–5.524 | 217.1 | 77.0 |
| estree-toolkit-scope | ESTree | 5.647 | 5.438–6.065 | 221.9 | 73.0 |
| ast-types | ESTree | 7.948 | 7.797–8.588 | 257.0 | 114.9 |
| jscodeshift | ESTree | 8.510 | 7.626–8.610 | 399.3 | 223.5 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| swc-visitor | SWC AST (not ESTree) | 0.464 | 0.438–0.521 | 237.6 | 78.3 |
| typescript | TypeScript 6 AST (not ESTree) | 0.688 | 0.660–0.705 | 368.3 | 170.1 |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.742 | 0.728–0.875 | 258.0 | 101.3 |
| babel-types-traverse | Babel AST (not ESTree) | 0.793 | 0.779–0.821 | 246.4 | 91.5 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 2.463 | 2.424–2.596 | 350.4 | 179.3 |
| babel-traverse | Babel AST (not ESTree) | 5.878 | 5.814–7.373 | 369.5 | 199.0 |
| ts-morph | TypeScript AST (not ESTree) | 9.329 | 9.232–9.330 | 427.5 | 222.2 |
| tsquery | TypeScript 6 AST (not ESTree) | 13.253 | 12.026–14.567 | 418.5 | 203.8 |

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
| zimmerframe | return immutable parent replacements; propagate child edits and returned root |
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
| tsquery | tsquery.map removal/replacement; internal print/reparse included |
| ts-morph | one SourceFile.transform + factory statement-list updates; internal text synchronization timed |

Every measured output is validated against its scenario oracle. For rstest-coverage this includes both normalized AST structure and exact ordered branch metadata; other editing tasks compare against independently authored expected code. The adjacent JSON records all samples, execution order, dependency versions, SWC Next SHA and source hashes.
