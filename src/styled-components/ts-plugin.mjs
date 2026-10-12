import { metadata } from './workload.mjs';
export function stateForTS(ts,ast,filename){
 const aliases=new Set();
 for(const n of ast.statements)if(ts.isImportDeclaration(n)&&n.moduleSpecifier.text==='styled-components'&&n.importClause?.name)aliases.add(n.importClause.name.text);
 return {aliases,filename,changed:0};
}
function styledTag(ts,n,aliases){
 if(ts.isIdentifier(n))return aliases.has(n.text);
 if(ts.isPropertyAccessExpression(n))return styledTag(ts,n.expression,aliases);
 if(ts.isCallExpression(n))return !(ts.isPropertyAccessExpression(n.expression)&&n.expression.name.text==='withConfig')&&styledTag(ts,n.expression,aliases);
 return false;
}
export function editTS(ts,f,n,state){
 if(!ts.isIdentifier(n.name)||!n.initializer||!ts.isTaggedTemplateExpression(n.initializer)||!styledTag(ts,n.initializer.tag,state.aliases))return n;
 const config=metadata(state.filename,n.name.text,state.changed++);
 const tag=f.createCallExpression(f.createPropertyAccessExpression(n.initializer.tag,'withConfig'),undefined,[f.createObjectLiteralExpression(Object.entries(config).map(([key,value])=>f.createPropertyAssignment(key,f.createStringLiteral(value))))]);
 const init=f.updateTaggedTemplateExpression(n.initializer,tag,n.initializer.typeArguments,n.initializer.template);
 return f.updateVariableDeclaration(n,n.name,n.exclamationToken,n.type,init);
}
