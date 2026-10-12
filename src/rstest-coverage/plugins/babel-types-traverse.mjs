import { createState, estree, editIf, replaceIf } from '../business.mjs';
import { traverse } from '@babel/types';
export { prepare, print } from '../../shared/babel-io.mjs';
export function run(ast, fixture) {
  const state = createState(fixture, estree);
  traverse(ast, { enter(node) { if (node.type === 'IfStatement') editIf(node, state.plan(node)); } });
  return state.finish(ast);
}
