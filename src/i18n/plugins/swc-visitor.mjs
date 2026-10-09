import { Visitor } from '@swc/core/Visitor.js';
export function collect(ast, keys) {
  const output = [];
  class Collector extends Visitor {
    visitStringLiteral(node) { if (keys.has(node.value)) output.push(node.value); return node; }
  }
  new Collector().visitProgram(ast);
  return output;
}
