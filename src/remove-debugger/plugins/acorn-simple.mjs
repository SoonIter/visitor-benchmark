import { simple, base } from 'acorn-walk';
import { editSlots, parentTypes } from '../edit.mjs';
export function run(ast) {
 const state = { changed: 0 };
 simple(ast, Object.fromEntries(parentTypes.map(type => [type, node => editSlots(node, state)])));
 return { ast, changed: state.changed };
}
