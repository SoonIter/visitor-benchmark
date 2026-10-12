import { stateFor, edit } from '../estree-plugin.mjs';
import { Visitor } from 'oxc-parser';
export function run(ast,filename) {
 const state=stateFor(ast,filename);
 new Visitor({'VariableDeclarator:exit'(node) {edit(node,state);}}).visit(ast);
 return {ast,changed:state.changed};
}
