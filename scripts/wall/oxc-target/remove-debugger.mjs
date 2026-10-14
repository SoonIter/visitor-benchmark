import { walk } from '../../../vendor/swc-next/ast.js';
import { editSlots, parentTypes } from '../../../src/remove-debugger/edit.mjs';
export function run(ast) {
  const state = { changed: 0 };
  walk(ast, Object.fromEntries(parentTypes.map(type => [type, {leave(node) {editSlots(node,state);}}])));
  return { ast, changed: state.changed };
}
