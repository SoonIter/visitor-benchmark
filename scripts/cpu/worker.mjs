import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
import { performance } from 'node:perf_hooks';
import { jobs, task } from './task.mjs';
const [mode, name, output] = process.argv.slice(2);
const job = (await jobs()).find(j => j.name === name);
assert.ok(job, `Unknown task: ${name}`);
const report = { name, mode, status: 'passed', flags: process.execArgv };
let work;
try {
  work = await task(job);
  work.contract?.();
  work.prepare(); work.run(); work.validate();
} catch (error) {
  if (mode !== 'check' || job.scenario !== 'i18n') throw error;
  // Detailed errors remain in the existing compatibility report; keep private
  // business source and dictionary values out of CPU result artifacts.
  report.status = 'unsupported';
  report.reason = 'Failed parser/traversal/ordered-output contract; see i18n compatibility report.';
}
if (report.status === 'passed') {
  report.sourceHash = work.sourceHash; report.files = work.files;
  if (mode === 'simulation') {
    const { withCodSpeed } = await import('@codspeed/tinybench-plugin');
    const { InstrumentHooks, getCodspeedRunnerMode, getV8Flags } = await import('@codspeed/core');
    const { Bench } = await import('tinybench');
    const bench = withCodSpeed(new Bench({ throws: true }));
    assert.equal(getCodspeedRunnerMode(), 'simulation', 'Use codspeed run --mode simulation');
    assert.ok(InstrumentHooks.isInstrumented(), 'Refusing uninstrumented CPU measurements');
    assert.ok([...getV8Flags(), '--no-maglev'].every(f => process.execArgv.includes(f)), 'Missing simulation V8 flags');
    bench.add(name, () => work.run(), {
      beforeEach() { work.prepare(); },
      afterEach() { work.validate(); },
    });
    // The async plugin path awaits all seven warmups and all validation hooks.
    await bench.run();
  } else if (mode === 'wall') {
    report.samplesMs = [];
    for (let i = -8; i < 20; i++) {
      work.prepare();
      // Match simulation's pre-measurement full GC, outside the measured region.
      global.gc?.();
      const start = performance.now(); work.run(); const ms = performance.now() - start;
      work.validate();
      if (i >= 0) report.samplesMs.push(ms);
    }
  } else assert.equal(mode, 'check');
  report.outputHash = work.outputHash;
}
writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
