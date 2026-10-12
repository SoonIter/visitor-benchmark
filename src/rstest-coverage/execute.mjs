import assert from 'node:assert/strict';
import { generate } from 'astring';
import { canonical, parseESTree, digest } from '../shared/ast.mjs';
export async function load(variant) {
  const plugin = await import(`./plugins/${variant.id}.mjs`);
  return {
    prepare: f => plugin.prepare ? plugin.prepare(f.source, f.filename) : structuredClone(f.ast),
    run: (ast, f) => plugin.run(ast, f),
    validate(result, f) {
      assert.equal(result.changed, f.count, `${variant.id}: replacement count`);
      assert.deepEqual(result.metadata, f.metadata, `${variant.id}: branch metadata`);
      const actual = canonical(parseESTree(plugin.print ? plugin.print(result.ast) : generate(result.ast)));
      assert.equal(actual, f.expected, `${variant.id}: normalized AST`);
      return digest(actual + JSON.stringify(result.metadata));
    },
  };
}
