// Targeted diagnostics for ranking reversals, separate from the main matrix.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { digest } from '../../src/shared/ast.mjs';
import { median } from './metrics.mjs';
const primary = JSON.parse(readFileSync('results/cpu/latest.json'));
assert.ok(primary.completedAt, 'Run this after all primary measurements finish');
for (const [path, hash] of Object.entries(primary.sourceManifest.sha256)) {
  if (path.startsWith('src/') || path.startsWith('vendor/') || ['scripts/cpu/worker.mjs', 'scripts/cpu/task.mjs', 'package-lock.json'].includes(path))
    assert.equal(digest(readFileSync(path)), hash, `Measurement source changed: ${path}`);
}
const groups = {
  'styled-components/dense': ['oxc-visitor', 'oxc-walker', 'swc-next', 'yuku-ast', 'acorn-recursive'],
  'i18n/original': ['oxc-visitor', 'oxc-walker', 'swc-next', 'yuku-ast', 'estree-walker'],
};
const names = Object.entries(groups).flatMap(([track, ids]) => ids.map(id => `${track}/${id}`));
const data = { createdAt: new Date().toISOString(), environment: primary.environment,
  primaryMeasurementCommit: primary.sourceManifest.commit,
  workerSha256: digest(readFileSync(new URL('./worker.mjs', import.meta.url))),
  diagnostic: 'Two V8 flags only: normal vs --no-opt --no-maglev. Same existing worker, fresh ASTs, GC, workload and output checks. Selected after the first primary round; not a broad JIT benchmark.',
  repetitions: 3, runs: [] };
mkdirSync('.cache/cpu-jit', { recursive: true });
for (let rep = 0; rep < 3; rep++) for (const name of rep % 2 ? [...names].reverse() : names)
  for (const mode of rep % 2 ? ['disabled', 'normal'] : ['normal', 'disabled']) {
    const output = `.cache/cpu-jit/${rep}-${name.replaceAll('/','__')}-${mode}.json`;
    const flags = ['--expose-gc', '--hash-seed=1', '--random-seed=1', ...(mode === 'disabled' ? ['--no-opt', '--no-maglev'] : [])];
    console.log(`[JIT control ${rep+1}/3] ${name}: ${mode}`);
    const child = spawnSync(process.execPath, [...flags, new URL('./worker.mjs', import.meta.url).pathname, 'wall', name, output], { stdio: 'inherit' });
    assert.ifError(child.error); assert.equal(child.status, 0);
    const result = JSON.parse(readFileSync(output));
    const reference = primary.runs.find(r => r.name === name);
    for (const key of ['sourceHash','outputHash']) assert.equal(result[key], reference[key]);
    data.runs.push({ repetition: rep, jit: mode, ...result });
  }
data.completedAt = new Date().toISOString();
writeFileSync('results/cpu/jit-control.json', JSON.stringify(data, null, 2) + '\n');
const sections = Object.entries(groups).map(([track, ids]) => {
  const rows = ids.map(id => {
    const name = `${track}/${id}`;
    const medians = Object.fromEntries(['normal','disabled'].map(mode => [mode,
      median(data.runs.filter(r => r.name === name && r.jit === mode).map(r => median(r.samplesMs)))]));
    return `| ${id} | ${medians.normal.toFixed(3)} | ${medians.disabled.toFixed(3)} | ${(medians.disabled/medians.normal).toFixed(2)}× |`;
  });
  return `## ${track}\n\n| Implementation | Normal JIT (ms) | Optimizing JIT disabled (ms) | Slowdown |\n| :-- | --: | --: | --: |\n${rows.join('\n')}\n`;
});
writeFileSync('docs/cpu/jit-control.md', '# Targeted JIT control\n\nShared ESTree, three isolated processes per cell, eight warmups and twenty samples per process; medians of process medians. Both modes use fixed hash/random seeds. The only changed process flags are `--no-opt --no-maglev`. Cases were selected after observing the first primary round: the styled-components Oxc reversal and the original-i18n track with weak rank correlation. This is a targeted diagnostic, not a comprehensive JIT comparison. All outputs match the primary run.\n\n' + sections.join('\n') + '\nThis can test whether disabling optimizing JIT changes the ordering of these implementations. It does not isolate individual V8 optimizations, and does not test Ct\'s instruction weights or cache behavior. [Raw samples](../../results/cpu/jit-control.json).\n');
