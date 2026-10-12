import { createState, estree, editIf, replaceIf } from '../business.mjs';
import { walk } from '../../../vendor/swc-next/ast.js';
export function run(ast, fixture) {
  const state = createState(fixture, estree);
  walk(ast, { IfStatement(node, ctx) {
    const plan = state.plan(node);
    if (plan?.skip) return ctx.skip();
    const next = replaceIf(node, plan, state);
    if (next) ctx.replace(next);
  } });
  return state.finish(ast);
}
