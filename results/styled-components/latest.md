# styled-components results

2026-10-14T10:04:01.736Z · Apple M5 Max · darwin/arm64 · Node v24.20.0

3 isolated processes × 8 warmups + 20 measured iterations per track. Each iteration processes four files. Bars/tables show the median of process medians; ranges are min–max, not confidence intervals.

Fresh parser output is used for every iteration, without AST cloning. Earlier results through [8143bc9](https://github.com/SoonIter/visitor-benchmark/tree/8143bc994901c2321b31ad271c83bbcb6e5cf4ca) used cloned ASTs in editing and original-source i18n; do not interpret changes from those results as implementation speedups.

Preparation, parsing, external printing, validation and disposal are excluded. Traversal setup, scope analysis where enabled, queries and edits are included. Internal ts-morph text updates and tsquery.map printing/reparsing remain timed. Memory covers the entire worker, including untimed preparation and validation; it is not traversal-only allocation. There is no server process.

## dense

400 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| direct-ast | ESTree | 0.240 | 0.228–0.244 | 308.6 | 134.8 |
| oxc-visitor | ESTree | 0.427 | 0.415–0.427 | 216.5 | 82.3 |
| acorn-recursive | ESTree | 0.445 | 0.444–0.493 | 308.5 | 134.3 |
| swc-next | ESTree | 0.621 | 0.607–0.630 | 214.8 | 82.9 |
| esrecurse | ESTree | 0.622 | 0.595–0.625 | 217.1 | 82.9 |
| yuku-ast | ESTree | 0.692 | 0.671–0.710 | 216.8 | 82.8 |
| acorn-full | ESTree | 0.713 | 0.692–0.743 | 308.7 | 134.3 |
| estraverse | ESTree | 0.735 | 0.713–0.744 | 217.0 | 83.1 |
| oxc-walker | ESTree | 0.741 | 0.705–0.750 | 283.2 | 125.8 |
| typescript-eslint | ESTree | 0.767 | 0.765–0.779 | 366.2 | 178.7 |
| acorn-simple | ESTree | 0.794 | 0.772–0.799 | 308.9 | 141.8 |
| estree-walker | ESTree | 0.863 | 0.825–0.874 | 308.5 | 134.6 |
| esquery | ESTree | 1.280 | 1.198–1.290 | 217.8 | 83.3 |
| zimmerframe | ESTree | 1.683 | 1.640–1.722 | 216.4 | 60.5 |
| estree-toolkit | ESTree | 3.100 | 3.099–3.118 | 218.9 | 78.2 |
| estree-util-visit | ESTree | 4.985 | 4.902–5.194 | 236.5 | 89.4 |
| estree-toolkit-scope | ESTree | 5.553 | 5.374–5.605 | 313.0 | 160.1 |
| jscodeshift | ESTree | 6.124 | 5.845–6.290 | 392.9 | 216.7 |
| ast-types | ESTree | 6.924 | 6.764–7.134 | 305.5 | 151.1 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.520 | 0.516–0.541 | 244.2 | 86.0 |
| swc-visitor | SWC AST (not ESTree) | 0.562 | 0.547–0.587 | 234.1 | 83.4 |
| babel-types-traverse | Babel AST (not ESTree) | 0.564 | 0.555–0.566 | 243.2 | 101.0 |
| typescript | TypeScript 6 AST (not ESTree) | 0.954 | 0.943–0.991 | 360.3 | 152.7 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 2.300 | 2.291–2.356 | 343.0 | 198.0 |
| babel-traverse | Babel AST (not ESTree) | 4.801 | 4.604–4.817 | 354.6 | 178.8 |
| ts-morph | TypeScript AST (not ESTree) | 7.436 | 7.251–7.499 | 425.9 | 241.1 |
| tsquery | TypeScript 6 AST (not ESTree) | 10.877 | 10.531–10.878 | 372.6 | 174.1 |

## sparse

80 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| direct-ast | ESTree | 0.067 | 0.067–0.068 | 272.5 | 115.0 |
| acorn-recursive | ESTree | 0.517 | 0.500–0.553 | 271.1 | 115.4 |
| swc-next | ESTree | 0.525 | 0.519–0.541 | 271.8 | 112.1 |
| oxc-visitor | ESTree | 0.583 | 0.570–0.607 | 272.0 | 112.1 |
| esrecurse | ESTree | 0.863 | 0.854–0.867 | 269.4 | 115.5 |
| oxc-walker | ESTree | 0.973 | 0.971–0.981 | 271.4 | 116.1 |
| yuku-ast | ESTree | 1.014 | 1.008–1.024 | 270.2 | 108.2 |
| estraverse | ESTree | 1.046 | 1.034–1.072 | 271.6 | 104.8 |
| acorn-full | ESTree | 1.048 | 1.040–1.057 | 271.5 | 111.6 |
| acorn-simple | ESTree | 1.213 | 1.187–1.213 | 270.7 | 115.2 |
| estree-walker | ESTree | 1.215 | 1.197–1.252 | 237.1 | 85.2 |
| typescript-eslint | ESTree | 1.306 | 1.292–1.354 | 435.2 | 225.7 |
| zimmerframe | ESTree | 1.393 | 1.371–1.409 | 271.7 | 109.1 |
| esquery | ESTree | 2.027 | 2.012–2.084 | 271.9 | 105.0 |
| estree-toolkit | ESTree | 3.376 | 3.375–4.406 | 360.6 | 181.3 |
| estree-toolkit-scope | ESTree | 8.229 | 8.049–8.888 | 324.8 | 161.3 |
| estree-util-visit | ESTree | 9.502 | 9.448–9.562 | 271.8 | 101.7 |
| ast-types | ESTree | 13.039 | 12.690–13.487 | 333.3 | 172.0 |
| jscodeshift | ESTree | 13.324 | 12.895–13.505 | 471.5 | 266.3 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| swc-visitor | SWC AST (not ESTree) | 0.660 | 0.660–0.702 | 291.8 | 117.7 |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.907 | 0.902–0.911 | 293.4 | 139.0 |
| babel-types-traverse | Babel AST (not ESTree) | 0.983 | 0.976–1.001 | 318.5 | 147.2 |
| typescript | TypeScript 6 AST (not ESTree) | 1.078 | 1.046–1.112 | 399.4 | 183.6 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 4.080 | 4.053–4.364 | 404.2 | 232.2 |
| ts-morph | TypeScript AST (not ESTree) | 8.203 | 8.072–8.353 | 515.5 | 294.9 |
| babel-traverse | Babel AST (not ESTree) | 10.086 | 9.960–11.168 | 413.8 | 211.2 |
| tsquery | TypeScript 6 AST (not ESTree) | 23.356 | 23.105–23.737 | 463.6 | 243.5 |

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
