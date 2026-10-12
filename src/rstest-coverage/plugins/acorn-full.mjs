import { createState, estree, editIf, replaceIf } from '../business.mjs';
import { full } from 'acorn-walk';
export function run(ast, fixture) {
  const state = createState(fixture, estree), nodes = [];
  full(ast, node => { if (node.type === 'IfStatement') nodes.push({node}); });
  // These APIs report post-order. Source-order planning preserves ignore semantics.
  for (const {node} of state.order(nodes)) editIf(node, state.plan(node));
  return state.finish(ast);
}
