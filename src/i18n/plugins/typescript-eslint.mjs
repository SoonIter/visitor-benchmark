import { simpleTraverse } from '@typescript-eslint/typescript-estree';
export function collect(ast, keys) {
  const output = [];
  simpleTraverse(ast, { visitors: { Literal(node) { if (typeof node.value === 'string' && keys.has(node.value)) output.push(node.value); } } });
  return output;
}
