import assert from 'node:assert/strict';
import { generate } from 'astring';
import { parseESTree } from '../../src/shared/ast.mjs';
import { performance } from 'node:perf_hooks';
import { runner, fixturesFor, canonical, digest } from './cases.mjs';
const [id,track,warm='25',samples='25']=process.argv.slice(2);
const {fixtures,keys,prepare:parse,expected}=fixturesFor(track);
const baseASTs=new Map(fixtures.map(f=>[f,f.ast ?? parse(f)]));
const prepare=f=>structuredClone(baseASTs.get(f));
const run=await runner(id,track,keys), readonly=track.startsWith('i18n');
const expectedOutputs=fixtures.map(expected);
const inputHashes=[], outputHashes=[];
function check(ast,result,f,i,before) {
  if(readonly){assert.equal(JSON.stringify(result),expectedOutputs[i]);assert.equal(digest(JSON.stringify(ast)),before);}
  else {assert.equal(digest(canonical(parseESTree(generate(result.ast)))),digest(expectedOutputs[i]));assert.equal(result.changed,f.count);}
}
for(let i=0;i<fixtures.length;i++) {
  const f=fixtures[i],ast=prepare(f),before=digest(JSON.stringify(ast));inputHashes.push(before);
  const result=run(ast,f.filename);check(ast,result,f,i,before);outputHashes.push(digest(expectedOutputs[i]));
}
const samplesMs=[];
for(let i=-Number(warm);i<Number(samples);i++) {
  // A fresh parsed corpus for every iteration, outside the timed region.
  const asts=fixtures.map(prepare);
  const start=performance.now();
  const outputs=asts.map((ast,j)=>run(ast,fixtures[j].filename));
  const elapsed=performance.now()-start;
  // Validate every timed result outside the timer, using an independent oracle.
  for(let j=0;j<fixtures.length;j++)check(asts[j],outputs[j],fixtures[j],j,inputHashes[j]);
  if(i>=0)samplesMs.push(elapsed);
}
process.stdout.write(JSON.stringify({id,track,preparation:'structuredClone(parser output)',warmups:Number(warm),samplesMs,inputHash:digest(JSON.stringify(inputHashes)),outputHash:digest(JSON.stringify(outputHashes)),sourceHash:digest(fixtures.map(f=>f.source).join('\n')),matches:readonly?fixtures.reduce((n,f)=>n+f.expected.length,0):fixtures.reduce((n,f)=>n+f.count,0)}));
