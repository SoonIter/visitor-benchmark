import { parseSync, printSync } from '@swc/core';
import { Visitor } from '@swc/core/Visitor.js';
export const prepare = source => parseSync(source, { syntax: 'ecmascript', target: 'es2022' });
export const print = ast => printSync(ast).code;
export function run(ast) {
  let changed = 0;
  class Plugin extends Visitor {
    filter(nodes) { return nodes.filter(node => { if (node.type !== 'DebuggerStatement') return true; changed++; return false; }); }
    visitModuleItems(nodes) { return super.visitModuleItems(this.filter(nodes)); }
    visitStatements(nodes) { return super.visitStatements(this.filter(nodes)); }
    visitDebuggerStatement(node) { changed++; return { type: 'EmptyStatement', span: node.span }; }
  }
  return { ast: new Plugin().visitProgram(ast), changed };
}
