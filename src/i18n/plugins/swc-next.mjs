import { walk } from '../../../vendor/swc-next/ast.js';
export function collect(ast, keys) {
  const output = [];
  walk(ast, { Literal(node) { if (typeof node.value === 'string' && keys.has(node.value)) output.push(node.value); } });
  return output;
}
