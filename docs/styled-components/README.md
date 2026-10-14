# Styled-components

[All scenarios](../../README.md) · [Historical wall time and API strategies](../../results/styled-components/latest.md) · [Historical wall samples](../../results/styled-components/latest.json) · [Implementations](../../src/styled-components/plugins)

Inject displayName and componentId into eligible styled-components declarations. This is a scoped config-injection workload, not the complete upstream plugin. All target declarations are top-level; direct-ast intentionally exploits this and skips unrelated subtrees.

```js
const Card = styled.div`color: red;`;
// becomes
const Card = styled.div.withConfig({
  displayName: "Widget0__Card", componentId: "sc-...-0"
})`color: red;`;
```

## Results

[Ir/Ct numbers and paired wall time](../cpu/results.md) · [Method and reproduction](../cpu/README.md) · [Comparison with the previous wall-time ranking](../cpu/historical-ranks.md)

Three independent CPU samples per supported combination. Lower Ir (K) and Ct (K) are better. Ct is a model cost, not hardware elapsed cycles; simulation disables optimizing JIT. Each chart has Ir on the left and Ct on the right.

![dense: shared ESTree](../../charts/cpu/styled-components-dense-estree.svg)

![sparse: shared ESTree](../../charts/cpu/styled-components-sparse-estree.svg)

<details>
<summary>Native ASTs — not an ESTree comparison</summary>

![dense: native ASTs](../../charts/cpu/styled-components-dense-native.svg)

![sparse: native ASTs](../../charts/cpu/styled-components-sparse-native.svg)

</details>

Native Babel, SWC and TypeScript rows include their own AST representation and API costs. Unsupported combinations have no bar. Compare within each input track and AST family.

## Comparison boundaries

- ESTree participants receive fresh, structurally identical Acorn parser output on every iteration (no AST cloning). Native participants parse the same source into their own ASTs outside measurement.
- Measured work includes visitor construction, traversal, queries, scope work when enabled and all edits. Parsing, external printing and validation are excluded. ts-morph internal text synchronization and tsquery.map printing/reparsing stay timed.
- The direct-ast baseline is specialized to this corpus. Other implementations use their package traversal; not all perform identical work, such as scope analysis or wrapper bookkeeping.
- Every measured output is printed and reparsed, then compared structurally with independently authored expected source. Counts and cross-process input/output hashes must agree.
- babel-traverse / babel-traverse-no-scope use @babel/traverse 8; babel-types-traverse-fast uses @babel/types.traverseFast; babel-types-traverse uses @babel/types.traverse. Exact versions are in raw results.
- SWC Next: [a4c4343](https://github.com/swc-project/swc-next/commit/a4c4343d5ed4863884521ed96209d5e56dfd56df). One pinned implementation; no before/after variants.

## CPU reproduction

See [CPU setup](../cpu/README.md) for Linux, pinned tools and the private corpus. To check this scenario without overwriting the full published result:

```sh
npm run bench:cpu -- --match=styled-components/ --work=.cache/cpu-styled-components --output=results/tmp/cpu-styled-components.json
```

The commands below reproduce the **historical wall-time runner**. Its results and environment are kept for comparison.

## Reproduce

```sh
npm ci
npm test
npm run bench -- styled-components
PYTHON=.cache/charts-venv/bin/python node scripts/render-wall.mjs
```

Use `--quick` for smoke checks; these write quick.json and never overwrite published results. Charts use recorded data only. Historical wall time measured 2026-10-12 on Apple M5 Max, darwin/arm64, Node v24.20.0.
