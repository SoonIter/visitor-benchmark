export const median = xs => { const a = [...xs].sort((a,b) => a-b), m = Math.floor(a.length/2); return a.length % 2 ? a[m] : (a[m-1]+a[m])/2; };
export function summarize(data) {
  const rows = [];
  for (const kind of data.config.corpora) for (const variant of data.variants) {
    const runs = data.runs.filter(r => r.kind === kind && r.id === variant.id);
    if (runs.length !== data.config.repetitions) throw new Error(`Incomplete: ${kind}/${variant.id}`);
    if (new Set(runs.map(r => r.repetition)).size !== runs.length) throw new Error('Duplicate process repetition');
    for (const run of runs) {
      if (run.samplesMs.length !== data.config.iterations || run.samplesMs.some(x => !Number.isFinite(x) || x < 0)) throw new Error('Invalid samples');
    }
    const medians = runs.map(r => median(r.samplesMs));
    rows.push({ ...variant, kind, ms: median(medians), min: Math.min(...medians), max: Math.max(...medians), peakRss: Math.max(...runs.map(r=>r.peakRssMiB)), heap: Math.max(...runs.map(r=>r.observedHeapMiB)), edits: runs[0].edits });
  }
  for (const kind of data.config.corpora) {
    const runs = data.runs.filter(r=>r.kind===kind);
    for (const field of ['outputHash', 'inputHash', 'sharedESTreeHash', 'edits']) {
      if (new Set(runs.map(r=>r[field])).size !== 1) throw new Error(`${kind}: parity mismatch for ${field}`);
    }
  }
  return rows;
}
export function report(data) {
  const rows = summarize(data), scenario = data.scenario || 'styled-components';
  let markdown = `# ${scenario} results\n\n${data.createdAt} · ${data.environment.cpu} · ${data.environment.platform}/${data.environment.arch} · Node ${data.environment.node}\n\n${data.config.repetitions} isolated processes × ${data.config.warmups} warmups + ${data.config.iterations} measured iterations per track. Each iteration processes four files. Bars/tables show the median of process medians; ranges are min–max, not confidence intervals.\n\nPreparation, parsing, cloning, external printing, validation and disposal are excluded. Traversal setup, scope analysis where enabled, queries and edits are included. Internal ts-morph text updates remain timed. Memory covers the entire worker, including untimed preparation and validation; it is not traversal-only allocation. There is no server process.\n`;
  for (const kind of data.config.corpora) {
    markdown += `\n## ${kind}\n\n${rows.find(r=>r.kind===kind).edits} edits / four files.\n`;
    for (const estree of [true, false]) {
      markdown += `\n### ${estree ? 'Shared Acorn ESTree' : 'Native ASTs — not a same-AST ranking'}\n\n| API | AST | Median ms | Process range ms | Peak RSS MiB | Observed heap MiB |\n| :-- | :-- | --: | :-- | --: | --: |\n`;
      markdown += rows.filter(r=>r.kind===kind && (r.ast==='ESTree')===estree).sort((a,b)=>a.ms-b.ms).map(r=>`| ${r.id} | ${r.ast} | ${r.ms.toFixed(3)} | ${r.min.toFixed(3)}–${r.max.toFixed(3)} | ${r.peakRss.toFixed(1)} | ${r.heap.toFixed(1)} |`).join('\n')+'\n';
    }
  }
  markdown += '\n## Implementations\n\n| API | Strategy |\n| :-- | :-- |\n'+data.variants.map(v=>`| ${v.id} | ${v.note} |`).join('\n')+'\n\nEvery measured output is printed, reparsed and compared to independently authored expected code. The adjacent JSON records all samples, execution order, dependency versions, SWC Next SHA and source hashes.\n';
  return { rows, markdown };
}
