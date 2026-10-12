import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
import { parse } from 'acorn';
import { full } from 'acorn-walk';
import { walk } from 'yuku-ast';
import { CHILD_KEYS } from '../../node_modules/yuku-ast/dist/generated.js';
import { collectionBase } from './acorn-base-historical.mjs';
import { loadCorpus, digest } from '../../src/i18n/corpus.mjs';
import { variants,loadVariant } from './cases.mjs';
const corpus=loadCorpus(), keys=new Set(corpus.keys);
const parseJS=source=>parse(source,{ecmaVersion:2022,sourceType:'module',locations:true,ranges:true});
const fixtures=corpus.files.map(f=>({...f,ast:parseJS(f.javascript)}));
const counters={fullNodes:0,acornNodes:0,stringLiterals:0,childFieldReads:0,arrayFields:0,nonemptyNodes:0,literalNodes:0,types:{}};
const typeStrings=[];
for(const f of fixtures) {
 const strings=[];
 walk(f.ast,{enter(node){
  counters.fullNodes++;counters.types[node.type]=(counters.types[node.type]||0)+1;
  if(node.type==='Literal') {counters.literalNodes++;if(typeof node.value==='string'){counters.stringLiterals++;strings.push(node.value);}}
  const children=CHILD_KEYS[node.type]||[];
  counters.childFieldReads+=children.length;
  if(children.length)counters.nonemptyNodes++;
  for(const k of children)if(Array.isArray(node[k]))counters.arrayFields++;
 }});
 full(f.ast,()=>{counters.acornNodes++;},collectionBase);
 typeStrings.push(strings);
}
const allKeys={has(){return true;}};
const rows=[];
const contractSource=`const { "key": value, nested: { "inner": item }, ...rest } = source;\nconst object = { "key": "value" };\nclass C { "method"() { return "body"; } }\nimport { "exported" as imported } from "module";\nexport { imported as "renamed" };`;
const contractAST=parseJS(contractSource), reference=await loadVariant('yuku-stock');
const expectedContract=reference(contractAST,allKeys);
for(const v of variants) {
 const collect=await loadVariant(v.id);
 let allStringMismatches=0;
 for(let i=0;i<fixtures.length;i++) {
  const f=fixtures[i], before=JSON.stringify(f.ast);
  assert.deepEqual(collect(f.ast,keys),f.expectedJavascript,`${v.id}: real i18n output`);
  const actual=collect(f.ast,allKeys);
  if(JSON.stringify(actual)!==JSON.stringify(typeStrings[i]))allStringMismatches++;
  assert.equal(JSON.stringify(f.ast),before,`${v.id}: mutated AST`);
 }
 const actualContract=collect(contractAST,allKeys),contractPassed=JSON.stringify(actualContract)===JSON.stringify(expectedContract);
 if(v.id!=='acorn-current') {assert.ok(contractPassed,v.id);assert.equal(allStringMismatches,0,v.id);}
 rows.push({id:v.id,i18nPassed:true,allStringsPassed:allStringMismatches===0,allStringMismatches,contractPassed});
}
// Coverage control: compare the complete ordered node stream, not just strings.
const {recursive}=await import('acorn-walk');
const {base}=await import('./generated/acorn-full-base.mjs');
for(const f of fixtures) {
 const expected=[],actual=[];
 walk(f.ast,{enter(node){expected.push([node.type,node.start,node.end]);}});
 const instrumented=Object.fromEntries(Object.entries(base).map(([type,fn])=>[type,(node,state,next)=>{actual.push([node.type,node.start,node.end]);fn(node,state,next);} ]));
 recursive(f.ast,null,{},instrumented);
 assert.deepEqual(actual,expected);
}
const out={files:fixtures.length,sourceHash:digest(fixtures.map(f=>f.javascript).join('\n')),astHash:digest(JSON.stringify(fixtures.map(f=>f.ast))),outputHash:digest(JSON.stringify(fixtures.map(f=>f.expectedJavascript))),counters,rows,fullCoverageNodeOrderVerified:true};
writeFileSync(new URL('../../results/i18n-dispatch/validation.json',import.meta.url),JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify(out,null,2));
