# Adding a scenario

Keep task semantics separate from traversal libraries. A plugin implements one task with one package's actual API; do not route every library through a universal visitor adapter.

## Editing API policy

- Use native removal/replacement when offered: context/path operations, return-value transforms or documented bulk transforms. Do not replace them with raw property assignments or array splices just to equalize algorithms.
- Node-only walkers and query APIs without editing support may modify AST slots manually. Scalar updates are distinct from structural replacement. The direct-ast baseline is intentionally manual.
- Follow immutable APIs by returning replacements and using the returned root. Do not mutate their inputs.
- Include internal work performed by public APIs, including TSQuery map printing/reparsing and ts-morph text synchronization. Label these costs explicitly.
- Equal task semantics and output do not require identical algorithms. Experimental equal-algorithm controls are diagnostic, not contestant implementations. See the [complete audit](api-audit.md).

## Editing scenarios

1. Add `src/<scenario>/workload.mjs`: export `corpus(kind, small)` returning `{ filename, source, expected, count, ast }` fixtures. Author expected code independently of the tested plugins. Reuse `src/shared/ast.mjs` for parsing, canonical comparison and SHA-256.
2. Add `registry.mjs` with `{ id, ast, group, note }` rows. Shared library identities are in `src/shared/implementations.mjs`; strategy notes belong to each task. Explicitly label non-ESTree inputs.
3. Add `plugins/<id>.mjs`: `run(ast, filename)` returns `{ ast, changed, dispose? }`. Native-AST plugins additionally export `prepare(source, filename)` and `print(ast)`. See remove-debugger for native removals versus manual edits.
4. Add `execute.mjs`: `load(variant)` returns `prepare(fixture)`, `run(ast, fixture)` and `validate(result, fixture)`. Validation must check the edit count and the entire output against the independent expectation, returning a comparable hash.
5. Register the scenario in `src/scenarios.mjs` with `runner: 'mutation'`. Add contract tests under `test/`, including negative controls and every supported edit position. Extend the report's task description/example and overview for the new scenario.
6. Run a quick smoke test, then a full run. `scripts/shared/bench.mjs` and `worker.mjs` own process isolation, rotated order, timing, fresh AST preparation, output parity, memory and source provenance. Results live under `results/<scenario>/`; never promote quick results to published results.

The mutation runner defaults to `dense` and `sparse`. Export `tracks` from the workload for other cohorts, as rstest-coverage does with `runtime` and `tooling`. Keep four files per cohort for the existing renderer/worker reporting contract, and document the corpus and validation boundaries.

## Read-only scenarios

The i18n runner is separate because it checks ordered values instead of printed edited ASTs and handles unsupported parser/schema combinations explicitly. Follow its `engine`, `corpus`, `registry` and `plugins` pattern. Add a runner entry to the catalog/CLI when the output contract differs. Keep private input outside Git; publish hashes, aggregate counts and the selection recipe.

## Evidence and reports

- Prepare the same ESTree once logically and supply structurally identical fresh trees to every compatible implementation. Record input hashes to detect drift.
- Preserve native ASTs when the API requires them. They are a different comparison group, never evidence of a same-AST speedup.
- Include API-specific costs needed to complete the task: queries, manual editing, scope work and wrapper text updates. Exclude parse/print only when they are outside the actual measured API call.
- A correctness failure is not a timing. Fix the implementation or record incompatibility; never silently narrow the contract.
- Generate charts from saved samples; require complete repetitions and sample counts. Record median-of-process-medians and range, and avoid asserting stable wins when ranges overlap.
- Commit code before measuring. Raw results include source hashes captured at measurement time, plus the Git commit and dirty state. Reports must not fabricate a new provenance manifest for old measurements.
- `experiments/` contains historical causal studies, not extra production benchmark contestants. Preserve measured source snapshots when changing mainline implementations.
