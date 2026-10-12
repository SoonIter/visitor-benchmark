import { createState, estree, editIf, replaceIf } from '../business.mjs';
import { visit } from 'ast-types';
import * as types from 'ast-types';
import { extend } from '../ast-types-schema.mjs';
extend(types);
export function run(ast, fixture) {
  const state = createState(fixture, estree);
  ast = visit(ast, { visitIfStatement(path) {
    const plan = state.plan(path.node);
    if (plan?.skip) return false;
    for (const [i, block] of plan?.replacements ?? []) path.get(i ? 'alternate' : 'consequent').replace(block);
    this.traverse(path);
  } });
  return state.finish(ast);
}
