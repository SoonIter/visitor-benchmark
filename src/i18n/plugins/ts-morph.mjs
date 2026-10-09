import { Node } from 'ts-morph';
export function collect(ast, keys) {
  const output = [];
  ast.forEachDescendant(node => { if (Node.isStringLiteral(node) && keys.has(node.getLiteralValue())) output.push(node.getLiteralValue()); });
  return output;
}
