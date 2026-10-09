import { Visitor } from 'oxc-parser';
export function collect(ast, keys) {
  const output = [];
  new Visitor({ Literal(node) { if (typeof node.value === 'string' && keys.has(node.value)) output.push(node.value); } }).visit(ast);
  return output;
}
