import { stateFor, replacementTagFor } from '../estree-plugin.mjs';
import { visit } from 'ast-types';
export function run(ast, filename) {
  const state = stateFor(ast, filename);
  ast = visit(ast, { visitVariableDeclarator(path) {
    this.traverse(path);
    const tag = replacementTagFor(path.node, state);
    if (tag) path.get('init', 'tag').replace(tag);
  } });
  return { ast, changed: state.changed };
}
