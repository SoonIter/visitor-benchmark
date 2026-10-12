import assert from 'node:assert/strict';
import { Session } from 'node:inspector';
import { performance } from 'node:perf_hooks';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { runner, fixturesFor, digest } from './cases.mjs';
const [id,track,shape='parsed']=process.argv.slice(2);
if(!track?.startsWith('i18n'))throw new Error('Profiles require a read-only workload');
const {fixtures,keys,prepare}=fixturesFor(track),run=await runner(id,track,keys);
const asts=fixtures.map(f=>shape==='parsed'?prepare(f):structuredClone(prepare(f)));
if(shape==='interned') {
  const {types}=JSON.parse(readFileSync('.cache/oxc-attribution/schema.json'));
  const names=Object.keys(Object.fromEntries(types.map(type=>[type,true]))),pool=new Map(names.map(type=>[type,type]));
  function normalize(node){if(!node||typeof node!=='object')return;if(Array.isArray(node)){for(const child of node)normalize(child);return;}if(typeof node.type==='string')node.type=pool.get(node.type);for(const key in node)normalize(node[key]);}
  for(const ast of asts)normalize(ast);
}
const before=asts.map(ast=>digest(JSON.stringify(ast)));
const count=fixtures.reduce((sum,f)=>sum+f.expected.length,0);
for(let i=0;i<fixtures.length;i++)assert.deepEqual(run(asts[i],fixtures[i].filename),fixtures[i].expected);
function collectCorpus(){let sink=0;for(let i=0;i<asts.length;i++)sink+=run(asts[i],fixtures[i].filename).length;return sink;}
let sink=0;for(let i=0;i<300;i++)sink+=collectCorpus();
global.gc?.();
const session=new Session();session.connect();
const post=(name,args={})=>new Promise((resolve,reject)=>session.post(name,args,(e,data)=>e?reject(e):resolve(data)));
await post('Profiler.enable');await post('Profiler.setSamplingInterval',{interval:200});await post('Profiler.start');
const start=performance.now();let corpora=0;
do{for(let i=0;i<20;i++){sink+=collectCorpus();corpora++;}}while(performance.now()-start<2000);
const {profile}=await post('Profiler.stop');session.disconnect();
assert.equal(sink,count*(300+corpora));
assert.deepEqual(asts.map(ast=>digest(JSON.stringify(ast))),before);
const dir='results/oxc-attribution/profiles';mkdirSync(dir,{recursive:true});
// Keep stack/source locations only. No business AST, strings, or dictionary is emitted.
writeFileSync(`${dir}/${track}-${id}-${shape}.cpuprofile`,JSON.stringify(profile));
console.log(JSON.stringify({id,track,shape,corpora,samples:profile.samples.length,samplingIntervalUs:200}));
