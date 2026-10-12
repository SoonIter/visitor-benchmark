import { visit } from 'ast-types';
import { empty } from '../edit.mjs';
export function run(ast) {
  let changed = 0;
  visit(ast, { visitDebuggerStatement(path) {
    if (typeof path.name === 'number') path.replace(); else path.replace(empty());
    changed++;
    return false;
  } });
  return { ast, changed };
}
