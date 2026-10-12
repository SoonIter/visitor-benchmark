import { implementations } from '../shared/implementations.mjs';
const nativeRemove = new Set(['swc-next', 'yuku-ast', 'estree-walker', 'oxc-walker', 'estraverse', 'estree-toolkit', 'estree-toolkit-scope', 'ast-types', 'jscodeshift', 'babel', 'babel-no-scope']);
export const variants = implementations.map(v => ({ ...v, note:
  nativeRemove.has(v.id) ? 'native remove for lists; replacement for single statement slots' :
  v.id === 'typescript' || v.id === 'tsquery' ? 'compiler transform; undefined for lists, EmptyStatement for single slots' :
  v.id === 'ts-morph' ? 'one SourceFile.transform + factory statement-list updates; internal text synchronization timed' :
  v.id === 'direct-ast' ? 'recursive direct AST edits; no visitor API or child-key table' :
  v.id === 'esquery' ? 'query statement containers + manual slot edits' :
  'native traversal + manual statement-slot edits' }));
