# remove-debugger results

2026-10-12T15:00:54.082Z · Apple M5 Max · darwin/arm64 · Node v24.20.0

3 isolated processes × 8 warmups + 20 measured iterations per track. Each iteration processes four files. Bars/tables show the median of process medians; ranges are min–max, not confidence intervals.

Fresh parser output is used for every iteration, without AST cloning. Earlier results through [8143bc9](https://github.com/SoonIter/visitor-benchmark/tree/8143bc994901c2321b31ad271c83bbcb6e5cf4ca) used cloned ASTs in editing and original-source i18n; do not interpret changes from those results as implementation speedups.

Preparation, parsing, external printing, validation and disposal are excluded. Traversal setup, scope analysis where enabled, queries and edits are included. Internal ts-morph text updates and tsquery.map printing/reparsing remain timed. Memory covers the entire worker, including untimed preparation and validation; it is not traversal-only allocation. There is no server process.

## dense

1280 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| oxc-visitor | ESTree | 0.178 | 0.176–0.190 | 138.6 | 33.7 |
| acorn-recursive | ESTree | 0.215 | 0.211–0.215 | 136.1 | 38.5 |
| esrecurse | ESTree | 0.252 | 0.248–0.274 | 136.7 | 42.1 |
| swc-next | ESTree | 0.257 | 0.255–0.259 | 137.0 | 33.3 |
| yuku-ast | ESTree | 0.274 | 0.271–0.287 | 137.6 | 33.9 |
| oxc-walker | ESTree | 0.278 | 0.269–0.282 | 135.3 | 40.8 |
| estree-walker | ESTree | 0.323 | 0.317–0.324 | 127.8 | 33.4 |
| estraverse | ESTree | 0.340 | 0.329–0.415 | 132.7 | 34.1 |
| typescript-eslint | ESTree | 0.347 | 0.346–0.386 | 317.6 | 132.8 |
| acorn-full | ESTree | 0.430 | 0.420–0.435 | 136.8 | 42.1 |
| acorn-simple | ESTree | 0.440 | 0.430–0.448 | 136.1 | 38.3 |
| direct-ast | ESTree | 0.619 | 0.602–0.645 | 136.2 | 40.6 |
| estree-toolkit | ESTree | 1.223 | 1.085–1.272 | 139.1 | 42.5 |
| zimmerframe | ESTree | 1.601 | 1.599–1.627 | 137.2 | 42.1 |
| esquery | ESTree | 1.838 | 1.766–1.847 | 137.8 | 41.2 |
| estree-util-visit | ESTree | 2.146 | 2.117–2.149 | 137.8 | 39.2 |
| estree-toolkit-scope | ESTree | 2.929 | 2.826–3.141 | 139.3 | 42.6 |
| ast-types | ESTree | 3.679 | 3.618–3.684 | 141.3 | 43.1 |
| jscodeshift | ESTree | 3.733 | 3.624–3.824 | 298.8 | 162.9 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| swc-visitor | SWC AST (not ESTree) | 0.258 | 0.251–0.296 | 117.3 | 26.5 |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.300 | 0.290–0.304 | 152.3 | 45.2 |
| babel-types-traverse | Babel AST (not ESTree) | 0.305 | 0.304–0.333 | 152.4 | 44.6 |
| typescript | TypeScript 6 AST (not ESTree) | 0.548 | 0.525–0.581 | 304.2 | 105.3 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 1.364 | 1.340–1.479 | 285.7 | 128.8 |
| babel-traverse | Babel AST (not ESTree) | 3.358 | 3.353–3.401 | 309.7 | 146.6 |
| ts-morph | TypeScript AST (not ESTree) | 4.471 | 4.337–4.567 | 346.7 | 134.2 |
| tsquery | TypeScript 6 AST (not ESTree) | 6.828 | 6.781–9.349 | 327.5 | 139.3 |

## sparse

240 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| oxc-visitor | ESTree | 0.312 | 0.307–0.354 | 217.9 | 81.1 |
| acorn-recursive | ESTree | 0.430 | 0.377–0.453 | 215.6 | 78.9 |
| swc-next | ESTree | 0.464 | 0.441–0.471 | 216.0 | 79.1 |
| esrecurse | ESTree | 0.533 | 0.503–0.660 | 295.7 | 102.3 |
| oxc-walker | ESTree | 0.572 | 0.570–0.605 | 215.2 | 72.1 |
| yuku-ast | ESTree | 0.599 | 0.574–0.626 | 217.6 | 76.0 |
| estraverse | ESTree | 0.633 | 0.604–0.661 | 216.3 | 81.4 |
| estree-walker | ESTree | 0.694 | 0.675–0.696 | 216.3 | 78.8 |
| acorn-simple | ESTree | 0.799 | 0.789–0.813 | 218.3 | 78.9 |
| acorn-full | ESTree | 0.828 | 0.821–0.843 | 216.2 | 76.2 |
| typescript-eslint | ESTree | 0.930 | 0.838–0.981 | 425.3 | 234.7 |
| zimmerframe | ESTree | 1.128 | 1.012–1.173 | 218.1 | 76.7 |
| direct-ast | ESTree | 1.659 | 1.648–1.659 | 292.5 | 133.0 |
| estree-toolkit | ESTree | 1.906 | 1.880–1.913 | 221.2 | 83.6 |
| esquery | ESTree | 3.424 | 3.421–3.447 | 291.3 | 111.6 |
| estree-toolkit-scope | ESTree | 5.350 | 5.248–6.013 | 265.9 | 125.7 |
| estree-util-visit | ESTree | 5.487 | 5.421–5.639 | 297.2 | 124.3 |
| ast-types | ESTree | 7.864 | 7.687–12.345 | 296.3 | 142.8 |
| jscodeshift | ESTree | 9.502 | 7.590–9.530 | 414.7 | 250.5 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| swc-visitor | SWC AST (not ESTree) | 0.521 | 0.519–0.537 | 238.9 | 78.3 |
| typescript | TypeScript 6 AST (not ESTree) | 0.747 | 0.743–0.764 | 336.3 | 110.2 |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.847 | 0.846–1.062 | 260.3 | 88.3 |
| babel-types-traverse | Babel AST (not ESTree) | 0.942 | 0.850–1.033 | 248.2 | 92.1 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 2.642 | 2.616–3.093 | 351.1 | 179.3 |
| babel-traverse | Babel AST (not ESTree) | 6.808 | 6.624–8.002 | 368.4 | 199.6 |
| ts-morph | TypeScript AST (not ESTree) | 10.001 | 9.732–10.477 | 427.2 | 222.2 |
| tsquery | TypeScript 6 AST (not ESTree) | 12.755 | 12.717–15.585 | 418.6 | 204.4 |

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
