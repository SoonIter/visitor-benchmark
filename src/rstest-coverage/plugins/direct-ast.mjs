import { createState, estree, editIf, replaceIf } from '../business.mjs';
export function run(ast, fixture) {
  const state = createState(fixture, estree);
  function visit(node) {
    if (!node || typeof node.type !== 'string') return;
    if (node.type === 'IfStatement') {
      const plan = state.plan(node);
      if (plan?.skip) return;
      editIf(node, plan);
    }
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) for (const child of value) visit(child);
      else if (value && typeof value === 'object') visit(value);
    }
  }
  visit(ast);
  return state.finish(ast);
}
