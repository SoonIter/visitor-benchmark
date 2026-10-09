import estraverse from 'estraverse';
export function collect(ast, keys) {
  const output = [];
  estraverse.traverse(ast, { enter(node) { if (node.type === 'Literal') { if (typeof node.value === 'string' && keys.has(node.value)) output.push(node.value); } } });
  return output;
}
