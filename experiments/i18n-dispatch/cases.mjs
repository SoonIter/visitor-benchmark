import { readFileSync } from 'node:fs';
const manifest=JSON.parse(readFileSync(new URL('./generated/manifest.json',import.meta.url)));
export const variants=[
 {id:'yuku-stock',family:'reference'},
 {id:'acorn-current',family:'reference'},
 {id:'acorn-fixed',family:'reference'},
 {id:'acorn-full-coverage',family:'coverage-control'},
 ...manifest.variants.map(v=>({...v,family:'factorial'})),
];
export async function loadVariant(id) {
 if(id.startsWith('acorn-')) {
  const {recursive}=await import('acorn-walk');
  let base;
  if(id==='acorn-full-coverage') ({base}=await import('./generated/acorn-full-base.mjs'));
  else {
   const {collectionBase}=await import('./acorn-base-historical.mjs');
   base=id==='acorn-current'?collectionBase:{...collectionBase,ObjectPattern(node,state,next){
    for(const property of node.properties) {
     if(property.type==='Property') {
      if(property.computed || property.key.type==='Literal') next(property.key,state);
      next(property.value,state,'Pattern');
     } else if(property.type==='RestElement') next(property.argument,state,'Pattern');
    }
   }};
  }
  return function collect(ast,keys) {
   const output=[];
   recursive(ast,null,{Literal(node){if(typeof node.value==='string' && keys.has(node.value)) output.push(node.value);}},base);
   return output;
  };
 }
 const {walk}=id==='yuku-stock'?await import('yuku-ast'):await import(`./generated/${id}.mjs`);
 return function collect(ast,keys) {
  const output=[];
  walk(ast,{Literal(node){if(typeof node.value==='string' && keys.has(node.value)) output.push(node.value);}});
  return output;
 };
}
