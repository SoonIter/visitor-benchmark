import { walk } from 'estree-walker';
export function collect(ast, keys) {
  const output = [];
  walk(ast, { enter(node) { if (node.type === 'Literal') { if (typeof node.value === 'string' && keys.has(node.value)) output.push(node.value); } } });
  return output;
}
