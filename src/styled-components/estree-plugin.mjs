import { metadata } from './workload.mjs';
// Shared plugin business logic only. Each library controls traversal through its native API.
export function stateFor(program,filename) {
  const aliases=new Set();
  for(const n of program.body) if(n.type==='ImportDeclaration' && n.source.value==='styled-components')
    for(const s of n.specifiers) if(s.type==='ImportDefaultSpecifier') aliases.add(s.local.name);
  return {aliases,filename,index:0,changed:0};
}
function styledTag(node,aliases) {
  if(node.type==='Identifier') return aliases.has(node.name);
  if(node.type==='MemberExpression') return !node.computed && styledTag(node.object,aliases);
  if(node.type==='CallExpression') {
    if(node.callee.type==='MemberExpression' && node.callee.property.name==='withConfig') return false;
    return styledTag(node.callee,aliases);
  }
  return false;
}
export function configFor(node,state) {
  if(node.id?.type!=='Identifier' || node.init?.type!=='TaggedTemplateExpression' || !styledTag(node.init.tag,state.aliases)) return null;
  state.changed++;
  return metadata(state.filename,node.id.name,state.index++);
}
const id=name=>({type:'Identifier',name});
const str=value=>({type:'Literal',value,raw:JSON.stringify(value)});
export function edit(node,state) {
  const config=configFor(node,state); if(!config) return;
  node.init.tag={type:'CallExpression',optional:false,callee:{type:'MemberExpression',computed:false,optional:false,object:node.init.tag,property:id('withConfig')},arguments:[{type:'ObjectExpression',properties:Object.entries(config).map(([name,value])=>({type:'Property',key:id(name),value:str(value),kind:'init',method:false,shorthand:false,computed:false}))}]};
}

// Build a replacement without mutating the input. Editing adapters apply it via
// their own replacement API; node-only walkers continue to use edit().
export function replacementTagFor(node, state) {
  const config = configFor(node, state);
  if (!config) return null;
  return {type:'CallExpression',optional:false,callee:{type:'MemberExpression',computed:false,optional:false,object:node.init.tag,property:id('withConfig')},arguments:[{type:'ObjectExpression',properties:Object.entries(config).map(([name,value])=>({type:'Property',key:id(name),value:str(value),kind:'init',method:false,shorthand:false,computed:false}))}]};
}
export function replacementFor(node, state) {
  const tag = replacementTagFor(node, state);
  return tag ? { ...node, init: { ...node.init, tag } } : null;
}
