import { stateFor, replacementFor } from '../estree-plugin.mjs';
import estraverse from 'estraverse';
export function run(ast, filename) {
  const state = stateFor(ast, filename);
  ast = estraverse.replace(ast, { leave(node) {
    if (node.type === 'VariableDeclarator') return replacementFor(node, state) ?? undefined;
  } });
  return { ast, changed: state.changed };
}
