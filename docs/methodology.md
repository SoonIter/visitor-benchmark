# Methodology and coverage

## Workload

Each implementation adds `displayName` and deterministic `componentId` configuration to styled-components tagged templates. The task is based on the official [displayNameAndId visitor](https://github.com/styled-components/babel-plugin-styled-components/blob/master/src/visitors/displayNameAndId.js), with the same limited scope for every participant.

Supported cases include default-import aliases, exported variables, `styled.div`, `styled('button')`, `.attrs(...)`, interpolations and nested `css` tags. Existing `withConfig`, unrelated libraries and `css` helpers remain unchanged.

This is not a complete plugin port: scope shadowing, CommonJS, namespace imports, JSX `css` props, CSS minification, template lowering, PURE annotations and package discovery are excluded. IDs use a shared filename hash and sequence, not the official plugin's exact SSR ID algorithm. Fixtures are generated JavaScript modules, not production projects or a full JSX/TypeScript corpus.

The transform replaces `VariableDeclarator.init.tag`. It does not benchmark the full `replace/remove/insert` protocol. Most implementations edit on exit. Enter-only APIs collect nodes and edit afterward; query APIs pay for matching and result collections. No implementation traverses the inserted configuration subtree. Internal callback counts need not match; input and output do.

## Inputs

- **19 ESTree implementations:** independent `structuredClone` copies of the exact same Acorn AST, including locations and ranges. No parser-specific replacement inputs.
- **8 native-AST implementations:** Babel, SWC, TypeScript and ts-morph parse the same source into their own AST before timing. These inputs are explicitly marked **not ESTree**. ts-morph bundles TypeScript 6.0.2; the standalone classic compiler API is pinned to 6.0.3.
- **Dense:** four files, each with 100 target components and 10 unrelated functions.
- **Sparse:** four files, each with 20 target components and 180 unrelated functions.

Run `npm run fixtures` to export source, expected output and AST examples. The TypeScript JSON is a readable outline with parent cycles omitted; the benchmark uses real compiler nodes, not that outline.

## Direct AST baseline

`direct-ast` loops over `Program.body`, unwraps exported variable declarations, and edits their declarators directly. It calls no visitor API and uses no child-key table. It shares only the same import discovery and transformation logic as the other ESTree cases.

All target components in these fixtures are top-level declarations, so this specialized implementation produces identical output while skipping function bodies and other irrelevant subtrees. It does not discover nested component declarations and is not a general walker. Its timing measures the benefit of knowing exactly where the task lives in the AST, not merely removing visitor callback overhead.

## Measurement

Each variant/workload runs in three fresh Node processes: eight warmups followed by twenty measured iterations. Processes run serially with their order rotated and reversed across repetitions. Each iteration processes all four files.

| Stage | Timed? |
| --- | --- |
| Fixture generation, parsing and input cloning | No |
| Import discovery, state and visitor setup | Yes |
| Traversal, query matching, scope analysis and edits | Yes |
| Printing, output validation and TS result disposal | No |
| ts-morph's internal source synchronization | Yes |

Each worker loads only its own implementation and validation dependencies. Explicit GC runs once after warmup; normal GC can occur during timed work. Fresh inputs prevent transformed nodes or persistent paths from making subsequent iterations artificially cheap.

Tables and charts show the median of process medians. Whiskers and ranges show the minimum and maximum process medians, **not confidence intervals**. Nearby numbers do not establish a stable winner.

## Memory

Peak RSS is the whole worker's high-water mark, including imports, AST preparation, warmup, printing and validation. Observed heap is the largest `heapUsed` sample taken after an iteration; it is neither the instantaneous heap peak nor cumulative allocated bytes. Reports use the largest observation across repetitions. Each worker is one process: there is no separate client/server split.

These memory values describe the benchmark process, not isolated walker allocation costs.

## Validation and reproducibility

Every measured output is printed, reparsed and structurally compared with independently generated expected source. Coordinate and raw-format metadata are ignored; syntax and values are preserved. Cross-variant source, canonical ESTree and output hashes must agree. Tests also ensure the shared input AST remains unchanged.

- `package-lock.json` pins npm dependencies.
- `vendor/provenance.json` identifies the single SWC Next snapshot by branch, commit and SHA-256.
- `npm run bench` and `npm run bench:quick` first refresh the snapshot from the latest committed PR head using GitHub CLI; local uncommitted work is never copied. `npm run sync:swc` refreshes it separately. `npm run bench:pinned` explicitly reuses the recorded snapshot offline.
- `results/latest.json` preserves environment, execution order, individual timings, memory and hashes.
- `results/source-manifest.json` identifies the current scripts and implementation files.
- `npm run report` regenerates the README, charts and detailed report from recorded data without rerunning measurements.

## Coverage

See [`src/registry.mjs`](../src/registry.mjs) for every entry point and configuration. The suite covers typed hooks, generic enter/leave hooks, recursive visitors, NodePath, query collections and compiler wrappers. ESTree participants share business logic, not a walker compatibility adapter.

| Package family | Entry points |
| --- | --- |
| SWC Next, yuku-ast | Typed hooks |
| estree-walker, oxc-walker, estree-util-visit | Generic enter/leave |
| oxc-parser | `Visitor` on the shared ESTree |
| acorn-walk | `simple`, `recursive`, `full` |
| estraverse, esrecurse, zimmerframe | Traversal and controlled recursion |
| estree-toolkit | NodePath, with and without scope |
| ast-types | `visit`; also recast's traversal engine |
| jscodeshift, esquery | Query and collection APIs |
| typescript-eslint | `simpleTraverse` on the shared ESTree |
| @babel/types | `traverse`, `traverseFast` |
| @babel/traverse | Default scope and `noScope` |
| @swc/core | Legacy JS `Visitor` |
| TypeScript, tsquery, ts-morph | Compiler visitor, queries and wrapper transform |

Recast is not duplicated because its traversal comes from ast-types. Magic-string and ESLint fixers are text-editing APIs; `transform + plugins` is orchestration. `unist-util-visit` targets a different tree structure; the ESTree counterpart is included. Rust visitors, Wasm plugins, bundler parser hooks, TypeScript 7 unstable APIs and async walkers are outside this suite. This is broad coverage of established JS APIs, not an exhaustive list of every npm package.
