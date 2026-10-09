import { traverseFast } from '@babel/types';
import { stateFor } from '../estree-plugin.mjs';
import { editBabel } from '../babel-plugin.mjs';
export { prepare, print } from '../babel-io.mjs';
export function run(ast,filename){
 const state=stateFor(ast.program,filename),pending=[];
 // Enter-only API: defer edits to avoid visiting newly inserted config subtrees.
 traverseFast(ast,node=>{if(node.type==='VariableDeclarator')pending.push(node);});
 for(const node of pending)editBabel(node,state);
 return {ast,changed:state.changed};
}
