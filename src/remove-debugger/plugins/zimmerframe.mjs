import { walk } from 'zimmerframe';
import { editSlots, parentTypes } from '../edit.mjs';
export function run(ast) {
  const state = { changed: 0 };
  walk(ast, state, Object.fromEntries(parentTypes.map(type => [type, (node, ctx) => { editSlots(node, state); ctx.next(); }])));
  return { ast, changed: state.changed };
}
