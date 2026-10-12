import { generate } from 'astring';
import { verifyCode } from '../shared/ast.mjs';
export async function load(variant) {
  const plugin = await import(`./plugins/${variant.id}.mjs`);
  return {
    prepare: f => plugin.prepare ? plugin.prepare(f.source, f.filename) : structuredClone(f.ast),
    run: (ast, f) => plugin.run(ast, f.filename),
    validate(result, f) {
      if (result.changed !== f.count) throw new Error(`${variant.id}: expected ${f.count} removals, got ${result.changed}`);
      return verifyCode(plugin.print ? plugin.print(result.ast) : generate(result.ast), f);
    },
  };
}
