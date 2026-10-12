# Detailed i18n collection results

[Overview](../../README.md) · [Raw samples](../../results/i18n/latest.json) · [Dependency versions](../../package.json)

Benchmark implementation: `e69ad924914e09dabc6896e591b91a9d4961c9ca`. Time is milliseconds per 64-file collection. Range is the minimum and maximum process median, not a confidence interval. Small overlapping differences should not be treated as stable winners.

## Original TS / TSX

### Shared ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| direct-ast | 0.904 | 0.872–0.924 | 20.23 | 204.9 | 82.1 |
| oxc-walker | 1.052 | 1.037–1.055 | 20.31 | 205.3 | 81.7 |
| estree-walker | 1.122 | 1.073–1.275 | 20.18 | 205.1 | 81.7 |
| oxc-visitor | 1.431 | 1.337–1.462 | 20.27 | 210.8 | 82.5 |
| zimmerframe | 1.920 | 1.870–1.962 | 20.17 | 208.2 | 94.7 |
| yuku-ast | 1.934 | 1.854–2.399 | 20.39 | 206.5 | 85.6 |
| swc-next | 1.950 | 1.845–1.988 | 20.51 | 206.2 | 82.7 |
| estree-util-visit | 6.196 | 6.191–6.581 | 19.76 | 244.2 | 86.3 |

### Native ASTs — not ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| typescript | 0.890 | 0.853–0.940 | 7.53 | 168.1 | 32.9 |
| babel-types-traverse-fast-v8 | 1.015 | 1.002–1.045 | 6.84 | 110.7 | 23.8 |
| babel-types-traverse-fast-v7 | 1.086 | 1.051–1.089 | 6.60 | 158.1 | 43.9 |
| babel-types-traverse-v8 | 1.137 | 1.136–1.155 | 6.57 | 110.9 | 29.9 |
| babel-traverse-no-scope-v8 | 5.106 | 4.861–6.513 | 9.22 | 340.7 | 161.9 |
| babel-traverse-no-scope-v7 | 5.817 | 5.800–6.153 | 7.44 | 383.4 | 190.8 |
| tsquery | 8.852 | 8.213–8.862 | 7.58 | 397.6 | 160.6 |
| babel-traverse-v8 | 12.785 | 10.283–12.951 | 9.03 | 340.6 | 162.5 |
| ts-morph | 14.328 | 14.028–14.453 | 11.73 | 405.5 | 189.1 |
| babel-traverse-v7 | 20.665 | 20.588–21.188 | 6.50 | 373.1 | 170.0 |

## Pre-transpiled JavaScript

### Shared ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| acorn-recursive | 0.576 | 0.557–0.580 | 5.19 | 90.5 | 18.6 |
| oxc-visitor | 0.619 | 0.603–0.662 | 5.19 | 95.9 | 15.2 |
| esrecurse | 0.809 | 0.792–0.844 | 4.64 | 90.5 | 18.3 |
| swc-next | 0.881 | 0.862–1.651 | 5.33 | 90.6 | 13.8 |
| yuku-ast | 0.975 | 0.922–1.439 | 5.19 | 92.0 | 15.0 |
| acorn-full | 0.981 | 0.971–1.035 | 5.22 | 90.3 | 18.6 |
| acorn-simple | 1.104 | 1.040–1.122 | 5.31 | 90.4 | 18.7 |
| typescript-eslint | 1.198 | 1.170–1.202 | 5.29 | 175.2 | 47.9 |
| estraverse | 1.235 | 1.228–1.241 | 5.24 | 91.0 | 18.0 |
| oxc-walker | 1.345 | 1.305–1.363 | 5.11 | 89.9 | 18.6 |
| zimmerframe | 1.602 | 1.565–1.725 | 5.42 | 90.9 | 17.7 |
| direct-ast | 1.631 | 1.604–1.633 | 5.14 | 90.2 | 13.3 |
| estree-walker | 1.754 | 1.725–1.870 | 5.18 | 90.0 | 18.4 |
| esquery | 2.242 | 2.200–2.339 | 5.31 | 92.7 | 18.8 |
| estree-toolkit | 2.975 | 2.917–3.044 | 5.40 | 107.4 | 25.3 |
| estree-toolkit-scope | 7.433 | 7.231–7.671 | 5.49 | 107.8 | 27.3 |
| estree-util-visit | 9.688 | 9.611–9.901 | 5.45 | 103.4 | 25.7 |

### Native ASTs — not ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| typescript | 0.701 | 0.700–0.714 | 5.76 | 156.1 | 28.5 |
| babel-types-traverse-fast-v8 | 0.773 | 0.765–0.794 | 4.38 | 108.0 | 21.1 |
| babel-types-traverse-fast-v7 | 0.809 | 0.764–0.814 | 4.84 | 164.2 | 50.9 |
| babel-types-traverse-v8 | 0.857 | 0.852–0.899 | 4.42 | 107.8 | 21.1 |
| babel-traverse-no-scope-v8 | 3.659 | 3.551–3.888 | 4.92 | 350.8 | 171.9 |
| babel-traverse-no-scope-v7 | 4.087 | 4.033–4.109 | 4.75 | 333.6 | 162.1 |
| tsquery | 7.509 | 7.471–7.524 | 5.75 | 366.0 | 157.4 |
| babel-traverse-v8 | 10.409 | 10.303–10.453 | 4.62 | 347.7 | 167.9 |
| ts-morph | 11.338 | 10.989–11.574 | 9.46 | 388.6 | 159.9 |
| babel-traverse-v7 | 17.507 | 15.472–17.518 | 5.85 | 381.2 | 187.4 |

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
