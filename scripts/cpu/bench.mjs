import assert from 'node:assert/strict';
import { spawnSync, execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, existsSync, renameSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import os from 'node:os';
import { jobs } from './task.mjs';
import { loadProfiles } from './metrics.mjs';
import { sourceManifest } from '../shared/provenance.mjs';
import { digest } from '../../src/shared/ast.mjs';
const arg = (name, fallback) => process.argv.find(v => v.startsWith(`--${name}=`))?.slice(name.length + 3) ?? fallback;
const repetitions = Number(arg('repetitions', '3'));
const cpuWorkers = Number(arg('cpu-workers', '1'));
assert.ok(Number.isSafeInteger(cpuWorkers) && cpuWorkers > 0);
assert.ok(Number.isSafeInteger(repetitions) && repetitions > 0);
assert.equal(os.platform(), 'linux', 'CPU simulation requires Linux; use the documented local VM workflow on macOS.');
const selected = (await jobs()).filter(j => j.name.includes(arg('match', '')));
assert.ok(selected.length, 'No tasks selected');
const directory = resolve(arg('work', '.cache/cpu'));
const out = resolve(arg('output', 'results/cpu/latest.json'));
mkdirSync(directory, { recursive: true }); mkdirSync(resolve(out, '..'), { recursive: true });
const runner = process.env.CODSPEED_BIN ?? 'codspeed';
const environment = { node: process.version, platform: os.platform(), arch: os.arch(), release: os.release(),
  cpu: os.cpus()[0].model, cpuCount: os.cpus().length, memoryGiB: os.totalmem()/1024**3,
  codspeed: execFileSync(runner, ['--version'], { encoding: 'utf8' }).trim() };
const manifest = sourceManifest();
const pkg = JSON.parse(readFileSync('package.json'));
const data = { createdAt: new Date().toISOString(), method: 'codspeed-fresh-parser-batch-v1',
  environment, sourceManifest: manifest, dependencies: pkg.dependencies, devDependencies: pkg.devDependencies,
  swcNext: JSON.parse(readFileSync('vendor/provenance.json')), repetitions, cpuWorkers, jobs: selected,
  simulationWarmups: 7, wallWarmups: 8, wallSamples: 20,
  units: { Ir: 'instructions', Ct: 'centi-cycles', wall: 'milliseconds per corpus batch' },
  checks: [], runs: [] };
if (selected.some(j => j.scenario === 'i18n')) {
  const { businessDependencies } = await import('../../src/i18n/engine.mjs');
  data.businessDependencies = businessDependencies();
  data.privateCorpusHash = digest(readFileSync('.cache/i18n/corpus.json'));
}
const fingerprint = digest(JSON.stringify({ manifest, environment, jobs: selected, repetitions, cpuWorkers, privateCorpusHash: data.privateCorpusHash, businessDependencies: data.businessDependencies }));
const fingerprintPath = join(directory, 'fingerprint');
if (existsSync(fingerprintPath)) assert.equal(readFileSync(fingerprintPath, 'utf8'), fingerprint,
  'Inputs/configuration changed: select a new --work directory, do not reuse old measurements.');
else writeFileSync(fingerprintPath, fingerprint);
const save = () => writeFileSync(out, JSON.stringify(data, null, 2) + '\n');
const execute = (command, args, env = process.env) => {
  const p = spawnSync(command, args, { stdio: 'inherit', env });
  assert.ifError(p.error); assert.equal(p.status, 0, `${command} exited ${p.status} (${p.signal})`);
};
const worker = new URL('./worker.mjs', import.meta.url).pathname;
const safe = name => name.replaceAll('/', '__');
for (const job of selected) {
  const file = join(directory, `check-${safe(job.name)}.json`);
  if (!existsSync(file)) execute(process.execPath, ['--expose-gc', worker, 'check', job.name, file]);
  const checked = JSON.parse(readFileSync(file));
  // Fail closed if compatibility differs from the previously validated suite.
  if (job.scenario === 'i18n') {
    const previous = JSON.parse(readFileSync('results/i18n/latest.json')).runs.find(r => r.id === job.id && r.kind === job.kind);
    assert.ok(previous, `Missing compatibility baseline: ${job.name}`);
    assert.equal(checked.status, previous.status, `Compatibility changed: ${job.name}`);
  } else assert.equal(checked.status, 'passed');
  data.checks.push(checked);
  console.log(`[check] ${job.name}: ${checked.status}`);
}
for (const job of selected) {
  const peers = data.checks.filter(c => c.status === 'passed' && c.name.startsWith(`${job.scenario}/${job.kind}/`));
  for (const field of ['sourceHash', 'outputHash']) assert.ok(new Set(peers.map(p => p[field])).size <= 1, `${job.scenario}/${job.kind}: ${field} mismatch`);
}
save();
const supported = selected.filter(j => data.checks.find(c => c.name === j.name).status === 'passed');
for (let rep = 0; rep < repetitions; rep++) {
  const offset = (rep * Math.ceil(supported.length / 3)) % supported.length;
  let order = [...supported.slice(offset), ...supported.slice(0, offset)];
  if (rep % 2) order.reverse();
  const plan = order.map(j => ({ name: j.name, output: join(directory, `simulation-${rep}-${safe(j.name)}.json`) }));
  const planFile = join(directory, 'plan.json'); writeFileSync(planFile, JSON.stringify({ items: plan, workers: cpuWorkers }));
  const archived = join(directory, `profiles-${rep}`), current = join(directory, 'current');
  if (!existsSync(archived)) {
    assert.ok(!existsSync(current), `Incomplete profile directory ${current}; inspect it before restarting with a new --work directory.`);
    mkdirSync(current, { recursive: true });
    const env = { ...process.env, CODSPEED_SKIP_UPLOAD: 'true' }; delete env.GITHUB_ACTIONS;
    execute(runner, ['run', '--mode', 'simulation', '--profile-folder', current, '--',
      process.execPath, '--no-maglev', '--interpreted-frames-native-stack', '--allow-natives-syntax',
      '--hash-seed=1', '--random-seed=1', '--no-opt', '--predictable', '--predictable-gc-schedule',
      '--expose-gc', '--no-concurrent-sweeping', '--max-old-space-size=4096',
      new URL('./batch.mjs', import.meta.url).pathname, planFile], env);
    renameSync(current, archived);
  }
  const profiles = loadProfiles(archived, plan.map(j => j.name));
  const profileHashes = Object.fromEntries(readdirSync(archived).filter(f => f.endsWith('.out')).sort()
    .map(f => [f, digest(readFileSync(join(archived, f)))]));
  for (const job of order) {
    const simulation = JSON.parse(readFileSync(plan.find(j => j.name === job.name).output));
    const check = data.checks.find(c => c.name === job.name);
    for (const field of ['sourceHash', 'outputHash']) assert.equal(simulation[field], check[field], `Simulation parity: ${job.name}`);
    const file = join(directory, `wall-${rep}-${safe(job.name)}.json`);
    console.log(`[wall ${rep+1}/${repetitions}] ${job.name}`);
    if (!existsSync(file)) execute(process.execPath, ['--expose-gc', worker, 'wall', job.name, file]);
    const wall = JSON.parse(readFileSync(file));
    for (const field of ['sourceHash', 'outputHash']) assert.equal(wall[field], check[field], `Wall parity: ${job.name}`);
    data.runs.push({ name: job.name, repetition: rep, ...profiles.get(job.name), samplesMs: wall.samplesMs,
      flags: { simulation: simulation.flags, wall: wall.flags }, sourceHash: check.sourceHash, outputHash: check.outputHash });
    save();
  }
  (data.profiles ??= []).push({ repetition: rep, sha256: profileHashes }); save();
}
data.completedAt = new Date().toISOString(); save();
console.log(`Validated ${data.runs.length} paired runs. Saved ${out}`);
