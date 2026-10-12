import { walk } from 'zimmerframe';
import { isDebugger, empty, listParents, singleParents, parentTypes } from '../edit.mjs';
export function run(ast) {
  const state = { changed: 0 };
  ast = walk(ast, state, Object.fromEntries(parentTypes.map(type => [type, (node, ctx) => {
    const visited = ctx.next();
    node = visited ?? node;
    let replacement;
    const key = listParents[type];
    if (key && node[key].some(isDebugger)) {
      replacement = { ...node, [key]: node[key].filter(child => {
        if (!isDebugger(child)) return true;
        state.changed++;
        return false;
      }) };
    }
    for (const key of singleParents[type] ?? []) {
      if (!isDebugger(node[key])) continue;
      replacement ??= { ...node };
      replacement[key] = empty();
      state.changed++;
    }
    // Zimmerframe has no remove sentinel. Return a new parent with edited slots.
    return replacement ?? visited;
  }])));
  return { ast, changed: state.changed };
}
