import traverse from '@babel/traverse';
export function collect(ast, keys) {
  const output = [];
  traverse(ast, { StringLiteral(path) { if (keys.has(path.node.value)) output.push(path.node.value); } });
  return output;
}
