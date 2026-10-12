// Capture public source at one Git commit; never read a drifting working tree.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { transformSync } from '@swc/core';
import { createHash } from 'node:crypto';
const checkout = process.env.RSTEST_ROOT || '/Users/bytedance/Documents/codes/rstest';
const commit = 'f3b95e42e32c51f77545a86937b5218f92d69d7e';
const read = path => execFileSync('git', ['show', `${commit}:${path}`], { cwd: checkout, encoding: 'utf8' });
const sha256 = text => createHash('sha256').update(text).digest('hex');
const groups = {
  runtime: ['packages/core/src/runtime/worker/runInPool.ts', 'packages/core/src/runtime/worker/loadEsModule.ts', 'packages/core/src/runtime/worker/index.ts', 'packages/core/src/runtime/worker/setup.ts'],
  tooling: ['packages/core/src/coverage/checkThresholds.ts', 'packages/core/src/utils/error.ts', 'packages/core/src/pool/index.ts', 'packages/vscode/src/parserTest.ts'],
};
const options = { jsc: { parser: { syntax: 'typescript' }, target: 'es2022' }, module: { type: 'es6' }, minify: false, sourceMaps: false };
const files = Object.entries(groups).flatMap(([track, paths]) => paths.map(path => {
  const original = read(path);
  const source = transformSync(original, { ...options, filename: path }).code;
  return { track, filename: path.replace(/\.ts$/, '.js'), originalPath: path, originalSha256: sha256(original), sourceSha256: sha256(source), source };
}));
const upstream = 'packages/coverage-v8/src/v8AstConverter.ts';
writeFileSync(new URL('../../vendor/rstest-coverage/upstream.ts', import.meta.url), read(upstream));
writeFileSync(new URL('../../vendor/rstest-coverage/LICENSE', import.meta.url), read('LICENSE'));
writeFileSync(new URL('../../vendor/rstest-coverage/corpus.json', import.meta.url), JSON.stringify({
  repository: 'https://github.com/web-infra-dev/rstest', commit, upstream, upstreamSha256: sha256(read(upstream)),
  compiler: { package: '@swc/core', version: JSON.parse(readFileSync(new URL('../../node_modules/@swc/core/package.json', import.meta.url))).version, options },
  note: 'Public Rstest modules transpiled once to JavaScript. No execution, bundling, minification, duplication or injected targets. This is representative source, not a captured production coverage trace.', files,
}, null, 2) + '\n');
console.log(`Captured ${files.length} real modules at ${commit}`);
