import { createState, estree, editIf, replaceIf } from '../business.mjs';
import { walk } from 'zimmerframe';
export function run(ast, fixture) {
  const state = createState(fixture, estree);
  ast = walk(ast, state, { IfStatement(node, ctx) {
    const plan = state.plan(node);
    if (plan?.skip) return;
    const visited = ctx.next();
    const current = visited ?? node;
    if (!plan?.replacements.length) return visited;
    const next = { ...current };
    for (const [i, block] of plan.replacements) {
      const key = i ? 'alternate' : 'consequent';
      next[key] = { ...block, body: [current[key]] };
    }
    return next;
  } });
  return state.finish(ast);
}
