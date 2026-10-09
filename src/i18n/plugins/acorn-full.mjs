import { collectionBase } from '../acorn-base.mjs';
import { full } from 'acorn-walk';
export function collect(ast, keys) {
  const output = [];
  full(ast, node => { if (node.type === 'Literal') { if (typeof node.value === 'string' && keys.has(node.value)) output.push(node.value); } }, collectionBase);
  return output;
}
