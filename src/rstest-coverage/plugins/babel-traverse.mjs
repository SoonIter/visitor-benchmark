import { createState, estree, editIf, replaceIf } from '../business.mjs';
import traverse from '@babel/traverse';
export { prepare, print } from '../../shared/babel-io.mjs';
export function run(ast, fixture, noScope = false) {
  const state = createState(fixture, estree);
  traverse(ast, { noScope, IfStatement(path) {
    const plan = state.plan(path.node);
    if (plan?.skip) return path.skip();
    for (const [i, block] of plan?.replacements ?? []) path.get(i ? 'alternate' : 'consequent').replaceWith(block);
  } });
  return state.finish(ast);
}
