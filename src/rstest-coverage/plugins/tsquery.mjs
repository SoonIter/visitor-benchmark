import ts from 'typescript';
import { map } from '@phenomnomnominal/tsquery';
import { createState } from '../business.mjs';
import { schema, visitFactory } from '../typescript.mjs';
export { prepare, print } from './typescript.mjs';
export function run(ast, fixture) {
  const state = createState(fixture, schema(ts, ast));
  ast = map(ast, 'IfStatement', node => {
    // map stops descending when a callback returns a replacement. Transform the
    // selected subtree with the compiler API so nested ifs are not lost.
    const result = ts.transform(node, [ctx => root => ts.visitNode(root, visitFactory(ts, state, ctx))]);
    const next = result.transformed[0];
    result.dispose();
    return next;
  });
  return state.finish(ast);
}
