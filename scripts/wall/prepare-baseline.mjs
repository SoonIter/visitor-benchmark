// Recreate the measured old walker without changing the current vendor snapshot.
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
const ref = '42ea237';
const out = new URL('../../.cache/walker-before/', import.meta.url);
mkdirSync(out, { recursive: true });
for (const [source, target] of [
  ['vendor/swc-next/ast.js', 'index.js'],
  ['vendor/swc-next/child-visitors.js', 'child-visitors.js'],
  ['vendor/swc-next/visitor-keys.js', 'visitor-keys.js'],
  ['vendor/provenance.json', 'provenance.json'],
]) writeFileSync(new URL(target, out), execFileSync('git', ['show', `${ref}:${source}`]));
console.log(`Prepared baseline from ${ref} in ${out.pathname}`);
