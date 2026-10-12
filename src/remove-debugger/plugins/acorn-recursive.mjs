import { recursive, base } from 'acorn-walk';
import { editSlots, parentTypes } from '../edit.mjs';
export function run(ast) {
 const state = { changed: 0 };
 recursive(ast, state, Object.fromEntries(parentTypes.map(type => [type, (node, state, next) => { editSlots(node, state); base[type](node, state, next); }])));
 return { ast, changed: state.changed };
}
