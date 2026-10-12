import { stateFor, edit } from '../estree-plugin.mjs';
import { walk } from 'zimmerframe';
export function run(ast,filename) {
 const state=stateFor(ast,filename);
 walk(ast,null,{VariableDeclarator(node,ctx){ctx.next();edit(node,state);}});
 return {ast,changed:state.changed};
}
