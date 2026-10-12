import { walk } from 'oxc-walker';
import { empty } from '../edit.mjs';
export function run(ast) {
  let changed = 0;
  walk(ast, { enter(node, parent, { index }) {
    if (node.type !== 'DebuggerStatement') return;
    if (index == null) this.replace(empty()); else this.remove();
    changed++;
  } });
  return { ast, changed };
}
