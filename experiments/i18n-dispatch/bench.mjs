import { execFileSync,spawnSync } from 'node:child_process';
import { readFileSync,writeFileSync,readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import os from 'node:os';
import { variants } from './cases.mjs';
const quick=process.argv.includes('--quick'), repeats=quick?1:7,warmups=quick?5:40,samples=quick?5:40;
const root=new URL('../../',import.meta.url);
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const files=['cases.mjs','generate.mjs','worker.mjs','bench.mjs','validate.mjs',...readdirSync(new URL('./generated/',import.meta.url)).map(f=>`generated/${f}`)];
const report={timestamp:new Date().toISOString(),node:process.version,cpu:os.cpus()[0].model,platform:`${os.platform()} ${os.arch()}`,repeats,warmups,samples,benchmarkCommit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),sourceHashes:Object.fromEntries(files.map(f=>[f,sha(readFileSync(new URL(f,import.meta.url)))])),validation:JSON.parse(readFileSync(new URL('results/i18n-dispatch/validation.json',root))),generated:JSON.parse(readFileSync(new URL('./generated/manifest.json',import.meta.url))),runs:[]};
for(let repeat=0;repeat<repeats;repeat++) {
 const shift=(repeat*5)%variants.length;let order=variants.slice(shift).concat(variants.slice(0,shift));if(repeat%2)order.reverse();
 for(const v of order)for(const mode of repeat%2?['reused','fresh']:['fresh','reused']) {
  const child=spawnSync(process.execPath,['--expose-gc',new URL('./worker.mjs',import.meta.url).pathname,v.id,mode,String(warmups),String(samples)],{encoding:'utf8',timeout:90000,maxBuffer:5e6});
  if(child.error||child.status!==0)throw new Error(`${v.id}/${mode}: ${child.error?.message||child.stderr}`);
  const run=JSON.parse(child.stdout);
  for(const field of ['sourceHash','astHash','outputHash'])if(run[field]!==report.validation[field])throw new Error(`${v.id}: ${field} differs`);
  report.runs.push({...run,repeat});
  const sorted=run.samplesMs.toSorted((a,b)=>a-b),median=sorted[Math.floor(sorted.length/2)];
  console.log(`${repeat+1}/${repeats} ${mode} ${v.id}: ${median.toFixed(3)} ms`);
  writeFileSync(new URL(`results/i18n-dispatch/${quick?'quick':'latest'}.json`,root),JSON.stringify(report,null,2)+'\n');
 }
}
