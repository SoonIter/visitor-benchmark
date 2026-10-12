import { createState, estree, editIf, replaceIf } from '../business.mjs';
import { walk } from 'estree-walker';
export function run(ast, fixture) {
  const state = createState(fixture, estree);
  ast = walk(ast, { enter(node) {
    if (node.type !== 'IfStatement') return;
    const plan = state.plan(node);
    if (plan?.skip) return this.skip();
    const next = replaceIf(node, plan, state);
    if (next) this.replace(next);
  } });
  return state.finish(ast);
}
