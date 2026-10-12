# Detailed i18n collection results

[Overview](../../README.md) · [Raw samples](../../results/i18n/latest.json) · [Dependency versions](../../package.json)

Benchmark implementation: `3e92b2a32f727a1b58f38095b2d02d69f9ad0cbf`. Time is milliseconds per 64-file collection. Range is the minimum and maximum process median, not a confidence interval. Small overlapping differences should not be treated as stable winners.

## Original TS / TSX

### Shared ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| direct-ast | 0.922 | 0.883–1.059 | 20.20 | 204.9 | 81.9 |
| oxc-walker | 1.106 | 0.982–1.164 | 20.62 | 205.1 | 81.7 |
| estree-walker | 1.249 | 1.131–1.304 | 20.74 | 204.9 | 81.7 |
| oxc-visitor | 1.436 | 1.420–1.441 | 20.48 | 211.1 | 82.7 |
| swc-next | 1.854 | 1.830–2.123 | 20.16 | 206.3 | 82.5 |
| zimmerframe | 1.961 | 1.942–2.132 | 20.12 | 208.2 | 94.7 |
| yuku-ast | 2.014 | 1.860–2.632 | 20.60 | 206.9 | 85.6 |
| estree-util-visit | 6.319 | 6.280–6.668 | 19.88 | 243.4 | 86.3 |

### Native ASTs — not ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| typescript | 0.901 | 0.861–0.914 | 7.47 | 168.4 | 33.0 |
| babel-types-traverse-fast-v8 | 1.005 | 1.000–1.034 | 6.84 | 109.1 | 23.8 |
| babel-types-traverse-fast-v7 | 1.135 | 1.043–1.162 | 6.84 | 158.2 | 42.0 |
| babel-types-traverse-v8 | 1.193 | 1.114–1.269 | 6.46 | 110.8 | 30.0 |
| babel-traverse-no-scope-v8 | 5.700 | 4.649–6.408 | 8.71 | 340.7 | 161.8 |
| babel-traverse-no-scope-v7 | 6.770 | 6.321–9.489 | 8.03 | 382.9 | 190.8 |
| tsquery | 8.433 | 7.906–10.329 | 8.27 | 398.0 | 160.6 |
| babel-traverse-v8 | 13.029 | 11.261–13.443 | 6.67 | 340.8 | 162.4 |
| ts-morph | 14.495 | 14.218–14.929 | 12.63 | 405.5 | 189.1 |
| babel-traverse-v7 | 22.275 | 20.707–23.431 | 7.09 | 372.9 | 170.0 |

## Pre-transpiled JavaScript

### Shared ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| oxc-visitor | 0.634 | 0.617–1.369 | 5.23 | 95.8 | 15.2 |
| acorn-recursive | 0.641 | 0.626–0.822 | 5.64 | 93.3 | 18.8 |
| swc-next | 0.778 | 0.773–0.929 | 5.20 | 91.0 | 18.0 |
| esrecurse | 0.809 | 0.800–1.020 | 5.25 | 92.5 | 18.3 |
| yuku-ast | 0.986 | 0.921–1.455 | 5.13 | 91.3 | 14.9 |
| acorn-full | 1.026 | 1.007–1.243 | 5.42 | 91.3 | 18.6 |
| acorn-simple | 1.177 | 1.054–1.538 | 5.60 | 90.5 | 18.7 |
| typescript-eslint | 1.198 | 1.175–1.249 | 5.55 | 175.0 | 47.9 |
| estraverse | 1.275 | 1.268–1.422 | 5.34 | 90.6 | 18.0 |
| oxc-walker | 1.331 | 1.314–1.489 | 5.48 | 90.2 | 18.5 |
| zimmerframe | 1.551 | 1.549–1.653 | 5.22 | 91.1 | 17.7 |
| direct-ast | 1.589 | 1.589–1.596 | 5.13 | 90.2 | 13.2 |
| estree-walker | 1.711 | 1.706–1.812 | 5.11 | 90.3 | 18.4 |
| esquery | 2.180 | 2.115–2.289 | 5.28 | 91.4 | 18.8 |
| estree-toolkit | 3.025 | 2.894–3.366 | 5.53 | 107.5 | 25.3 |
| estree-toolkit-scope | 7.449 | 7.342–8.147 | 5.22 | 107.9 | 27.2 |
| estree-util-visit | 9.489 | 9.469–9.854 | 5.45 | 103.4 | 25.7 |

### Native ASTs — not ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| typescript | 0.692 | 0.642–0.733 | 5.72 | 160.6 | 26.8 |
| babel-types-traverse-fast-v8 | 0.787 | 0.778–0.902 | 4.48 | 107.7 | 21.1 |
| babel-types-traverse-v8 | 0.857 | 0.849–0.994 | 4.49 | 108.0 | 20.4 |
| babel-types-traverse-fast-v7 | 0.867 | 0.801–0.982 | 4.85 | 164.5 | 47.3 |
| babel-traverse-no-scope-v8 | 3.497 | 3.494–3.682 | 4.71 | 350.5 | 171.9 |
| babel-traverse-no-scope-v7 | 4.604 | 4.434–5.149 | 6.01 | 333.8 | 162.2 |
| tsquery | 7.455 | 7.429–7.704 | 5.99 | 366.3 | 157.4 |
| babel-traverse-v8 | 10.393 | 10.236–10.403 | 4.57 | 347.9 | 167.9 |
| ts-morph | 11.471 | 11.047–11.862 | 9.74 | 388.8 | 159.8 |
| babel-traverse-v7 | 18.309 | 17.972–18.702 | 6.45 | 380.0 | 187.5 |

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
