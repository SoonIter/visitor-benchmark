import { walk } from '../../../vendor/swc-next/ast.js';
import { empty } from '../edit.mjs';
export function run(ast) {
  let changed = 0;
  walk(ast, { DebuggerStatement(node, ctx) {
    if (ctx.index === null) ctx.replace(empty()); else ctx.remove();
    changed++;
  } });
  return { ast, changed };
}
