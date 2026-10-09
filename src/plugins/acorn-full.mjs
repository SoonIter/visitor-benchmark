import { stateFor, edit } from '../estree-plugin.mjs';
import { full } from 'acorn-walk';
export function run(ast,filename) {
 const state=stateFor(ast,filename);
 full(ast,node=>{if(node.type==='VariableDeclarator') edit(node,state);});
 return {ast,changed:state.changed};
}
