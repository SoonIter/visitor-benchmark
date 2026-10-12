import { createState, estree, editIf, replaceIf } from '../business.mjs';
import { traverse } from 'estree-toolkit';
export function run(ast, fixture) {
  const state = createState(fixture, estree);
  traverse(ast, { $: { scope: true }, IfStatement(path) {
    const plan = state.plan(path.node);
    if (plan?.skip) return path.skip();
    for (const [i, block] of plan?.replacements ?? []) path.get(i ? 'alternate' : 'consequent').replaceWith(block);
  } });
  return state.finish(ast);
}
