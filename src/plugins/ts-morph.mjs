import { Project, ts } from 'ts-morph';
import { stateForTS, editTS } from '../ts-plugin.mjs';
export function prepare(source,filename){
 const project=new Project({useInMemoryFileSystem:true,skipAddingFilesFromTsConfig:true,compilerOptions:{allowJs:true,target:ts.ScriptTarget.ES2022}});
 return project.createSourceFile(filename,source);
}
export const print = file => file.getFullText();
export function run(file,filename){
 const state=stateForTS(ts,file.compilerNode,filename);
 file.transform(traversal=>{
  const n=traversal.visitChildren();
  return ts.isVariableDeclaration(n)?editTS(ts,traversal.factory,n,state):n;
 });
 return {ast:file,changed:state.changed};
}
