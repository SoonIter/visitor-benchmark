import { createState, estree, editIf, replaceIf } from '../business.mjs';
import { simple } from 'acorn-walk';
export function run(ast, fixture) {
  const state = createState(fixture, estree), nodes = [];
  simple(ast, { IfStatement(node) { nodes.push({node}); } });
  // These APIs report post-order. Source-order planning preserves ignore semantics.
  for (const {node} of state.order(nodes)) editIf(node, state.plan(node));
  return state.finish(ast);
}
