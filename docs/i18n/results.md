# Detailed i18n collection results

[Overview](../../README.md) · [Raw samples](../../results/i18n/latest.json) · [Dependency versions](../../package.json)

Benchmark implementation: `708513c4b5c250bd85de3475afe57293adea280a`. Time is milliseconds per 64-file collection. Range is the minimum and maximum process median, not a confidence interval. Small overlapping differences should not be treated as stable winners.

## Original TS / TSX

### Shared ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| direct-ast | 0.854 | 0.834–0.927 | 8.29 | 174.0 | 53.5 |
| oxc-walker | 1.035 | 0.938–1.547 | 8.49 | 174.2 | 53.7 |
| estree-walker | 1.153 | 1.044–1.689 | 8.49 | 173.5 | 53.6 |
| oxc-visitor | 1.382 | 1.344–2.318 | 8.33 | 181.7 | 55.3 |
| swc-next | 1.762 | 1.752–1.811 | 8.59 | 169.4 | 46.5 |
| zimmerframe | 1.896 | 1.774–1.957 | 8.44 | 171.9 | 54.2 |
| yuku-ast | 1.907 | 1.801–2.067 | 8.56 | 156.9 | 53.5 |
| estree-util-visit | 6.122 | 5.837–6.301 | 8.57 | 223.0 | 84.9 |

### Native ASTs — not ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| typescript | 0.869 | 0.828–0.923 | 7.41 | 167.8 | 32.9 |
| babel-types-traverse-fast-v8 | 1.154 | 1.072–1.183 | 7.07 | 110.5 | 23.8 |
| babel-types-traverse-fast-v7 | 1.205 | 1.132–1.263 | 6.92 | 160.9 | 43.8 |
| babel-types-traverse-v8 | 1.209 | 1.169–1.250 | 6.77 | 109.8 | 29.9 |
| babel-traverse-no-scope-v8 | 4.614 | 4.601–5.353 | 9.42 | 341.3 | 162.0 |
| babel-traverse-no-scope-v7 | 6.343 | 6.216–6.656 | 8.02 | 382.8 | 190.9 |
| tsquery | 8.161 | 8.062–10.799 | 8.18 | 398.3 | 160.6 |
| babel-traverse-v8 | 12.647 | 11.395–12.911 | 7.65 | 339.6 | 162.4 |
| ts-morph | 14.253 | 14.204–14.852 | 11.89 | 405.3 | 189.0 |
| babel-traverse-v7 | 18.892 | 18.847–22.186 | 9.26 | 372.3 | 170.0 |

## Pre-transpiled JavaScript

### Shared ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| acorn-recursive | 0.606 | 0.602–0.668 | 5.11 | 90.4 | 18.7 |
| oxc-visitor | 0.634 | 0.634–1.133 | 5.24 | 95.6 | 15.2 |
| swc-next | 0.823 | 0.772–0.887 | 5.23 | 90.7 | 18.0 |
| esrecurse | 0.907 | 0.837–0.931 | 5.29 | 90.9 | 18.3 |
| acorn-full | 1.034 | 1.010–1.314 | 5.33 | 89.9 | 18.7 |
| acorn-simple | 1.110 | 1.105–1.327 | 5.24 | 91.0 | 18.6 |
| typescript-eslint | 1.212 | 1.173–1.263 | 5.19 | 174.8 | 47.9 |
| yuku-ast | 1.324 | 1.047–1.664 | 7.29 | 94.6 | 15.1 |
| estraverse | 1.330 | 1.272–1.529 | 5.58 | 91.8 | 18.0 |
| oxc-walker | 1.432 | 1.302–2.013 | 5.23 | 91.0 | 18.5 |
| direct-ast | 1.657 | 1.610–1.662 | 5.23 | 89.9 | 13.2 |
| zimmerframe | 1.673 | 1.603–1.733 | 5.29 | 90.9 | 17.7 |
| estree-walker | 1.818 | 1.709–2.258 | 5.12 | 91.0 | 18.4 |
| esquery | 2.319 | 2.261–2.371 | 5.44 | 91.4 | 18.8 |
| estree-toolkit | 3.157 | 3.049–3.496 | 5.65 | 107.8 | 26.6 |
| estree-toolkit-scope | 7.556 | 7.498–7.799 | 5.37 | 108.0 | 27.1 |
| estree-util-visit | 9.662 | 9.500–9.719 | 5.47 | 103.9 | 25.8 |

### Native ASTs — not ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| typescript | 0.696 | 0.681–0.702 | 5.68 | 161.5 | 26.8 |
| babel-types-traverse-fast-v8 | 0.820 | 0.800–0.841 | 4.59 | 107.8 | 21.2 |
| babel-types-traverse-fast-v7 | 0.852 | 0.838–0.863 | 4.55 | 164.1 | 50.9 |
| babel-types-traverse-v8 | 0.911 | 0.883–0.937 | 4.52 | 107.5 | 21.2 |
| babel-traverse-no-scope-v8 | 3.703 | 3.441–6.760 | 5.05 | 350.9 | 171.9 |
| babel-traverse-no-scope-v7 | 4.313 | 4.123–4.616 | 5.22 | 333.0 | 162.2 |
| tsquery | 7.925 | 7.486–10.738 | 6.47 | 366.4 | 157.3 |
| babel-traverse-v8 | 11.177 | 10.354–11.608 | 6.68 | 349.5 | 167.8 |
| ts-morph | 11.513 | 11.472–11.647 | 9.66 | 388.9 | 159.9 |
| babel-traverse-v7 | 18.263 | 16.294–19.266 | 6.22 | 380.3 | 187.5 |

## Compatibility failures

These are failures of the installed API on this shared AST and collection contract, not claims that the library cannot support the syntax with extensions. No custom TS visitor-key tables or AST-schema adapters are added.

| Variant | Track | Reason |
| :-- | :-- | :-- |
| acorn-simple | original | No walker function defined for node type JSXElement |
| acorn-recursive | original | visitor[(override  /  /  node.type)] is not a function |
| acorn-full | original | No walker function defined for node type JSXElement |
| estraverse | original | Unknown node type ParenthesizedExpression. |
| esrecurse | original | Unknown node type ParenthesizedExpression. |
| estree-toolkit | original | Ordered output mismatch: expected 11 matches, received 10 |
| estree-toolkit-scope | original | identifierCrawlers.AssignmentPattern is not implemented |
| ast-types | original | did not recognize object of type "PropertyDefinition" |
| ast-types | javascript | did not recognize object of type "PropertyDefinition" |
| jscodeshift | original | did not recognize object of type "PropertyDefinition" |
| jscodeshift | javascript | did not recognize object of type "PropertyDefinition" |
| esquery | original | Ordered output mismatch: expected 11 matches, received 10 |
| typescript-eslint | original | Ordered output mismatch: expected 2 matches, received 0 |
| swc-visitor | original | Public contract fixture: ordered output differs from Babel |
| swc-visitor | javascript | Public contract fixture: ordered output differs from Babel |

## Interpretation

- Acorn now handles static destructuring keys; the public fixture verifies this. The historical dispatch study retains its original source and measurements.
- Native API implementations live in separate modules. Acorn's native base walker is extended to visit static string keys and module names that it otherwise skips; that work is part of collection.
- The old SWC JavaScript Visitor reverses some string visitation order (method body before method key), and its TS visitor is incomplete. The public contract fixture excludes it from both rankings.
- ast-types and jscodeshift fill default AST fields during traversal and reject the corpus's PropertyDefinition nodes. Their callbacks are read-only, but their traversal machinery is not structurally read-only.
- Original-source estree-toolkit/esquery/typescript-eslint results fail on this Oxc AST shape. These are recorded instead of silently sharing a custom universal walker.
- Set lookup and allocation are part of the business task, so numbers are not pure per-node dispatch throughput. No source parsing, printing, module loading, dictionary loading, Rspack buildInfo work, or I/O is inside the timed region.
- Original Babel uses 7.27.3 from the business workspace; the installed standalone Babel variants use the versions in package.json. `babel-types-traverse-fast-v7` resolves @babel/types from that original traverse dependency tree (7.28.6).
- All memory values cover the complete worker process, including imports, corpus, parsers, AST preparation and untimed correctness checks. Client RSS equals total RSS; there is no server process (N/A). Peak RSS is the OS high-water mark; heap/RSS samples are observed at iteration boundaries, not exact allocation peaks. See summary.json for all RSS fields.
- This is a cold-AST, warm-code collection benchmark. It neither measures parser speed nor proves the same ranking on a cached AST, a larger corpus, a different dictionary, or a full build.
