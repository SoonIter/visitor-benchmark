# remove-debugger results

2026-10-12T14:39:08.675Z · Apple M5 Max · darwin/arm64 · Node v24.20.0

3 isolated processes × 8 warmups + 20 measured iterations per track. Each iteration processes four files. Bars/tables show the median of process medians; ranges are min–max, not confidence intervals.

Preparation, parsing, cloning, external printing, validation and disposal are excluded. Traversal setup, scope analysis where enabled, queries and edits are included. Internal ts-morph text updates and tsquery.map printing/reparsing remain timed. Memory covers the entire worker, including untimed preparation and validation; it is not traversal-only allocation. There is no server process.

## dense

1280 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| oxc-walker | ESTree | 0.294 | 0.289–0.307 | 137.4 | 39.7 |
| estree-walker | ESTree | 0.330 | 0.327–0.359 | 135.8 | 40.7 |
| oxc-visitor | ESTree | 0.373 | 0.369–0.379 | 139.6 | 41.5 |
| acorn-recursive | ESTree | 0.378 | 0.372–0.405 | 136.6 | 40.5 |
| esrecurse | ESTree | 0.466 | 0.452–0.495 | 136.4 | 40.8 |
| yuku-ast | ESTree | 0.517 | 0.511–0.593 | 137.4 | 41.2 |
| estraverse | ESTree | 0.517 | 0.473–0.521 | 136.7 | 37.3 |
| typescript-eslint | ESTree | 0.527 | 0.526–0.530 | 203.5 | 65.8 |
| swc-next | ESTree | 0.531 | 0.513–0.572 | 136.4 | 41.2 |
| acorn-full | ESTree | 0.622 | 0.618–0.676 | 136.7 | 37.3 |
| direct-ast | ESTree | 0.634 | 0.605–0.645 | 137.8 | 36.3 |
| acorn-simple | ESTree | 0.649 | 0.607–0.665 | 136.3 | 41.2 |
| estree-toolkit | ESTree | 1.366 | 1.274–1.513 | 138.9 | 42.1 |
| zimmerframe | ESTree | 1.872 | 1.798–1.904 | 136.5 | 41.1 |
| esquery | ESTree | 1.904 | 1.834–1.946 | 139.1 | 38.7 |
| estree-util-visit | ESTree | 2.123 | 2.070–2.124 | 136.9 | 40.9 |
| estree-toolkit-scope | ESTree | 3.248 | 3.052–3.730 | 140.3 | 41.3 |
| jscodeshift | ESTree | 3.755 | 3.657–3.863 | 303.5 | 153.0 |
| ast-types | ESTree | 3.765 | 3.659–4.131 | 152.5 | 53.3 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| swc-visitor | SWC AST (not ESTree) | 0.238 | 0.236–0.253 | 117.3 | 26.5 |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.286 | 0.283–0.289 | 152.6 | 44.8 |
| babel-types-traverse | Babel AST (not ESTree) | 0.302 | 0.296–0.311 | 140.3 | 44.3 |
| typescript | TypeScript 6 AST (not ESTree) | 0.486 | 0.481–0.501 | 302.4 | 105.3 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 1.315 | 1.293–1.400 | 285.9 | 124.0 |
| babel-traverse | Babel AST (not ESTree) | 3.176 | 3.103–3.193 | 309.5 | 147.2 |
| ts-morph | TypeScript AST (not ESTree) | 4.370 | 4.177–4.658 | 346.7 | 133.9 |
| tsquery | TypeScript 6 AST (not ESTree) | 6.574 | 6.459–6.640 | 327.2 | 138.6 |

## sparse

240 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| oxc-walker | ESTree | 0.611 | 0.605–0.622 | 217.8 | 79.9 |
| oxc-visitor | ESTree | 0.691 | 0.680–0.693 | 239.1 | 84.1 |
| estree-walker | ESTree | 0.698 | 0.697–0.699 | 221.9 | 79.7 |
| acorn-recursive | ESTree | 0.771 | 0.768–0.787 | 218.3 | 80.6 |
| estraverse | ESTree | 0.957 | 0.952–0.967 | 252.6 | 111.3 |
| esrecurse | ESTree | 0.986 | 0.962–0.986 | 219.3 | 80.6 |
| swc-next | ESTree | 1.001 | 0.993–1.020 | 219.0 | 80.6 |
| yuku-ast | ESTree | 1.077 | 1.075–1.101 | 218.7 | 80.1 |
| acorn-simple | ESTree | 1.089 | 1.087–1.115 | 217.8 | 80.6 |
| acorn-full | ESTree | 1.178 | 1.151–1.179 | 253.8 | 112.5 |
| typescript-eslint | ESTree | 1.305 | 1.276–1.346 | 311.4 | 131.1 |
| zimmerframe | ESTree | 1.475 | 1.449–1.530 | 220.3 | 82.2 |
| direct-ast | ESTree | 1.696 | 1.658–1.702 | 217.5 | 82.0 |
| estree-toolkit | ESTree | 2.316 | 2.282–2.357 | 255.7 | 101.1 |
| esquery | ESTree | 3.792 | 3.732–3.822 | 250.5 | 113.4 |
| estree-util-visit | ESTree | 5.397 | 5.391–5.425 | 219.2 | 77.0 |
| estree-toolkit-scope | ESTree | 5.768 | 5.696–6.050 | 222.8 | 73.2 |
| ast-types | ESTree | 8.316 | 7.918–9.038 | 341.3 | 184.6 |
| jscodeshift | ESTree | 8.616 | 8.159–9.682 | 399.4 | 224.6 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| swc-visitor | SWC AST (not ESTree) | 0.456 | 0.446–0.514 | 238.0 | 78.2 |
| typescript | TypeScript 6 AST (not ESTree) | 0.665 | 0.662–0.670 | 367.8 | 170.0 |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.761 | 0.732–0.788 | 259.8 | 114.9 |
| babel-types-traverse | Babel AST (not ESTree) | 0.795 | 0.783–0.972 | 246.8 | 92.7 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 2.510 | 2.483–2.532 | 350.1 | 179.3 |
| babel-traverse | Babel AST (not ESTree) | 6.124 | 6.106–6.353 | 369.6 | 199.1 |
| ts-morph | TypeScript AST (not ESTree) | 9.516 | 9.495–9.628 | 426.8 | 221.8 |
| tsquery | TypeScript 6 AST (not ESTree) | 12.397 | 12.161–13.252 | 415.3 | 197.9 |

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
