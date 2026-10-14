import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const plan = JSON.parse(readFileSync(process.argv[2], 'utf8'));
for (const item of plan) {
  console.log(`[simulation] ${item.name}`);
  const child = spawnSync(process.execPath, [...process.execArgv,
    new URL('./worker.mjs', import.meta.url).pathname, 'simulation', item.name, item.output], { stdio: 'inherit' });
  assert.ifError(child.error);
  assert.equal(child.status, 0, `Simulation failed: ${item.name} (${child.signal})`);
}
