import { parseSync, printSync } from '@swc/core';
import { Visitor } from '@swc/core/Visitor.js';
import { metadata } from '../workload.mjs';
export const prepare = source => parseSync(source,{syntax:'ecmascript',target:'es2022'});
export const print = ast => printSync(ast).code;
const span=()=>({start:0,end:0});
const id=value=>({type:'Identifier',span:span(),ctxt:0,value,optional:false});
function styledTag(n,aliases) {
 if(n.type==='Identifier')return aliases.has(n.value);
 if(n.type==='MemberExpression')return n.property.type==='Identifier' && styledTag(n.object,aliases);
 if(n.type==='CallExpression')return !(n.callee.type==='MemberExpression' && n.callee.property.value==='withConfig') && styledTag(n.callee,aliases);
 return false;
}
export function run(ast,filename) {
 const aliases=new Set();let changed=0;
 for(const n of ast.body)if(n.type==='ImportDeclaration'&&n.source.value==='styled-components')for(const s of n.specifiers)if(s.type==='ImportDefaultSpecifier')aliases.add(s.local.value);
 class Plugin extends Visitor {
  visitVariableDeclarator(n) {
   n=super.visitVariableDeclarator(n);
   if(n.id.type==='Identifier'&&n.init?.type==='TaggedTemplateExpression'&&styledTag(n.init.tag,aliases)){
    const config=metadata(filename,n.id.value,changed++);
    n.init.tag={type:'CallExpression',span:span(),ctxt:0,callee:{type:'MemberExpression',span:span(),object:n.init.tag,property:id('withConfig')},arguments:[{spread:null,expression:{type:'ObjectExpression',span:span(),properties:Object.entries(config).map(([key,value])=>({type:'KeyValueProperty',key:id(key),value:{type:'StringLiteral',span:span(),value,raw:JSON.stringify(value)}}))}}],typeArguments:null};
   }
   return n;
  }
 }
 return {ast:new Plugin().visitProgram(ast),changed};
}
