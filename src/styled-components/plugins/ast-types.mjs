import { stateFor, edit } from '../estree-plugin.mjs';
import { visit } from 'ast-types';
export function run(ast,filename) {
 const state=stateFor(ast,filename);
 visit(ast,{visitVariableDeclarator(path){this.traverse(path);edit(path.node,state);}});
 return {ast,changed:state.changed};
}
