import { stateFor, edit } from '../estree-plugin.mjs';
import { walk } from 'estree-walker';
export function run(ast,filename) {
 const state=stateFor(ast,filename);
 walk(ast,{leave(node) { if(node.type==='VariableDeclarator') edit(node,state); }});
 return {ast,changed:state.changed};
}
