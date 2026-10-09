# Detailed i18n collection results

[Overview](../../README.md) · [Raw samples](../../results/i18n/latest.json) · [Dependency versions](../../package.json)

Benchmark implementation: `35133e716a9ee077c4ade32714c9bbe4ee3e5cce`. Time is milliseconds per 64-file collection. Range is the minimum and maximum process median, not a confidence interval. Small overlapping differences should not be treated as stable winners.

## Original TS / TSX

### Shared ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| direct-ast | 0.994 | 0.985–1.004 | 20.83 | 205.0 | 81.9 |
| oxc-walker | 1.099 | 1.068–1.140 | 20.93 | 205.0 | 81.7 |
| estree-walker | 1.197 | 1.176–1.228 | 20.41 | 204.6 | 81.7 |
| oxc-visitor | 1.537 | 1.529–1.575 | 20.95 | 212.2 | 82.5 |
| zimmerframe | 2.002 | 1.961–2.088 | 20.37 | 208.2 | 94.4 |
| yuku-ast | 2.120 | 1.955–2.257 | 21.10 | 206.7 | 85.6 |
| swc-next | 2.191 | 2.061–2.226 | 21.54 | 206.3 | 82.5 |
| estree-util-visit | 6.420 | 6.345–6.458 | 19.85 | 243.7 | 86.3 |

### Native ASTs — not ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| typescript | 0.944 | 0.938–1.048 | 7.63 | 167.9 | 33.2 |
| babel-fast | 1.078 | 1.061–1.505 | 7.01 | 111.6 | 23.8 |
| babel-business-fast | 1.162 | 1.079–1.178 | 8.24 | 158.3 | 43.8 |
| babel-types | 1.217 | 1.198–1.259 | 6.88 | 110.7 | 30.0 |
| babel-no-scope | 4.875 | 4.776–5.189 | 7.47 | 340.2 | 160.8 |
| babel-business-no-scope | 6.629 | 6.556–7.962 | 7.80 | 383.1 | 190.8 |
| tsquery | 8.872 | 8.383–10.355 | 7.77 | 397.8 | 160.6 |
| babel | 10.641 | 10.530–12.259 | 8.59 | 339.2 | 163.9 |
| ts-morph | 14.595 | 14.199–14.724 | 12.35 | 408.2 | 189.0 |
| babel-business | 21.360 | 21.038–21.767 | 6.64 | 374.7 | 170.1 |

## Pre-transpiled JavaScript

### Shared ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| acorn-recursive | 0.597 | 0.589–0.795 | 5.33 | 90.5 | 18.5 |
| oxc-visitor | 0.710 | 0.646–0.753 | 5.20 | 95.5 | 15.3 |
| esrecurse | 0.914 | 0.842–1.066 | 4.99 | 90.2 | 17.9 |
| acorn-full | 1.002 | 0.984–1.038 | 5.39 | 90.8 | 18.5 |
| swc-next | 1.021 | 0.970–1.217 | 5.85 | 90.6 | 18.5 |
| yuku-ast | 1.047 | 1.018–1.066 | 5.50 | 91.2 | 15.1 |
| acorn-simple | 1.122 | 1.104–1.150 | 5.22 | 89.8 | 18.5 |
| typescript-eslint | 1.231 | 1.206–1.306 | 5.51 | 175.3 | 47.9 |
| oxc-walker | 1.420 | 1.362–1.449 | 5.36 | 90.2 | 18.5 |
| estraverse | 1.451 | 1.357–1.465 | 5.72 | 91.2 | 18.0 |
| zimmerframe | 1.662 | 1.650–1.671 | 5.43 | 91.1 | 17.8 |
| direct-ast | 1.662 | 1.661–1.672 | 5.37 | 90.2 | 13.1 |
| estree-walker | 1.826 | 1.793–1.862 | 4.96 | 91.7 | 18.4 |
| esquery | 2.305 | 2.277–2.417 | 5.29 | 91.8 | 19.1 |
| estree-toolkit | 3.088 | 2.931–3.218 | 5.40 | 108.0 | 26.7 |
| estree-toolkit-scope | 7.661 | 7.419–8.040 | 5.41 | 107.7 | 27.1 |
| estree-util-visit | 9.781 | 9.709–10.671 | 5.61 | 104.1 | 25.7 |

### Native ASTs — not ESTree

| Variant | Collection ms | Process-median range | Preparation ms | Peak RSS MiB | Observed heap MiB |
| :-- | --: | :-- | --: | --: | --: |
| typescript | 0.741 | 0.732–0.754 | 5.80 | 162.0 | 28.8 |
| babel-business-fast | 0.816 | 0.792–0.894 | 4.65 | 164.0 | 47.5 |
| babel-types | 1.002 | 0.900–1.114 | 5.32 | 108.6 | 20.3 |
| babel-fast | 1.009 | 0.878–1.350 | 5.38 | 107.5 | 21.2 |
| babel-no-scope | 3.699 | 3.536–3.753 | 5.01 | 350.5 | 172.0 |
| babel-business-no-scope | 4.903 | 4.511–5.479 | 4.85 | 334.1 | 162.1 |
| tsquery | 7.645 | 7.461–9.668 | 6.09 | 366.1 | 157.3 |
| babel | 9.137 | 9.073–10.409 | 4.92 | 347.7 | 167.9 |
| ts-morph | 11.685 | 11.282–11.775 | 9.99 | 389.0 | 160.2 |
| babel-business | 18.175 | 16.738–19.194 | 5.99 | 380.7 | 187.5 |

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

- Native API implementations live in separate modules. Acorn's native base walker is extended to visit static string keys and module names that it otherwise skips; that work is part of collection.
- The old SWC JavaScript Visitor reverses some string visitation order (method body before method key), and its TS visitor is incomplete. The public contract fixture excludes it from both rankings.
- ast-types and jscodeshift fill default AST fields during traversal and reject the corpus's PropertyDefinition nodes. Their callbacks are read-only, but their traversal machinery is not structurally read-only.
- Original-source estree-toolkit/esquery/typescript-eslint results fail on this Oxc AST shape. These are recorded instead of silently sharing a custom universal walker.
- Set lookup and allocation are part of the business task, so numbers are not pure per-node dispatch throughput. No source parsing, printing, module loading, dictionary loading, Rspack buildInfo work, or I/O is inside the timed region.
- Original Babel uses 7.27.3 from the business workspace; the installed standalone Babel variants use the versions in package.json. `babel-business-fast` resolves @babel/types from that original traverse dependency tree (7.28.6).
- All memory values cover the complete worker process, including imports, corpus, parsers, AST preparation and untimed correctness checks. Client RSS equals total RSS; there is no server process (N/A). Peak RSS is the OS high-water mark; heap/RSS samples are observed at iteration boundaries, not exact allocation peaks. See summary.json for all RSS fields.
- This is a cold-AST, warm-code collection benchmark. It neither measures parser speed nor proves the same ranking on a cached AST, a larger corpus, a different dictionary, or a full build.
