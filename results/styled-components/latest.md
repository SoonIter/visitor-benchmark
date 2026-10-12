# styled-components results

2026-10-12T07:01:12.760Z · Apple M5 Max · darwin/arm64 · Node v24.20.0

3 isolated processes × 8 warmups + 20 measured iterations per track. Each iteration processes four files. Bars/tables show the median of process medians; ranges are min–max, not confidence intervals.

Preparation, parsing, cloning, external printing, validation and disposal are excluded. Traversal setup, scope analysis where enabled, queries and edits are included. Internal ts-morph text updates remain timed. Memory covers the entire worker, including untimed preparation and validation; it is not traversal-only allocation. There is no server process.

## dense

400 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| direct-ast | ESTree | 0.288 | 0.247–0.368 | 252.4 | 109.1 |
| oxc-walker | ESTree | 0.710 | 0.700–0.827 | 220.1 | 86.5 |
| oxc-visitor | ESTree | 0.842 | 0.800–1.202 | 243.9 | 86.9 |
| estree-walker | ESTree | 0.843 | 0.807–0.908 | 241.3 | 82.1 |
| acorn-recursive | ESTree | 0.907 | 0.892–1.019 | 240.3 | 80.9 |
| esrecurse | ESTree | 1.088 | 1.085–1.173 | 239.5 | 79.7 |
| acorn-full | ESTree | 1.150 | 1.099–1.255 | 240.0 | 80.9 |
| estraverse | ESTree | 1.200 | 1.110–1.306 | 241.0 | 95.9 |
| zimmerframe | ESTree | 1.214 | 1.209–1.259 | 242.2 | 90.8 |
| acorn-simple | ESTree | 1.251 | 1.164–1.305 | 243.4 | 80.9 |
| yuku-ast | ESTree | 1.369 | 1.166–1.394 | 250.0 | 100.0 |
| typescript-eslint | ESTree | 1.446 | 1.423–1.449 | 277.4 | 86.4 |
| swc-next | ESTree | 1.525 | 1.198–1.696 | 242.0 | 79.9 |
| esquery | ESTree | 1.696 | 1.651–1.865 | 241.1 | 107.7 |
| estree-toolkit | ESTree | 2.795 | 2.689–3.071 | 219.5 | 78.1 |
| estree-toolkit-scope | ESTree | 5.281 | 5.082–5.376 | 216.4 | 74.8 |
| estree-util-visit | ESTree | 5.420 | 5.004–5.667 | 243.2 | 92.1 |
| ast-types | ESTree | 6.538 | 6.474–6.652 | 236.8 | 96.8 |
| jscodeshift | ESTree | 6.690 | 6.628–6.783 | 385.0 | 213.9 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| babel-fast | Babel AST (not ESTree) | 0.533 | 0.532–0.572 | 243.1 | 99.2 |
| babel-types | Babel AST (not ESTree) | 0.573 | 0.550–0.582 | 237.8 | 100.7 |
| swc-visitor | SWC AST (not ESTree) | 0.613 | 0.596–0.697 | 234.4 | 84.6 |
| typescript | TypeScript 6 AST (not ESTree) | 1.055 | 1.043–1.107 | 363.6 | 165.4 |
| babel-no-scope | Babel AST (not ESTree) | 2.145 | 2.070–2.181 | 344.5 | 190.8 |
| tsquery | TypeScript 6 AST (not ESTree) | 3.560 | 3.477–3.603 | 392.2 | 189.5 |
| babel | Babel AST (not ESTree) | 4.645 | 4.631–4.761 | 351.9 | 176.3 |
| ts-morph | TypeScript AST (not ESTree) | 7.828 | 7.671–7.838 | 426.0 | 240.6 |

## sparse

80 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| direct-ast | ESTree | 0.080 | 0.079–0.096 | 277.2 | 108.5 |
| oxc-walker | ESTree | 1.108 | 1.091–1.145 | 242.8 | 83.7 |
| oxc-visitor | ESTree | 1.244 | 1.233–1.385 | 279.8 | 122.5 |
| acorn-recursive | ESTree | 1.322 | 1.279–1.466 | 241.5 | 83.4 |
| estree-walker | ESTree | 1.387 | 1.350–1.416 | 278.5 | 104.9 |
| esrecurse | ESTree | 1.767 | 1.636–1.787 | 248.3 | 86.3 |
| acorn-full | ESTree | 1.769 | 1.731–1.849 | 241.7 | 86.4 |
| acorn-simple | ESTree | 1.831 | 1.828–2.023 | 244.2 | 83.6 |
| swc-next | ESTree | 1.871 | 1.817–1.884 | 272.3 | 105.0 |
| estraverse | ESTree | 1.923 | 1.906–2.157 | 253.7 | 100.0 |
| yuku-ast | ESTree | 2.017 | 1.962–2.041 | 278.6 | 110.4 |
| zimmerframe | ESTree | 2.129 | 2.058–2.171 | 275.6 | 106.0 |
| typescript-eslint | ESTree | 2.549 | 2.517–2.719 | 325.6 | 139.7 |
| esquery | ESTree | 3.057 | 2.907–3.192 | 288.1 | 130.9 |
| estree-toolkit | ESTree | 4.212 | 4.118–4.380 | 304.3 | 139.1 |
| estree-util-visit | ESTree | 9.949 | 9.700–10.441 | 305.3 | 143.8 |
| estree-toolkit-scope | ESTree | 10.148 | 10.013–10.374 | 305.1 | 143.0 |
| ast-types | ESTree | 14.186 | 13.949–14.981 | 299.6 | 119.0 |
| jscodeshift | ESTree | 15.222 | 15.136–15.258 | 474.1 | 291.8 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| swc-visitor | SWC AST (not ESTree) | 0.773 | 0.709–0.804 | 298.1 | 117.2 |
| babel-fast | Babel AST (not ESTree) | 0.972 | 0.889–1.039 | 284.9 | 116.6 |
| babel-types | Babel AST (not ESTree) | 1.097 | 1.019–1.109 | 305.7 | 132.6 |
| typescript | TypeScript 6 AST (not ESTree) | 1.227 | 1.134–1.259 | 401.6 | 183.7 |
| babel-no-scope | Babel AST (not ESTree) | 4.406 | 4.133–4.828 | 413.4 | 203.1 |
| ts-morph | TypeScript AST (not ESTree) | 8.484 | 8.383–8.670 | 516.1 | 295.0 |
| tsquery | TypeScript 6 AST (not ESTree) | 8.769 | 8.168–9.573 | 451.6 | 226.1 |
| babel | Babel AST (not ESTree) | 10.831 | 10.288–11.963 | 415.0 | 210.9 |

## Implementations

| API | Strategy |
| :-- | :-- |
| direct-ast | direct top-level AST edits; no visitor API or child-key table |
| swc-next | latest committed PR branch snapshot |
| yuku-ast | typed leave hook |
| estree-walker | generic leave hook |
| oxc-walker | generic leave hook |
| oxc-visitor | oxc-parser Visitor on shared Acorn AST |
| acorn-simple | acorn-walk.simple |
| acorn-recursive | acorn-walk.recursive |
| acorn-full | acorn-walk.full |
| estraverse | estraverse.traverse; parent field edit |
| esrecurse | Visitor.visitChildren |
| estree-toolkit | scope disabled |
| estree-toolkit-scope | scope enabled; extra analysis |
| ast-types | also the traversal engine exported by recast |
| zimmerframe | context.next then parent field edit |
| jscodeshift | collection find + forEach |
| esquery | selector query + manual edit |
| estree-util-visit | generic leave hook, structural duck typing |
| typescript-eslint | simpleTraverse; deferred edits because enter-only |
| babel-types | @babel/types.traverse, no NodePath |
| babel-fast | @babel/types.traverseFast; deferred edits |
| babel | default scope analysis |
| babel-no-scope | noScope:true |
| swc-visitor | legacy @swc/core/Visitor.js |
| typescript | transform + visitEachChild + factory |
| tsquery | query + transform replacement map |
| ts-morph | SourceFile.transform + native factory |

Every measured output is printed, reparsed and compared to independently authored expected code. The adjacent JSON records all samples, execution order, dependency versions, SWC Next SHA and source hashes.
