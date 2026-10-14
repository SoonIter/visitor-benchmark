import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Adapted from swc-project/swc-next#747. Ct is stored in centi-cycles.
export const inThousands = (metric, count) => count / (metric === 'Ct' ? 100_000 : 1_000);
export function parseProfile(text) {
  const results = new Map();
  for (const part of text.split(/^part: /m).slice(1)) {
    const trigger = part.match(/^desc: Trigger: Client Request: ([^\r\n]+)$/m)?.[1];
    if (!trigger || trigger.startsWith('Metadata:') || !trigger.includes('::')) continue;
    const name = trigger.slice(trigger.indexOf('::') + 2);
    const events = part.match(/^events:\s*(.+)$/m)?.[1].trim().split(/\s+/);
    const totals = part.match(/^totals:([^\r\n]*)$/m)?.[1].trim();
    assert.ok(events?.includes('Ir') && events.includes('Ct') && totals !== undefined, `Incomplete profile: ${name}`);
    const values = totals ? totals.split(/\s+/) : [];
    assert.ok(values.length <= events.length && values.every(v => /^\d+$/.test(v)), `Invalid counters: ${name}`);
    const counts = {};
    for (const metric of ['Ir', 'Ct']) {
      counts[metric] = Number(values[events.indexOf(metric)] ?? '0');
      assert.ok(Number.isSafeInteger(counts[metric]) && counts[metric] > 0, `Invalid ${metric}: ${name}`);
    }
    assert.ok(!results.has(name), `Duplicate benchmark: ${name}`);
    results.set(name, counts);
  }
  return results;
}
export function loadProfiles(directory, expected) {
  const results = new Map();
  for (const file of readdirSync(directory).filter(f => f.endsWith('.out')))
    for (const [name, counts] of parseProfile(readFileSync(join(directory, file), 'utf8'))) {
      assert.ok(!results.has(name), `Duplicate benchmark: ${name}`);
      results.set(name, counts);
    }
  assert.deepEqual([...results.keys()].sort(), [...expected].sort(), 'Missing or unexpected profile measurements');
  return results;
}
export const median = values => {
  assert.ok(values.length);
  const sorted = values.toSorted((a, b) => a - b), middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};
// Average ranks handle exact ties. Correlation is computed only within an AST family.
export function ranks(values) {
  const sorted = values.map((value, index) => ({ value, index })).sort((a, b) => a.value - b.value), out = [];
  for (let i = 0; i < sorted.length;) {
    let end = i + 1;
    while (end < sorted.length && sorted[end].value === sorted[i].value) end++;
    for (let j = i; j < end; j++) out[sorted[j].index] = (i + end + 1) / 2;
    i = end;
  }
  return out;
}
export function spearman(a, b) {
  assert.equal(a.length, b.length);
  if (a.length < 2) return null;
  const x = ranks(a), y = ranks(b), mean = (a.length + 1) / 2;
  let xy = 0, xx = 0, yy = 0;
  for (let i = 0; i < x.length; i++) { xy += (x[i]-mean)*(y[i]-mean); xx += (x[i]-mean)**2; yy += (y[i]-mean)**2; }
  return xx && yy ? xy / Math.sqrt(xx * yy) : null;
}
