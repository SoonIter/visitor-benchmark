// Diagnostic only: prepare a bounded corpus batch before sampling.
// This changes heap residency; use the original workers for timings.
import { Session } from 'node:inspector';
import { writeFileSync, mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
const [scenario, id, kind, output, roundsArg = '160'] = process.argv.slice(2);
let fixtures, prepare, run;
if (scenario === 'i18n') {
  const { engine } = await import('../../../src/i18n/engine.mjs');
  const { loadCorpus } = await import('../../../src/i18n/corpus.mjs');
  const corpus = loadCorpus(), keys = new Set(corpus.keys), impl = await engine(id, kind);
  fixtures = corpus.files.map(f => ({filename: f.filename, source: kind === 'original' ? f.original : f.javascript}));
  prepare = impl.prepare; run = ast => impl.collect(ast, keys);
} else {
  const { variants } = await import(`../../../src/${scenario}/registry.mjs`);
  const { corpus } = await import(`../../../src/${scenario}/workload.mjs`);
  const { load } = await import(`../../../src/${scenario}/execute.mjs`);
  const impl = await load(variants.find(v => v.id === id));
  fixtures = corpus(kind); prepare = impl.prepare; run = impl.run;
}
for (let i = 0; i < 30; i++) for (const fixture of fixtures) run(prepare(fixture), fixture);
const prepared = Array.from({length: Number(roundsArg)}, () => fixtures.map(fixture => ({fixture, ast: prepare(fixture)})));
global.gc?.();
const session = new Session(); session.connect();
const post = (method, args = {}) => new Promise((resolve, reject) => session.post(method, args, (e, r) => e ? reject(e) : resolve(r)));
await post('Profiler.enable'); await post('Profiler.setSamplingInterval', { interval: 100 }); await post('Profiler.start');
for (const batch of prepared) for (const {fixture, ast} of batch) run(ast, fixture);
const { profile } = await post('Profiler.stop'); session.disconnect();
const nodes = new Map(profile.nodes.map(n => [n.id, n]));
const walkerRoot = pathToFileURL(dirname(resolve(process.env.SWC_NEXT_WALKER_ENTRY || 'vendor/swc-next/ast.js'))).href + '/';
const counts = new Map(); let total = 0;
for (let i = 0; i < profile.samples.length; i++) {
  const {functionName, url, lineNumber} = nodes.get(profile.samples[i]).callFrame;
  if (url && !url.startsWith(walkerRoot) && !url.includes('/oxc-parser/') && !url.includes('/src/')) continue;
  if (!url && functionName !== '(garbage collector)') continue;
  const key = JSON.stringify({functionName, url, lineNumber});
  const row = counts.get(key) ?? {functionName, url, lineNumber, samples: 0, us: 0};
  row.samples++; row.us += profile.timeDeltas[i]; counts.set(key, row); total += profile.timeDeltas[i];
}
if (!total) throw new Error('No traversal samples collected');
const report = { scenario, id, kind, node: process.version, v8: process.versions.v8, rounds: Number(roundsArg), totalSampledUs: total,
  self: [...counts.values()].sort((a,b) => b.us-a.us) };
mkdirSync(dirname(resolve(output)), {recursive:true});
writeFileSync(output + '.cpuprofile', JSON.stringify(profile));
writeFileSync(output + '.json', JSON.stringify(report, null, 2)+'\n');
console.log(JSON.stringify({...report, self: report.self.slice(0,20)},null,2));
