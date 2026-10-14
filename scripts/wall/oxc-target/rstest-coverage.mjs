import { createState, estree, editIf, replaceIf } from '../../../src/rstest-coverage/business.mjs';
import { walk } from '../../../vendor/swc-next/ast.js';
export function run(ast, fixture) {
  const state = createState(fixture, estree);
  walk(ast, { IfStatement(node) { editIf(node, state.plan(node)); } });
  return state.finish(ast);
}
