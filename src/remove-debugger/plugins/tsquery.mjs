import ts from 'typescript';
import { map } from '@phenomnomnominal/tsquery';
import { inList } from '../typescript.mjs';
export { prepare, print } from './typescript.mjs';
export function run(ast) {
  let changed = 0;
  ast = map(ast, 'DebuggerStatement', node => {
    changed++;
    return inList(ts, node) ? undefined : ts.factory.createEmptyStatement();
  });
  return { ast, changed };
}
