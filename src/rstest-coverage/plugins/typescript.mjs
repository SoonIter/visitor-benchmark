import ts from 'typescript';
import { createState } from '../business.mjs';
import { schema, visitFactory } from '../typescript.mjs';
export { prepare, print } from '../../styled-components/plugins/typescript.mjs';
export function run(ast, fixture) {
  const state = createState(fixture, schema(ts, ast));
  const result = ts.transform(ast, [ctx => root => ts.visitNode(root, visitFactory(ts, state, ctx))]);
  return state.finish(result.transformed[0], () => result.dispose());
}
