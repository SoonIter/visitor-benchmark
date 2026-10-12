import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { resourceUsage, memoryUsage } from 'node:process';
import { parse } from 'acorn';
import { loadCorpus,digest } from '../../src/i18n/corpus.mjs';
import { loadVariant } from './cases.mjs';
const [id,mode,warmArg='40',samplesArg='40']=process.argv.slice(2);
const warmups=Number(warmArg),samples=Number(samplesArg),batch=mode==='reused'?10:1;
const corpus=loadCorpus(), keys=new Set(corpus.keys), collect=await loadVariant(id);
const prepare=source=>parse(source,{ecmaVersion:2022,sourceType:'module',locations:true,ranges:true});
const fixtures=corpus.files.map(f=>({...f,ast:prepare(f.javascript)}));
for(const f of fixtures)assert.deepEqual(collect(f.ast,keys),f.expectedJavascript);
const expectedCount=fixtures.reduce((n,f)=>n+f.expectedJavascript.length,0);
const samplesMs=[],setupMs=[],heapMiB=[];
for(let i=-warmups;i<samples;i++) {
 if(i===0)global.gc?.();
 let elapsed=0,setup=0,count=0;
 if(mode==='fresh') {
  for(const f of fixtures) {
   let start=performance.now();const ast=prepare(f.javascript);setup+=performance.now()-start;
   start=performance.now();const output=collect(ast,keys);elapsed+=performance.now()-start;
   assert.deepEqual(output,f.expectedJavascript);count+=output.length;
  }
 } else {
  const start=performance.now();
  for(let j=0;j<batch;j++)for(const f of fixtures)count+=collect(f.ast,keys).length;
  elapsed=(performance.now()-start)/batch;
 }
 assert.equal(count,expectedCount*batch);
 if(i>=0){samplesMs.push(elapsed);setupMs.push(setup);heapMiB.push(memoryUsage().heapUsed/2**20);}
}
process.stdout.write(JSON.stringify({id,mode,warmups,samples,batch,samplesMs,setupMs,sourceHash:digest(fixtures.map(f=>f.javascript).join('\n')),astHash:digest(JSON.stringify(fixtures.map(f=>f.ast))),outputHash:digest(JSON.stringify(fixtures.map(f=>f.expectedJavascript))),matches:expectedCount,peakRssMiB:resourceUsage().maxRSS/1024,observedHeapMiB:Math.max(...heapMiB),serverMemoryMiB:null}));
