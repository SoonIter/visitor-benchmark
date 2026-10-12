import { visit, SKIP } from 'estree-util-visit';
import { empty } from '../edit.mjs';
export function run(ast) {
  let changed = 0;
  visit(ast, (node, key, index, ancestors) => {
    if (node.type !== 'DebuggerStatement') return;
    const parent = ancestors.at(-1);
    changed++;
    if (index === undefined) { parent[key] = empty(); return SKIP; }
    parent[key].splice(index, 1);
    return [SKIP, index];
  });
  return { ast, changed };
}
