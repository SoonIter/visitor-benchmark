import { stateFor, edit } from '../estree-plugin.mjs';
import estraverse from 'estraverse';
export function run(ast,filename) {
 const state=stateFor(ast,filename);
 estraverse.traverse(ast,{leave(node){if(node.type==='VariableDeclarator') edit(node,state);}});
 return {ast,changed:state.changed};
}
