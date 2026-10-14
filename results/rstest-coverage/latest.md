# rstest-coverage results

2026-10-14T10:04:01.736Z · Apple M5 Max · darwin/arm64 · Node v24.20.0

3 isolated processes × 8 warmups + 20 measured iterations per track. Each iteration processes four files. Bars/tables show the median of process medians; ranges are min–max, not confidence intervals.

Fresh parser output is used for every iteration, without AST cloning. Earlier results through [8143bc9](https://github.com/SoonIter/visitor-benchmark/tree/8143bc994901c2321b31ad271c83bbcb6e5cf4ca) used cloned ASTs in editing and original-source i18n; do not interpret changes from those results as implementation speedups.

Preparation, parsing, external printing, validation and disposal are excluded. Traversal setup, scope analysis where enabled, queries and edits are included. Internal ts-morph text updates and tsquery.map printing/reparsing remain timed. Memory covers the entire worker, including untimed preparation and validation; it is not traversal-only allocation. There is no server process.

This is the focused Rstest IfStatement normalization phase on eight public modules (four per track), not full coverage conversion. The timer includes branch metadata, ignore handling for this phase, AST edits and API bookkeeping. No runtime execution, V8 collection, source-map remapping or coverage report generation. The 31 total edits are present naturally in the captured modules; source was not duplicated or augmented. [Contract and provenance](../../docs/rstest-coverage/README.md).

## runtime

10 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| oxc-visitor | ESTree | 0.186 | 0.182–0.190 | 147.3 | 42.5 |
| acorn-recursive | ESTree | 0.201 | 0.199–0.211 | 144.7 | 40.9 |
| esrecurse | ESTree | 0.276 | 0.268–0.280 | 146.2 | 40.9 |
| swc-next | ESTree | 0.280 | 0.278–0.291 | 145.0 | 41.3 |
| yuku-ast | ESTree | 0.317 | 0.310–0.321 | 147.9 | 40.0 |
| typescript-eslint | ESTree | 0.332 | 0.330–0.351 | 205.2 | 66.8 |
| acorn-full | ESTree | 0.344 | 0.341–0.352 | 146.8 | 42.5 |
| estraverse | ESTree | 0.346 | 0.326–0.353 | 147.5 | 42.5 |
| acorn-simple | ESTree | 0.381 | 0.369–0.386 | 146.4 | 41.0 |
| oxc-walker | ESTree | 0.418 | 0.410–0.422 | 147.0 | 42.4 |
| direct-ast | ESTree | 0.515 | 0.513–0.515 | 143.6 | 41.8 |
| estree-walker | ESTree | 0.557 | 0.544–0.573 | 146.3 | 40.7 |
| zimmerframe | ESTree | 0.638 | 0.616–0.647 | 146.1 | 41.0 |
| esquery | ESTree | 0.674 | 0.662–0.693 | 146.1 | 39.3 |
| estree-toolkit | ESTree | 0.953 | 0.905–0.961 | 144.2 | 41.5 |
| estree-toolkit-scope | ESTree | 2.829 | 2.743–2.917 | 204.4 | 85.3 |
| estree-util-visit | ESTree | 2.923 | 2.873–2.996 | 143.5 | 42.0 |
| jscodeshift | ESTree | 3.003 | 2.995–3.197 | 322.9 | 181.5 |
| ast-types | ESTree | 3.262 | 3.128–3.580 | 226.7 | 83.1 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.275 | 0.270–0.283 | 159.3 | 54.5 |
| babel-types-traverse | Babel AST (not ESTree) | 0.293 | 0.289–0.311 | 157.6 | 52.3 |
| swc-visitor | SWC AST (not ESTree) | 0.340 | 0.337–0.386 | 174.3 | 57.7 |
| typescript | TypeScript 6 AST (not ESTree) | 0.403 | 0.396–0.430 | 280.3 | 105.6 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 1.169 | 1.152–1.216 | 296.0 | 143.4 |
| babel-traverse | Babel AST (not ESTree) | 2.891 | 2.837–2.903 | 302.7 | 136.6 |
| ts-morph | TypeScript AST (not ESTree) | 3.103 | 3.062–3.138 | 343.5 | 146.2 |
| tsquery | TypeScript 6 AST (not ESTree) | 7.468 | 7.325–8.013 | 332.5 | 132.1 |

## tooling

21 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| oxc-visitor | ESTree | 0.166 | 0.165–0.172 | 110.0 | 27.0 |
| acorn-recursive | ESTree | 0.172 | 0.171–0.180 | 109.6 | 26.2 |
| esrecurse | ESTree | 0.238 | 0.231–0.238 | 109.3 | 26.3 |
| swc-next | ESTree | 0.244 | 0.241–0.259 | 109.3 | 26.6 |
| yuku-ast | ESTree | 0.273 | 0.260–0.278 | 108.7 | 26.4 |
| estraverse | ESTree | 0.284 | 0.278–0.298 | 110.4 | 27.1 |
| acorn-full | ESTree | 0.292 | 0.288–0.298 | 110.3 | 26.3 |
| typescript-eslint | ESTree | 0.294 | 0.293–0.299 | 204.5 | 66.4 |
| acorn-simple | ESTree | 0.322 | 0.313–0.330 | 110.3 | 26.3 |
| oxc-walker | ESTree | 0.361 | 0.355–0.365 | 110.7 | 26.3 |
| direct-ast | ESTree | 0.439 | 0.436–0.441 | 108.6 | 26.6 |
| estree-walker | ESTree | 0.470 | 0.462–0.473 | 110.0 | 26.2 |
| esquery | ESTree | 0.587 | 0.584–0.606 | 109.4 | 27.2 |
| zimmerframe | ESTree | 0.605 | 0.579–0.613 | 110.4 | 26.1 |
| estree-toolkit | ESTree | 0.717 | 0.706–0.739 | 137.6 | 42.5 |
| estree-toolkit-scope | ESTree | 2.518 | 2.500–2.525 | 142.5 | 40.9 |
| jscodeshift | ESTree | 2.654 | 2.643–2.705 | 305.2 | 138.5 |
| ast-types | ESTree | 2.769 | 2.669–2.787 | 147.5 | 41.4 |
| estree-util-visit | ESTree | 2.787 | 2.771–2.797 | 140.9 | 31.9 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.236 | 0.233–0.247 | 115.1 | 32.3 |
| babel-types-traverse | Babel AST (not ESTree) | 0.251 | 0.241–0.256 | 117.9 | 31.8 |
| swc-visitor | SWC AST (not ESTree) | 0.318 | 0.306–0.338 | 157.7 | 46.4 |
| typescript | TypeScript 6 AST (not ESTree) | 0.368 | 0.366–0.388 | 229.6 | 77.0 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 1.059 | 1.022–1.074 | 269.6 | 125.5 |
| babel-traverse | Babel AST (not ESTree) | 2.782 | 2.700–2.850 | 287.0 | 126.7 |
| ts-morph | TypeScript AST (not ESTree) | 3.240 | 3.110–3.245 | 318.5 | 139.3 |
| tsquery | TypeScript 6 AST (not ESTree) | 6.927 | 6.732–7.147 | 312.8 | 114.8 |

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
