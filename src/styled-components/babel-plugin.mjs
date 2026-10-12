import { configFor } from './estree-plugin.mjs';
export function editBabel(node,state) {
 const config=configFor(node,state);if(!config)return;
 node.init.tag={type:'CallExpression',callee:{type:'MemberExpression',computed:false,object:node.init.tag,property:{type:'Identifier',name:'withConfig'}},arguments:[{type:'ObjectExpression',properties:Object.entries(config).map(([name,value])=>({type:'ObjectProperty',key:{type:'Identifier',name},value:{type:'StringLiteral',value},computed:false,shorthand:false}))}]};
}

export function replacementTagForBabel(node, state) {
  const config = configFor(node, state);
  if (!config) return null;
  return {type:'CallExpression',callee:{type:'MemberExpression',computed:false,object:node.init.tag,property:{type:'Identifier',name:'withConfig'}},arguments:[{type:'ObjectExpression',properties:Object.entries(config).map(([name,value])=>({type:'ObjectProperty',key:{type:'Identifier',name},value:{type:'StringLiteral',value},computed:false,shorthand:false}))}]};
}
