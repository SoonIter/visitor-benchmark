import { traverse } from '@babel/types';
export function collect(ast, keys) {
  const output = [];
  traverse(ast, { enter(node) { if (node.type === 'StringLiteral' && keys.has(node.value)) output.push(node.value); } });
  return output;
}
