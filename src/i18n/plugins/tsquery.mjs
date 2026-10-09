import { tsquery } from '@phenomnomnominal/tsquery';
export function collect(ast, keys) {
  const output = [];
  for (const node of tsquery(ast, 'StringLiteral')) if (keys.has(node.text)) output.push(node.text);
  return output;
}
