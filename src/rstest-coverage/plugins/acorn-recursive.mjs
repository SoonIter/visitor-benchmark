import { createState, estree, editIf, replaceIf } from '../business.mjs';
import { recursive, base } from 'acorn-walk';
export function run(ast, fixture) {
  const state = createState(fixture, estree);
  recursive(ast, state, { IfStatement(node, _, next) {
    const plan = state.plan(node);
    if (plan?.skip) return;
    editIf(node, plan);
    base.IfStatement(node, state, next);
  } });
  return state.finish(ast);
}
