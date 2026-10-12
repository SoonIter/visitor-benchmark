import esquery from 'esquery';
import { editSlots, parentTypes } from '../edit.mjs';
export function run(ast) {
  const state = { changed: 0 };
  for (const node of esquery(ast, parentTypes.join(', '))) editSlots(node, state);
  return { ast, changed: state.changed };
}
