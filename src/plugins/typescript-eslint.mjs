import { simpleTraverse } from '@typescript-eslint/typescript-estree';
import { stateFor, edit } from '../estree-plugin.mjs';
export function run(ast,filename){
 const state=stateFor(ast,filename),pending=[];
 simpleTraverse(ast,{visitors:{VariableDeclarator(node){pending.push(node);}}});
 for(const node of pending)edit(node,state);
 return {ast,changed:state.changed};
}
