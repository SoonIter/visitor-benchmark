import estraverse from 'estraverse';
import { empty, listParents } from '../edit.mjs';
export function run(ast) {
  let changed = 0;
  ast = estraverse.replace(ast, { enter(node, parent) {
    if (node.type !== 'DebuggerStatement') return;
    changed++;
    return listParents[parent.type] ? estraverse.VisitorOption.Remove : empty();
  } });
  return { ast, changed };
}
