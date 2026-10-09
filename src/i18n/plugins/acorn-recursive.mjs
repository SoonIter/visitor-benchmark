import { collectionBase } from '../acorn-base.mjs';
import { recursive } from 'acorn-walk';
export function collect(ast, keys) {
  const output = [];
  recursive(ast, null, { Literal(node) { if (typeof node.value === 'string' && keys.has(node.value)) output.push(node.value); } }, collectionBase);
  return output;
}
