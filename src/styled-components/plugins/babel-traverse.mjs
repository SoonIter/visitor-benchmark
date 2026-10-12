import traverse from '@babel/traverse';
import { stateFor } from '../estree-plugin.mjs';
import { replacementTagForBabel } from '../babel-plugin.mjs';
export { prepare, print } from '../babel-io.mjs';
export function run(ast, filename, noScope = false) {
  const state = stateFor(ast.program, filename);
  traverse(ast, { noScope, VariableDeclarator: { exit(path) {
    const tag = replacementTagForBabel(path.node, state);
    if (tag) path.get('init.tag').replaceWith(tag);
  } } });
  return { ast, changed: state.changed };
}
