import { visit } from 'estree-util-visit';
import { stateFor, edit } from '../estree-plugin.mjs';
export function run(ast,filename){
 const state=stateFor(ast,filename);
 visit(ast,{leave(node){if(node.type==='VariableDeclarator')edit(node,state);}});
 return {ast,changed:state.changed};
}
