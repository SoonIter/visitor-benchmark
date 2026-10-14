import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { scenarios } from '../src/scenarios.mjs';
const root = new URL('../', import.meta.url);
for (const scenario of scenarios) {
  execFileSync(process.execPath, scenario.runner === 'mutation'
    ? [new URL('shared/render.mjs', import.meta.url).pathname, scenario.id]
    : [new URL('i18n/render.mjs', import.meta.url).pathname], { stdio: 'inherit' });
}
const styled = JSON.parse(readFileSync(new URL('results/styled-components/latest.json', root)));
const removal = JSON.parse(readFileSync(new URL('results/remove-debugger/latest.json', root)));
const i18n = JSON.parse(readFileSync(new URL('results/i18n/latest.json', root)));
const coverage = JSON.parse(readFileSync(new URL('results/rstest-coverage/latest.json', root)));
const overview = `# JavaScript AST traversal benchmarks

**Four concrete tasks. Same AST within each ESTree track. Validated output on every measured iteration.**

| Scenario | Work | Corpus | Results |
| :-- | :-- | :-- | :-- |
| Styled-components | Inject displayName / componentId | Generated JS; dense + sparse | [Details](docs/styled-components/README.md) |
| Remove debugger | Delete list elements; replace single statement slots | Generated JS; dense + sparse | [Details](docs/remove-debugger/README.md) |
| Rstest coverage | Normalize if branches and describe coverage ranges | Eight public Rstest modules; runtime + tooling | [Details](docs/rstest-coverage/README.md) |
| Collect i18n strings | Read literals, check dictionary, preserve order and duplicates | 64 real TS/TSX modules + pre-transpiled JS | [Details](docs/i18n/README.md) |

Lower is better. Bars show medians of process medians; whiskers show their min–max range, **not confidence intervals**. Compare implementations within a track; do not compare absolute times across scenarios or AST families. Scope analysis, query setup and wrapper work are included where the API performs them.

## 1. Styled-components

A focused config-injection transform, **not the complete official plugin**. Dense: 400 edits; sparse: 80 edits across more unrelated code. The direct-ast baseline exploits top-level declarations and skips unrelated subtrees.

![Styled-components — shared ESTree](charts/styled-components/estree.svg)

Native Babel, SWC and TypeScript ASTs are **not ESTree**; these results are not a same-AST walker ranking.

![Styled-components — native ASTs](charts/styled-components/native.svg)

[All numbers and strategies](results/styled-components/latest.md)

## 2. Remove debugger

Removes consecutive and nested debugger statements. Single statement slots (for example \`if (flag) debugger;\`) become empty statements to preserve control flow. APIs without built-in removal use explicit manual edits, **included in the timer**. See the [strategy table](results/remove-debugger/latest.md#implementations).

![Remove debugger — shared ESTree](charts/remove-debugger/estree.svg)

Native Babel, SWC and TypeScript ASTs are **not ESTree**; these results are not a same-AST walker ranking.

![Remove debugger — native ASTs](charts/remove-debugger/native.svg)

[All numbers and strategies](results/remove-debugger/latest.md)

## 3. Normalize coverage branches

The AST-editing phase of Rstest V8 coverage: wrap unbraced if/else arms and record branch ranges. Eight real modules pinned to a public commit, transpiled once outside timing. Runtime: 101 if statements / 10 edits; tooling: 84 if statements / 21 edits. This is a focused adaptation, not full coverage conversion or instrumentation.

![Rstest coverage — shared ESTree](charts/rstest-coverage/estree.svg)

Native Babel, SWC and TypeScript ASTs are **not ESTree**; their costs include their node representations and native editing APIs.

![Rstest coverage — native ASTs](charts/rstest-coverage/native.svg)

[Contract, boundaries and provenance](docs/rstest-coverage/README.md) · [All numbers and strategies](results/rstest-coverage/latest.md)

## 4. Collect i18n strings

The application's Babel StringLiteral collector, using 18,868 real dictionary keys. No source edits. Original source: 59 matches; pre-transpiled JavaScript: 58 matches. Private source stays outside Git.

Each chart uses the same layout as the editing scenarios: one AST family per image, with original TS/TSX on the left and pre-transpiled JavaScript on the right. Rows align across columns; unsupported combinations have no timing bar.

![i18n — shared ESTree](charts/i18n/estree.svg)

Native Babel and TypeScript ASTs are **not ESTree**; these results are not a same-AST walker ranking.

![i18n — native ASTs](charts/i18n/native.svg)

[Compatibility failures and all results](docs/i18n/results.md) · [Corpus provenance](docs/i18n/corpus.json) · [Historical Acorn/Yuku profiling study](docs/i18n-dispatch/README.md) · [Oxc performance attribution](docs/oxc-attribution/README.md)

The JavaScript compatibility track transforms the same modules before timing so JS-only walkers can participate. It is not captured loader input and must not be compared directly with the original TS/TSX track. Acorn's static destructuring-key collection is covered by a regression fixture.

## Measurement

**Use each tool's native editing API when available.** Replacement, deletion, path maintenance and immutable reconstruction are part of its cost. Node-only APIs use manual edits; direct-ast is the explicit manual baseline. [Full API audit](docs/api-audit.md).

- **ESTree:** fresh Acorn parser output for editing; Oxc TS-ESTree for original i18n and Acorn ESTree for its JavaScript track. Every iteration reparses the source outside timing; no AST cloning or reuse.
- **Native ASTs:** Babel, SWC and TypeScript parse the same source into their own representations, explicitly labeled **not ESTree**. These rows measure both tree layout and API costs.
- **Correctness:** editing results are printed/reparsed and compared against independent expected source or a task oracle; coverage additionally checks exact branch metadata; i18n results are exact ordered arrays checked against Babel. Unsupported implementations are reported, not assigned a zero time.
- **Timing:** isolated processes, sequential execution with rotated/reversed order. Edits: ${styled.config.repetitions} processes × ${styled.config.warmups} warmups + ${styled.config.iterations} samples; i18n: ${i18n.repeats} × ${i18n.warmups} + ${i18n.iterations}. Preparation, external printing and checks are excluded; internal ts-morph text updates and tsquery.map printing/reparsing are included.
- **Evidence:** [styled raw data](results/styled-components/latest.json), [debugger raw data](results/remove-debugger/latest.json), [coverage raw data](results/rstest-coverage/latest.json), [i18n raw data](results/i18n/latest.json) retain samples, source hashes, versions and whole-worker memory. Results are corpus-specific, not a universal performance ceiling.

${styled.environment.cpu} · ${styled.environment.platform}/${styled.environment.arch} · Node ${styled.environment.node}. Measured: styled ${styled.createdAt.slice(0,10)}, debugger ${removal.createdAt.slice(0,10)}, coverage ${coverage.createdAt.slice(0,10)}, i18n ${i18n.timestamp.slice(0,10)}. SWC Next uses the committed PR snapshot recorded in each result; no before/after variants.

Fresh parser output is used for every iteration, without AST cloning. Earlier results through [8143bc9](https://github.com/SoonIter/visitor-benchmark/tree/8143bc994901c2321b31ad271c83bbcb6e5cf4ca) used cloned ASTs in editing and original-source i18n; do not interpret changes from those results as implementation speedups.

The sync script vendors \`@swc-next/walker\` from PR #840; [source mapping](vendor/provenance.json) records its package paths. Package extraction did not change the three runtime files. Published results retain the commit actually measured.

## Run

Node 24+; Python + Matplotlib for charts. The real i18n corpus additionally needs the business checkout and its installed Babel 7 dependencies.

\`\`\`sh
npm ci
npm test
# Editing scenarios are self-contained (public corpus is committed):
npm run bench -- styled-components
npm run bench -- remove-debugger
npm run bench -- rstest-coverage

# Private business corpus:
export FLOW_WEB_ROOT=/absolute/path/to/flow-web-monorepo
npm run i18n:prepare
npm run bench -- i18n

# All four, sequentially (requires the prepared business corpus):
npm run bench

python3 -m venv .cache/charts-venv
.cache/charts-venv/bin/pip install -r scripts/requirements-charts.txt
PYTHON=.cache/charts-venv/bin/python npm run report
\`\`\`

\`--quick\` writes smoke results separately. Runs use the committed SWC Next snapshot; \`npm run sync:swc\` explicitly refreshes PR #840 via GitHub CLI. Rerun tests and all benchmarks after refreshing. \`i18n:prepare\` resamples the current checkout: check corpus hashes before comparing reruns.

## Layout & extension

\`\`\`text
src/
  scenarios.mjs          # Scenario catalog
  shared/                # AST oracle, implementation identities, Babel I/O
  styled-components/     # Workload, registry, plugins
  remove-debugger/       # Workload, registry, plugins
  rstest-coverage/       # Real-source branch normalization and native adapters
  i18n/                  # Corpus, registry, collectors
scripts/
  bench.mjs              # One entry point; sequential scenario execution
  render.mjs             # Generate all reports and this README
  shared/                # Mutation runner, measurement provenance, charts
  styled-components/     # Input AST sample generation
  i18n/                  # Business corpus preparation and read-only runner
results/<scenario>/      # Raw samples and summaries
charts/<scenario>/       # Generated SVG/PNG charts
docs/<scenario>/         # Contracts, methodology and interpretation
experiments/             # Separate profiling/ablation studies
vendor/                  # Pinned SWC Next source and provenance
\`\`\`

To add an editing scenario, implement \`workload.mjs\` (source + independently expected output), \`registry.mjs\` and \`execute.mjs\` (prepare/run/validate), add package-specific modules under \`plugins/\`, then register it in \`src/scenarios.mjs\`. [Extension guide](docs/extending.md) covers runners, validation and reports.

Presentation inspired by [Native ECMAScript Parser Benchmark](https://github.com/yuku-toolchain/ecmascript-parser-benchmark-native).
`;
writeFileSync(new URL('docs/cpu/wall-time-baseline.md', root), overview.replace(/\]\((?!https?:|#)([^)]+)\)/g, '](../../$1)'));
console.log('Updated the wall-time baseline report.');
