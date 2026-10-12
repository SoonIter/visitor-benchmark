import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
import { Visitor } from 'oxc-parser';
import { walk } from 'oxc-walker';
import { tracks, fixturesFor, types, fields, digest } from './cases.mjs';
import { parentTypes } from '../../src/remove-debugger/edit.mjs';
const report=[];
for(const track of tracks) {
  const {fixtures,prepare}=fixturesFor(track);
  const totals={track,files:fixtures.length,nodes:0,fields:0,metadata:0,literals:0,debuggerParents:0,declarators:0,arrayEntries:0,nonNodeArrayEntries:0,visitorNodes:0,coverageEqual:true};
  const histogram={};
  for(const f of fixtures) {
    const ast=prepare(f),ids=new WeakMap(),visited=new Map(),visitorSeen=new Map();let next=0;
    function identity(node){if(!ids.has(node))ids.set(node,next++);return ids.get(node);}
    walk(ast,{enter(node){
      const id=identity(node);visited.set(id,(visited.get(id)||0)+1);totals.nodes++;
      histogram[node.type]=(histogram[node.type]||0)+1;
      if(node.type==='Literal')totals.literals++;
      if(node.type==='VariableDeclarator')totals.declarators++;
      if(parentTypes.includes(node.type))totals.debuggerParents++;
      for(const k in node) {
        totals.fields++;if(['type','start','end','loc','range'].includes(k))totals.metadata++;
        if(Array.isArray(node[k]))for(const item of node[k]){totals.arrayEntries++;if(!item||typeof item.type!=='string')totals.nonNodeArrayEntries++;}
      }
    }});
    new Visitor(Object.fromEntries(types.map(type=>[type,node=>{const id=identity(node);visitorSeen.set(id,(visitorSeen.get(id)||0)+1);totals.visitorNodes++;}]))).visit(ast);
    assert.deepEqual([...visited].sort((a,b)=>a[0]-b[0]),[...visitorSeen].sort((a,b)=>a[0]-b[0]));
    // Exact sequence and identity parity of generated direct fields vs key loops.
    const {walkProgram:original}=await import('../../.cache/oxc-attribution/visitor-clone.mjs');
    const {walkProgram:keyed}=await import('../../.cache/oxc-attribution/visitor-keys.mjs');
    const {createCompiledVisitor,addVisitorToCompiled,finalizeCompiledVisitor}=await import('../../node_modules/oxc-parser/src-js/visit/visitor.js');
    const sequence=[];const compiled=createCompiledVisitor();addVisitorToCompiled(Object.fromEntries(types.map(type=>[type,node=>sequence.push(identity(node))])));finalizeCompiledVisitor();
    original(ast,compiled);const expected=sequence.slice();sequence.length=0;keyed(ast,compiled);assert.deepEqual(sequence,expected);
  }
  report.push({...totals,histogram});
}
writeFileSync('results/oxc-attribution/coverage.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report.map(({histogram,...row})=>row),null,2));
