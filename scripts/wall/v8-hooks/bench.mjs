// Targeted comparison; does not publish or replace the full benchmark leaderboard.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import os from 'node:os';
import { sourceManifest } from '../../shared/provenance.mjs';
import { median } from '../../shared/report.mjs';
const option = (key, fallback) => process.argv.find(a => a.startsWith(`--${key}=`))?.slice(key.length + 3) ?? fallback;
const baseline = resolve(option('baseline', 'results/oxc-target/baseline/index.js'));
const candidate = resolve(option('candidate', 'vendor/swc-next/ast.js'));
const repetitions = Number(option('repetitions', '5'));
const output = resolve(option('output', 'results/v8-walker/comparison.json'));
assert.ok(Number.isInteger(repetitions) && repetitions > 0);
function snapshot(entry) {
  const sha256 = {};
  function visit(path) {
    if (sha256[path]) return;
    const source = readFileSync(path);
    sha256[path] = createHash('sha256').update(source).digest('hex');
    for (const match of source.toString().matchAll(/from\s+["']\.\/([^"']+\.js)["']/g)) visit(resolve(dirname(path), match[1]));
  }
  visit(entry);
  return { entry, sha256 };
}
const candidateFlags = JSON.parse(option('candidate-flags', '[]'));
assert.ok(Array.isArray(candidateFlags) && candidateFlags.every(x => typeof x === 'string' && x.startsWith('--')));
const jobs = [];
const tracks = option('tracks', '').split(',').filter(Boolean);
for (const [scenario, kinds] of [
  ['styled-components', ['dense', 'sparse']], ['remove-debugger', ['dense', 'sparse']],
  ['rstest-coverage', ['runtime', 'tooling']], ['i18n', ['original', 'javascript']],
]) for (const kind of kinds) {
  if (tracks.length && !tracks.includes(`${scenario}/${kind}`)) continue;
  for (const [label, id, entry] of [
    ['previous', 'swc-next', baseline], ['candidate', 'swc-next', candidate],
    ['oxc-visitor', 'oxc-visitor', null], 
  ]) jobs.push({ scenario, kind, label, id, entry, operations: 'original' });
  if (option('matched', 'false') === 'true' && scenario !== 'i18n') for (const [label, entry] of [['previous', baseline], ['candidate', candidate]])
    jobs.push({ scenario, kind, label, id: 'swc-next', entry, operations: 'matched' });
}
const data = {
  createdAt: new Date().toISOString(), metric: 'normal-JIT wall time; median of process medians',
  description: 'Original workers and validation; matched is a separate diagnostic, not the main leaderboard.',
  environment: { node: process.version, v8: process.versions.v8, platform: os.platform(), arch: os.arch(), cpu: os.cpus()[0].model },
  baseline: snapshot(baseline), candidate: snapshot(candidate), sourceManifest: sourceManifest(),
  baselineProvenance: JSON.parse(readFileSync(resolve(dirname(baseline), 'provenance.json'))),
  repetitions, candidateFlags, runs: [],
};
mkdirSync(dirname(output), { recursive: true });
for (let repetition = 0; repetition < repetitions; repetition++) {
  const offset = repetition * Math.ceil(jobs.length / repetitions) % jobs.length;
  const order = [...jobs.slice(offset), ...jobs.slice(0, offset)];
  if (repetition % 2) order.reverse();
  for (const job of order) {
    const i18n = job.scenario === 'i18n';
    const args = [...(job.label === 'candidate' ? candidateFlags : []), '--expose-gc', '--import', './scripts/wall/loader.mjs', '--import', './scripts/wall/oxc-target/loader.mjs',
      ...(i18n ? ['scripts/i18n/worker.mjs'] : ['scripts/shared/worker.mjs', job.scenario]),
      job.id, job.kind, i18n ? '5' : '8', i18n ? '12' : '20'];
    const loadAverageBefore = os.loadavg();
    const result = spawnSync(process.execPath, args, { encoding: 'utf8', maxBuffer: 16e6, timeout: 180000,
      env: { ...process.env, SWC_NEXT_WALKER_ENTRY: job.entry ?? '', SWC_OPERATIONS: job.operations } });
    if (result.error || result.status !== 0) throw new Error(`${JSON.stringify(job)}: ${result.error ?? result.stderr}`);
    const run = { ...job, repetition, loadAverageBefore, loadAverageAfter: os.loadavg(), ...JSON.parse(result.stdout) };
    assert.ok(!run.status || run.status === 'passed', JSON.stringify(run));
    for (const peer of data.runs.filter(r => r.scenario === job.scenario && r.kind === job.kind)) {
      for (const field of ['outputHash', i18n ? 'sourceHash' : 'inputHash', i18n ? 'astHash' : 'sharedESTreeHash']) {
        assert.ok(run[field], `Missing parity field: ${field}`);
        assert.equal(run[field], peer[field], `${job.scenario}/${job.kind}: ${field}`);
      }
    }
    data.runs.push(run);
    console.log(`[${repetition + 1}/${repetitions}] ${job.scenario}/${job.kind}/${job.operations}/${job.label}: ${median(run.samplesMs).toFixed(3)} ms`);
    writeFileSync(output, JSON.stringify(data, null, 2) + '\n');
  }
}
assert.deepEqual(snapshot(candidate), data.candidate, 'Candidate changed during measurement');
assert.deepEqual(snapshot(baseline), data.baseline, 'Baseline changed during measurement');
assert.deepEqual(sourceManifest().sha256, data.sourceManifest.sha256, 'Harness changed during measurement');
data.complete = true;
writeFileSync(output, JSON.stringify(data, null, 2) + '\n');
