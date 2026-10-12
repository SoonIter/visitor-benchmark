import { createState, estree, editIf, replaceIf } from '../business.mjs';
import { visit, SKIP } from 'estree-util-visit';
export function run(ast, fixture) {
  const state = createState(fixture, estree);
  visit(ast, node => {
    if (node.type !== 'IfStatement') return;
    const plan = state.plan(node);
    if (plan?.skip) return SKIP;
    editIf(node, plan);
  });
  return state.finish(ast);
}
