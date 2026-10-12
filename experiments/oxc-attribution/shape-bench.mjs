import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { cpus } from 'node:os';
import { digest } from './cases.mjs';
const pairs=['debugger-sparse','styled-sparse','i18n-javascript','i18n-original'].flatMap(track=>['walker-stock','visitor-stock'].flatMap(id=>['parsed','cloned','interned','self-assigned'].map(shape=>({track,id,shape}))));
const report={timestamp:new Date().toISOString(),node:process.version,cpu:cpus()[0].model,repeats:7,warmups:20,samples:20,sourceHashes:Object.fromEntries(['shape-worker.mjs','shape-bench.mjs','cases.mjs'].map(f=>[f,digest(readFileSync('experiments/oxc-attribution/'+f))])),runs:[]};
const hashes=new Map();
for(let round=0;round<7;round++){
  const shift=round*7%pairs.length;let order=[...pairs.slice(shift),...pairs.slice(0,shift)];if(round%2)order.reverse();
  for(const {track,id,shape} of order){
    const result=spawnSync(process.execPath,['experiments/oxc-attribution/shape-worker.mjs',id,track,shape,'20','20'],{encoding:'utf8',timeout:90000});
    if(result.status!==0)throw new Error(`${track} ${id} ${shape}: ${result.stderr}`);
    const row=JSON.parse(result.stdout),sig=[row.inputHash,row.outputHash];if(hashes.has(track))assert.deepEqual(sig,hashes.get(track));else hashes.set(track,sig);
    report.runs.push({round,...row});writeFileSync('results/oxc-attribution/strings.json',JSON.stringify(report,null,2));
  }
  console.log(JSON.stringify({round:round+1,workers:report.runs.length,total:pairs.length*7}));
}
