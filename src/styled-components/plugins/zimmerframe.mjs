import { stateFor, replacementFor } from '../estree-plugin.mjs';
import { walk } from 'zimmerframe';
export function run(ast, filename) {
  const state = stateFor(ast, filename);
  ast = walk(ast, state, { VariableDeclarator(node, ctx) {
    const visited = ctx.next();
    return replacementFor(visited ?? node, state) ?? visited;
  } });
  return { ast, changed: state.changed };
}
