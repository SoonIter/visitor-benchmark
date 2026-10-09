import test from 'node:test';
import assert from 'node:assert/strict';
import { variants } from '../src/registry.mjs';
import { corpus, canonical, digest } from '../src/workload.mjs';
import { load } from '../src/execute.mjs';
for(const variant of variants) test(`${variant.id}: identical styled-components edits and negative controls`,async()=>{
 const engine=await load(variant);
 for(const fixture of corpus('dense',true)){
  const inputHash=digest(canonical(fixture.ast));
  const result=engine.run(engine.prepare(fixture),fixture);
  try {assert.match(engine.validate(result,fixture),/^[a-f0-9]{64}$/);}
  finally {result.dispose?.();}
  assert.equal(digest(canonical(fixture.ast)),inputHash,'shared canonical AST must remain unchanged');
 }
});
