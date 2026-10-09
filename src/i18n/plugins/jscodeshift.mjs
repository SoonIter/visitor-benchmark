import j from 'jscodeshift';
export function collect(ast, keys) {
  const output = [];
  j(ast).find(j.Literal).forEach(path => { const node = path.node; if (typeof node.value === 'string' && keys.has(node.value)) output.push(node.value); });
  return output;
}
