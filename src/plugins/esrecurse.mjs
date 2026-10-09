import { stateFor, edit } from '../estree-plugin.mjs';
import esrecurse from 'esrecurse';
export function run(ast,filename) {
 const state=stateFor(ast,filename);
 esrecurse.visit(ast,{VariableDeclarator(node){this.visitChildren(node);edit(node,state);}});
 return {ast,changed:state.changed};
}
