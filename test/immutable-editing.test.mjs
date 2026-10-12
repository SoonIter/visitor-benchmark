import test from 'node:test';
import assert from 'node:assert/strict';
import { load as loadStyled } from '../src/styled-components/execute.mjs';
import { load as loadRemoval } from '../src/remove-debugger/execute.mjs';
import { corpus as styledCorpus } from '../src/styled-components/workload.mjs';
import { corpus as removalCorpus } from '../src/remove-debugger/workload.mjs';
for (const [scenario, load, corpus] of [
  ['styled-components', loadStyled, styledCorpus],
  ['remove-debugger', loadRemoval, removalCorpus],
]) test(`zimmerframe ${scenario}: preserves input and returns a new root`, async () => {
  const engine = await load({ id: 'zimmerframe' });
  for (const fixture of corpus('dense', true)) {
    const input = engine.prepare(fixture);
    const before = engine.prepare(fixture);
    const result = engine.run(input, fixture);
    assert.notEqual(result.ast, input);
    assert.deepEqual(input, before);
    assert.match(engine.validate(result, fixture), /^[a-f0-9]{64}$/);
  }
});
