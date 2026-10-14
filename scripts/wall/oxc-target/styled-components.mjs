import { stateFor, edit } from '../../../src/styled-components/estree-plugin.mjs';
import { walk } from '../../../vendor/swc-next/ast.js';
export function run(ast,filename) {
 const state=stateFor(ast,filename);
 walk(ast,{ VariableDeclarator: { leave(node) {edit(node,state);} } });
 return {ast,changed:state.changed};
}
