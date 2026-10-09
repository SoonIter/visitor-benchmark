import { collectionBase } from '../acorn-base.mjs';
import { simple } from 'acorn-walk';
export function collect(ast, keys) {
  const output = [];
  simple(ast, { Literal(node) { if (typeof node.value === 'string' && keys.has(node.value)) output.push(node.value); } }, collectionBase);
  return output;
}
