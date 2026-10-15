// V8 diagnostic only. Add internal exports to a temporary copy, never the package.
import { mkdtempSync, readFileSync, writeFileSync, copyFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
const entry = resolve(process.argv[2]);
const temporary = mkdtempSync(join(tmpdir(), 'walker-feedback-'));
try {
  writeFileSync(join(temporary, 'package.json'), '{"type":"module"}');
  for (const file of ['child-visitors.js', 'visitor-keys.js']) copyFileSync(join(dirname(entry), file), join(temporary, file));
  writeFileSync(join(temporary, 'index.js'), readFileSync(entry, 'utf8') + '\nexport { WalkContext, compile };\n');
  writeFileSync(join(temporary, 'probe.mjs'), `
import { WalkContext, compile } from './index.js';
const compiled = compile({ DebuggerStatement() {} });
console.log('WALKERS_FAST', %HasFastProperties(compiled.walkers), 'DISPATCH_FAST', %HasFastProperties(compiled.dispatch));
process.argv.splice(2, Infinity, 'remove-debugger', 'swc-next', 'sparse', '8', '20');
await import(${JSON.stringify(pathToFileURL(resolve('scripts/shared/worker.mjs')).href)});
%DebugPrint(WalkContext.prototype.visit);
%DebugPrint(WalkContext.prototype.visitScalar);
%DebugPrint(WalkContext.prototype.visitHooks);
`);
  const result = spawnSync(process.execPath, ['--allow-natives-syntax', '--expose-gc', '--import', './scripts/wall/loader.mjs', join(temporary, 'probe.mjs')], {
    stdio: 'inherit', env: {...process.env, SWC_NEXT_WALKER_ENTRY: join(temporary, 'index.js')},
  });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} finally { rmSync(temporary, {recursive: true, force: true}); }
