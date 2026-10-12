import { stateFor, edit } from '../estree-plugin.mjs';
import { recursive, base } from 'acorn-walk';
export function run(ast,filename) {
 const state=stateFor(ast,filename);
 recursive(ast,null,{VariableDeclarator(node,s,c){base.VariableDeclarator(node,s,c);edit(node,state);}});
 return {ast,changed:state.changed};
}
