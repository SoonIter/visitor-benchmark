import { traverseFast } from '@babel/types';
import { editSlots } from '../edit.mjs';
export { prepare, print } from '../../shared/babel-io.mjs';
export function run(ast) {
  const state = { changed: 0 };
  traverseFast(ast, node => editSlots(node, state));
  return { ast, changed: state.changed };
}
