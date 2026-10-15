# V8-guided walker optimization

Full editing support retained. **Two of eight workloads have lower medians than Oxc Visitor in this run; sparse debugger removal is approximately tied.** This is not an overall victory over Oxc.

SWC `da1432ed` vs `4a30364d`; Oxc parser/Visitor 0.153.0. Node v24.20.0, V8 13.6.233.17-node.53, Apple M5 Max. Seven rotated/reversed rounds, 252 isolated processes including matched-operation controls. Original workers, warmups, fixtures and plugin implementations are unchanged. Parsing and validation stay outside timing; ordinary `walk`, including hook compilation, stays inside.

## Wall time

Milliseconds per corpus; lower is better. Values are medians of seven process medians. Improvement is the median **paired per-round reduction against previous SWC**, not a speedup factor or a confidence interval.

| Workload | Previous SWC | Current SWC | Oxc Visitor | Paired reduction |
|---|---:|---:|---:|---:|
| styled-components / dense | 0.667 | **0.622** | 0.462 | 6.7% |
| styled-components / sparse | 0.675 | **0.554** | 0.668 | 23.4% |
| remove-debugger / dense | 0.236 | **0.215** | 0.180 | 10.7% |
| remove-debugger / sparse | 0.365 | **0.316** | 0.313 | 12.9% |
| rstest-coverage / runtime | 0.300 | **0.263** | 0.189 | 10.8% |
| rstest-coverage / tooling | 0.251 | **0.230** | 0.168 | 8.2% |
| i18n / original | 1.758 | **1.051** | 1.331 | 33.4% |
| i18n / javascript | 0.761 | **0.707** | 0.615 | 8.0% |

Current SWC wins 7/7 rounds against Oxc for sparse styled-components and 6/7 for original i18n. The original i18n track still calls the full editing-capable `walk`; it does not substitute the read-only API. Its input is Oxc TS-ESTree, shared by the participants. Other tracks use shared Acorn ESTree.

<details>
<summary>Process-median ranges and noise</summary>

| Workload | Previous SWC | Current SWC | Oxc Visitor |
|---|---:|---:|---:|
| styled-components / dense | 0.653–0.713 | 0.596–0.730 | 0.435–0.583 |
| styled-components / sparse | 0.552–0.782 | 0.468–0.599 | 0.614–0.753 |
| remove-debugger / dense | 0.231–0.253 | 0.203–0.225 | 0.169–0.209 |
| remove-debugger / sparse | 0.355–0.379 | 0.304–0.342 | 0.298–0.324 |
| rstest-coverage / runtime | 0.288–0.312 | 0.257–0.286 | 0.183–0.203 |
| rstest-coverage / tooling | 0.248–0.267 | 0.226–0.384 | 0.161–0.231 |
| i18n / original | 1.487–2.269 | 1.014–1.565 | 1.299–1.500 |
| i18n / javascript | 0.715–0.819 | 0.666–0.781 | 0.593–0.650 |

This desktop had other active applications. Processes run serially; other applications were not stopped and CPU frequency was not controlled. Ranges overlap on some tracks. The original i18n reduction is 40.2% if calculated from aggregate medians, but 33.4% using paired round ratios; use the latter as the less optimistic summary. Sparse debugger removal is within about 1% of Oxc and should be treated as tied.

</details>

## What the profiler established

1. **Dynamic dispatch was a hot path.** In the sparse debugger diagnostic, `visit` accounted for 28.1 of 67.1 ms of selected CPU samples. V8 feedback showed megamorphic `node.type` / `walkers[node.type]` loads and a generic indirect call. `visitScalar` / `visitList` were already being inlined, so merely removing helper functions was not the answer.
2. **Private fields were not inherently the problem.** Context field accesses were monomorphic; the ancestor array used `PACKED_ELEMENTS`. GC-related invalidations occurred, but these logs do not identify their root cause or justify removing context.
3. **Large string switches were comparison chains.** The optimized ARM64 output for Oxc `walkNode` and our first dispatcher contained consecutive string-reference comparisons. The accepted generator groups node kinds by name length, then compares full names within each group. The numeric outer switch compiled to a jump table (`adr` / indexed `ldr` / `br x16`). Each node kind also gets its own property access and call feedback site.
4. **The hotspot reduction survives a separate profile.** In the original i18n diagnostic, old `visit` had 52.7 ms of self samples. Current `dispatchNode` plus `visit` had 31.2 ms; all selected traversal/business/GC samples fell from 76.0 to 48.4 ms. Sampling supports the mechanism; the original-worker measurements above determine performance.

Profiles pre-parse a bounded batch (160 editing corpora or 40 i18n corpora), then sample only the traversal phase. The summary excludes inspector startup and unrelated frames. This changes heap residency and is **not** the ranking harness. Self samples also move when V8 inlines functions; do not interpret percentages as independently removable costs.

## What we learned from Oxc

- Generated field access and per-type functions give V8 stable optimization sites.
- Compiled hooks use packed numeric slots; leaf nodes store a callback directly, while non-leaves use enter/exit pairs. Multiple callbacks are merged into unrolled functions.
- The public `Visitor` creates its own compiled array. Comments about global reuse in shared compiler code must not be confused with its actual lifetime.
- Packed arrays are useful, but not a universal win: adding numeric routes regressed this walker, and adding packed slots to the length dispatcher did not establish a further consistent gain. Neither variant was retained. Holey arrays are **not** synonymous with dictionary/hash-map arrays.

Sources: [Oxc Visitor introduction #13930](https://github.com/oxc-project/oxc/pull/13930), [generated walker size change #17176](https://github.com/oxc-project/oxc/pull/17176), [V8 elements kinds](https://v8.dev/blog/elements-kinds), [V8 fast properties](https://v8.dev/blog/fast-properties). The exact benchmark implementation is the installed `oxc-parser@0.153.0`, not a speculative reconstruction of Oxc.

## Remaining gap

Dense styled-components and coverage still favor Oxc. Their original adapters do different work: SWC creates replacement nodes and uses `ctx.replace`, while Oxc mutates fields. We retained those adapters and all editing semantics.

Matched-operation controls reuse Oxc's business helpers and hook positions with SWC's full `walk`. They still leave a gap, so business implementation does **not** explain everything:

| Matched workload | Previous SWC | Current SWC | Oxc Visitor |
|---|---:|---:|---:|
| styled-components / dense | 0.590 | 0.557 | 0.462 |
| styled-components / sparse | 0.553 | 0.473 | 0.668 |
| remove-debugger / dense | 0.279 | 0.251 | 0.180 |
| remove-debugger / sparse | 0.428 | 0.360 | 0.313 |
| rstest-coverage / runtime | 0.277 | 0.252 | 0.189 |
| rstest-coverage / tooling | 0.255 | 0.225 | 0.168 |

The candidate adds roughly 30 KB of generated source. Module loading and startup are outside this benchmark; other engines and Node versions were not measured. Replacement, removal, insertion, skip/stop, aliases, ancestry, callback lifetime and reentrancy are unchanged. No AST tags, callback-arity heuristics, runtime code generation or read-only substitution were introduced. The separate read-only `visit` implementation is unchanged.

## Reproduce and inspect

```sh
# Immutable accepted code; preserves the historical main leaderboard samples.
node scripts/wall/v8-walker/bench.mjs \
  --candidate=results/v8-walker/candidate/index.js \
  --repetitions=7 --matched=true --output=.cache/v8-walker-repeat.json

# CPU profile: parsing/setup outside the sampled batch.
SWC_NEXT_WALKER_ENTRY="$PWD/results/v8-walker/candidate/index.js" \
node --expose-gc --import ./scripts/wall/loader.mjs \
  scripts/wall/v8-walker/profile.mjs remove-debugger swc-next sparse \
  .cache/walker-profile 160

# Internal exports are added only to a temporary diagnostic copy.
node scripts/wall/v8-walker/feedback.mjs results/v8-walker/candidate/index.js

SWC_NEXT_WALKER_ENTRY="$PWD/results/v8-walker/candidate/index.js" \
node --print-opt-code --print-opt-code-filter=dispatchNode --expose-gc \
  --import ./scripts/wall/loader.mjs \
  scripts/shared/worker.mjs remove-debugger swc-next sparse 8 20
```

[Raw paired runs](../results/v8-walker/comparison.json) · [Accepted source and hashes](../results/v8-walker/candidate/provenance.json) · [CPU profiles](../results/v8-walker/profiles/) · [Baseline IC feedback](../results/v8-walker/baseline-feedback.log) · [Oxc optimized code](../results/v8-walker/oxc-opt-code.log) · [Accepted optimized code](../results/v8-walker/length-opt-code.log).

The study also retains the rejected linear-dispatch, numeric-route and packed-slot patches and their three-round screening results. Screening runs happened at different times; they are not directly interchangeable with the final seven-round comparison. Validation passed: 23 walker unit tests, type checks, two integration tests, `ast_tools` Clippy, 127 benchmark tests with the accepted candidate injected through the loader, and input/AST/output hashes across all 252 measured processes.
