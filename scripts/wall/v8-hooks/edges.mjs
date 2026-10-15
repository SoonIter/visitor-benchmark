// Count typed field opportunities without timing or changing the business adapters.
import { writeFileSync, readFileSync } from 'node:fs';
const { knownChildTypes } = JSON.parse(readFileSync(new URL('../../../results/v8-hooks/schema-fields.json', import.meta.url), 'utf8'));
import { visitorKeys } from '../../../vendor/swc-next/visitor-keys.js';
const rows = [];
for (const [scenario, kinds] of [['styled-components',['dense','sparse']],['remove-debugger',['dense','sparse']],['rstest-coverage',['runtime','tooling']],['i18n',['original','javascript']]]) {
 for (const kind of kinds) {
  let fixtures, prepare;
  if (scenario === 'i18n') {
   const { engine } = await import('../../../src/i18n/engine.mjs');
   const { loadCorpus } = await import('../../../src/i18n/corpus.mjs');
   ({prepare} = await engine('swc-next', kind));
   fixtures = loadCorpus().files.map(f => ({filename:f.filename,source:kind==='original'?f.original:f.javascript}));
  } else {
   const {load} = await import(`../../../src/${scenario}/execute.mjs`);
   const {variants} = await import(`../../../src/${scenario}/registry.mjs`);
   const {corpus} = await import(`../../../src/${scenario}/workload.mjs`);
   ({prepare} = await load(variants.find(v=>v.id==='swc-next')));fixtures=corpus(kind);
  }
  let total=0, eligible=0, fieldFrames=0, parentFrames=0, nonLeafNodes=0; const edges={};
  function visit(node, edge) {
   if (!node) return;
   total++;
   if(visitorKeys[node.type].length) nonLeafNodes++;
   if (knownChildTypes[edge] === node.type) {eligible++;edges[edge]=(edges[edge]||0)+1;}
   let hasChildren=false;
   for(const key of visitorKeys[node.type]) {
    const value=node[key], next=node.type+'.'+key;
    if(value!=null) {fieldFrames++;hasChildren=true;}
    if(Array.isArray(value)) for(const child of value) visit(child,next);else visit(value,next);
   }
   if(hasChildren) parentFrames++;
  }
  for(const fixture of fixtures) visit(prepare(fixture),'root');
  rows.push({scenario,kind,total,eligible,fieldFrames,parentFrames,nonLeafNodes,fraction:eligible/total,edges});
 }
}
writeFileSync('results/v8-hooks/edges.json',JSON.stringify({knownChildTypes,rows},null,2)+'\n');
console.log(rows.map(({edges,...row})=>({...row,edges:Object.entries(edges).sort((a,b)=>b[1]-a[1]).slice(0,6)})));
