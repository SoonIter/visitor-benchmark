# styled-components results

2026-10-15T09:12:11.869Z · Apple M5 Max · darwin/arm64 · Node v24.20.0

3 isolated processes × 8 warmups + 20 measured iterations per track. Each iteration processes four files. Bars/tables show the median of process medians; ranges are min–max, not confidence intervals.

Fresh parser output is used for every iteration, without AST cloning. Earlier results through [8143bc9](https://github.com/SoonIter/visitor-benchmark/tree/8143bc994901c2321b31ad271c83bbcb6e5cf4ca) used cloned ASTs in editing and original-source i18n; do not interpret changes from those results as implementation speedups.

Preparation, parsing, external printing, validation and disposal are excluded. Traversal setup, scope analysis where enabled, queries and edits are included. Internal ts-morph text updates and tsquery.map printing/reparsing remain timed. Memory covers the entire worker, including untimed preparation and validation; it is not traversal-only allocation. There is no server process.

## dense

400 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| direct-ast | ESTree | 0.266 | 0.264–0.268 | 308.6 | 120.6 |
| oxc-visitor | ESTree | 0.474 | 0.460–0.476 | 218.0 | 82.5 |
| acorn-recursive | ESTree | 0.502 | 0.487–0.509 | 308.7 | 134.4 |
| esrecurse | ESTree | 0.671 | 0.667–0.701 | 218.0 | 83.0 |
| swc-next | ESTree | 0.690 | 0.654–0.710 | 215.9 | 83.2 |
| acorn-full | ESTree | 0.752 | 0.751–0.779 | 310.9 | 140.2 |
| yuku-ast | ESTree | 0.781 | 0.777–0.784 | 217.7 | 83.4 |
| estraverse | ESTree | 0.801 | 0.792–0.803 | 310.6 | 162.3 |
| oxc-walker | ESTree | 0.806 | 0.774–0.816 | 287.6 | 125.9 |
| typescript-eslint | ESTree | 0.827 | 0.815–0.864 | 417.6 | 197.9 |
| acorn-simple | ESTree | 0.842 | 0.833–0.853 | 307.0 | 121.0 |
| estree-walker | ESTree | 0.917 | 0.910–0.932 | 309.6 | 140.2 |
| esquery | ESTree | 1.336 | 1.302–1.348 | 218.3 | 83.5 |
| zimmerframe | ESTree | 1.854 | 1.835–1.886 | 216.8 | 44.6 |
| estree-toolkit | ESTree | 3.396 | 3.338–3.547 | 219.7 | 78.4 |
| estree-util-visit | ESTree | 5.200 | 5.133–5.289 | 237.2 | 89.5 |
| estree-toolkit-scope | ESTree | 6.008 | 5.751–6.075 | 317.7 | 174.9 |
| jscodeshift | ESTree | 6.617 | 6.562–6.625 | 390.0 | 209.6 |
| ast-types | ESTree | 6.807 | 6.715–8.547 | 327.1 | 156.4 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.600 | 0.553–0.613 | 254.9 | 98.8 |
| babel-types-traverse | Babel AST (not ESTree) | 0.621 | 0.602–0.634 | 238.6 | 100.7 |
| swc-visitor | SWC AST (not ESTree) | 0.656 | 0.628–0.729 | 253.1 | 100.3 |
| typescript | TypeScript 6 AST (not ESTree) | 1.085 | 1.049–1.210 | 362.4 | 165.4 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 2.501 | 2.437–2.711 | 343.4 | 198.2 |
| babel-traverse | Babel AST (not ESTree) | 5.344 | 5.090–5.381 | 355.0 | 178.9 |
| ts-morph | TypeScript AST (not ESTree) | 7.974 | 7.939–8.178 | 425.0 | 240.6 |
| tsquery | TypeScript 6 AST (not ESTree) | 11.906 | 11.825–11.936 | 373.4 | 174.3 |

## sparse

80 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| direct-ast | ESTree | 0.084 | 0.080–0.089 | 240.6 | 86.1 |
| swc-next | ESTree | 0.543 | 0.507–0.580 | 239.2 | 86.8 |
| acorn-recursive | ESTree | 0.619 | 0.617–0.702 | 239.2 | 86.1 |
| oxc-visitor | ESTree | 0.728 | 0.672–0.819 | 241.6 | 86.6 |
| esrecurse | ESTree | 0.972 | 0.901–1.211 | 238.4 | 84.3 |
| oxc-walker | ESTree | 1.061 | 1.034–1.070 | 238.9 | 83.1 |
| yuku-ast | ESTree | 1.108 | 1.101–1.109 | 241.0 | 85.6 |
| estraverse | ESTree | 1.187 | 1.129–1.366 | 239.1 | 83.3 |
| acorn-full | ESTree | 1.214 | 1.193–1.227 | 242.2 | 86.2 |
| estree-walker | ESTree | 1.303 | 1.275–1.322 | 239.3 | 84.2 |
| acorn-simple | ESTree | 1.307 | 1.290–1.373 | 238.8 | 86.2 |
| typescript-eslint | ESTree | 1.375 | 1.342–1.435 | 379.9 | 190.5 |
| zimmerframe | ESTree | 1.500 | 1.492–1.575 | 237.7 | 83.5 |
| esquery | ESTree | 2.232 | 2.110–2.385 | 238.0 | 82.7 |
| estree-toolkit | ESTree | 3.660 | 3.640–4.299 | 359.1 | 172.6 |
| estree-toolkit-scope | ESTree | 9.200 | 8.797–9.441 | 339.6 | 159.5 |
| estree-util-visit | ESTree | 9.930 | 9.501–9.989 | 240.5 | 88.0 |
| ast-types | ESTree | 14.136 | 14.130–14.380 | 330.2 | 150.7 |
| jscodeshift | ESTree | 15.083 | 15.052–15.164 | 466.0 | 261.4 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| swc-visitor | SWC AST (not ESTree) | 0.787 | 0.771–0.800 | 301.4 | 124.3 |
| babel-types-traverse-fast | Babel AST (not ESTree) | 1.069 | 1.037–1.089 | 284.6 | 116.6 |
| babel-types-traverse | Babel AST (not ESTree) | 1.145 | 1.126–1.158 | 308.2 | 131.5 |
| typescript | TypeScript 6 AST (not ESTree) | 1.236 | 1.226–1.299 | 401.1 | 183.7 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 4.491 | 4.480–4.705 | 413.2 | 203.7 |
| ts-morph | TypeScript AST (not ESTree) | 8.945 | 8.704–9.440 | 520.9 | 294.9 |
| babel-traverse | Babel AST (not ESTree) | 11.867 | 11.715–11.956 | 415.2 | 211.2 |
| tsquery | TypeScript 6 AST (not ESTree) | 23.845 | 23.568–26.534 | 440.0 | 199.5 |

## Implementations

| API | Strategy |
| :-- | :-- |
| direct-ast | direct top-level AST edits; no visitor API or child-key table |
| swc-next | typed leave + context.replace; pinned PR snapshot |
| yuku-ast | typed leave + context.replace |
| estree-walker | generic leave + this.replace |
| oxc-walker | generic leave + this.replace |
| oxc-visitor | oxc-parser Visitor on shared Acorn AST |
| acorn-simple | acorn-walk.simple |
| acorn-recursive | acorn-walk.recursive |
| acorn-full | acorn-walk.full |
| estraverse | estraverse.replace; return replacement |
| esrecurse | Visitor.visitChildren |
| estree-toolkit | child path.replaceWith; scope disabled |
| estree-toolkit-scope | child path.replaceWith; scope enabled |
| ast-types | visit + child path.replace; also used by recast |
| zimmerframe | context.next + returned immutable replacement/root |
| jscodeshift | collection find + exposed child path.replace |
| esquery | selector query + manual edit |
| estree-util-visit | generic leave hook, structural duck typing |
| typescript-eslint | simpleTraverse; deferred edits because enter-only |
| babel-types-traverse | @babel/types.traverse, no NodePath |
| babel-types-traverse-fast | @babel/types.traverseFast; deferred edits |
| babel-traverse | child path.replaceWith; default scope analysis |
| babel-traverse-no-scope | child path.replaceWith; noScope:true |
| swc-visitor | legacy @swc/core/Visitor.js |
| typescript | transform + visitEachChild + factory |
| tsquery | tsquery.map; internal print/reparse included |
| ts-morph | SourceFile.transform + native factory |

Every measured output is validated against its scenario oracle. For rstest-coverage this includes both normalized AST structure and exact ordered branch metadata; other editing tasks compare against independently authored expected code. The adjacent JSON records all samples, execution order, dependency versions, SWC Next SHA and source hashes.
