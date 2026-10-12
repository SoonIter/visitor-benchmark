import { performance } from 'node:perf_hooks';
import { resourceUsage, memoryUsage } from 'node:process';
const [scenario,id,kind,warmArg,iterationsArg]=process.argv.slice(2);
const { variants } = await import(`../../src/${scenario}/registry.mjs`);
const { corpus, digest } = await import(`../../src/${scenario}/workload.mjs`);
const { load } = await import(`../../src/${scenario}/execute.mjs`);
const warmups=Number(warmArg), iterations=Number(iterationsArg);
const variant=variants.find(v=>v.id===id); if(!variant)throw new Error(`Unknown variant ${id}`);
const fixtures=corpus(kind),engine=await load(variant);
const samples=[],setupSamples=[],heaps=[],hashes=new Set();
let edits=0;
for(let i=-warmups;i<iterations;i++){
 if(i===0)global.gc?.(); // No explicit GC between timed iterations.
 let elapsed=0,setup=0,totalEdits=0;const iterationHashes=[];
 for(const fixture of fixtures){
  let begin=performance.now();const ast=engine.prepare(fixture);setup+=performance.now()-begin;
  begin=performance.now();const result=engine.run(ast,fixture);elapsed+=performance.now()-begin;
  totalEdits+=result.changed;
  if(i>=0||i===-1)iterationHashes.push(engine.validate(result,fixture));
  result.dispose?.();
 }
 if(i>=0){samples.push(elapsed);setupSamples.push(setup);heaps.push(memoryUsage().heapUsed);hashes.add(digest(iterationHashes.join(',')));edits=totalEdits;}
}
if(hashes.size!==1)throw new Error('Output hashes changed between iterations');
process.stdout.write(JSON.stringify({id,kind,ast:variant.ast,warmups,iterations,samplesMs:samples,setupMs:setupSamples,edits,outputHash:[...hashes][0],inputHash:digest(fixtures.map(f=>f.source).join('\n')),sharedESTreeHash:digest(JSON.stringify(fixtures.map(f=>f.ast))),sourceBytes:fixtures.reduce((s,f)=>s+Buffer.byteLength(f.source),0),files:fixtures.length,peakRssMiB:resourceUsage().maxRSS/1024,observedHeapMiB:Math.max(...heaps)/1024/1024}));
