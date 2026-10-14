import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
const { items, workers } = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const controller = new AbortController();
let next = 0;
async function consume() {
  while (next < items.length) {
    const item = items[next++];
    console.log(`[simulation] ${item.name}`);
    await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, [...process.execArgv,
        new URL('./worker.mjs', import.meta.url).pathname, 'simulation', item.name, item.output],
        { stdio: 'inherit', signal: controller.signal });
      child.on('error', reject);
      child.on('close', (code, signal) => {
        if (code === 0) resolve();
        else reject(new Error(`Simulation failed: ${item.name} (${code}, ${signal})`));
      });
    });
  }
}
assert.ok(Number.isSafeInteger(workers) && workers > 0);
try { await Promise.all(Array.from({ length: workers }, consume)); }
catch (error) { controller.abort(); throw error; }
