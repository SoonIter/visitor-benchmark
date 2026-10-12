import test from 'node:test';
import assert from 'node:assert/strict';
import { variants } from '../src/remove-debugger/registry.mjs';
import { corpus, fixture, canonical } from '../src/remove-debugger/workload.mjs';
import { load } from '../src/remove-debugger/execute.mjs';
for (const variant of variants) test(`remove-debugger ${variant.id}: lists, consecutive edits, required slots and nested bodies`, async () => {
  const engine = await load(variant);
  for (const f of [...corpus('dense', true), fixture('unchanged.js', 'export const text = "debugger;"; function f() { return 1; }')]) {
    const before = canonical(f.ast);
    const result = engine.run(engine.prepare(f), f);
    try { assert.match(engine.validate(result, f), /^[a-f0-9]{64}$/); }
    finally { result.dispose?.(); }
    assert.equal(canonical(f.ast), before);
  }
});
