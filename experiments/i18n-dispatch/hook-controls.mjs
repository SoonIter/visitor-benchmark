// Additional controls: flattening arrays alone does not isolate Map lookup or
// unused generic enter/leave checks. Change each independently from the clone.
import assert from 'node:assert/strict';
import { readFileSync,writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { loadVariant } from './cases.mjs';
import { loadCorpus } from '../../src/i18n/corpus.mjs';
import { parse } from 'acorn';
const original=readFileSync(new URL('./generated/yuku-keys-hooks-context.mjs',import.meta.url),'utf8');
const object=original.replace('new Map()','Object.create(null)').replaceAll('concrete.get(type)','concrete[type]').replace('concrete.set(type, entry);','concrete[type] = entry;');
const noGeneric=original.replace(/        if \(d\.enter !== null\) \{\n            d\.enter\(node, ctx\);\n            if \(ctx\._stopped\)\n                return false;\n        \}/,'').replace(/        if \(d\.leave !== null\) \{\n            d\.leave\(node, ctx\);\n            if \(ctx\._stopped\)\n                return false;\n        \}/,'');
assert.notEqual(object,original);assert.ok(!noGeneric.includes('d.enter(node, ctx)')&&!noGeneric.includes('d.leave(node, ctx)'));
const controls={'yuku-keys-object-hooks-context':object,'yuku-keys-hooks-no-generic-context':noGeneric};
for(const [id,code]of Object.entries(controls))writeFileSync(new URL(`./generated/${id}.mjs`,import.meta.url),code);
const corpus=loadCorpus(),reference=await loadVariant('yuku-stock');
for(const id of Object.keys(controls)) {
 const collect=await loadVariant(id);
 for(const f of corpus.files) {
  const ast=parse(f.javascript,{ecmaVersion:2022,sourceType:'module',locations:true,ranges:true}),keys={has(){return true;}};
  assert.deepEqual(collect(ast,keys),reference(ast,keys));
 }
}
const variants=['yuku-keys-hooks-context',...Object.keys(controls)];
const report={description:'Independent Map-to-object and unused generic-hook controls; same worker and settings as main experiment.',timestamp:new Date().toISOString(),sourceHashes:Object.fromEntries(Object.entries(controls).map(([id,code])=>[id,createHash('sha256').update(code).digest('hex')])),runs:[]};
for(let repeat=0;repeat<7;repeat++) {
 const order=variants.slice(repeat%3).concat(variants.slice(0,repeat%3));if(repeat%2)order.reverse();
 for(const id of order)for(const mode of repeat%2?['reused','fresh']:['fresh','reused']) {
  const child=spawnSync(process.execPath,['--expose-gc',new URL('./worker.mjs',import.meta.url).pathname,id,mode,'40','40'],{encoding:'utf8',timeout:90000,maxBuffer:5e6});
  if(child.status!==0||child.error)throw new Error(child.stderr||child.error.message);
  const run=JSON.parse(child.stdout);report.runs.push({...run,repeat});
  console.log(`${repeat+1}/7 ${mode} ${id}`);
  writeFileSync(new URL('../../results/i18n-dispatch/hook-controls.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
 }
}
