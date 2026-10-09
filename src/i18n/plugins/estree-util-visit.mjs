import { visit } from 'estree-util-visit';
export function collect(ast, keys) {
  const output = [];
  visit(ast, node => { if (node.type === 'Literal') { if (typeof node.value === 'string' && keys.has(node.value)) output.push(node.value); } });
  return output;
}
