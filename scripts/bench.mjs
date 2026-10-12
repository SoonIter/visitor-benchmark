import { spawnSync } from 'node:child_process';
import { scenarios } from '../src/scenarios.mjs';
const args = process.argv.slice(2);
const id = args.find(a => !a.startsWith('--'));
const selected = id ? scenarios.filter(s => s.id === id) : scenarios;
if (!selected.length) throw new Error(`Unknown scenario: ${id}`);
for (const scenario of selected) {
  const runner = scenario.runner === 'mutation' ? ['shared/bench.mjs', scenario.id] : ['i18n/bench.mjs'];
  const [script, ...extra] = runner;
  const result = spawnSync(process.execPath, [new URL(script, import.meta.url).pathname, ...extra, ...args.filter(a => a !== id)], { stdio: 'inherit' });
  if (result.error || result.status !== 0) throw result.error || new Error(`${scenario.id} failed (${result.status})`);
}
