# rstest-coverage results

2026-10-12T14:41:01.131Z · Apple M5 Max · darwin/arm64 · Node v24.20.0

3 isolated processes × 8 warmups + 20 measured iterations per track. Each iteration processes four files. Bars/tables show the median of process medians; ranges are min–max, not confidence intervals.

Preparation, parsing, cloning, external printing, validation and disposal are excluded. Traversal setup, scope analysis where enabled, queries and edits are included. Internal ts-morph text updates and tsquery.map printing/reparsing remain timed. Memory covers the entire worker, including untimed preparation and validation; it is not traversal-only allocation. There is no server process.

This is the focused Rstest IfStatement normalization phase on eight public modules (four per track), not full coverage conversion. The timer includes branch metadata, ignore handling for this phase, AST edits and API bookkeeping. No runtime execution, V8 collection, source-map remapping or coverage report generation. The 31 total edits are present naturally in the captured modules; source was not duplicated or augmented. [Contract and provenance](../../docs/rstest-coverage/README.md).

## runtime

10 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| oxc-walker | ESTree | 0.325 | 0.319–0.328 | 150.0 | 46.1 |
| oxc-visitor | ESTree | 0.367 | 0.366–0.386 | 152.8 | 47.4 |
| estree-walker | ESTree | 0.382 | 0.375–0.394 | 150.1 | 46.0 |
| acorn-recursive | ESTree | 0.397 | 0.388–0.401 | 150.3 | 46.4 |
| acorn-full | ESTree | 0.490 | 0.485–0.499 | 151.0 | 46.0 |
| estraverse | ESTree | 0.499 | 0.487–0.558 | 112.5 | 14.7 |
| esrecurse | ESTree | 0.517 | 0.479–0.518 | 148.4 | 46.0 |
| typescript-eslint | ESTree | 0.518 | 0.506–0.529 | 206.9 | 66.6 |
| swc-next | ESTree | 0.533 | 0.519–0.546 | 149.9 | 46.5 |
| yuku-ast | ESTree | 0.553 | 0.521–0.561 | 148.9 | 46.2 |
| acorn-simple | ESTree | 0.574 | 0.535–0.585 | 149.6 | 46.4 |
| direct-ast | ESTree | 0.595 | 0.590–0.630 | 150.9 | 46.6 |
| zimmerframe | ESTree | 0.634 | 0.620–0.666 | 143.6 | 43.0 |
| esquery | ESTree | 0.851 | 0.835–0.854 | 112.9 | 15.1 |
| estree-toolkit | ESTree | 1.055 | 1.042–1.074 | 153.9 | 49.4 |
| estree-util-visit | ESTree | 2.581 | 2.556–2.608 | 149.8 | 45.3 |
| estree-toolkit-scope | ESTree | 3.009 | 2.996–3.047 | 153.0 | 53.5 |
| ast-types | ESTree | 3.509 | 3.489–3.534 | 152.7 | 49.7 |
| jscodeshift | ESTree | 4.023 | 4.014–4.322 | 317.2 | 174.5 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.276 | 0.271–0.277 | 157.8 | 51.4 |
| babel-types-traverse | Babel AST (not ESTree) | 0.293 | 0.291–0.313 | 156.3 | 51.9 |
| swc-visitor | SWC AST (not ESTree) | 0.353 | 0.351–0.397 | 183.3 | 69.1 |
| typescript | TypeScript 6 AST (not ESTree) | 0.411 | 0.395–0.424 | 280.0 | 105.3 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 1.181 | 1.172–1.204 | 292.8 | 144.4 |
| babel-traverse | Babel AST (not ESTree) | 3.052 | 2.969–3.069 | 299.0 | 136.5 |
| ts-morph | TypeScript AST (not ESTree) | 3.297 | 3.187–3.307 | 332.0 | 140.3 |
| tsquery | TypeScript 6 AST (not ESTree) | 7.637 | 7.391–7.710 | 332.8 | 132.4 |

## tooling

21 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| oxc-walker | ESTree | 0.274 | 0.273–0.288 | 106.6 | 26.3 |
| estree-walker | ESTree | 0.325 | 0.322–0.325 | 106.1 | 25.2 |
| oxc-visitor | ESTree | 0.328 | 0.326–0.545 | 113.5 | 27.9 |
| acorn-recursive | ESTree | 0.347 | 0.322–0.350 | 106.7 | 26.2 |
| estraverse | ESTree | 0.403 | 0.403–0.448 | 106.3 | 26.4 |
| esrecurse | ESTree | 0.417 | 0.413–0.653 | 107.6 | 26.5 |
| acorn-full | ESTree | 0.439 | 0.432–0.451 | 107.6 | 25.3 |
| swc-next | ESTree | 0.448 | 0.444–0.500 | 106.6 | 26.7 |
| acorn-simple | ESTree | 0.449 | 0.442–0.492 | 108.7 | 25.3 |
| typescript-eslint | ESTree | 0.455 | 0.437–0.456 | 203.6 | 65.3 |
| yuku-ast | ESTree | 0.476 | 0.463–0.479 | 109.0 | 26.7 |
| direct-ast | ESTree | 0.506 | 0.495–0.519 | 107.5 | 26.1 |
| zimmerframe | ESTree | 0.609 | 0.593–0.651 | 110.5 | 28.2 |
| esquery | ESTree | 0.786 | 0.745–0.856 | 108.8 | 26.4 |
| estree-toolkit | ESTree | 0.991 | 0.962–1.001 | 140.9 | 39.8 |
| estree-util-visit | ESTree | 2.467 | 2.346–2.522 | 139.2 | 39.9 |
| estree-toolkit-scope | ESTree | 2.742 | 2.712–2.965 | 141.8 | 40.7 |
| jscodeshift | ESTree | 2.794 | 2.777–2.831 | 292.8 | 132.3 |
| ast-types | ESTree | 2.881 | 2.752–2.919 | 143.2 | 43.4 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| babel-types-traverse | Babel AST (not ESTree) | 0.247 | 0.243–0.265 | 117.7 | 31.4 |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.249 | 0.225–0.280 | 117.2 | 31.9 |
| swc-visitor | SWC AST (not ESTree) | 0.332 | 0.315–0.347 | 162.5 | 44.5 |
| typescript | TypeScript 6 AST (not ESTree) | 0.384 | 0.368–0.390 | 229.2 | 77.1 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 1.049 | 1.019–1.092 | 269.4 | 125.1 |
| babel-traverse | Babel AST (not ESTree) | 2.800 | 2.688–2.943 | 287.6 | 127.4 |
| ts-morph | TypeScript AST (not ESTree) | 3.280 | 3.220–3.425 | 326.3 | 139.2 |
| tsquery | TypeScript 6 AST (not ESTree) | 7.059 | 6.922–7.230 | 312.6 | 114.1 |

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
