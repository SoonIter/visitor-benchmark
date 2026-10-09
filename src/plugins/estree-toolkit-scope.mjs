import { stateFor, edit } from '../estree-plugin.mjs';
import { traverse } from 'estree-toolkit';
export function run(ast,filename) {
 const state=stateFor(ast,filename);
 traverse(ast,{$:{scope:true},VariableDeclarator:{leave(path){edit(path.node,state);}}});
 return {ast,changed:state.changed};
}
