import { full, base } from 'acorn-walk';
import { editSlots, parentTypes } from '../edit.mjs';
export function run(ast) {
 const state = { changed: 0 };
 full(ast, node => editSlots(node, state));
 return { ast, changed: state.changed };
}
