# Diagnostic CPU profiles

These profiles cover styled-components / dense using the current baseline SWC walker and Oxc Visitor. They do not measure the rejected stop-unwind candidate.

- Same original business adapters; SWC uses replacement objects and Oxc edits in place.
- 30 warmup corpora, then 160 pre-parsed corpora. Only engine.run is profiled; no parsing or validation is timed.
- Node inspector, 100 microsecond requested sampling interval. Open the .cpuprofile files in a compatible CPU profile viewer.
- Exclude the initial inspector post/start sample when interpreting function self time. The prepared batch changes heap conditions versus the original benchmark; neither total profile duration nor sampled percentages are leaderboard timings or causal attribution.

Reproduce from the benchmark root (Node 24):

```sh
SWC_NEXT_WALKER_ENTRY="$PWD/results/oxc-target/baseline/index.js" \
  node --expose-gc --import ./scripts/wall/loader.mjs \
  scripts/wall/oxc-target/profile.mjs styled-components swc-next dense
node --expose-gc scripts/wall/oxc-target/profile.mjs styled-components oxc-visitor dense
```
