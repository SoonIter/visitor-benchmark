import { spawnSync, execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import os from 'node:os';
import { sourceManifest } from '../shared/provenance.mjs';
import { scenarios } from '../../src/scenarios.mjs';
const root = fileURLToPath(new URL('../../', import.meta.url));
const option = (key, fallback) => process.argv.find(a => a.startsWith(`--${key}=`))?.slice(key.length + 3) ?? fallback;
const candidate = resolve(option('candidate', 'vendor/swc-next/ast.js'));
const baseline = resolve(option('baseline', '.cache/walker-before/index.js'));
const output = resolve(option('output', 'results/wall-walker/comparison.json'));
const only = option('only', '').split(',').filter(Boolean);
const reps = Number(option('repetitions', '3'));
function snapshot(entry) {
  const files = {};
  function visit(path) {
    if (files[path]) return;
    const source = readFileSync(path);
    files[path] = createHash('sha256').update(source).digest('hex');
    for (const match of source.toString().matchAll(/from\s+["']\.\/([^"']+\.js)["']/g)) visit(resolve(dirname(path), match[1]));
  }
  visit(entry);
  return { entry, sha256: files };
}
const data = { candidateGit: { commit: candidate === resolve('vendor/swc-next/ast.js') ? JSON.parse(readFileSync('vendor/provenance.json')).commit : execFileSync('git', ['-C', dirname(candidate), 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim() }, baselineProvenance: JSON.parse(readFileSync(resolve('.cache/walker-before/provenance.json'))), createdAt: new Date().toISOString(), metric: 'wall time: median of process medians', harness: 'original workers, unchanged warmups, samples and timed region', baseline: snapshot(baseline), candidate: snapshot(candidate), sourceManifest: sourceManifest(), environment: { node: process.version, platform: os.platform(), arch: os.arch(), cpu: os.cpus()[0].model }, repetitions: reps, runs: [] };
const jobs = [];
for (const scenario of scenarios) {
  const { variants } = await import(`../../src/${scenario.id}/registry.mjs`);
  const kinds = scenario.id === 'i18n' ? ['original', 'javascript'] : (await import(`../../src/${scenario.id}/workload.mjs`)).tracks ?? ['dense', 'sparse'];
  for (const kind of kinds) for (const variant of variants) {
    if (only.length && !only.includes(variant.id)) continue;
    jobs.push({ scenario: scenario.id, kind, ...variant, version: 'candidate' });
    if (variant.id === 'swc-next') jobs.push({ scenario: scenario.id, kind, ...variant, version: 'baseline' });
  }
}
if (!jobs.length) throw new Error('No jobs selected');
mkdirSync(dirname(output), { recursive: true });
const failed = new Set();
for (let rep = 0; rep < reps; rep++) {
  const offset = (rep * Math.ceil(jobs.length / reps)) % jobs.length;
  const order = [...jobs.slice(offset), ...jobs.slice(0, offset)];
  if (rep % 2) order.reverse();
  for (const job of order) {
    const key = `${job.scenario}/${job.kind}/${job.id}/${job.version}`;
    if (failed.has(key)) continue;
    const i18n = job.scenario === 'i18n';
    const args = i18n ? ['scripts/i18n/worker.mjs'] : ['scripts/shared/worker.mjs', job.scenario];
    args.push(job.id, job.kind, i18n ? '5' : '8', i18n ? '12' : '20');
    const child = spawnSync(process.execPath, ['--expose-gc', '--import', resolve('scripts/wall/loader.mjs'), ...args], {
      cwd: root, encoding: 'utf8', maxBuffer: 16e6, timeout: 180000,
      env: { ...process.env, SWC_NEXT_WALKER_ENTRY: job.version === 'baseline' ? baseline : candidate },
    });
    if (child.error || child.status !== 0) throw new Error(`${key}: ${child.error ?? child.stderr}`);
    const result = JSON.parse(child.stdout);
    const run = { ...job, repetition: rep, ...result };
    if (run.status && run.status !== 'passed') failed.add(key);
    else {
      const peers = data.runs.filter(r => r.scenario === job.scenario && r.kind === job.kind && (!r.status || r.status === 'passed'));
      for (const peer of peers) {
        for (const field of ['outputHash', i18n ? 'sourceHash' : 'inputHash']) if (peer[field] !== run[field]) throw new Error(`${key}: ${field} mismatch`);
        if (peer.ast === 'ESTree' && run.ast === 'ESTree') {
          const field = i18n ? 'astHash' : 'sharedESTreeHash';
          if (peer[field] !== run[field]) throw new Error(`${key}: AST mismatch`);
        }
      }
    }
    data.runs.push(run);
    writeFileSync(output, JSON.stringify(data, null, 2) + '\n');
    const xs = run.samplesMs?.toSorted((a,b)=>a-b);
    console.log(`[${rep+1}/${reps}] ${key}: ${xs ? xs[Math.floor(xs.length/2)].toFixed(3)+' ms' : run.status}`);
  }
}
if (JSON.stringify(data.baseline) !== JSON.stringify(snapshot(baseline)) || JSON.stringify(data.candidate) !== JSON.stringify(snapshot(candidate))) throw new Error('Walker changed during measurement');
data.completedAt = new Date().toISOString();
writeFileSync(output, JSON.stringify(data, null, 2) + '\n');
