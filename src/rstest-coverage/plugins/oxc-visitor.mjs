import { createState, estree, editIf, replaceIf } from '../business.mjs';
import { Visitor } from 'oxc-parser';
export function run(ast, fixture) {
  const state = createState(fixture, estree);
  new Visitor({ IfStatement(node) { editIf(node, state.plan(node)); } }).visit(ast);
  return state.finish(ast);
}
