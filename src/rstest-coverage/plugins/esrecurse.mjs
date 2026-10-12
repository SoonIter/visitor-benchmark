import { createState, estree, editIf, replaceIf } from '../business.mjs';
import esrecurse from 'esrecurse';
export function run(ast, fixture) {
  const state = createState(fixture, estree);
  new esrecurse.Visitor({ IfStatement(node) {
    const plan = state.plan(node);
    if (plan?.skip) return;
    editIf(node, plan);
    this.visitChildren(node);
  } }).visit(ast);
  return state.finish(ast);
}
