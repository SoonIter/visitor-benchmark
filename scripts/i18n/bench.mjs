import { spawnSync, execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import { sourceManifest } from '../shared/provenance.mjs';
import { variants } from '../../src/i18n/registry.mjs';
import { businessDependencies } from '../../src/i18n/engine.mjs';
const quick = process.argv.includes('--quick');
const validate = process.argv.includes('--validate');
const repeats = validate || quick ? 1 : 3, warmups = validate ? 0 : quick ? 1 : 5, iterations = validate ? 1 : quick ? 3 : 12;
const out = new URL(`../../results/i18n/${validate ? 'validation' : quick ? 'quick' : 'latest'}.json`, import.meta.url);
const report = { astPreparation: "fresh-parse-v1", sourceManifest: sourceManifest(), businessDependencies: businessDependencies(), benchmarkCommit: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), corpus: JSON.parse(readFileSync(new URL('../../docs/i18n/corpus.json', import.meta.url))), timestamp: new Date().toISOString(), node: process.version, platform: `${os.platform()} ${os.arch()}`, cpu: os.cpus()[0].model, repeats, warmups, iterations, dependencies: JSON.parse(readFileSync(new URL('../../package.json', import.meta.url))).dependencies, swcNext: JSON.parse(readFileSync(new URL('../../vendor/provenance.json', import.meta.url))), runs: [] };
const excluded = new Set();
for (let repeat = 0; repeat < repeats; repeat++) {
  let order = variants.slice(repeat * 7).concat(variants.slice(0, repeat * 7));
  if (repeat % 2) order.reverse();
  for (const variant of order) for (const kind of repeat % 2 ? ['javascript', 'original'] : ['original', 'javascript']) {
    if (excluded.has(`${variant.id}:${kind}`)) continue;
    const child = spawnSync(process.execPath, ['--expose-gc', new URL('./worker.mjs', import.meta.url).pathname, variant.id, kind, String(warmups), String(iterations)], { encoding: 'utf8', maxBuffer: 8e6, timeout: 120000 });
    if (child.status !== 0 || child.error) throw new Error(`${variant.id}: ${child.error?.message || child.stderr}`);
    const run = JSON.parse(child.stdout);
    report.runs.push({ ...run, repeat, ast: variant.ast });
    if (run.status !== 'passed') excluded.add(`${variant.id}:${kind}`);
    console.log(`${repeat + 1}/${repeats} ${kind} ${variant.id}: ${run.status === 'passed' ? (run.samplesMs.reduce((a,b)=>a+b,0)/iterations).toFixed(3) + ' ms' : run.reason}`);
    writeFileSync(out, JSON.stringify(report, null, 2) + '\n');
  }
}
// Same-family comparisons must use identical ASTs and source across processes.
for (const kind of ['original', 'javascript']) {
  const runs = report.runs.filter(r => r.kind === kind && r.status === 'passed');
  for (const field of ['outputHash', 'sourceHash']) if (new Set(runs.map(r=>r[field])).size !== 1) throw new Error(`${kind}: ${field} differs`);
  if (new Set(runs.filter(r=>r.ast === 'ESTree').map(r=>r.astHash)).size !== 1) throw new Error(`${kind}: ESTree ASTs differ`);
}
console.log(`Saved ${out.pathname}`);
