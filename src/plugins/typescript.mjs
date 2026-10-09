import ts from 'typescript';
import { stateForTS, editTS } from '../ts-plugin.mjs';
export const prepare = (source,filename) => ts.createSourceFile(filename,source,ts.ScriptTarget.ES2022,true,ts.ScriptKind.JS);
export const print = ast => ts.createPrinter().printFile(ast);
export function run(ast,filename){
 const state=stateForTS(ts,ast,filename);
 const result=ts.transform(ast,[ctx=>{
  function visit(n){n=ts.visitEachChild(n,visit,ctx);return ts.isVariableDeclaration(n)?editTS(ts,ctx.factory,n,state):n;}
  return root=>ts.visitNode(root,visit);
 }]);
 return {ast:result.transformed[0],changed:state.changed,dispose:()=>result.dispose()};
}
