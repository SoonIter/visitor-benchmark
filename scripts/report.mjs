import { readFileSync,writeFileSync } from 'node:fs';
export const median=xs=>{const a=[...xs].sort((a,b)=>a-b),m=Math.floor(a.length/2);return a.length%2?a[m]:(a[m-1]+a[m])/2;};
export function report(data){
 const rows=[];
 for(const kind of data.config.corpora)for(const v of data.variants){
  const runs=data.runs.filter(r=>r.id===v.id&&r.kind===kind);if(!runs.length)continue;
  const mids=runs.map(r=>median(r.samplesMs));
  rows.push({...v,kind,ms:median(mids),min:Math.min(...mids),max:Math.max(...mids),peakRss:Math.max(...runs.map(r=>r.peakRssMiB)),heap:Math.max(...runs.map(r=>r.observedHeapMiB)),edits:runs[0].edits});
 }
 let md=`# Styled-components visitor benchmark\n\nGenerated: ${data.createdAt}\n\n${data.environment.node} · ${data.environment.platform}/${data.environment.arch} · ${data.environment.cpu}\n\n${data.config.repetitions} fresh processes per variant/corpus; ${data.config.warmups} warmups + ${data.config.iterations} measured iterations per process. One iteration processes four files. Median = median of process medians; range = min–max process median.\n\nTiming includes plugin state, visitor setup, traversal and edits. Parsing, cloning, printing, validation and disposal are outside the timer. ts-morph's internal text synchronization remains inside its transform call. Memory is **whole-worker** peak RSS and maximum sampled post-iteration heap (includes imports/setup/printing; not walker-only allocated memory). No client/server split: each sample is one Node process.\n\nThis measures a scoped displayName/componentId transform on generated JS modules, not the full official styled-components plugin, production-project performance, or an all-workload winner. Foreign AST rows are separate and must not be interpreted as a same-AST ranking.\n`;
 for(const kind of data.config.corpora){
  md+=`\n## ${kind}\n`;
  for(const group of ['ESTree','other']){
   const subset=rows.filter(r=>r.kind===kind&&(group==='ESTree'?r.ast==='ESTree':r.ast!=='ESTree')).sort((a,b)=>a.ms-b.ms);
   md+=`\n### ${group==='ESTree'?'Shared ESTree input':'Native AST inputs — NOT ESTree'}\n\n| Implementation | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |\n|---|---|---:|---:|---:|---:|\n`;
   for(const r of subset)md+=`| ${r.id} | ${r.ast} | ${r.ms.toFixed(3)} | ${r.min.toFixed(3)}–${r.max.toFixed(3)} | ${r.peakRss.toFixed(1)} | ${r.heap.toFixed(1)} |\n`;
  }
 }
 md+='\n`direct-ast` is a task-specific top-level edit loop, with no visitor API or child-key table. It skips unrelated subtrees and does not implement general nested traversal.\n';
 md+='\nAll measured outputs were printed, reparsed and compared with independently generated expected source outside the timer. Raw per-process samples and hashes are in the adjacent JSON. See README for API capabilities, corpus scope and exclusions.\n';
 return {rows,markdown:md};
}
if(process.argv[1]?.endsWith('/report.mjs')){
 const path=process.argv[2],data=JSON.parse(readFileSync(path,'utf8'));
 writeFileSync(path.replace(/\.json$/,'.md'),report(data).markdown);
}
