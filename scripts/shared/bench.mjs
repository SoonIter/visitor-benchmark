import { spawn } from 'node:child_process';
import { cpus, platform, arch, totalmem, loadavg } from 'node:os';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { sourceManifest } from './provenance.mjs';
import { scenarios } from '../../src/scenarios.mjs';
const scenario = process.argv[2];
if (!scenarios.some(s => s.id === scenario && s.runner === 'mutation')) throw new Error('Select a mutation scenario');
const { variants: all } = await import(`../../src/${scenario}/registry.mjs`);
const { tracks } = await import(`../../src/${scenario}/workload.mjs`);
const quick=process.argv.includes('--quick');
const config={repetitions:quick?1:3,warmups:quick?2:8,iterations:quick?3:20,corpora:tracks ?? ['dense','sparse']};
const filter=process.argv.find(x=>x.startsWith('--only='))?.slice(7).split(',');
const variants=filter?all.filter(v=>filter.includes(v.id)):all;
if(!variants.length)throw new Error('No variants selected');
const pkg=JSON.parse(readFileSync(new URL('../../package.json',import.meta.url)));
const data={scenario,sourceManifest:sourceManifest(),createdAt:new Date().toISOString(),config,environment:{node:process.version,platform:platform(),arch:arch(),cpu:cpus()[0].model,cpuCount:cpus().length,totalMemoryGiB:totalmem()/1024**3,loadAverageAtStart:loadavg()},dependencies:pkg.dependencies,provenance:JSON.parse(readFileSync(new URL('../../vendor/provenance.json',import.meta.url))),variants,runs:[],order:[]};
mkdirSync(new URL(`../../results/${scenario}/`,import.meta.url),{recursive:true});
const stem=process.argv.find(x=>x.startsWith('--output='))?.slice(9)??(quick?'quick':'latest');
const out=new URL(`../../results/${scenario}/${stem}.json`,import.meta.url);
function run(args){return new Promise((resolve,reject)=>{
 const child=spawn(process.execPath,['--expose-gc',new URL('./worker.mjs',import.meta.url).pathname,scenario,...args],{stdio:['ignore','pipe','pipe']});let stdout='',stderr='';
 child.stdout.on('data',c=>stdout+=c);child.stderr.on('data',c=>stderr+=c);child.on('error',reject);
 child.on('close',code=>{if(code!==0)reject(new Error(`${args.join(' ')} failed (${code}): ${stderr}`));else{try{resolve(JSON.parse(stdout));}catch(e){reject(new Error(stdout+stderr+e.message));}}});
});}
for(let rep=0;rep<config.repetitions;rep++){
 // Reverse/rotate the schedule across repetitions; never run competitors concurrently.
 const offset=(rep*Math.ceil(variants.length/3))%variants.length;
 let order=[...variants.slice(offset),...variants.slice(0,offset)];if(rep%2)order.reverse();
 for(const kind of rep%2?[...config.corpora].reverse():config.corpora)for(const v of order){
  process.stderr.write(`[${rep+1}/${config.repetitions}] ${kind} ${v.id}\n`);
  data.order.push({rep,kind,id:v.id});const result=await run([v.id,kind,String(config.warmups),String(config.iterations)]);
  result.repetition=rep;data.runs.push(result);
  const peers=data.runs.filter(r=>r.kind===kind);
  if(peers.some(r=>r.outputHash!==result.outputHash||r.inputHash!==result.inputHash||r.sharedESTreeHash!==result.sharedESTreeHash))throw new Error('Cross-variant parity/input hash mismatch');
  writeFileSync(out,JSON.stringify(data,null,2)+'\n');
 }
}
data.environment.loadAverageAtEnd=loadavg();
writeFileSync(out,JSON.stringify(data,null,2)+'\n');

console.log(`Validated ${data.runs.length} isolated process runs. Results: ${out.pathname}`);
