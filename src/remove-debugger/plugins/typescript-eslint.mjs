import { simpleTraverse } from '@typescript-eslint/typescript-estree';
import { editSlots } from '../edit.mjs';
export function run(ast) {
  const state = { changed: 0 };
  simpleTraverse(ast, { enter(node) { editSlots(node, state); } });
  return { ast, changed: state.changed };
}
