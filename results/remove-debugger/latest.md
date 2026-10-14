# remove-debugger results

2026-10-14T10:04:01.736Z · Apple M5 Max · darwin/arm64 · Node v24.20.0

3 isolated processes × 8 warmups + 20 measured iterations per track. Each iteration processes four files. Bars/tables show the median of process medians; ranges are min–max, not confidence intervals.

Fresh parser output is used for every iteration, without AST cloning. Earlier results through [8143bc9](https://github.com/SoonIter/visitor-benchmark/tree/8143bc994901c2321b31ad271c83bbcb6e5cf4ca) used cloned ASTs in editing and original-source i18n; do not interpret changes from those results as implementation speedups.

Preparation, parsing, external printing, validation and disposal are excluded. Traversal setup, scope analysis where enabled, queries and edits are included. Internal ts-morph text updates and tsquery.map printing/reparsing remain timed. Memory covers the entire worker, including untimed preparation and validation; it is not traversal-only allocation. There is no server process.

## dense

1280 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| oxc-visitor | ESTree | 0.170 | 0.168–0.170 | 137.9 | 33.5 |
| acorn-recursive | ESTree | 0.211 | 0.205–0.213 | 122.7 | 38.1 |
| swc-next | ESTree | 0.234 | 0.226–0.238 | 137.7 | 40.1 |
| esrecurse | ESTree | 0.246 | 0.243–0.247 | 135.8 | 39.6 |
| oxc-walker | ESTree | 0.262 | 0.261–0.271 | 135.0 | 40.6 |
| yuku-ast | ESTree | 0.264 | 0.260–0.269 | 136.7 | 34.5 |
| estree-walker | ESTree | 0.308 | 0.303–0.310 | 134.6 | 40.6 |
| estraverse | ESTree | 0.327 | 0.321–0.335 | 138.3 | 36.9 |
| typescript-eslint | ESTree | 0.338 | 0.324–0.349 | 206.3 | 65.7 |
| acorn-full | ESTree | 0.416 | 0.413–0.422 | 136.6 | 42.0 |
| acorn-simple | ESTree | 0.423 | 0.415–0.430 | 135.8 | 38.1 |
| direct-ast | ESTree | 0.604 | 0.585–0.607 | 135.6 | 40.5 |
| estree-toolkit | ESTree | 1.066 | 1.034–1.229 | 138.4 | 42.4 |
| zimmerframe | ESTree | 1.533 | 1.532–1.554 | 136.4 | 41.9 |
| esquery | ESTree | 1.643 | 1.586–1.646 | 137.3 | 41.1 |
| estree-util-visit | ESTree | 2.066 | 2.044–2.083 | 137.7 | 39.1 |
| estree-toolkit-scope | ESTree | 2.788 | 2.752–2.804 | 139.5 | 42.3 |
| ast-types | ESTree | 3.349 | 3.309–3.364 | 140.6 | 43.0 |
| jscodeshift | ESTree | 3.432 | 3.298–3.437 | 298.2 | 162.9 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| swc-visitor | SWC AST (not ESTree) | 0.239 | 0.225–0.259 | 116.3 | 26.4 |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.284 | 0.278–0.303 | 152.1 | 45.0 |
| babel-types-traverse | Babel AST (not ESTree) | 0.305 | 0.301–0.312 | 151.0 | 44.3 |
| typescript | TypeScript 6 AST (not ESTree) | 0.503 | 0.496–0.507 | 302.5 | 105.4 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 1.261 | 1.242–1.295 | 284.8 | 121.8 |
| babel-traverse | Babel AST (not ESTree) | 3.114 | 3.089–3.306 | 307.8 | 153.9 |
| ts-morph | TypeScript AST (not ESTree) | 4.270 | 4.199–4.335 | 346.1 | 134.0 |
| tsquery | TypeScript 6 AST (not ESTree) | 6.521 | 6.272–6.997 | 326.6 | 139.2 |

## sparse

240 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| oxc-visitor | ESTree | 0.292 | 0.290–0.334 | 216.1 | 77.8 |
| acorn-recursive | ESTree | 0.374 | 0.360–0.390 | 214.9 | 78.7 |
| swc-next | ESTree | 0.374 | 0.360–0.390 | 217.2 | 79.2 |
| esrecurse | ESTree | 0.503 | 0.499–0.513 | 215.3 | 78.8 |
| yuku-ast | ESTree | 0.555 | 0.548–0.557 | 215.4 | 75.8 |
| oxc-walker | ESTree | 0.574 | 0.566–0.582 | 214.5 | 80.3 |
| estraverse | ESTree | 0.605 | 0.586–0.610 | 216.8 | 81.2 |
| estree-walker | ESTree | 0.671 | 0.666–0.688 | 213.9 | 78.7 |
| acorn-simple | ESTree | 0.758 | 0.749–0.766 | 215.4 | 78.7 |
| acorn-full | ESTree | 0.792 | 0.786–0.826 | 215.9 | 80.3 |
| typescript-eslint | ESTree | 0.810 | 0.809–0.821 | 276.2 | 99.3 |
| zimmerframe | ESTree | 1.001 | 0.996–1.019 | 216.5 | 76.6 |
| direct-ast | ESTree | 1.648 | 1.607–1.652 | 214.7 | 78.4 |
| estree-toolkit | ESTree | 1.849 | 1.790–1.857 | 220.0 | 83.2 |
| esquery | ESTree | 3.359 | 3.333–3.430 | 219.8 | 79.2 |
| estree-toolkit-scope | ESTree | 5.091 | 5.005–5.355 | 264.5 | 126.0 |
| estree-util-visit | ESTree | 5.407 | 5.374–5.433 | 219.2 | 70.0 |
| jscodeshift | ESTree | 7.634 | 7.618–8.241 | 413.9 | 249.0 |
| ast-types | ESTree | 7.849 | 7.807–7.879 | 282.8 | 133.1 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| swc-visitor | SWC AST (not ESTree) | 0.463 | 0.441–0.481 | 235.3 | 78.1 |
| typescript | TypeScript 6 AST (not ESTree) | 0.692 | 0.675–0.698 | 367.6 | 171.7 |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.794 | 0.768–0.810 | 256.7 | 94.2 |
| babel-types-traverse | Babel AST (not ESTree) | 0.827 | 0.822–0.851 | 244.7 | 91.4 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 2.488 | 2.464–2.535 | 348.8 | 179.1 |
| babel-traverse | Babel AST (not ESTree) | 6.137 | 5.879–6.216 | 369.6 | 198.9 |
| ts-morph | TypeScript AST (not ESTree) | 9.044 | 9.019–9.614 | 427.3 | 221.9 |
| tsquery | TypeScript 6 AST (not ESTree) | 13.188 | 12.115–13.312 | 414.8 | 202.1 |

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
