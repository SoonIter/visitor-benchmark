import { createState, estree, editIf, replaceIf } from '../business.mjs';
import { simpleTraverse } from '@typescript-eslint/typescript-estree';
export function run(ast, fixture) {
  const state = createState(fixture, estree);
  simpleTraverse(ast, { enter(node) { if (node.type === 'IfStatement') editIf(node, state.plan(node)); } });
  return state.finish(ast);
}
