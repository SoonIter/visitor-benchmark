import { traverse } from '@babel/types';
import { stateFor } from '../estree-plugin.mjs';
import { editBabel } from '../babel-plugin.mjs';
export { prepare, print } from '../babel-io.mjs';
export function run(ast,filename){
 const state=stateFor(ast.program,filename);
 traverse(ast,{exit(node){if(node.type==='VariableDeclarator')editBabel(node,state);}});
 return {ast,changed:state.changed};
}
