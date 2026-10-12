import ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';
import { stateForTS, editTS } from '../ts-plugin.mjs';
export { prepare, print } from './typescript.mjs';
export function run(ast,filename){
 const state=stateForTS(ts,ast,filename), replacements=new Map();
 for(const n of tsquery(ast,'VariableDeclaration')) {const next=editTS(ts,ts.factory,n,state);if(next!==n)replacements.set(n,next);}
 const result=ts.transform(ast,[ctx=>{
  const visit=n=>replacements.get(n)??ts.visitEachChild(n,visit,ctx);
  return root=>ts.visitNode(root,visit);
 }]);
 return {ast:result.transformed[0],changed:state.changed,dispose:()=>result.dispose()};
}
