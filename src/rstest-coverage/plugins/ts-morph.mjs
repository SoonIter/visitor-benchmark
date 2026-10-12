import { ts } from 'ts-morph';
import { createState } from '../business.mjs';
import { schema, update } from '../typescript.mjs';
export { prepare, print } from '../../styled-components/plugins/ts-morph.mjs';
export function run(file, fixture) {
  const state = createState(fixture, schema(ts, file.compilerNode));
  file.transform(traversal => {
    const node = traversal.currentNode;
    const plan = ts.isIfStatement(node) ? state.plan(node) : null;
    if (plan?.skip) return node;
    const visited = traversal.visitChildren();
    return ts.isIfStatement(visited) ? update(ts, visited, plan) : visited;
  });
  return state.finish(file);
}
