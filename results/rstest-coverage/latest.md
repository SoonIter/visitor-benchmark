# rstest-coverage results

2026-10-15T09:16:14.138Z · Apple M5 Max · darwin/arm64 · Node v24.20.0

3 isolated processes × 8 warmups + 20 measured iterations per track. Each iteration processes four files. Bars/tables show the median of process medians; ranges are min–max, not confidence intervals.

Fresh parser output is used for every iteration, without AST cloning. Earlier results through [8143bc9](https://github.com/SoonIter/visitor-benchmark/tree/8143bc994901c2321b31ad271c83bbcb6e5cf4ca) used cloned ASTs in editing and original-source i18n; do not interpret changes from those results as implementation speedups.

Preparation, parsing, external printing, validation and disposal are excluded. Traversal setup, scope analysis where enabled, queries and edits are included. Internal ts-morph text updates and tsquery.map printing/reparsing remain timed. Memory covers the entire worker, including untimed preparation and validation; it is not traversal-only allocation. There is no server process.

This is the focused Rstest IfStatement normalization phase on eight public modules (four per track), not full coverage conversion. The timer includes branch metadata, ignore handling for this phase, AST edits and API bookkeeping. No runtime execution, V8 collection, source-map remapping or coverage report generation. The 31 total edits are present naturally in the captured modules; source was not duplicated or augmented. [Contract and provenance](../../docs/rstest-coverage/README.md).

## runtime

10 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| oxc-visitor | ESTree | 0.186 | 0.183–0.208 | 149.7 | 43.7 |
| acorn-recursive | ESTree | 0.203 | 0.200–0.208 | 144.8 | 40.8 |
| swc-next | ESTree | 0.258 | 0.252–0.285 | 147.2 | 41.5 |
| esrecurse | ESTree | 0.281 | 0.277–0.282 | 145.8 | 41.0 |
| yuku-ast | ESTree | 0.330 | 0.302–0.348 | 147.0 | 40.0 |
| acorn-full | ESTree | 0.345 | 0.335–0.362 | 147.6 | 42.4 |
| estraverse | ESTree | 0.346 | 0.329–0.346 | 147.0 | 42.3 |
| typescript-eslint | ESTree | 0.346 | 0.339–0.358 | 205.5 | 66.7 |
| acorn-simple | ESTree | 0.379 | 0.372–0.411 | 146.9 | 41.0 |
| oxc-walker | ESTree | 0.418 | 0.412–0.456 | 146.0 | 42.4 |
| estree-walker | ESTree | 0.549 | 0.538–0.562 | 146.0 | 40.7 |
| direct-ast | ESTree | 0.554 | 0.526–0.576 | 144.9 | 41.7 |
| zimmerframe | ESTree | 0.661 | 0.636–0.775 | 145.2 | 40.6 |
| esquery | ESTree | 0.693 | 0.686–0.694 | 148.6 | 39.3 |
| estree-toolkit | ESTree | 0.944 | 0.937–0.962 | 146.2 | 41.9 |
| estree-toolkit-scope | ESTree | 2.973 | 2.722–4.045 | 204.5 | 85.5 |
| estree-util-visit | ESTree | 3.046 | 2.970–3.167 | 143.8 | 42.1 |
| ast-types | ESTree | 3.316 | 3.159–3.501 | 226.6 | 83.0 |
| jscodeshift | ESTree | 3.500 | 3.111–3.720 | 324.5 | 181.0 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| babel-types-traverse | Babel AST (not ESTree) | 0.307 | 0.295–0.329 | 151.6 | 47.9 |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.316 | 0.274–0.342 | 154.3 | 48.0 |
| swc-visitor | SWC AST (not ESTree) | 0.361 | 0.350–3.920 | 184.5 | 65.7 |
| typescript | TypeScript 6 AST (not ESTree) | 0.421 | 0.419–0.424 | 280.5 | 105.6 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 1.227 | 1.151–1.448 | 295.5 | 144.3 |
| babel-traverse | Babel AST (not ESTree) | 2.934 | 2.898–5.628 | 300.7 | 136.5 |
| ts-morph | TypeScript AST (not ESTree) | 3.365 | 3.127–4.267 | 344.0 | 145.8 |
| tsquery | TypeScript 6 AST (not ESTree) | 7.898 | 7.461–8.123 | 333.5 | 132.2 |

## tooling

21 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| oxc-visitor | ESTree | 0.169 | 0.159–0.171 | 109.8 | 26.9 |
| acorn-recursive | ESTree | 0.180 | 0.177–0.195 | 109.7 | 26.2 |
| swc-next | ESTree | 0.226 | 0.226–0.353 | 109.8 | 26.6 |
| esrecurse | ESTree | 0.243 | 0.237–0.251 | 109.9 | 26.3 |
| yuku-ast | ESTree | 0.267 | 0.266–0.272 | 108.7 | 26.4 |
| estraverse | ESTree | 0.289 | 0.286–0.292 | 111.8 | 27.1 |
| acorn-full | ESTree | 0.296 | 0.291–0.297 | 110.7 | 26.3 |
| typescript-eslint | ESTree | 0.296 | 0.296–0.338 | 204.8 | 66.3 |
| acorn-simple | ESTree | 0.320 | 0.320–0.323 | 110.2 | 26.4 |
| oxc-walker | ESTree | 0.363 | 0.356–0.384 | 110.7 | 26.1 |
| direct-ast | ESTree | 0.444 | 0.442–0.446 | 108.7 | 26.5 |
| estree-walker | ESTree | 0.471 | 0.465–0.483 | 110.5 | 26.2 |
| esquery | ESTree | 0.588 | 0.579–0.600 | 110.0 | 27.2 |
| zimmerframe | ESTree | 0.599 | 0.593–0.619 | 110.3 | 26.1 |
| estree-toolkit | ESTree | 0.721 | 0.720–0.754 | 126.2 | 42.5 |
| estree-toolkit-scope | ESTree | 2.529 | 2.506–2.569 | 142.5 | 41.7 |
| jscodeshift | ESTree | 2.639 | 2.610–2.844 | 306.0 | 144.4 |
| estree-util-visit | ESTree | 2.642 | 2.575–2.793 | 141.1 | 31.9 |
| ast-types | ESTree | 2.840 | 2.831–2.845 | 147.7 | 41.3 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.232 | 0.228–0.233 | 116.5 | 31.5 |
| babel-types-traverse | Babel AST (not ESTree) | 0.266 | 0.248–0.303 | 118.5 | 31.7 |
| swc-visitor | SWC AST (not ESTree) | 0.331 | 0.326–0.337 | 157.4 | 46.5 |
| typescript | TypeScript 6 AST (not ESTree) | 0.378 | 0.367–0.381 | 229.5 | 77.1 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 1.044 | 1.038–1.059 | 269.8 | 125.4 |
| babel-traverse | Babel AST (not ESTree) | 2.691 | 2.603–2.701 | 288.7 | 126.7 |
| ts-morph | TypeScript AST (not ESTree) | 3.115 | 3.082–3.287 | 317.8 | 139.4 |
| tsquery | TypeScript 6 AST (not ESTree) | 6.987 | 6.960–7.368 | 312.5 | 114.6 |

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
