import { writeFileSync } from 'node:fs';
import { parse } from 'acorn';
import { recursive } from 'acorn-walk';
import { walk } from 'yuku-ast';
import { loadCorpus } from '../../src/i18n/corpus.mjs';
import { collectionBase } from '../../src/i18n/acorn-base.mjs';
import { base as completeBase } from './generated/acorn-full-base.mjs';
const asts=loadCorpus().files.map(f=>parse(f.javascript,{ecmaVersion:2022,sourceType:'module',locations:true,ranges:true}));
const result={};
const yuku={visits:0,uniqueObjects:0,byType:{}};
for(const ast of asts){const objects=new Set();walk(ast,{enter(node){yuku.visits++;objects.add(node);yuku.byType[node.type]=(yuku.byType[node.type]||0)+1;}});yuku.uniqueObjects+=objects.size;}
result.yuku=yuku;
const fixedBase={...collectionBase,ObjectPattern(node,state,next){for(const p of node.properties){if(p.type==='Property'){if(p.computed||p.key.type==='Literal')next(p.key,state);next(p.value,state,'Pattern');}else if(p.type==='RestElement')next(p.argument,state,'Pattern');}}};
for(const [name,base]of Object.entries({current:collectionBase,fixed:fixedBase,complete:completeBase})) {
 const counters={dispatches:0,aliasDispatches:0,uniqueObjects:0,byType:{}};
 for(const ast of asts) {
  const objects=new Set();
  const instrumented=Object.fromEntries(Object.entries(base).map(([name,fn])=>[name,(node,state,next)=>{
   counters.dispatches++;if(name!==node.type)counters.aliasDispatches++;
   if(!objects.has(node)){objects.add(node);counters.byType[node.type]=(counters.byType[node.type]||0)+1;}
   fn(node,state,next);
  }]));
  recursive(ast,null,{},instrumented);counters.uniqueObjects+=objects.size;
 }
 result[name]=counters;
}
writeFileSync(new URL('../../results/i18n-dispatch/coverage-audit.json',import.meta.url),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(Object.fromEntries(Object.entries(result).map(([k,{byType,...v}])=>[k,v])),null,2));
