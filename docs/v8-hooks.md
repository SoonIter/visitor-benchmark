# Follow-up: editing context and V8 inlining

**No additional runtime change retained.** The accepted implementation remains `da1432ed`; six further implementations passed walker tests but did not consistently improve its original business workloads. Experimental VM flags are diagnostics, not leaderboard results.

The [accepted optimization](v8-walker.md) remains verified: seven paired rounds, 252 processes, 6.7–33.4% reductions in per-track paired median wall time against `4a30364d`, with full editing support. Eight tracks improve; two have lower medians than Oxc Visitor, and sparse debugger removal is approximately tied. This does not establish universal superiority or a performance ceiling.

## Evidence and experiments

- **Coverage remains dispatch-heavy.** The SWC runtime profile has 18.5 ms of `dispatchNode` self samples out of 41.2 ms selected samples; `visitHooks` has 1.4 ms and `invoke` 0.3 ms. The sample is a diagnostic pre-parsed batch, not the ranking worker. Inlined work can be attributed to callers.
- **Reducing argument count was insufficient.** `short-call` used two-argument child functions while keeping positions in the dispatcher. Its dispatcher grew to 26,084 bytes of optimized code, and the original-worker screen showed no reliable overall gain. `action` returned shared hook handlers to the caller that already held positions; it also failed the performance gate. Both retained edits and lifecycle semantics.
- **Fewer ancestor-stack updates did not mean faster execution.** `parent-stack` pushed once per parent with present fields; `eager-parent` pushed for every schema non-leaf. Oxc's ancestor-tracking generator uses the per-parent approach, although the benchmark's public Oxc Visitor has no ancestor tracking. Counters predict 30–49% fewer updates for the lazy version on *untransformed input trees*. They are not counts of work performed after business replacements. Both variants regressed, so neither was adopted.
- **Typed-field specialization has limited coverage.** Schema-derived single-kind fields cover only 6.7–7.3% of input nodes in coverage and 24.9% in dense styled-components. The metadata/counter experiment was not promoted into a runtime optimization.
- **Inlining frequency is observable, but changing VM flags is not a product fix.** The normal dispatcher inlined only `walkIdentifier` in the captured coverage run. With `--min-inlining-frequency=0`, it inlined six functions, including member/property traversal and scalar visitation. Raising only the absolute inlining-size limit did not establish a comparable gain; this does not rule out every other size/budget constraint.
- **Smaller dispatch groups did not solve it.** `buckets` added a generic indirect call through an array of traversal functions. `static-buckets` used direct calls instead. Neither beat the accepted version consistently under default V8 settings. Packed callback storage in Oxc should not be confused with dynamically dispatching every traversal function.

V8's frequency filter is visible in [the Node 24.0 V8 source](https://github.com/nodejs/node/blob/v24.0.0/deps/v8/src/compiler/js-inlining-heuristic.cc#L250). That source is explanatory; the observed flags, traces and measurements are from the installed Node **24.20.0 / V8 13.6.233.17-node.53**. Changing a VM flag can also affect parsing, allocation and other code; the diagnostic timings do not isolate one function's contribution.

## Screening results

Change against `da1432ed`, using a median of three process medians. Negative is faster. These are screening estimates, not confidence intervals. Different experiments ran at different times; compare each candidate with its own paired baseline, not with another experiment's absolute timing.

| Candidate | Styled dense | Coverage runtime | i18n TS/TSX | i18n JS |
|---|---:|---:|---:|---:|
| short-call | +0.9% | -0.3% | -0.8% | +4.5% |
| action | -2.2% | +6.6% | +5.6% | +2.1% |
| parent-stack | +5.6% | +17.6% | +3.8% | +11.6% |
| eager-parent | +11.6% | +19.8% | +1.5% | +15.5% |
| buckets | +25.9% | +12.5% | +9.7% | +2.9% |
| static-buckets | +6.8% | +11.4% | +5.8% | +6.2% |
| inline-budget | +7.0% | -2.1% | — | -1.2% |
| inline-frequency | -6.4% | -3.4% | — | -13.6% |

The first six rows are implementations; the last two use unchanged source with a diagnostic flag. All eight original tracks were screened for every implementation. Replacements, removals, insertions, skip/stop, ancestor positions, hook order and retained/reentrant context semantics stayed covered by the walker tests. None of the rejected versions remains in the package or vendored benchmark runtime.

## Reproduce

```sh
# Original normal-JIT workers, latest accepted baseline; output separately.
node scripts/wall/v8-hooks/bench.mjs \
  --baseline=results/v8-walker/candidate/index.js \
  --candidate=/path/to/swc-next/packages/walker/index.js \
  --repetitions=3 --output=.cache/walker-screen.json

# Diagnostic only: compare identical source under two V8 configurations.
node scripts/wall/v8-hooks/bench.mjs \
  --baseline=results/v8-walker/candidate/index.js \
  --candidate=results/v8-walker/candidate/index.js \
  --candidate-flags='["--min-inlining-frequency=0"]' \
  --tracks=styled-components/dense,rstest-coverage/runtime,i18n/javascript \
  --repetitions=3 --output=.cache/walker-inline-diagnostic.json

node scripts/wall/v8-hooks/edges.mjs
```

[Raw results and rejected patches](../results/v8-hooks/) · [Coverage CPU profiles](../results/v8-hooks/profiles/) · [Normal V8 trace](../results/v8-hooks/coverage-v8.log) · [Frequency diagnostic trace](../results/v8-hooks/inline-frequency-v8.log) · [Current-state audit](../results/v8-hooks/completion-audit.json).

Patches are relative to `da1432ed` and include generated files. Reapply only in a disposable checkout, then regenerate with `cargo run -p ast_tools`. `metadata.patch` is the source of the diagnostic schema-field table, not a performance candidate. The follow-up records 486 processes: six implementations × eight tracks × three participants × three rounds, plus two three-track VM diagnostics. Each completed run verifies AST/input/output parity and source hashes before and after measurement.

Final readback matched the worktree and vendored runtime byte-for-byte with the accepted source snapshot. The original business adapters and workers still match the seven-round comparison. Restored-source validation passed 23 walker unit tests, type checks, two integration tests and 127 benchmark tests. The historical main charts were not rewritten.
