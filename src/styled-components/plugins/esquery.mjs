import { stateFor, edit } from '../estree-plugin.mjs';
import esquery from 'esquery';
export function run(ast,filename) {
 const state=stateFor(ast,filename);
 for(const node of esquery(ast,'VariableDeclarator')) edit(node,state);
 return {ast,changed:state.changed};
}
