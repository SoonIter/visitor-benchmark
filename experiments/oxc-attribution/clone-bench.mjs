import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { cpus } from 'node:os';
import { tracks, idsFor, digest } from './cases.mjs';
const quick=process.argv.includes('--validate');
const repeats=quick?1:7,warmups=quick?0:20,samples=quick?1:20;
const folder='results/oxc-attribution';
const sourceFiles=readdirSync('experiments/oxc-attribution').filter(f=>f.endsWith('.mjs')).map(f=>'experiments/oxc-attribution/'+f);
const report={timestamp:new Date().toISOString(),node:process.version,cpu:cpus()[0].model,platform:process.platform+' '+process.arch,repeats,warmups,samples,commit:spawnSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).stdout.trim(),sourceHashes:Object.fromEntries(sourceFiles.map(f=>[f,digest(readFileSync(f))])),generated:JSON.parse(readFileSync('.cache/oxc-attribution/generated.json')),runs:[]};
const pairs=tracks.filter(track=>!track.startsWith('i18n')||track==='i18n-javascript').flatMap(track=>(track==='i18n-javascript'?['walker-stock','visitor-stock']:idsFor(track)).map(id=>({id,track})));
report.preparation='structuredClone(parser output)';
const signatures=new Map();
for(let round=0;round<repeats;round++) {
  const shift=round*9%pairs.length;let ordered=[...pairs.slice(shift),...pairs.slice(0,shift)];if(round%2)ordered.reverse();
  for(const {id,track} of ordered) {
    const result=spawnSync(process.execPath,['experiments/oxc-attribution/clone-worker.mjs',id,track,String(warmups),String(samples)],{encoding:'utf8',timeout:90000});
    if(result.status!==0)throw new Error(id+' '+track+'\n'+result.stderr);
    const row=JSON.parse(result.stdout),sig=[row.inputHash,row.outputHash,row.sourceHash,row.matches];
    if(signatures.has(track))assert.deepEqual(sig,signatures.get(track));else signatures.set(track,sig);
    report.runs.push({round,...row});
    writeFileSync(folder+'/'+(quick?'clone-validation.json':'cloned.json'),JSON.stringify(report,null,2));
  }
  console.log(JSON.stringify({round:round+1,repeats,workers:report.runs.length,total:pairs.length*repeats}));
}
