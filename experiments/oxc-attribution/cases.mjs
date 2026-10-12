import { readFileSync } from 'node:fs';
import { parse } from 'acorn';
import { Visitor, parseSync } from 'oxc-parser';
import { walk as stockWalk } from 'oxc-walker';
import { createCompiledVisitor, addVisitorToCompiled, finalizeCompiledVisitor } from '../../node_modules/oxc-parser/src-js/visit/visitor.js';
import { corpus as debuggerCorpus } from '../../src/remove-debugger/workload.mjs';
import { corpus as styledCorpus } from '../../src/styled-components/workload.mjs';
import { loadCorpus } from '../../src/i18n/corpus.mjs';
import { parseESTree, canonical, digest } from '../../src/shared/ast.mjs';
import { stateFor, edit } from '../../src/styled-components/estree-plugin.mjs';
import { editSlots, parentTypes } from '../../src/remove-debugger/edit.mjs';
const cache = new URL('../../.cache/oxc-attribution/', import.meta.url);
export const { types, fields } = JSON.parse(readFileSync(new URL('schema.json', cache)));
const parentSet = new Set(parentTypes);
export const tracks = ['debugger-dense','debugger-sparse','styled-dense','styled-sparse','i18n-javascript','i18n-original','i18n-javascript-compact'];
export function idsFor(track) {
  if(track.endsWith('-compact')) return ['walker-stock','visitor-stock'];
  const ids = ['walker-stock','walker-clone','visitor-stock','visitor-clone','visitor-keys','visitor-generic'];
  if (track.startsWith('debugger')) ids.push('walker-keys','walker-no-meta-skip','walker-fresh-context','walker-parent-exit','direct-stock','direct-for-in','direct-guarded');
  if (track.startsWith('i18n')) ids.push('walker-keys','walker-no-meta-skip','walker-fresh-context','walker-readonly');
  return ids;
}
export function fixturesFor(track) {
  const [scenario,kind] = track.split('-');
  if (scenario !== 'i18n') {
    const fixtures = (scenario === 'debugger' ? debuggerCorpus : styledCorpus)(kind);
    return {fixtures, keys:null, prepare:f=>parseESTree(f.source), expected:f=>canonical(parseESTree(f.expected))};
  }
  const corpus = loadCorpus(), original=kind==='original';
  const fixtures = corpus.files.map(f=>({filename:f.filename,source:original?f.original:f.javascript,expected:original?f.expectedOriginal:f.expectedJavascript}));
  return {fixtures, keys:new Set(corpus.keys), prepare:f=>original?structuredClone(parseSync(f.filename,f.source,{sourceType:'module'}).program):track.endsWith('-compact')?parse(f.source,{ecmaVersion:2022,sourceType:'module'}):parseESTree(f.source), expected:f=>JSON.stringify(f.expected)};
}
export async function runner(id, track, keys) {
  const scenario = track.split('-')[0];
  if (id.startsWith('direct')) {
    if (id==='direct-stock') return (await import('../../src/remove-debugger/plugins/direct-ast.mjs')).run;
    // The two controls change enumeration alone, then add the Oxc-style early
    // metadata/object guards. They keep the original direct deletion strategy.
    const { run }=await import(new URL(id+'.mjs',cache));return run;
  }
  let walk, walkProgram;
  if (id.startsWith('walker')) walk = id==='walker-stock'||id==='walker-parent-exit' ? stockWalk : (await import(new URL(id+'.mjs',cache))).walk;
  else if(id!=='visitor-stock') ({walkProgram}=await import(new URL(id==='visitor-keys'?'visitor-keys.mjs':id==='visitor-generic'?'visitor-generic.mjs':'visitor-clone.mjs',cache)));
  return (ast,filename) => {
    let changed=0, output=[],state;
    let typeNames, callback, phase;
    if(scenario==='debugger') {
      state={changed:0};typeNames=parentTypes;phase=':exit';callback=node=>editSlots(node,state);
    } else if(scenario==='styled') {
      state=stateFor(ast,filename);typeNames=['VariableDeclarator'];phase=':exit';callback=node=>edit(node,state);
    } else {
      typeNames=['Literal'];phase='';callback=node=>{if(typeof node.value==='string'&&keys.has(node.value))output.push(node.value);};
    }
    const matches = node => scenario==='debugger'?parentSet.has(node.type):node.type===typeNames[0];
    if(walk) {
      if(scenario==='debugger' && id!=='walker-parent-exit') {
        walk(ast,{enter(node,parent,{index}) {
          if(node.type!=='DebuggerStatement')return;
          if(index==null)this.replace({type:'EmptyStatement'});else this.remove();changed++;
        }});
        state.changed=changed;
      } else walk(ast,{[phase?'leave':'enter'](node){if(matches(node))callback(node);}});
    } else {
      const hooks = Object.fromEntries(typeNames.map(type=>[type+phase,callback]));
      if(id==='visitor-stock') new Visitor(hooks).visit(ast);
      else {
        const compiled=createCompiledVisitor();addVisitorToCompiled(hooks);const needsVisit=finalizeCompiledVisitor();
        if(id==='visitor-generic') { const all=node=>{if(matches(node))callback(node);}; compiled.allLeaf=all; compiled.allBranch={enter:phase?null:all,exit:phase?all:null}; }
        if(needsVisit)walkProgram(ast,compiled);
      }
    }
    return scenario==='i18n'?output:{ast,changed:state.changed};
  };
}
export { canonical, digest };
