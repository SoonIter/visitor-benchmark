import { traverse } from 'estree-toolkit';
import { empty } from '../edit.mjs';
export function run(ast) {
  let changed = 0;
  traverse(ast, { $: { scope: false }, DebuggerStatement(path) {
    if (path.listKey != null) path.remove(); else path.replaceWith(empty());
    changed++;
  } });
  return { ast, changed };
}
