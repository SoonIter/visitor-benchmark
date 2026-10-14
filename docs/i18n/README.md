# Read-only AST visitor benchmark

Collect real i18n keys from **64 business modules** using **30 JavaScript traversal variants**. Based on the application's actual Rspack loader; no source edits or code generation inside the benchmark.

[Historical wall time & compatibility](results.md) · [Corpus manifest](corpus.json) · [Collector implementations](../../src/i18n/plugins) · [Styled-components benchmark](../styled-components/README.md)

[Acorn vs Yuku: CPU profiles and controlled ablations](../i18n-dispatch/README.md) explain the historical measured gap. The main benchmark now includes the static destructuring-key fix; the study keeps its original measured source.

## The task

```js
const usedKeys = [];
traverse(ast, {
  StringLiteral(path) {
    if (allKeysSet.has(path.node.value)) usedKeys.push(path.node.value);
  },
});
```

All string literal positions count, including nested code, imports and object keys. Preserve order and duplicates. This requires neither scope analysis nor AST editing.

Case names identify the API and Babel major version: the **babel-traverse** prefix means **@babel/traverse**; **babel-types** means **@babel/types**. The **v7** cases use business-resolved versions (a locked dependency replay in the Linux CPU run); **v8** uses this benchmark's pinned dependencies.

## Results

[Ir/Ct numbers and paired wall time](../cpu/results.md) · [Method and reproduction](../cpu/README.md) · [Comparison with the previous wall-time ranking](../cpu/historical-ranks.md)

Three independent CPU samples per supported combination. Lower Ir (K) and Ct (K) are better. Ct is a model cost, not hardware elapsed cycles; simulation disables optimizing JIT. Each chart has Ir on the left and Ct on the right.

![original: shared ESTree](../../charts/cpu/i18n-original-estree.svg)

![javascript: shared ESTree](../../charts/cpu/i18n-javascript-estree.svg)

<details>
<summary>Native ASTs — not an ESTree comparison</summary>

![original: native ASTs](../../charts/cpu/i18n-original-native.svg)

![javascript: native ASTs](../../charts/cpu/i18n-javascript-native.svg)

</details>

Native Babel, SWC and TypeScript rows include their own AST representation and API costs. Unsupported combinations have no bar. Compare within each input track and AST family.

## Corpus & measurement

- **231.2 KiB** of original source: 40 TS + 24 TSX files, deterministically sampled from four application layers, without selecting by match count. 11 files contain matches.
- **18,868 dictionary keys**, from the actual domestic configuration (`zh` + `zh-Hant`). Original source: **59 matches**; JavaScript: **58 matches**. No synthetic i18n strings are injected.
- ESTree participants receive fresh, structurally identical parser output on every iteration, without cloning: Oxc TS-ESTree for original source, Acorn ESTree for JavaScript. Babel, SWC and TypeScript participants prepare their own ASTs, explicitly labeled **not ESTree**.
- **CPU:** three isolated samples, each after seven warmups. **Paired wall time:** three processes, eight warmups and twenty samples. Both measure one complete 64-file batch; preparation, explicit pre-measurement GC and validation stay outside the measured region.
- Fresh parsing/AST preparation occurs **outside each timed collection** to avoid warm NodePath/scope caches. Hook construction, scope analysis when enabled, traversal, `Set.has` and result allocation are timed. GC during collection is included.
- Ordered arrays are checked against the Babel oracle per file, every iteration. The oracle was also checked against the business repository's installed Babel 7.27.3. Unsupported or mismatching implementations are excluded, not assigned zero time.
- Corpus parity is not universal Babel compatibility. In particular, ESTree `Literal` includes directive strings, while Babel `StringLiteral` excludes directives. The actual dictionary/corpus passes; adapting arbitrary future inputs needs a separate semantic audit.

These measurements use SWC Next snapshot **[a4c4343](https://github.com/swc-project/swc-next/commit/a4c4343d5ed4863884521ed96209d5e56dfd56df)**. No before/after variants. `direct-ast` recursively inspects AST properties itself, with no package visitor or visitor-key table; it does not assume top-level declarations. The removed `handwritten` case is not restored.

Fresh parser output is used for every iteration, without AST cloning. Earlier results through [8143bc9](https://github.com/SoonIter/visitor-benchmark/tree/8143bc994901c2321b31ad271c83bbcb6e5cf4ca) used cloned ASTs in editing and original-source i18n; do not interpret changes from those results as implementation speedups.

## CPU reproduction

See [CPU setup](../cpu/README.md) for Linux, pinned tools and the private corpus. To check this scenario without overwriting the full published result:

```sh
npm run bench:cpu -- --match=i18n/ --work=.cache/cpu-i18n --output=results/tmp/cpu-i18n.json
```

The commands below reproduce the **historical wall-time runner**. Its results and environment are kept for comparison.

## Reproduce

Requires Node 24+, the local business checkout (source + locale files), and its installed Babel dependencies. Private source and dictionary values remain in ignored `.cache/i18n/`; only paths, hashes and aggregate results are tracked.

```sh
npm ci
export FLOW_WEB_ROOT=/absolute/path/to/flow-web-monorepo
npm run i18n:prepare
npm test
npm run i18n:validate
npm run i18n:bench
python3 -m venv .cache/charts-venv
.cache/charts-venv/bin/pip install -r scripts/requirements-charts.txt
PYTHON=.cache/charts-venv/bin/python npm run i18n:report
```

`i18n:bench` uses the committed SWC Next snapshot. `npm run sync:swc` refreshes PR #840 via `gh`. For the committed snapshot, run `node scripts/i18n/bench.mjs` directly. `i18n:prepare` intentionally resamples the current checkout; compare its manifest hashes before treating reruns as the same corpus.

Historical wall time measured on **Apple M5 Max · darwin arm64 · Node v24.20.0**. The sample contains original repository source, not captured loader inputs or a full Rspack build. [Historical raw samples](../../results/i18n/latest.json) include preparation time, heap, process RSS and peak RSS.
