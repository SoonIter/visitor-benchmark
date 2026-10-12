import j from 'jscodeshift';
import { empty } from '../edit.mjs';
export function run(ast) {
  let changed = 0;
  j(ast).find(j.DebuggerStatement).forEach(path => {
    if (typeof path.name === 'number') path.replace(); else path.replace(empty());
    changed++;
  });
  return { ast, changed };
}
