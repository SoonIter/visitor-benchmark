import test from 'node:test';
import assert from 'node:assert/strict';
import { engine } from '../src/i18n/engine.mjs';
import { variants } from '../src/i18n/registry.mjs';
import { keys, source, expected } from '../src/i18n/fixture.mjs';
for (const { id } of variants.filter(v => !v.id.endsWith('-v7'))) {
  test(`i18n ${id}: nested strings, static keys, order, duplicates, non-matches and templates`, async () => {
    const impl = await engine(id, 'javascript');
    const actual = impl.collect(impl.prepare({filename: 'fixture.js', source}), keys);
    if (id === 'swc-visitor') {
      // A documented incompatibility: its method body precedes the key.
      assert.deepEqual(actual, [...expected.slice(0, 6), 'nested-key', 'title-key']);
      assert.notDeepEqual(actual, expected);
    } else assert.deepEqual(actual, expected);
  });
}
for (const id of ['swc-next', 'yuku-ast', 'oxc-walker', 'oxc-visitor', 'babel-traverse-v8', 'babel-types-traverse-fast-v8', 'typescript', 'tsquery', 'ts-morph']) {
  test(`i18n ${id}: TS literal types and JSX attributes`, async () => {
    const impl = await engine(id, 'original');
    const ast = impl.prepare({ filename: 'fixture.tsx', source: `type Key = 'title-key'; export const view = <div title="nested-key">{'title-key'}</div>;` });
    assert.deepEqual(impl.collect(ast, keys), ['title-key', 'nested-key', 'title-key']);
  });
}
