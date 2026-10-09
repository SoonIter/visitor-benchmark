import esquery from 'esquery';
export function collect(ast, keys) {
  const output = [];
  for (const node of esquery(ast, 'Literal')) { if (typeof node.value === 'string' && keys.has(node.value)) output.push(node.value); }
  return output;
}
