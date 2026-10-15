# Detailed i18n collection results

[Overview](../../README.md) · [Raw samples](../../results/i18n/latest.json) · [Dependency versions](../../package.json)

Benchmark implementation: `3853c51658388034f7aea7a38022ba333eabd916`. Time is milliseconds per 64-file collection. Range is the minimum and maximum process median, not a confidence interval. Small overlapping differences should not be treated as stable winners.

## Original TS / TSX

### Shared ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| direct-ast | 0.834 | 0.817–1.155 | 8.17 | 173.9 | 53.5 |
| swc-next | 1.005 | 1.002–1.028 | 8.31 | 180.9 | 55.5 |
| estree-walker | 1.086 | 1.040–1.231 | 8.35 | 173.6 | 53.6 |
| oxc-walker | 1.122 | 0.979–1.358 | 8.64 | 174.1 | 53.7 |
| oxc-visitor | 1.383 | 1.375–1.554 | 8.53 | 181.4 | 55.3 |
| zimmerframe | 1.799 | 1.794–1.809 | 8.13 | 172.5 | 54.2 |
| yuku-ast | 1.883 | 1.786–2.129 | 8.85 | 157.0 | 53.5 |
| estree-util-visit | 6.298 | 6.033–6.433 | 8.61 | 222.8 | 84.9 |

### Native ASTs — not ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| typescript | 0.862 | 0.801–0.879 | 7.35 | 168.4 | 32.5 |
| babel-types-traverse-fast-v8 | 0.977 | 0.966–1.087 | 6.61 | 111.6 | 23.8 |
| babel-types-traverse-fast-v7 | 1.029 | 1.021–2.138 | 8.10 | 158.6 | 43.9 |
| babel-types-traverse-v8 | 1.210 | 1.075–1.745 | 6.82 | 111.6 | 29.9 |
| babel-traverse-no-scope-v8 | 5.255 | 5.016–8.333 | 9.33 | 340.6 | 161.9 |
| babel-traverse-no-scope-v7 | 7.686 | 6.182–9.775 | 7.08 | 382.3 | 190.9 |
| tsquery | 8.236 | 7.903–9.232 | 8.01 | 400.1 | 160.5 |
| babel-traverse-v8 | 12.641 | 10.384–12.906 | 7.51 | 340.8 | 162.4 |
| ts-morph | 14.425 | 14.085–15.509 | 12.39 | 407.2 | 189.0 |
| babel-traverse-v7 | 19.515 | 18.245–26.883 | 6.93 | 373.2 | 172.0 |

## Pre-transpiled JavaScript

### Shared ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| acorn-recursive | 0.543 | 0.543–0.578 | 5.19 | 90.1 | 18.6 |
| oxc-visitor | 0.596 | 0.593–0.949 | 5.14 | 95.7 | 15.3 |
| swc-next | 0.762 | 0.755–1.242 | 5.60 | 92.3 | 14.5 |
| esrecurse | 0.816 | 0.795–0.852 | 5.22 | 90.2 | 18.3 |
| acorn-full | 0.958 | 0.941–1.089 | 5.12 | 90.7 | 18.7 |
| yuku-ast | 1.023 | 0.968–1.058 | 5.56 | 91.4 | 15.0 |
| acorn-simple | 1.109 | 1.045–1.171 | 5.04 | 90.3 | 18.6 |
| typescript-eslint | 1.263 | 1.139–1.395 | 5.41 | 175.2 | 47.9 |
| estraverse | 1.269 | 1.206–1.292 | 5.32 | 91.8 | 18.0 |
| direct-ast | 1.572 | 1.558–1.652 | 5.08 | 90.3 | 13.2 |
| oxc-walker | 1.616 | 1.364–1.645 | 6.92 | 90.6 | 18.5 |
| zimmerframe | 1.648 | 1.640–1.731 | 5.51 | 90.6 | 17.9 |
| estree-walker | 2.124 | 1.721–2.550 | 5.18 | 91.3 | 18.4 |
| esquery | 2.364 | 2.214–2.673 | 5.40 | 92.0 | 19.2 |
| estree-toolkit | 2.921 | 2.879–2.941 | 5.25 | 107.9 | 26.6 |
| estree-toolkit-scope | 7.749 | 7.320–7.986 | 5.79 | 107.7 | 27.0 |
| estree-util-visit | 9.873 | 9.334–13.568 | 5.56 | 105.0 | 25.7 |

### Native ASTs — not ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| typescript | 0.703 | 0.676–0.736 | 5.70 | 167.1 | 28.5 |
| babel-types-traverse-fast-v8 | 0.772 | 0.752–1.035 | 4.37 | 107.8 | 21.1 |
| babel-types-traverse-fast-v7 | 0.839 | 0.807–0.978 | 4.76 | 164.9 | 50.9 |
| babel-types-traverse-v8 | 0.946 | 0.811–1.069 | 4.78 | 108.3 | 21.1 |
| babel-traverse-no-scope-v8 | 3.492 | 3.446–3.787 | 4.57 | 350.7 | 171.9 |
| babel-traverse-no-scope-v7 | 4.640 | 4.370–5.411 | 5.22 | 334.8 | 162.2 |
| tsquery | 7.292 | 7.188–8.965 | 5.88 | 368.6 | 157.4 |
| babel-traverse-v8 | 10.595 | 10.238–10.816 | 4.78 | 348.7 | 167.9 |
| ts-morph | 11.071 | 10.826–13.770 | 10.10 | 388.9 | 159.7 |
| babel-traverse-v7 | 17.253 | 17.028–17.785 | 6.24 | 380.6 | 187.8 |

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
