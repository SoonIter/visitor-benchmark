import { traverse } from 'estree-toolkit';
export function collect(ast, keys) {
  const output = [];
  traverse(ast, { $: { scope: true }, Literal(path) { const node = path.node; if (typeof node.value === 'string' && keys.has(node.value)) output.push(node.value); } });
  return output;
}
