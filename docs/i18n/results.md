# Detailed i18n collection results

[Overview](../../README.md) · [Raw samples](../../results/i18n/latest.json) · [Dependency versions](../../package.json)

Benchmark implementation: `42ea237ea32fbc85dfdd74596a6b3c2fa7acd236`. Time is milliseconds per 64-file collection. Range is the minimum and maximum process median, not a confidence interval. Small overlapping differences should not be treated as stable winners.

## Original TS / TSX

### Shared ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| direct-ast | 0.808 | 0.784–0.838 | 7.97 | 174.0 | 53.5 |
| oxc-walker | 0.967 | 0.911–0.980 | 8.12 | 173.8 | 53.7 |
| estree-walker | 1.010 | 0.999–1.059 | 8.05 | 173.6 | 53.6 |
| oxc-visitor | 1.281 | 1.252–1.315 | 8.12 | 180.5 | 55.3 |
| swc-next | 1.462 | 1.448–1.507 | 8.11 | 169.8 | 46.8 |
| yuku-ast | 1.717 | 1.715–1.829 | 8.04 | 156.5 | 53.5 |
| zimmerframe | 1.784 | 1.764–2.049 | 8.09 | 172.0 | 54.3 |
| estree-util-visit | 6.100 | 5.846–6.113 | 7.99 | 222.9 | 84.9 |

### Native ASTs — not ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| typescript | 0.846 | 0.788–0.878 | 7.25 | 167.5 | 32.7 |
| babel-types-traverse-fast-v8 | 0.990 | 0.990–1.068 | 6.72 | 109.8 | 23.9 |
| babel-types-traverse-fast-v7 | 1.008 | 1.002–1.021 | 7.94 | 158.5 | 44.1 |
| babel-types-traverse-v8 | 1.103 | 1.080–1.108 | 6.37 | 110.5 | 29.7 |
| babel-traverse-no-scope-v8 | 4.618 | 4.549–4.673 | 9.05 | 340.2 | 162.0 |
| babel-traverse-no-scope-v7 | 5.705 | 5.639–6.826 | 7.40 | 383.5 | 191.0 |
| tsquery | 8.133 | 8.056–10.137 | 7.43 | 397.4 | 160.6 |
| babel-traverse-v8 | 12.515 | 10.426–13.201 | 7.84 | 340.2 | 162.5 |
| ts-morph | 13.863 | 13.774–13.896 | 11.33 | 405.3 | 189.0 |
| babel-traverse-v7 | 17.660 | 16.942–19.303 | 6.82 | 373.7 | 170.2 |

## Pre-transpiled JavaScript

### Shared ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| acorn-recursive | 0.536 | 0.531–0.547 | 5.14 | 91.5 | 18.7 |
| oxc-visitor | 0.589 | 0.571–0.608 | 5.16 | 95.4 | 15.3 |
| swc-next | 0.712 | 0.700–0.719 | 5.14 | 93.3 | 14.2 |
| esrecurse | 0.793 | 0.780–0.800 | 5.05 | 90.8 | 18.4 |
| yuku-ast | 0.926 | 0.925–0.934 | 5.08 | 91.2 | 14.9 |
| acorn-full | 0.972 | 0.964–0.982 | 5.27 | 90.2 | 18.7 |
| acorn-simple | 1.041 | 1.040–1.049 | 5.12 | 90.5 | 18.7 |
| typescript-eslint | 1.162 | 1.127–1.208 | 5.28 | 175.0 | 48.1 |
| estraverse | 1.210 | 1.206–1.211 | 5.20 | 91.1 | 18.0 |
| oxc-walker | 1.278 | 1.262–1.281 | 5.07 | 89.9 | 18.5 |
| direct-ast | 1.549 | 1.540–1.553 | 5.26 | 90.2 | 13.1 |
| zimmerframe | 1.559 | 1.521–1.563 | 5.25 | 90.8 | 17.8 |
| estree-walker | 1.704 | 1.704–1.720 | 5.04 | 90.1 | 18.4 |
| esquery | 2.166 | 2.134–2.218 | 5.20 | 91.4 | 19.2 |
| estree-toolkit | 2.874 | 2.809–2.998 | 5.21 | 107.9 | 26.7 |
| estree-toolkit-scope | 7.233 | 7.190–7.392 | 5.13 | 107.8 | 27.1 |
| estree-util-visit | 9.390 | 9.366–9.705 | 5.45 | 103.4 | 25.8 |

### Native ASTs — not ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| typescript | 0.654 | 0.646–0.658 | 5.45 | 150.6 | 25.6 |
| babel-types-traverse-fast-v7 | 0.766 | 0.763–0.777 | 4.12 | 164.8 | 51.0 |
| babel-types-traverse-fast-v8 | 0.771 | 0.744–0.774 | 4.37 | 107.7 | 21.1 |
| babel-types-traverse-v8 | 0.811 | 0.809–0.894 | 4.29 | 107.9 | 21.2 |
| babel-traverse-no-scope-v8 | 3.524 | 3.521–3.570 | 4.61 | 350.3 | 171.9 |
| babel-traverse-no-scope-v7 | 3.975 | 3.896–4.024 | 4.76 | 333.8 | 162.3 |
| tsquery | 7.465 | 7.276–7.557 | 5.63 | 365.7 | 157.3 |
| babel-traverse-v8 | 9.986 | 8.778–10.067 | 4.47 | 347.8 | 167.9 |
| ts-morph | 10.875 | 10.649–11.197 | 9.32 | 389.2 | 159.9 |
| babel-traverse-v7 | 17.099 | 16.773–17.141 | 5.85 | 380.2 | 187.6 |

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
| jscodeshift | original | did not recognize object of type "PropertyDefinition" |
| esquery | original | Ordered output mismatch: expected 11 matches, received 10 |
| typescript-eslint | original | Ordered output mismatch: expected 2 matches, received 0 |
| swc-visitor | original | Public contract fixture: ordered output differs from Babel |
| ast-types | javascript | did not recognize object of type "PropertyDefinition" |
| jscodeshift | javascript | did not recognize object of type "PropertyDefinition" |
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
