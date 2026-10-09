import { stateFor, edit } from '../estree-plugin.mjs';
import { simple } from 'acorn-walk';
export function run(ast,filename) {
 const state=stateFor(ast,filename);
 simple(ast,{VariableDeclarator(node){edit(node,state);}});
 return {ast,changed:state.changed};
}
