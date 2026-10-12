import { stateFor, replacementFor } from '../estree-plugin.mjs';
import { walk } from 'estree-walker';
export function run(ast, filename) {
  const state = stateFor(ast, filename);
  ast = walk(ast, { leave(node) {
    if (node.type !== 'VariableDeclarator') return;
    const next = replacementFor(node, state);
    if (next) this.replace(next);
  } });
  return { ast, changed: state.changed };
}
