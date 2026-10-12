import { stateFor, replacementTagFor } from '../estree-plugin.mjs';
import { traverse } from 'estree-toolkit';
export function run(ast, filename) {
  const state = stateFor(ast, filename);
  traverse(ast, { $: { scope: false }, VariableDeclarator: { leave(path) {
    const tag = replacementTagFor(path.node, state);
    if (tag) path.get('init').get('tag').replaceWith(tag);
  } } });
  return { ast, changed: state.changed };
}
