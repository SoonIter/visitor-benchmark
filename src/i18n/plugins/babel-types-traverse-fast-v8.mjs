import { traverseFast } from '@babel/types';
export function collect(ast, keys) {
  const output = [];
  traverseFast(ast, node => { if (node.type === 'StringLiteral' && keys.has(node.value)) output.push(node.value); });
  return output;
}
