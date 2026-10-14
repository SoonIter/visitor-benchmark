// Supplementary API comparison. Never substitutes for walk in the main ranking.
import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'acorn';
import { walk, createWalker, visit } from '../../vendor/swc-next/ast.js';
import { median } from '../shared/report.mjs';
const mode = process.argv[2];
const modes = ['walk', 'compiled', 'visit'];
if (!mode) {
  const runs = [];
  for (let repeat = 0; repeat < 3; repeat++) {
    const order = repeat % 2 ? [...modes].reverse() : modes;
    for (const mode of order) {
      const child = spawnSync(process.execPath, ['--expose-gc', import.meta.filename, mode], { encoding: 'utf8' });
      if (child.status !== 0) throw new Error(child.stderr);
      runs.push({ repeat, ...JSON.parse(child.stdout) });
    }
  }
  writeFileSync('results/wall-walker/api-check.json', JSON.stringify({ description: 'Supplementary 500-small-file collection workload; excluded from main ranking', provenance: JSON.parse(readFileSync('vendor/provenance.json')), node: process.version, runs, summary: modes.map(mode => ({ mode, ms: median(runs.filter(r=>r.mode===mode).map(r=>median(r.samplesMs))) })) }, null, 2) + '\n');
} else {
  if (!modes.includes(mode)) throw new Error('Unknown mode');
  const source = "const label = 'hello'; function f() { return 'world'; }";
  const hooks = { Literal(node, ctx) { if (typeof node.value === 'string') ctx.state.push(node.value); } };
  const readHooks = { Literal(node, state) { if (typeof node.value === 'string') state.push(node.value); } };
  const compiled = createWalker(hooks);
  const run = mode === 'walk' ? (ast, output) => walk(ast, hooks, output) : mode === 'compiled' ? (ast, output) => compiled.walk(ast, output) : (ast, output) => visit(ast, readHooks, output);
  const samplesMs = [];
  for (let i = -8; i < 20; i++) {
    const inputs = Array.from({ length: 500 }, () => parse(source, { ecmaVersion: 'latest', sourceType: 'module' }));
    const output = [];
    if (i === 0) global.gc?.();
    const start = performance.now();
    for (const input of inputs) run(input, output);
    const elapsed = performance.now() - start;
    assert.deepEqual(output, Array.from({ length: 500 }, () => ['hello', 'world']).flat());
    if (i >= 0) samplesMs.push(elapsed);
  }
  console.log(JSON.stringify({ mode, samplesMs }));
}
