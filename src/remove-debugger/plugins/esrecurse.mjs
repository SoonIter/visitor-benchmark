import esrecurse from 'esrecurse';
import { editSlots, parentTypes } from '../edit.mjs';
export function run(ast) {
  const state = { changed: 0 };
  const hooks = Object.fromEntries(parentTypes.map(type => [type, function(node) { editSlots(node, state); this.visitChildren(node); }]));
  new esrecurse.Visitor(hooks).visit(ast);
  return { ast, changed: state.changed };
}
