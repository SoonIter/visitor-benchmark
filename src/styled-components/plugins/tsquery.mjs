import ts from 'typescript';
import { map } from '@phenomnomnominal/tsquery';
import { stateForTS, editTS } from '../ts-plugin.mjs';
export { prepare, print } from './typescript.mjs';
export function run(ast, filename) {
  const state = stateForTS(ts, ast, filename);
  // map() includes its own printing/reparsing; those costs stay in the timer.
  ast = map(ast, 'VariableDeclaration', node => editTS(ts, ts.factory, node, state));
  return { ast, changed: state.changed };
}
