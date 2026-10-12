import { Visitor } from 'oxc-parser';
import { editSlots, parentTypes } from '../edit.mjs';
export function run(ast) {
  const state = { changed: 0 };
  new Visitor(Object.fromEntries(parentTypes.map(type => [type + ':exit', node => editSlots(node, state)]))).visit(ast);
  return { ast, changed: state.changed };
}
