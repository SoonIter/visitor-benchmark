import { readdirSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
const root = new URL('../../', import.meta.url);
function files(dir) {
  return readdirSync(new URL(dir, root), { withFileTypes: true }).filter(e => !e.name.startsWith('.') && e.name !== '__pycache__').flatMap(e => e.isDirectory() ? files(`${dir}/${e.name}`) : [`${dir}/${e.name}`]);
}
export function sourceManifest() {
  return {
    commit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(),
    dirty: Boolean(execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }).trim()),
    sha256: Object.fromEntries(['package.json', 'package-lock.json', ...files('src'), ...files('scripts'), ...files('vendor')].sort().map(p => [p, createHash('sha256').update(readFileSync(new URL(p, root))).digest('hex')])),
  };
}
