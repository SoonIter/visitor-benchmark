import { stateFor, edit } from '../estree-plugin.mjs';
import j from 'jscodeshift';
export function run(ast,filename) {
 const state=stateFor(ast,filename);
 j(ast).find(j.VariableDeclarator).forEach(path=>edit(path.node,state));
 return {ast,changed:state.changed};
}
