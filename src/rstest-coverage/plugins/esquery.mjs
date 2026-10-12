import { createState, estree, editIf, replaceIf } from '../business.mjs';
import esquery from 'esquery';
export function run(ast, fixture) {
  const state = createState(fixture, estree);
  for (const {node} of state.order(esquery(ast, 'IfStatement').map(node => ({node})))) editIf(node, state.plan(node));
  return state.finish(ast);
}
