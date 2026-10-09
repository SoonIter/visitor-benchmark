import { stateFor, edit } from '../estree-plugin.mjs';
import { walk } from 'yuku-ast';
export function run(ast,filename) {
 const state=stateFor(ast,filename);
 walk(ast,{VariableDeclarator:{leave(node) {edit(node,state);}}});
 return {ast,changed:state.changed};
}
