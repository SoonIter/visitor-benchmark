import { parseSync, printSync } from '@swc/core';
import { Visitor } from '@swc/core/Visitor.js';
import { createState } from '../business.mjs';
export function prepare(source) {
  const offsets = [0, 0];
  let bytes = 1, utf16 = 0;
  for (const char of source) {
    const length = Buffer.byteLength(char);
    for (let i = 0; i < length; i++) offsets[bytes + i] = utf16;
    bytes += length; utf16 += char.length; offsets[bytes] = utf16;
  }
  return { ast: parseSync(source, { syntax: 'ecmascript', target: 'es2022' }), offsets };
}
export const print = ast => printSync(ast).code;
export function run({ ast, offsets }, fixture) {
  const state = createState(fixture, {
    start: node => offsets[node.span.start], end: node => offsets[node.span.end],
    arms: node => [node.consequent, node.alternate],
    isBlock: node => node.type === 'BlockStatement',
    block: node => ({ type: 'BlockStatement', span: { ...node.span }, ctxt: 0, stmts: [node] }),
  });
  class Coverage extends Visitor {
    visitIfStatement(node) {
      const plan = state.plan(node);
      if (plan?.skip) return node;
      if (plan?.replacements.length) {
        node = { ...node };
        for (const [i, block] of plan.replacements) node[i ? 'alternate' : 'consequent'] = block;
      }
      return super.visitIfStatement(node);
    }
  }
  return state.finish(new Coverage().visitProgram(ast));
}
