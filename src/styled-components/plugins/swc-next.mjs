import { stateFor, replacementFor } from '../estree-plugin.mjs';
import { walk } from '../../../vendor/swc-next/ast.js';
export function run(ast, filename) {
  const state = stateFor(ast, filename);
  walk(ast, { VariableDeclarator: { leave(node, ctx) {
    const next = replacementFor(node, state);
    if (next) ctx.replace(next);
  } } });
  return { ast, changed: state.changed };
}
