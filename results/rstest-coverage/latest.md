# rstest-coverage results

2026-10-12T09:58:22.402Z · Apple M5 Max · darwin/arm64 · Node v24.20.0

3 isolated processes × 8 warmups + 20 measured iterations per track. Each iteration processes four files. Bars/tables show the median of process medians; ranges are min–max, not confidence intervals.

Preparation, parsing, cloning, external printing, validation and disposal are excluded. Traversal setup, scope analysis where enabled, queries and edits are included. Internal ts-morph text updates and tsquery.map printing/reparsing remain timed. Memory covers the entire worker, including untimed preparation and validation; it is not traversal-only allocation. There is no server process.

This is the focused Rstest IfStatement normalization phase on eight public modules (four per track), not full coverage conversion. The timer includes branch metadata, ignore handling for this phase, AST edits and API bookkeeping. No runtime execution, V8 collection, source-map remapping or coverage report generation. The 31 total edits are present naturally in the captured modules; source was not duplicated or augmented. [Contract and provenance](../../docs/rstest-coverage/README.md).

## runtime

10 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| oxc-walker | ESTree | 0.318 | 0.316–0.325 | 149.7 | 46.4 |
| oxc-visitor | ESTree | 0.373 | 0.363–0.381 | 152.7 | 47.4 |
| acorn-recursive | ESTree | 0.385 | 0.367–0.390 | 147.8 | 46.0 |
| estree-walker | ESTree | 0.385 | 0.380–0.398 | 147.8 | 46.0 |
| esrecurse | ESTree | 0.481 | 0.481–0.534 | 148.1 | 45.9 |
| acorn-full | ESTree | 0.489 | 0.484–0.501 | 150.4 | 46.0 |
| estraverse | ESTree | 0.489 | 0.474–0.531 | 112.8 | 14.7 |
| acorn-simple | ESTree | 0.511 | 0.509–0.547 | 149.1 | 46.1 |
| typescript-eslint | ESTree | 0.539 | 0.522–0.618 | 208.7 | 67.3 |
| yuku-ast | ESTree | 0.563 | 0.523–0.615 | 152.2 | 46.2 |
| swc-next | ESTree | 0.575 | 0.572–0.593 | 149.3 | 46.1 |
| direct-ast | ESTree | 0.622 | 0.596–0.626 | 148.2 | 46.6 |
| zimmerframe | ESTree | 0.644 | 0.631–0.655 | 143.6 | 43.0 |
| esquery | ESTree | 0.842 | 0.838–0.851 | 119.4 | 33.0 |
| estree-toolkit | ESTree | 1.056 | 1.039–1.060 | 152.9 | 49.4 |
| estree-util-visit | ESTree | 2.613 | 2.567–3.287 | 149.7 | 45.2 |
| estree-toolkit-scope | ESTree | 3.136 | 2.973–3.150 | 154.2 | 53.5 |
| ast-types | ESTree | 3.493 | 3.481–3.533 | 154.7 | 49.7 |
| jscodeshift | ESTree | 4.009 | 3.933–4.012 | 314.4 | 174.7 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.275 | 0.274–0.327 | 158.8 | 51.8 |
| babel-types-traverse | Babel AST (not ESTree) | 0.294 | 0.292–0.302 | 156.2 | 51.8 |
| swc-visitor | SWC AST (not ESTree) | 0.357 | 0.348–0.514 | 182.2 | 69.2 |
| typescript | TypeScript 6 AST (not ESTree) | 0.422 | 0.420–0.619 | 282.2 | 105.5 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 1.192 | 1.190–1.329 | 294.4 | 144.4 |
| babel-traverse | Babel AST (not ESTree) | 3.036 | 2.985–3.237 | 299.0 | 136.6 |
| ts-morph | TypeScript AST (not ESTree) | 3.186 | 3.161–3.443 | 339.1 | 145.6 |
| tsquery | TypeScript 6 AST (not ESTree) | 7.459 | 7.416–9.000 | 333.5 | 132.4 |

## tooling

21 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| oxc-walker | ESTree | 0.303 | 0.272–0.313 | 107.7 | 26.3 |
| acorn-recursive | ESTree | 0.326 | 0.318–0.330 | 106.2 | 26.2 |
| oxc-visitor | ESTree | 0.328 | 0.322–0.361 | 110.4 | 27.9 |
| estree-walker | ESTree | 0.335 | 0.324–0.359 | 107.5 | 26.4 |
| estraverse | ESTree | 0.403 | 0.401–0.406 | 107.4 | 26.4 |
| acorn-full | ESTree | 0.415 | 0.401–0.450 | 106.3 | 25.3 |
| esrecurse | ESTree | 0.418 | 0.408–0.418 | 106.7 | 26.5 |
| typescript-eslint | ESTree | 0.440 | 0.430–0.504 | 203.7 | 65.5 |
| acorn-simple | ESTree | 0.452 | 0.433–0.503 | 107.0 | 25.3 |
| yuku-ast | ESTree | 0.472 | 0.469–0.583 | 108.0 | 25.4 |
| direct-ast | ESTree | 0.517 | 0.500–0.525 | 107.3 | 26.1 |
| swc-next | ESTree | 0.584 | 0.477–0.703 | 108.0 | 26.5 |
| zimmerframe | ESTree | 0.600 | 0.582–0.623 | 110.8 | 28.2 |
| esquery | ESTree | 0.822 | 0.756–0.823 | 109.6 | 26.4 |
| estree-toolkit | ESTree | 0.966 | 0.948–1.286 | 141.0 | 39.8 |
| estree-util-visit | ESTree | 2.483 | 2.431–2.808 | 139.2 | 39.9 |
| jscodeshift | ESTree | 2.781 | 2.728–3.483 | 293.6 | 132.3 |
| ast-types | ESTree | 2.992 | 2.801–3.212 | 143.6 | 43.2 |
| estree-toolkit-scope | ESTree | 3.019 | 2.853–3.175 | 142.8 | 42.8 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.222 | 0.220–0.229 | 116.4 | 31.9 |
| babel-types-traverse | Babel AST (not ESTree) | 0.241 | 0.239–0.242 | 117.2 | 31.1 |
| swc-visitor | SWC AST (not ESTree) | 0.315 | 0.313–0.374 | 164.0 | 44.5 |
| typescript | TypeScript 6 AST (not ESTree) | 0.385 | 0.381–0.791 | 230.0 | 77.3 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 1.058 | 1.053–1.079 | 269.6 | 125.1 |
| babel-traverse | Babel AST (not ESTree) | 2.811 | 2.666–2.822 | 287.2 | 126.5 |
| ts-morph | TypeScript AST (not ESTree) | 3.130 | 3.102–3.307 | 326.3 | 138.8 |
| tsquery | TypeScript 6 AST (not ESTree) | 6.911 | 6.882–6.969 | 312.7 | 114.1 |

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
