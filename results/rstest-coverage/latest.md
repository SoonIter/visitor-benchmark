# rstest-coverage results

2026-10-12T15:02:21.284Z · Apple M5 Max · darwin/arm64 · Node v24.20.0

3 isolated processes × 8 warmups + 20 measured iterations per track. Each iteration processes four files. Bars/tables show the median of process medians; ranges are min–max, not confidence intervals.

Fresh parser output is used for every iteration, without AST cloning. Earlier results through [8143bc9](https://github.com/SoonIter/visitor-benchmark/tree/8143bc994901c2321b31ad271c83bbcb6e5cf4ca) used cloned ASTs in editing and original-source i18n; do not interpret changes from those results as implementation speedups.

Preparation, parsing, external printing, validation and disposal are excluded. Traversal setup, scope analysis where enabled, queries and edits are included. Internal ts-morph text updates and tsquery.map printing/reparsing remain timed. Memory covers the entire worker, including untimed preparation and validation; it is not traversal-only allocation. There is no server process.

This is the focused Rstest IfStatement normalization phase on eight public modules (four per track), not full coverage conversion. The timer includes branch metadata, ignore handling for this phase, AST edits and API bookkeeping. No runtime execution, V8 collection, source-map remapping or coverage report generation. The 31 total edits are present naturally in the captured modules; source was not duplicated or augmented. [Contract and provenance](../../docs/rstest-coverage/README.md).

## runtime

10 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| oxc-visitor | ESTree | 0.186 | 0.185–0.187 | 147.3 | 43.7 |
| acorn-recursive | ESTree | 0.203 | 0.200–0.207 | 144.5 | 40.8 |
| esrecurse | ESTree | 0.283 | 0.270–0.284 | 145.0 | 40.8 |
| swc-next | ESTree | 0.298 | 0.290–0.300 | 145.1 | 41.2 |
| yuku-ast | ESTree | 0.319 | 0.309–0.324 | 147.6 | 39.9 |
| typescript-eslint | ESTree | 0.340 | 0.337–0.353 | 206.6 | 66.7 |
| estraverse | ESTree | 0.344 | 0.334–0.382 | 147.0 | 42.4 |
| acorn-full | ESTree | 0.352 | 0.351–0.363 | 145.5 | 42.5 |
| acorn-simple | ESTree | 0.376 | 0.373–0.388 | 144.9 | 40.9 |
| oxc-walker | ESTree | 0.419 | 0.417–0.432 | 145.5 | 42.4 |
| direct-ast | ESTree | 0.533 | 0.531–0.545 | 145.1 | 41.7 |
| estree-walker | ESTree | 0.557 | 0.552–0.566 | 145.8 | 40.7 |
| zimmerframe | ESTree | 0.635 | 0.620–0.644 | 145.4 | 40.8 |
| esquery | ESTree | 0.675 | 0.668–0.694 | 149.3 | 39.3 |
| estree-toolkit | ESTree | 0.960 | 0.951–1.043 | 145.8 | 41.9 |
| estree-toolkit-scope | ESTree | 2.877 | 2.803–2.900 | 204.4 | 85.2 |
| estree-util-visit | ESTree | 2.947 | 2.886–2.997 | 145.1 | 41.9 |
| ast-types | ESTree | 3.095 | 3.008–3.327 | 163.6 | 53.8 |
| jscodeshift | ESTree | 3.140 | 3.127–3.269 | 323.7 | 181.0 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.288 | 0.276–0.300 | 151.2 | 47.9 |
| babel-types-traverse | Babel AST (not ESTree) | 0.302 | 0.286–0.312 | 153.5 | 48.3 |
| swc-visitor | SWC AST (not ESTree) | 0.360 | 0.351–0.361 | 175.0 | 58.7 |
| typescript | TypeScript 6 AST (not ESTree) | 0.410 | 0.400–0.444 | 280.3 | 105.6 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 1.198 | 1.185–1.239 | 296.0 | 147.5 |
| babel-traverse | Babel AST (not ESTree) | 3.055 | 2.909–3.057 | 302.0 | 151.1 |
| ts-morph | TypeScript AST (not ESTree) | 3.134 | 3.083–3.195 | 344.9 | 146.3 |
| tsquery | TypeScript 6 AST (not ESTree) | 7.813 | 7.655–7.899 | 332.4 | 132.1 |

## tooling

21 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| oxc-visitor | ESTree | 0.172 | 0.167–0.194 | 110.3 | 26.9 |
| acorn-recursive | ESTree | 0.181 | 0.176–0.230 | 110.0 | 26.1 |
| esrecurse | ESTree | 0.257 | 0.246–0.340 | 110.3 | 26.2 |
| swc-next | ESTree | 0.268 | 0.261–0.275 | 108.8 | 26.4 |
| yuku-ast | ESTree | 0.278 | 0.269–0.282 | 108.8 | 26.4 |
| estraverse | ESTree | 0.294 | 0.288–0.309 | 111.1 | 27.1 |
| acorn-full | ESTree | 0.303 | 0.299–0.323 | 110.0 | 26.3 |
| typescript-eslint | ESTree | 0.304 | 0.304–0.327 | 204.5 | 66.3 |
| acorn-simple | ESTree | 0.334 | 0.322–0.354 | 110.4 | 26.6 |
| oxc-walker | ESTree | 0.371 | 0.370–0.388 | 109.8 | 26.0 |
| direct-ast | ESTree | 0.457 | 0.437–0.473 | 109.5 | 26.5 |
| estree-walker | ESTree | 0.478 | 0.475–0.487 | 109.8 | 26.1 |
| esquery | ESTree | 0.599 | 0.586–0.610 | 109.6 | 26.5 |
| zimmerframe | ESTree | 0.606 | 0.598–0.666 | 111.5 | 26.1 |
| estree-toolkit | ESTree | 0.738 | 0.723–0.743 | 128.4 | 42.5 |
| estree-toolkit-scope | ESTree | 2.573 | 2.504–2.627 | 143.0 | 40.9 |
| jscodeshift | ESTree | 2.733 | 2.660–2.745 | 305.9 | 138.6 |
| estree-util-visit | ESTree | 2.766 | 2.548–2.909 | 141.2 | 31.9 |
| ast-types | ESTree | 2.829 | 2.818–2.901 | 147.9 | 45.4 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.242 | 0.238–0.244 | 116.5 | 31.5 |
| babel-types-traverse | Babel AST (not ESTree) | 0.268 | 0.266–0.381 | 117.6 | 31.7 |
| swc-visitor | SWC AST (not ESTree) | 0.339 | 0.328–0.400 | 156.8 | 46.1 |
| typescript | TypeScript 6 AST (not ESTree) | 0.384 | 0.369–0.413 | 231.4 | 77.1 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 1.092 | 1.078–1.165 | 269.9 | 125.4 |
| babel-traverse | Babel AST (not ESTree) | 2.830 | 2.739–2.837 | 287.0 | 126.7 |
| ts-morph | TypeScript AST (not ESTree) | 3.257 | 3.246–3.369 | 318.1 | 139.1 |
| tsquery | TypeScript 6 AST (not ESTree) | 7.309 | 7.007–7.486 | 312.7 | 114.5 |

## Implementations

| API | Strategy |
| :-- | :-- |
| direct-ast | manual recursive traversal and branch assignment |
| swc-next | typed enter; ctx.replace and ctx.skip |
| yuku-ast | typed enter; ctx.replace and ctx.skip |
| estree-walker | generic enter; this.replace and this.skip |
| oxc-walker | generic enter; this.replace and this.skip |
| oxc-visitor | typed IfStatement hook; manual branch assignment |
| acorn-simple | post-order collection; source-order planning and manual edits |
| acorn-recursive | recursive override; edit before default child traversal |
| acorn-full | post-order collection; source-order planning and manual edits |
| estraverse | replace; return updated node or Skip |
| esrecurse | typed visitor; manual edits and explicit child traversal |
| estree-toolkit | child path.replaceWith; scope disabled |
| estree-toolkit-scope | child path.replaceWith; scope enabled |
| ast-types | child path.replace; explicit child traversal |
| zimmerframe | immutable return-value replacement; child changes preserved |
| jscodeshift | find IfStatement paths; source-order planning and child path.replace |
| esquery | query IfStatement nodes; source-order planning and manual edits |
| estree-util-visit | enter callback; manual assignment and SKIP |
| typescript-eslint | simpleTraverse enter; manual edits; ignored descendants still traversed |
| babel-types-traverse | enter callback; manual edits without NodePath |
| babel-types-traverse-fast | fast callback; manual edits without NodePath |
| babel-traverse | child path.replaceWith and path.skip; default scope analysis |
| babel-traverse-no-scope | child path.replaceWith and path.skip; noScope |
| swc-visitor | Visitor return-value update; byte offsets mapped to UTF-16 |
| typescript | transform + visitEachChild + factory updates |
| tsquery | map + compiler subtree transform; internal printing/reparsing included |
| ts-morph | SourceFile.transform + factory updates; internal text synchronization included |

Every measured output is validated against its scenario oracle. For rstest-coverage this includes both normalized AST structure and exact ordered branch metadata; other editing tasks compare against independently authored expected code. The adjacent JSON records all samples, execution order, dependency versions, SWC Next SHA and source hashes.
