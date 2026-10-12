import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { performance } from 'node:perf_hooks';
import { generate } from 'astring';
import { parseESTree } from '../../src/shared/ast.mjs';
import { runner, fixturesFor, canonical, digest } from './cases.mjs';
const [id,track,shape,warm='20',samples='20']=process.argv.slice(2);
const {fixtures,keys,prepare:parse,expected}=fixturesFor(track);
// Property names returned by Object.keys are V8-internalized strings. Verify
// their representation separately with --allow-natives-syntax, never in timing.
const schema=JSON.parse(readFileSync(new URL('../../.cache/oxc-attribution/schema.json',import.meta.url)));
const names=Object.keys(Object.fromEntries(schema.types.map(type=>[type,true])));
const intern=new Map(names.map(type=>[type,type]));
function normalize(node, mode) {
  if(!node||typeof node!=='object')return;
  if(Array.isArray(node)){for(const child of node)normalize(child,mode);return;}
  if(typeof node.type==='string')node.type=mode==='interned'?intern.get(node.type):node.type;
  for(const key in node) {const value=node[key];if(value&&typeof value==='object')normalize(value,mode);}
}
const bases=new Map(fixtures.map(f=>[f,f.ast??parse(f)]));
const prepare=f=>{
  const ast=shape==='parsed'?parse(f):structuredClone(bases.get(f));
  if(shape==='interned'||shape==='self-assigned')normalize(ast,shape);
  return ast;
};
const readonly=track.startsWith('i18n'),run=await runner(id,track,keys),expectedOutputs=fixtures.map(expected);
const hashes=fixtures.map(f=>digest(JSON.stringify(parse(f))));
const samplesMs=[];
for(let i=-Number(warm);i<Number(samples);i++) {
  const asts=fixtures.map(prepare);
  assert.deepEqual(asts.map(ast=>digest(JSON.stringify(ast))),hashes);
  const start=performance.now();const outputs=asts.map((ast,j)=>run(ast,fixtures[j].filename));const elapsed=performance.now()-start;
  for(let j=0;j<fixtures.length;j++) {
    if(readonly){assert.equal(digest(JSON.stringify(outputs[j])),digest(expectedOutputs[j]));assert.equal(digest(JSON.stringify(asts[j])),hashes[j]);}
    else{assert.equal(outputs[j].changed,fixtures[j].count);assert.equal(digest(canonical(parseESTree(generate(outputs[j].ast)))),digest(expectedOutputs[j]));}
  }
  if(i>=0)samplesMs.push(elapsed);
}
process.stdout.write(JSON.stringify({id,track,shape,samplesMs,inputHash:digest(JSON.stringify(hashes)),outputHash:digest(JSON.stringify(expectedOutputs))}));
