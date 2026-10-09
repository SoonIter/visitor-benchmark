import esrecurse from 'esrecurse';
export function collect(ast, keys) {
  const output = [];
  esrecurse.visit(ast, { Literal(node) { if (typeof node.value === 'string' && keys.has(node.value)) output.push(node.value); } });
  return output;
}
