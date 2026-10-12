import { stateFor, replacementTagFor } from '../estree-plugin.mjs';
import j from 'jscodeshift';
export function run(ast, filename) {
  const state = stateFor(ast, filename);
  j(ast).find(j.VariableDeclarator).forEach(path => {
    const tag = replacementTagFor(path.node, state);
    if (tag) path.get('init', 'tag').replace(tag);
  });
  return { ast, changed: state.changed };
}
