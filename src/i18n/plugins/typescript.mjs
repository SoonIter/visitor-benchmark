import ts from 'typescript';
export function collect(ast, keys) {
  const output = [];
  function visit(node) { if (ts.isStringLiteral(node) && keys.has(node.text)) output.push(node.text); ts.forEachChild(node, visit); }
  visit(ast);
  return output;
}
