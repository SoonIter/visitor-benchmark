import traverse from '@babel/traverse';
import { emptyStatement } from '@babel/types';
export { prepare, print } from '../../shared/babel-io.mjs';
export function run(ast) {
  let changed = 0;
  traverse(ast, { noScope: false, DebuggerStatement(path) {
    if (path.inList) path.remove(); else path.replaceWith(emptyStatement());
    changed++;
  } });
  return { ast, changed };
}
