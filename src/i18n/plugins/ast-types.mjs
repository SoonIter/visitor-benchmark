import { visit } from 'ast-types';
export function collect(ast, keys) {
  const output = [];
  visit(ast, { visitLiteral(path) { const node = path.node; if (typeof node.value === 'string' && keys.has(node.value)) output.push(node.value); return false; } });
  return output;
}
