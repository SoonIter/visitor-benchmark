import { createState, estree, editIf, replaceIf } from '../business.mjs';
import j from 'jscodeshift';
import { extend } from '../ast-types-schema.mjs';
extend(j.types);
export function run(ast, fixture) {
  const state = createState(fixture, estree);
  const edits = state.order(j(ast).find(j.IfStatement).paths()).map(path => ({ path, plan: state.plan(path.node) }));
  // Apply descendants first, before ancestor replacement invalidates their paths.
  for (const {path, plan} of edits.reverse()) {
    for (const [i, block] of plan?.replacements ?? []) path.get(i ? 'alternate' : 'consequent').replace(block);
  }
  return state.finish(ast);
}
