# styled-components results

2026-10-12T14:58:23.229Z · Apple M5 Max · darwin/arm64 · Node v24.20.0

3 isolated processes × 8 warmups + 20 measured iterations per track. Each iteration processes four files. Bars/tables show the median of process medians; ranges are min–max, not confidence intervals.

Fresh parser output is used for every iteration, without AST cloning. Earlier results through [8143bc9](https://github.com/SoonIter/visitor-benchmark/tree/8143bc994901c2321b31ad271c83bbcb6e5cf4ca) used cloned ASTs in editing and original-source i18n; do not interpret changes from those results as implementation speedups.

Preparation, parsing, external printing, validation and disposal are excluded. Traversal setup, scope analysis where enabled, queries and edits are included. Internal ts-morph text updates and tsquery.map printing/reparsing remain timed. Memory covers the entire worker, including untimed preparation and validation; it is not traversal-only allocation. There is no server process.

## dense

400 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| direct-ast | ESTree | 0.248 | 0.246–0.258 | 309.9 | 139.2 |
| oxc-visitor | ESTree | 0.439 | 0.437–0.449 | 217.1 | 82.5 |
| acorn-recursive | ESTree | 0.493 | 0.490–0.509 | 309.7 | 140.1 |
| esrecurse | ESTree | 0.663 | 0.634–0.674 | 217.6 | 83.1 |
| swc-next | ESTree | 0.688 | 0.673–0.703 | 215.5 | 82.4 |
| estraverse | ESTree | 0.762 | 0.753–0.773 | 310.0 | 162.7 |
| acorn-full | ESTree | 0.763 | 0.761–0.770 | 310.2 | 133.9 |
| yuku-ast | ESTree | 0.770 | 0.730–0.816 | 244.6 | 89.7 |
| oxc-walker | ESTree | 0.780 | 0.733–0.845 | 319.3 | 156.0 |
| typescript-eslint | ESTree | 0.799 | 0.786–0.817 | 417.4 | 202.4 |
| acorn-simple | ESTree | 0.819 | 0.811–0.836 | 309.7 | 140.1 |
| estree-walker | ESTree | 0.864 | 0.862–0.872 | 215.4 | 82.2 |
| esquery | ESTree | 1.263 | 1.232–1.270 | 218.0 | 83.5 |
| zimmerframe | ESTree | 1.782 | 1.744–1.860 | 216.1 | 44.6 |
| estree-toolkit | ESTree | 3.340 | 3.218–3.352 | 219.8 | 78.4 |
| estree-util-visit | ESTree | 5.084 | 4.921–5.241 | 213.6 | 77.0 |
| estree-toolkit-scope | ESTree | 5.914 | 5.912–6.236 | 311.9 | 164.2 |
| ast-types | ESTree | 6.357 | 6.171–6.891 | 337.1 | 178.6 |
| jscodeshift | ESTree | 6.632 | 6.198–7.039 | 393.2 | 210.2 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.561 | 0.514–0.567 | 241.6 | 98.9 |
| babel-types-traverse | Babel AST (not ESTree) | 0.615 | 0.583–0.718 | 238.9 | 100.7 |
| swc-visitor | SWC AST (not ESTree) | 0.624 | 0.607–0.634 | 234.9 | 84.6 |
| typescript | TypeScript 6 AST (not ESTree) | 1.057 | 1.045–1.163 | 359.7 | 165.5 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 2.367 | 2.360–2.380 | 343.7 | 198.2 |
| babel-traverse | Babel AST (not ESTree) | 4.926 | 4.804–5.118 | 354.7 | 178.9 |
| ts-morph | TypeScript AST (not ESTree) | 7.555 | 7.447–7.786 | 425.0 | 240.6 |
| tsquery | TypeScript 6 AST (not ESTree) | 11.312 | 11.303–11.372 | 373.5 | 174.4 |

## sparse

80 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| direct-ast | ESTree | 0.089 | 0.079–0.104 | 239.7 | 86.1 |
| acorn-recursive | ESTree | 0.603 | 0.586–0.677 | 238.1 | 84.2 |
| oxc-visitor | ESTree | 0.681 | 0.611–0.709 | 240.3 | 86.8 |
| swc-next | ESTree | 0.771 | 0.696–0.883 | 239.4 | 86.4 |
| esrecurse | ESTree | 0.900 | 0.882–0.903 | 240.0 | 84.3 |
| oxc-walker | ESTree | 0.985 | 0.974–1.009 | 240.0 | 83.1 |
| yuku-ast | ESTree | 1.059 | 1.044–1.101 | 242.8 | 87.1 |
| estraverse | ESTree | 1.099 | 1.094–1.163 | 237.3 | 83.2 |
| acorn-full | ESTree | 1.117 | 1.104–1.278 | 240.7 | 86.2 |
| estree-walker | ESTree | 1.257 | 1.230–1.264 | 238.1 | 83.1 |
| acorn-simple | ESTree | 1.312 | 1.296–1.388 | 238.3 | 86.1 |
| typescript-eslint | ESTree | 1.330 | 1.308–1.410 | 379.0 | 190.6 |
| zimmerframe | ESTree | 1.480 | 1.432–1.811 | 239.0 | 83.6 |
| esquery | ESTree | 2.296 | 2.113–2.405 | 239.0 | 82.7 |
| estree-toolkit | ESTree | 3.482 | 3.469–3.507 | 349.9 | 173.7 |
| estree-toolkit-scope | ESTree | 8.786 | 8.775–8.865 | 337.2 | 159.6 |
| estree-util-visit | ESTree | 9.726 | 9.703–9.767 | 238.5 | 85.6 |
| ast-types | ESTree | 13.444 | 13.175–13.921 | 341.6 | 171.2 |
| jscodeshift | ESTree | 14.625 | 14.519–14.849 | 466.1 | 261.3 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| swc-visitor | SWC AST (not ESTree) | 0.751 | 0.715–0.769 | 290.7 | 117.8 |
| babel-types-traverse-fast | Babel AST (not ESTree) | 1.011 | 0.954–1.092 | 283.3 | 116.5 |
| babel-types-traverse | Babel AST (not ESTree) | 1.065 | 1.063–1.104 | 309.9 | 145.5 |
| typescript | TypeScript 6 AST (not ESTree) | 1.165 | 1.145–1.199 | 400.0 | 183.7 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 4.296 | 4.271–4.516 | 416.2 | 230.4 |
| ts-morph | TypeScript AST (not ESTree) | 8.656 | 8.465–8.995 | 516.6 | 295.0 |
| babel-traverse | Babel AST (not ESTree) | 10.766 | 10.511–12.305 | 415.7 | 211.1 |
| tsquery | TypeScript 6 AST (not ESTree) | 23.405 | 23.250–23.883 | 440.4 | 199.5 |

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
