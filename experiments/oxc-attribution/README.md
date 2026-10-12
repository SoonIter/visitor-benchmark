# Oxc traversal attribution

Local ablations of `oxc-walker@1.1.1` and `oxc-parser@0.153.0`'s JavaScript `Visitor`. These are diagnostic controls, not new contestants in the main benchmark.

```sh
node experiments/oxc-attribution/generate.mjs
node experiments/oxc-attribution/audit.mjs
node experiments/oxc-attribution/bench.mjs --validate
node experiments/oxc-attribution/bench.mjs
python3 experiments/oxc-attribution/summarize.py
node --expose-gc experiments/oxc-attribution/profile.mjs walker-stock i18n-javascript
node --expose-gc experiments/oxc-attribution/profile.mjs visitor-stock i18n-javascript
python3 experiments/oxc-attribution/flamegraphs.py
```

Run timings alone, with no other benchmark or profiler running. Profiles use reused ASTs and are diagnostic only; the benchmark reparses fresh ASTs outside every timed iteration. Business i18n inputs remain in the ignored local cache; public debugger/styled fixtures are generated from tracked sources.

`generate.mjs` copies the installed traversal implementations into `.cache/oxc-attribution/`; it does not modify installed packages. `generated.json` records source hashes. The benchmark records generator/harness hashes and input/output hashes. Existing published measurements are unchanged.

## Controls

| Control | Change | Boundary |
|---|---|---|
| Walker clone | Copy synchronous implementation unchanged | Checks extraction and harness differences |
| Walker keys | `for…in` → `Object.keys` iteration | Same early guards, edits, and callbacks |
| Walker no-meta-skip | Remove the early `type/start/end` skip | Still rejects non-object values |
| Walker fresh-context | Create `{key,index,ast}` per node | Same edits; no claim about actual V8 heap allocation |
| Walker readonly | Remove saving/resetting/testing/restoring edit flags | **Does not support skip/remove/replace**; i18n only |
| Walker parent-exit | Delete debugger through parent statement slots on leave | Same edit helper and timing of edits as Visitor |
| Visitor clone | Generated walker plus original hook compiler | Checks alternate entry-point overhead |
| Visitor keys | Replace consecutive known-field calls with schema-key loops | Same schema, dispatch, hooks, and child order |
| Visitor generic | Call a type-filtering hook for every node | Same generated fields; shared named handler slots + type filter; no 165-hook registration penalty |
| Direct for-in | Change only original direct debugger loop enumeration | Same deletion algorithm |
| Direct guarded | Add early metadata and object guards | Compared with direct for-in |
| Compact JS AST | Disable Acorn `locations/ranges` while parsing the same JS | Metadata and resulting object layout both change |

All edit outputs are printed, reparsed, and checked against independently generated expected programs, outside timing. Every read-only output is checked in order and the input AST is hashed before/after. `audit.mjs` checks stock Oxc node identity/occurrence parity and exact generated direct-field/key-loop visit order. The runner includes per-file hook construction; absolute times need not equal the main benchmark's separately collected results.

The copied code remains under its upstream MIT licenses: [oxc-walker](https://github.com/oxc-project/oxc-walker/blob/main/LICENCE), [Oxc](https://github.com/oxc-project/oxc/blob/main/LICENSE). Generated local copies are ignored, and must retain upstream attribution if distributed.

## Object-shape control

The published edit benchmark uses `structuredClone(fixture.ast)`. The first attribution run uses newly parsed Acorn nodes, so its absolute ranking is not a replication of that chart. Run the same controls on fresh clones to test this preparation difference:

```sh
node experiments/oxc-attribution/clone-bench.mjs --validate
node experiments/oxc-attribution/clone-bench.mjs
node --allow-natives-syntax experiments/oxc-attribution/shape.cjs > results/oxc-attribution/v8-shapes.txt
```

Both preparations retain the same serialized AST, including `loc/range`. Cloning can still change prototypes and V8 object layout. `shape.cjs` inspects only public fixture nodes. V8 internals are diagnostic evidence for this Node version, not a JavaScript API guarantee.

## Type-string control and report

```sh
node experiments/oxc-attribution/shape-bench.mjs
node --allow-natives-syntax experiments/oxc-attribution/strings.cjs > results/oxc-attribution/v8-strings.txt
python3 experiments/oxc-attribution/summarize.py fresh
python3 experiments/oxc-attribution/summarize.py cloned
python3 experiments/oxc-attribution/shape-summary.py
# Profile arguments: API, i18n track, parsed/cloned/interned.
node --expose-gc experiments/oxc-attribution/profile.mjs visitor-stock i18n-original interned
python3 experiments/oxc-attribution/flamegraphs.py
.cache/charts-venv/bin/python experiments/oxc-attribution/chart.py
python3 experiments/oxc-attribution/report.py
```

`shape-bench.mjs` compares fresh parser output, fresh clones, clones with canonical `type` values, and clones with a self-assignment pass. Canonical strings come from a shared property-name pool. Input hashes must be identical across all four preparations. Normalization is outside timing: it is an attribution experiment, not a full-pipeline speedup. Assigning a canonical string can also change V8 field constness/feedback, so the experiment does not isolate string-comparison instructions from every other VM effect.
