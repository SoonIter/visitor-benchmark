import { generate } from 'astring';
import { parseESTree } from '../shared/ast.mjs';
import { pluginPath } from './registry.mjs';
import { verifyCode } from './workload.mjs';
export async function load(variant) {
 const plugin=await import(pluginPath(variant.id));
 return {
  prepare(fixture){return plugin.prepare?plugin.prepare(fixture.source,fixture.filename):parseESTree(fixture.source);},
  run(ast,fixture){return plugin.run(ast,fixture.filename);},
  validate(result,fixture){
   if(result.changed!==fixture.count)throw new Error(`${variant.id}: expected ${fixture.count} edits, got ${result.changed}`);
   return verifyCode(plugin.print?plugin.print(result.ast):generate(result.ast),fixture);
  },
 };
}
