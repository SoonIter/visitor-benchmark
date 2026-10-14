# CPU simulation methodology

This branch adapts [SWC Next #747](https://github.com/swc-project/swc-next/pull/747) to the existing visitor benchmarks. It measures the existing business adapters, not a new implementation of each walker.

| Metric | Meaning | Display conversion |
| :-- | :-- | :-- |
| Ir (K) | Executed machine instructions under CodSpeed simulation | raw Ir / 1,000 |
| Ct (K) | Modeled throughput cycles, not elapsed cycles | raw Ct **centi-cycles** / 100,000 |
| Wall (ms) | Elapsed time with normal Node JIT optimizations | Median of process medians |

Lower is better. Ir and Ct are not interchangeable: instructions have different modeled costs. Counts are architecture-specific; do not compare ARM64 counts with x86-64 counts.

## Measurement boundary

Every implementation runs in a separate process. A callback processes one full corpus batch. `beforeEach` parses fresh ASTs; `afterEach` validates every result and disposes compiler contexts. Parsing, external printing, output checks, and explicit pre-measurement GC are excluded. Internal wrapper synchronization, queries, manual edits, and printing/reparsing performed by the adapter remain included.

The simulation uses CodSpeed runner **5.2.1**, `@codspeed/tinybench-plugin` **5.7.1**, and Tinybench **6.1.2**. The plugin executes seven warmups with fresh ASTs, then measures one callback. Three independent processes provide three counter samples. Only positive, complete Ir/Ct records with the exact expected benchmark manifest are accepted.

The paired wall-time control uses the **same batch callback and fresh-parser lifecycle**, eight warmups and twenty samples in each of three processes. Explicit full GC happens after preparation and before timing, as it does in simulation. No other benchmark runs concurrently. Process order is rotated/reversed between repetitions.

The historical wall-time suite parsed and measured one file at a time, without full GC before each sample. Its macOS results are retained in [the baseline report](wall-time-baseline.md). The new Linux paired control is the primary rank comparison; differences from historical numbers also include platform and harness effects.

## What the ranking means

CodSpeed's simulation flags include `--no-opt`, fixed random/hash seeds, predictable GC and disabled concurrent sweeping. Following #747, we additionally pass `--no-maglev`. This differs from normal production JIT execution. A lower Ir or Ct **does not establish faster optimized JavaScript**.

Results retain raw counters and all wall samples. Spearman correlation and ranks are calculated from unrounded medians, within the same input track and exact AST family. Equal values receive average ranks. A high correlation describes the broad ordering; it does not make small gaps significant. Min–max spread across three processes is an observed range, not a confidence interval.

ESTree participants receive fresh output from the same parser per track. Babel, SWC and TypeScript ASTs remain separate families, explicitly labeled not ESTree. Different editing strategies are part of the adapters' costs; read each scenario's API audit. Existing correctness contracts and compatibility outcomes must pass before simulation starts.

## Reproduce on Linux

Use Node 24.20.0 and install the CodSpeed runner v5.2.1 release for your architecture. Verify release SHA-256 checksums. The runner installs its Linux simulation dependencies on first use.

```sh
npm ci
npm test
# Public scenarios, or one implementation, for a smoke run:
npm run bench:cpu -- --match=styled-components/dense/direct-ast \
  --repetitions=1 --work=.cache/cpu-smoke --output=results/tmp/cpu-smoke.json

# Complete suite (requires the existing private i18n corpus):
export FLOW_WEB_ROOT=/absolute/path/to/flow-web-monorepo
npm run bench:cpu

# Render the completed run, including charts:
python3 -m venv .cache/charts-venv
.cache/charts-venv/bin/pip install -r scripts/requirements-charts.txt
PYTHON=.cache/charts-venv/bin/python npm run report
```

`--match` filters the `scenario/track/implementation` identity. Use a different `--work` and `--output` for diagnostics. Interrupted completed repetitions can be reused only with the exact same source/configuration/environment fingerprint. An unfinished simulation directory is rejected; inspect it and use a new directory. Reports refuse incomplete datasets.

On a local Linux VM without the business checkout, use the committed Babel 7 dependency replay:

```sh
mkdir -p .cache/babel7-replay
cp scripts/cpu/babel7/package*.json .cache/babel7-replay/
npm ci --prefix .cache/babel7-replay
export FLOW_WEB_ROOT="$PWD/.cache/babel7-replay"
```

This pins parser/traverse 7.27.3 and types 7.28.6, matching the business-resolved direct versions. Its full transitive graph is recorded in a dedicated lockfile; it is a dependency replay, not the original business installation. Source, dictionary, order and expected outputs come from the **existing** ignored `.cache/i18n/corpus.json`; do not regenerate the corpus when comparing runs.

On macOS, use a local Ubuntu 24.04 ARM64 VM (for example Lima with Apple's Virtualization framework), copy the checkout into its Linux filesystem, and run `npm ci` there. Do not reuse macOS native `node_modules`. The private corpus stays on the same computer. The current run uses four virtual CPUs and 8 GiB of RAM; measurements run serially.

## Evidence and privacy

`results/cpu/latest.json` records source hashes, versions, flags, validation hashes, raw counts, wall samples and hashes of the Callgrind profiles. `summary.json` contains unrounded aggregate metrics and rank correlations. Full profiles and intermediate records remain under ignored `.cache/cpu/` because profiles may contain private business symbol names. No source, dictionaries, or profiles are uploaded: `CODSPEED_SKIP_UPLOAD=true`, with `GITHUB_ACTIONS` unset, follows #747's local-mode workflow.

The report does not assert that instruction counts are perfectly deterministic. The repeated measurements show their actual variation alongside wall time.
