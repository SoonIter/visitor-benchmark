import test from 'node:test';
import assert from 'node:assert/strict';
import { engine as i18nEngine } from '../src/i18n/engine.mjs';

// AST value equality alone misses changes to parser object representation.
// Check the actual preparation paths and ensure iterations cannot share edits.
for (const scenario of ['styled-components', 'remove-debugger', 'rstest-coverage']) {
  test(`${scenario}: ESTree inputs are independent parser results without cloning`, async t => {
    t.mock.method(globalThis, 'structuredClone', () => { throw new Error('Benchmark preparation must not clone ASTs'); });
    const { variants } = await import(`../src/${scenario}/registry.mjs`);
    const { load } = await import(`../src/${scenario}/execute.mjs`);
    const { parseESTree } = await import('../src/shared/ast.mjs');
    const source = 'export function f() { debugger; return "key"; }';
    const fixture = { source, filename: 'fixture.js', ast: parseESTree(source) };
    for (const variant of variants.filter(v => v.ast === 'ESTree')) {
      const impl = await load(variant);
      const first = impl.prepare(fixture), second = impl.prepare(fixture);
      assert.deepStrictEqual(first, fixture.ast, variant.id);
      assert.deepStrictEqual(second, fixture.ast, variant.id);
      assert.notStrictEqual(first, second);
      assert.notStrictEqual(first.body[0], second.body[0]);
      first.body[0].declaration.body.body.length = 0;
      assert.deepStrictEqual(second, fixture.ast, variant.id);
    }
  });
}

for (const kind of ['original', 'javascript']) {
  test(`i18n ${kind}: preparation returns independent parser output without cloning`, async t => {
    t.mock.method(globalThis, 'structuredClone', () => { throw new Error('Benchmark preparation must not clone ASTs'); });
    const impl = await i18nEngine('swc-next', kind);
    const fixture = { filename: 'fixture.ts', source: 'export const key = "key";' };
    const first = impl.prepare(fixture), second = impl.prepare(fixture);
    assert.deepStrictEqual(first, second);
    assert.notStrictEqual(first, second);
    assert.notStrictEqual(first.body[0], second.body[0]);
    first.body.length = 0;
    assert.equal(second.body.length, 1);
  });
}
