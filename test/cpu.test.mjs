import test from 'node:test';
import assert from 'node:assert/strict';
import { parseProfile, inThousands, ranks, spearman } from '../scripts/cpu/metrics.mjs';
import { jobs, task } from '../scripts/cpu/task.mjs';
const profile = 'part: 1\ndesc: Trigger: Client Request: file.mjs::styled-components/dense/direct-ast\nevents: Ct Ir unused\ntotals: 12300000 123456\n';
test('CPU counters preserve event order and centi-cycle units; malformed/missing counters fail', () => {
  const counts = [...parseProfile(profile).values()][0];
  assert.deepEqual(counts, { Ir: 123456, Ct: 12300000 });
  assert.equal(inThousands('Ir', counts.Ir), 123.456);
  assert.equal(inThousands('Ct', counts.Ct), 123);
  assert.throws(() => parseProfile(profile + profile), /Duplicate/);
  assert.throws(() => parseProfile(profile.replace('Ct Ir', 'Dr Ir')), /Incomplete/);
  assert.throws(() => parseProfile(profile.replace('12300000', '-1')), /Invalid/);
  assert.throws(() => parseProfile(profile.replace('12300000 123456', '12300000')), /Invalid Ir/);
});
test('rank correlation handles reversed rankings and ties', () => {
  assert.deepEqual(ranks([30, 10, 10]), [3, 1.5, 1.5]);
  assert.equal(spearman([1, 2, 3], [6, 5, 4]), -1);
  assert.equal(spearman([1, 1, 3], [2, 2, 8]), 1);
  assert.equal(spearman([1, 1], [2, 3]), null);
});
test('CPU mutation batches start fresh and validate the complete corpus every invocation', async () => {
  const job = (await jobs()).find(j => j.name === 'remove-debugger/dense/estree-walker');
  const work = await task(job);
  work.prepare(); work.run(); work.validate(); const expected = work.outputHash;
  work.prepare(); work.run(); work.validate(); assert.equal(work.outputHash, expected);
});
