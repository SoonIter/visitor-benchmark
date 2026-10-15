# remove-debugger results

2026-10-15T09:14:49.055Z · Apple M5 Max · darwin/arm64 · Node v24.20.0

3 isolated processes × 8 warmups + 20 measured iterations per track. Each iteration processes four files. Bars/tables show the median of process medians; ranges are min–max, not confidence intervals.

Fresh parser output is used for every iteration, without AST cloning. Earlier results through [8143bc9](https://github.com/SoonIter/visitor-benchmark/tree/8143bc994901c2321b31ad271c83bbcb6e5cf4ca) used cloned ASTs in editing and original-source i18n; do not interpret changes from those results as implementation speedups.

Preparation, parsing, external printing, validation and disposal are excluded. Traversal setup, scope analysis where enabled, queries and edits are included. Internal ts-morph text updates and tsquery.map printing/reparsing remain timed. Memory covers the entire worker, including untimed preparation and validation; it is not traversal-only allocation. There is no server process.

## dense

1280 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| oxc-visitor | ESTree | 0.169 | 0.168–0.181 | 138.5 | 33.6 |
| acorn-recursive | ESTree | 0.213 | 0.211–0.214 | 136.2 | 38.2 |
| swc-next | ESTree | 0.221 | 0.201–0.227 | 138.8 | 40.5 |
| esrecurse | ESTree | 0.248 | 0.246–0.323 | 136.4 | 39.7 |
| oxc-walker | ESTree | 0.269 | 0.264–0.271 | 135.4 | 41.0 |
| yuku-ast | ESTree | 0.271 | 0.264–0.274 | 137.4 | 33.9 |
| estree-walker | ESTree | 0.319 | 0.308–0.337 | 135.0 | 40.7 |
| estraverse | ESTree | 0.328 | 0.324–0.379 | 131.8 | 33.3 |
| typescript-eslint | ESTree | 0.358 | 0.356–0.381 | 317.9 | 132.8 |
| acorn-simple | ESTree | 0.424 | 0.421–0.429 | 123.3 | 38.3 |
| acorn-full | ESTree | 0.433 | 0.427–0.442 | 136.7 | 42.1 |
| direct-ast | ESTree | 0.618 | 0.617–0.619 | 136.2 | 40.7 |
| estree-toolkit | ESTree | 1.244 | 1.242–1.342 | 138.7 | 41.6 |
| zimmerframe | ESTree | 1.557 | 1.552–1.600 | 136.9 | 42.2 |
| esquery | ESTree | 1.771 | 1.707–1.914 | 138.4 | 41.2 |
| estree-util-visit | ESTree | 2.127 | 2.065–2.164 | 139.1 | 41.0 |
| estree-toolkit-scope | ESTree | 2.928 | 2.908–3.336 | 139.8 | 43.7 |
| jscodeshift | ESTree | 3.429 | 3.414–3.529 | 298.8 | 162.9 |
| ast-types | ESTree | 3.498 | 3.491–3.653 | 141.7 | 43.1 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| swc-visitor | SWC AST (not ESTree) | 0.282 | 0.239–0.305 | 118.0 | 26.6 |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.283 | 0.277–0.292 | 152.8 | 45.2 |
| babel-types-traverse | Babel AST (not ESTree) | 0.318 | 0.307–0.331 | 147.8 | 42.5 |
| typescript | TypeScript 6 AST (not ESTree) | 0.500 | 0.495–0.607 | 303.9 | 105.2 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 1.548 | 1.281–1.759 | 285.4 | 130.1 |
| babel-traverse | Babel AST (not ESTree) | 3.401 | 3.140–4.156 | 307.4 | 146.5 |
| ts-morph | TypeScript AST (not ESTree) | 4.302 | 4.224–5.532 | 346.8 | 133.9 |
| tsquery | TypeScript 6 AST (not ESTree) | 6.576 | 6.460–7.790 | 327.4 | 139.3 |

## sparse

240 edits / four files.

### Shared Acorn ESTree

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| oxc-visitor | ESTree | 0.297 | 0.293–0.308 | 217.8 | 78.0 |
| swc-next | ESTree | 0.323 | 0.312–0.324 | 216.7 | 79.4 |
| acorn-recursive | ESTree | 0.391 | 0.375–0.397 | 294.3 | 102.2 |
| esrecurse | ESTree | 0.506 | 0.504–0.511 | 216.3 | 78.9 |
| yuku-ast | ESTree | 0.551 | 0.551–0.566 | 216.4 | 75.9 |
| oxc-walker | ESTree | 0.573 | 0.572–0.573 | 287.2 | 107.6 |
| estraverse | ESTree | 0.597 | 0.570–0.618 | 293.5 | 114.0 |
| estree-walker | ESTree | 0.675 | 0.665–0.677 | 215.7 | 79.3 |
| acorn-simple | ESTree | 0.765 | 0.757–0.775 | 215.9 | 78.9 |
| acorn-full | ESTree | 0.829 | 0.813–0.831 | 293.2 | 106.1 |
| typescript-eslint | ESTree | 0.850 | 0.828–0.936 | 424.6 | 234.0 |
| zimmerframe | ESTree | 1.036 | 1.023–1.051 | 289.8 | 104.4 |
| direct-ast | ESTree | 1.663 | 1.610–1.688 | 294.0 | 117.3 |
| estree-toolkit | ESTree | 1.899 | 1.785–1.904 | 223.8 | 83.3 |
| esquery | ESTree | 3.384 | 3.294–3.510 | 219.7 | 78.7 |
| estree-toolkit-scope | ESTree | 5.235 | 4.938–5.278 | 258.5 | 109.0 |
| estree-util-visit | ESTree | 5.488 | 5.357–5.595 | 221.7 | 82.9 |
| jscodeshift | ESTree | 7.818 | 7.639–8.171 | 414.2 | 250.4 |
| ast-types | ESTree | 8.113 | 7.815–8.203 | 278.2 | 123.2 |

### Native ASTs — not a same-AST ranking

| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |
| :-- | :-- | --: | :-- | --: | --: |
| swc-visitor | SWC AST (not ESTree) | 0.478 | 0.455–0.480 | 238.0 | 78.3 |
| typescript | TypeScript 6 AST (not ESTree) | 0.698 | 0.659–0.701 | 368.6 | 171.7 |
| babel-types-traverse-fast | Babel AST (not ESTree) | 0.771 | 0.749–0.838 | 266.4 | 101.4 |
| babel-types-traverse | Babel AST (not ESTree) | 0.812 | 0.808–0.898 | 248.5 | 92.1 |
| babel-traverse-no-scope | Babel AST (not ESTree) | 2.509 | 2.439–2.627 | 350.2 | 179.3 |
| babel-traverse | Babel AST (not ESTree) | 6.266 | 5.915–6.416 | 369.8 | 199.4 |
| ts-morph | TypeScript AST (not ESTree) | 9.307 | 9.155–9.929 | 427.2 | 221.9 |
| tsquery | TypeScript 6 AST (not ESTree) | 12.568 | 12.127–13.648 | 415.3 | 203.6 |

## Implementations

| API | Strategy |
| :-- | :-- |
| direct-ast | recursive direct AST edits; no visitor API or child-key table |
| swc-next | native remove for lists; replacement for single statement slots |
| yuku-ast | native remove for lists; replacement for single statement slots |
| estree-walker | native remove for lists; replacement for single statement slots |
| oxc-walker | native remove for lists; replacement for single statement slots |
| oxc-visitor | native traversal + manual statement-slot edits |
| acorn-simple | native traversal + manual statement-slot edits |
| acorn-recursive | native traversal + manual statement-slot edits |
| acorn-full | native traversal + manual statement-slot edits |
| estraverse | native remove for lists; replacement for single statement slots |
| esrecurse | native traversal + manual statement-slot edits |
| estree-toolkit | native remove for lists; replacement for single statement slots |
| estree-toolkit-scope | native remove for lists; replacement for single statement slots |
| ast-types | native remove for lists; replacement for single statement slots |
| zimmerframe | return immutable parent replacements; propagate child edits and returned root |
| jscodeshift | native remove for lists; replacement for single statement slots |
| esquery | query statement containers + manual slot edits |
| estree-util-visit | native traversal + manual statement-slot edits |
| typescript-eslint | native traversal + manual statement-slot edits |
| babel-types-traverse | native traversal + manual statement-slot edits |
| babel-types-traverse-fast | native traversal + manual statement-slot edits |
| babel-traverse | native remove for lists; replacement for single statement slots |
| babel-traverse-no-scope | native remove for lists; replacement for single statement slots |
| swc-visitor | native traversal + manual statement-slot edits |
| typescript | compiler transform; undefined for lists, EmptyStatement for single slots |
| tsquery | tsquery.map removal/replacement; internal print/reparse included |
| ts-morph | one SourceFile.transform + factory statement-list updates; internal text synchronization timed |

Every measured output is validated against its scenario oracle. For rstest-coverage this includes both normalized AST structure and exact ordered branch metadata; other editing tasks compare against independently authored expected code. The adjacent JSON records all samples, execution order, dependency versions, SWC Next SHA and source hashes.
