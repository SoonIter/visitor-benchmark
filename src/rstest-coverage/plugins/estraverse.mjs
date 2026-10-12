import { createState, estree, editIf, replaceIf } from '../business.mjs';
import estraverse from 'estraverse';
export function run(ast, fixture) {
  const state = createState(fixture, estree);
  ast = estraverse.replace(ast, { enter(node) {
    if (node.type !== 'IfStatement') return;
    const plan = state.plan(node);
    if (plan?.skip) return estraverse.VisitorOption.Skip;
    return replaceIf(node, plan, state) ?? undefined;
  } });
  return state.finish(ast);
}
