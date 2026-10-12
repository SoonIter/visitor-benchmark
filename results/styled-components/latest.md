# styled-components results

2026-10-12T14:35:26.333Z · Apple M5 Max · darwin/arm64 · Node v24.20.0

3 isolated processes × 8 warmups + 20 measured iterations per track. Each iteration processes four files. Bars/tables show the median of process medians; ranges are min–max, not confidence intervals.

Preparation, parsing, cloning, external printing, validation and disposal are excluded. Traversal setup, scope analysis where enabled, queries and edits are included. Internal ts-morph text updates and tsquery.map printing/reparsing remain timed. Memory covers the entire worker, including untimed preparation and validation; it is not traversal-only allocation. There is no server process.

## dense

400 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| direct-ast | ESTree | 0.268 | 0.261–0.521 | 219.2 | 55.7 |
| oxc-walker | ESTree | 0.731 | 0.700–0.937 | 221.4 | 55.8 |
| estree-walker | ESTree | 0.820 | 0.817–0.984 | 243.1 | 81.2 |
| oxc-visitor | ESTree | 0.827 | 0.819–1.241 | 245.0 | 82.7 |
| acorn-recursive | ESTree | 0.949 | 0.882–1.240 | 241.3 | 79.7 |
| esrecurse | ESTree | 1.092 | 1.087–1.311 | 240.7 | 79.7 |
| estraverse | ESTree | 1.095 | 1.079–1.439 | 219.2 | 61.0 |
| acorn-full | ESTree | 1.128 | 1.085–1.433 | 241.4 | 79.7 |
| swc-next | ESTree | 1.195 | 1.130–1.753 | 221.3 | 55.2 |
| acorn-simple | ESTree | 1.197 | 1.159–1.648 | 242.5 | 79.7 |
| yuku-ast | ESTree | 1.240 | 1.201–1.674 | 241.2 | 82.4 |
| typescript-eslint | ESTree | 1.463 | 1.450–1.548 | 279.1 | 102.8 |
| esquery | ESTree | 1.767 | 1.693–2.077 | 242.1 | 107.5 |
| zimmerframe | ESTree | 2.150 | 2.133–2.442 | 243.3 | 101.9 |
| estree-toolkit | ESTree | 3.822 | 3.002–3.979 | 244.1 | 100.4 |
| estree-util-visit | ESTree | 5.364 | 5.359–5.506 | 216.2 | 77.3 |
| jscodeshift | ESTree | 6.594 | 6.495–8.166 | 376.2 | 199.9 |
| ast-types | ESTree | 6.763 | 6.751–7.887 | 236.8 | 91.9 |
| estree-toolkit-scope | ESTree | 7.330 | 5.879–7.669 | 244.6 | 99.2 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.554 | 0.532–0.673 | 242.0 | 98.8 |
| babel-types-traverse | Babel AST (not ESTree) | 0.582 | 0.559–0.622 | 242.6 | 100.7 |
| swc-visitor | SWC AST (not ESTree) | 0.591 | 0.580–0.653 | 234.5 | 83.5 |
| typescript | TypeScript 6 AST (not ESTree) | 1.029 | 0.999–1.029 | 361.6 | 165.4 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 2.382 | 2.322–2.403 | 343.6 | 198.2 |
| babel-traverse | Babel AST (not ESTree) | 5.174 | 4.794–5.293 | 355.7 | 178.9 |
| ts-morph | TypeScript AST (not ESTree) | 7.547 | 7.406–7.736 | 425.7 | 240.6 |
| tsquery | TypeScript 6 AST (not ESTree) | 11.424 | 11.155–11.463 | 373.3 | 174.2 |

## sparse

80 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| direct-ast | ESTree | 0.101 | 0.089–0.134 | 278.9 | 113.1 |
| oxc-walker | ESTree | 1.186 | 1.123–1.256 | 276.7 | 113.1 |
| estree-walker | ESTree | 1.420 | 1.306–1.468 | 275.7 | 108.5 |
| oxc-visitor | ESTree | 1.440 | 1.194–2.065 | 284.8 | 116.5 |
| acorn-recursive | ESTree | 1.466 | 1.292–1.484 | 243.2 | 83.5 |
| esrecurse | ESTree | 1.700 | 1.632–1.737 | 250.0 | 86.4 |
| swc-next | ESTree | 1.810 | 1.806–1.879 | 273.4 | 105.0 |
| estraverse | ESTree | 1.819 | 1.817–1.951 | 276.1 | 117.8 |
| acorn-simple | ESTree | 1.917 | 1.836–2.086 | 245.7 | 83.6 |
| acorn-full | ESTree | 1.925 | 1.722–2.259 | 247.0 | 83.6 |
| yuku-ast | ESTree | 2.063 | 1.957–2.108 | 278.6 | 110.5 |
| zimmerframe | ESTree | 2.447 | 2.331–2.566 | 279.3 | 108.7 |
| typescript-eslint | ESTree | 3.002 | 2.537–3.420 | 328.2 | 143.9 |
| esquery | ESTree | 3.280 | 3.026–3.473 | 310.8 | 148.2 |
| estree-toolkit | ESTree | 4.580 | 4.474–5.019 | 312.9 | 142.9 |
| estree-toolkit-scope | ESTree | 10.726 | 10.406–11.195 | 305.1 | 132.3 |
| estree-util-visit | ESTree | 11.408 | 10.156–12.023 | 307.8 | 143.8 |
| ast-types | ESTree | 14.394 | 14.227–14.912 | 309.5 | 124.1 |
| jscodeshift | ESTree | 15.485 | 15.049–15.628 | 482.0 | 288.3 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| swc-visitor | SWC AST (not ESTree) | 0.838 | 0.733–0.900 | 294.5 | 117.2 |
| babel-types-traverse-fast | Babel AST (not ESTree) | 1.191 | 0.973–1.215 | 291.7 | 127.4 |
| babel-types-traverse | Babel AST (not ESTree) | 1.272 | 1.046–1.385 | 306.0 | 129.0 |
| typescript | TypeScript 6 AST (not ESTree) | 1.349 | 1.256–1.540 | 401.7 | 183.8 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 5.238 | 5.146–5.951 | 415.9 | 232.8 |
| ts-morph | TypeScript AST (not ESTree) | 10.230 | 8.580–11.216 | 517.2 | 295.0 |
| babel-traverse | Babel AST (not ESTree) | 12.693 | 10.445–13.790 | 415.3 | 211.3 |
| tsquery | TypeScript 6 AST (not ESTree) | 25.667 | 23.231–28.772 | 440.4 | 199.4 |

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
