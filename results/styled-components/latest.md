# styled-components results

2026-10-12T09:01:27.790Z · Apple M5 Max · darwin/arm64 · Node v24.20.0

3 isolated processes × 8 warmups + 20 measured iterations per track. Each iteration processes four files. Bars/tables show the median of process medians; ranges are min–max, not confidence intervals.

Preparation, parsing, cloning, external printing, validation and disposal are excluded. Traversal setup, scope analysis where enabled, queries and edits are included. Internal ts-morph text updates and tsquery.map printing/reparsing remain timed. Memory covers the entire worker, including untimed preparation and validation; it is not traversal-only allocation. There is no server process.

## dense

400 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| direct-ast | ESTree | 0.270 | 0.264–0.340 | 217.6 | 55.7 |
| oxc-walker | ESTree | 0.749 | 0.740–0.779 | 219.5 | 55.9 |
| estree-walker | ESTree | 0.835 | 0.813–0.850 | 240.3 | 81.2 |
| oxc-visitor | ESTree | 0.916 | 0.859–0.943 | 245.3 | 89.5 |
| acorn-recursive | ESTree | 0.988 | 0.972–1.043 | 247.5 | 83.6 |
| estraverse | ESTree | 1.091 | 1.088–1.143 | 218.5 | 59.8 |
| acorn-full | ESTree | 1.100 | 1.086–1.274 | 242.2 | 79.7 |
| esrecurse | ESTree | 1.109 | 1.098–1.126 | 240.7 | 79.7 |
| yuku-ast | ESTree | 1.239 | 1.222–1.241 | 242.0 | 81.6 |
| swc-next | ESTree | 1.293 | 1.285–1.613 | 244.1 | 82.3 |
| acorn-simple | ESTree | 1.408 | 1.187–1.416 | 250.3 | 79.7 |
| typescript-eslint | ESTree | 1.480 | 1.473–1.635 | 279.8 | 86.4 |
| esquery | ESTree | 1.691 | 1.667–2.155 | 242.5 | 89.9 |
| zimmerframe | ESTree | 2.155 | 2.138–2.314 | 240.6 | 101.9 |
| estree-toolkit | ESTree | 3.202 | 3.000–3.246 | 243.8 | 99.9 |
| estree-util-visit | ESTree | 5.200 | 4.875–5.335 | 242.7 | 91.9 |
| estree-toolkit-scope | ESTree | 6.012 | 5.963–6.592 | 242.3 | 99.2 |
| ast-types | ESTree | 6.680 | 6.507–6.857 | 236.1 | 97.0 |
| jscodeshift | ESTree | 7.112 | 6.503–7.593 | 376.3 | 199.9 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.552 | 0.533–0.552 | 241.3 | 98.7 |
| babel-types-traverse | Babel AST (not ESTree) | 0.578 | 0.575–0.591 | 237.8 | 100.7 |
| swc-visitor | SWC AST (not ESTree) | 0.662 | 0.593–0.716 | 236.1 | 83.5 |
| typescript | TypeScript 6 AST (not ESTree) | 1.019 | 1.003–1.078 | 363.5 | 165.4 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 2.456 | 2.337–2.581 | 343.3 | 198.2 |
| babel-traverse | Babel AST (not ESTree) | 5.010 | 4.936–5.388 | 355.2 | 178.9 |
| ts-morph | TypeScript AST (not ESTree) | 7.581 | 7.520–8.023 | 425.3 | 240.6 |
| tsquery | TypeScript 6 AST (not ESTree) | 11.371 | 11.295–11.742 | 374.0 | 174.1 |

## sparse

80 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| direct-ast | ESTree | 0.096 | 0.083–0.102 | 277.0 | 105.0 |
| oxc-walker | ESTree | 1.131 | 1.103–1.244 | 276.8 | 113.3 |
| oxc-visitor | ESTree | 1.236 | 1.208–1.316 | 279.7 | 106.0 |
| estree-walker | ESTree | 1.301 | 1.293–1.332 | 270.7 | 108.5 |
| acorn-recursive | ESTree | 1.351 | 1.223–1.378 | 245.7 | 83.6 |
| esrecurse | ESTree | 1.738 | 1.681–1.798 | 245.7 | 86.3 |
| swc-next | ESTree | 1.839 | 1.831–2.038 | 243.9 | 86.5 |
| acorn-full | ESTree | 1.866 | 1.768–1.913 | 244.9 | 83.6 |
| estraverse | ESTree | 1.896 | 1.809–1.920 | 278.9 | 117.8 |
| acorn-simple | ESTree | 1.912 | 1.877–1.928 | 274.5 | 105.0 |
| yuku-ast | ESTree | 1.945 | 1.900–1.978 | 279.1 | 110.5 |
| zimmerframe | ESTree | 2.400 | 2.361–2.455 | 275.0 | 117.7 |
| typescript-eslint | ESTree | 2.724 | 2.534–2.731 | 329.1 | 139.7 |
| esquery | ESTree | 3.074 | 3.007–3.114 | 291.7 | 125.1 |
| estree-toolkit | ESTree | 4.405 | 4.321–4.908 | 311.6 | 142.9 |
| estree-util-visit | ESTree | 10.069 | 9.974–10.114 | 303.7 | 143.7 |
| estree-toolkit-scope | ESTree | 11.127 | 10.498–11.256 | 305.8 | 132.3 |
| ast-types | ESTree | 14.393 | 14.314–14.525 | 310.2 | 124.1 |
| jscodeshift | ESTree | 15.065 | 15.062–15.594 | 479.5 | 288.2 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| swc-visitor | SWC AST (not ESTree) | 0.758 | 0.727–0.783 | 295.4 | 117.3 |
| babel-types-traverse-fast | Babel AST (not ESTree) | 1.000 | 0.968–1.024 | 286.9 | 127.4 |
| typescript | TypeScript 6 AST (not ESTree) | 1.183 | 1.153–1.266 | 400.9 | 183.7 |
| babel-types-traverse | Babel AST (not ESTree) | 1.266 | 1.007–1.366 | 302.1 | 138.1 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 4.372 | 4.166–4.780 | 416.4 | 230.4 |
| ts-morph | TypeScript AST (not ESTree) | 8.721 | 8.693–9.164 | 520.7 | 295.0 |
| babel-traverse | Babel AST (not ESTree) | 10.736 | 10.294–11.172 | 417.1 | 211.2 |
| tsquery | TypeScript 6 AST (not ESTree) | 23.456 | 23.442–24.686 | 440.6 | 199.5 |

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

Every measured output is printed, reparsed and compared to independently authored expected code. The adjacent JSON records all samples, execution order, dependency versions, SWC Next SHA and source hashes.
