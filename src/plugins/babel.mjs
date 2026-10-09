import traverse from '@babel/traverse';
import { stateFor } from '../estree-plugin.mjs';
import { editBabel } from '../babel-plugin.mjs';
export { prepare, print } from '../babel-io.mjs';
export function run(ast,filename,noScope=false) {
 const state=stateFor(ast.program,filename);
 traverse(ast,{noScope,VariableDeclarator:{exit(path){editBabel(path.node,state);}}});
 return {ast,changed:state.changed};
}
