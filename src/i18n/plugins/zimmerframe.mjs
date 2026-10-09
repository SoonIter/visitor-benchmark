import { walk } from 'zimmerframe';
export function collect(ast, keys) {
  const output = [];
  walk(ast, null, { Literal(node) { if (typeof node.value === 'string' && keys.has(node.value)) output.push(node.value); } });
  return output;
}
