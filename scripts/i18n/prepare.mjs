// Private source and dictionary values stay in the ignored local cache.
import { readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { createRequire } from 'node:module';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import { transformSync } from '@swc/core';
import { digest, cacheURL, babelOptions } from '../../src/i18n/corpus.mjs';
const root = resolve(process.env.FLOW_WEB_ROOT || '/Users/bytedance/Documents/codes/flow-web-monorepo');
const loader = 'packages/Infra/build/src/plugins/edenx/inline-i18n/rspack-plugin/loader/index.ts';
const locales = ['zh', 'zh-Hant']; // The application's actual domestic production configuration.
const dictionaryFiles = locales.map(locale => `packages/L1-Arch/business/i18n/resource/locales/web/${locale}.json`);
const keys = [...new Set(dictionaryFiles.flatMap(file => Object.keys(JSON.parse(readFileSync(resolve(root, file), 'utf8')))))].sort();
const keySet = new Set(keys);
const roots = ['L1-Arch', 'L2-Core', 'L3-Feature', 'L4-Entry'].map(name => `packages/${name}`);
const paths = execFileSync('rg', ['--files', ...roots, '-g', '*.ts', '-g', '*.tsx', '-g', '!*.d.ts', '-g', '!**/node_modules/**', '-g', '!**/__tests__/**', '-g', '!**/e2e/**'], { cwd: root, encoding: 'utf8', maxBuffer: 20e6 }).trim().split('\n');
const candidates = paths.filter(file => { const size = statSync(resolve(root, file)).size; return size >= 256 && size <= 32768; });
candidates.sort((a, b) => digest(`i18n-v1:${a}`).localeCompare(digest(`i18n-v1:${b}`)));
function oracle(source) {
  const ast = parse(source, babelOptions), output = [];
  traverse(ast, { StringLiteral(path) { if (keySet.has(path.node.value)) output.push(path.node.value); } });
  return output;
}
let businessParser, businessTraverse, businessVersions;
try {
  const req = createRequire(resolve(root, loader));
  businessParser = req('@babel/parser').parse;
  const mod = req('@babel/traverse'); businessTraverse = mod.default || mod;
  businessVersions = { parser: req('@babel/parser/package.json').version, traverse: req('@babel/traverse/package.json').version };
} catch { businessVersions = null; }
const files = [], rejected = [];
for (const filename of candidates) {
  if (files.length === 64) break;
  const original = readFileSync(resolve(root, filename), 'utf8');
  try {
    const expectedOriginal = oracle(original);
    if (businessParser) {
      const actual = [];
      businessTraverse(businessParser(original, babelOptions), { StringLiteral(path) { if (keySet.has(path.node.value)) actual.push(path.node.value); } });
      if (JSON.stringify(actual) !== JSON.stringify(expectedOriginal)) throw new Error('Business Babel oracle differs');
    }
    const javascript = transformSync(original, { filename, jsc: { parser: { syntax: 'typescript', tsx: filename.endsWith('.tsx'), decorators: true }, target: 'es2022', transform: { legacyDecorator: true, react: { runtime: 'automatic' } } }, module: { type: 'es6' }, sourceMaps: false }).code;
    files.push({ filename, original, javascript, expectedOriginal, expectedJavascript: oracle(javascript) });
  } catch (error) { rejected.push({ filename, reason: error.message.split('\n')[0] }); }
}
if (files.length !== 64) throw new Error('Insufficient parseable files');
const manifest = {
  format: 1, selection: 'First 64 SHA-256-ranked paths (i18n-v1 seed), 256–32768 bytes, four application layers; no selection by match count.',
  candidateFiles: candidates.length, loader, loaderHash: digest(readFileSync(resolve(root, loader))),
  sourceCommit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(),
  dictionary: { locales, keys: keys.length, files: dictionaryFiles.map(filename => ({ filename, sha256: digest(readFileSync(resolve(root, filename))) })) },
  businessBabel: businessVersions, businessBabelOracleVerified: Boolean(businessParser), rejected,
  files: files.map(file => ({ filename: file.filename, originalBytes: Buffer.byteLength(file.original), javascriptBytes: Buffer.byteLength(file.javascript), originalHash: digest(file.original), javascriptHash: digest(file.javascript), originalMatches: file.expectedOriginal.length, javascriptMatches: file.expectedJavascript.length, originalOutputHash: digest(JSON.stringify(file.expectedOriginal)), javascriptOutputHash: digest(JSON.stringify(file.expectedJavascript)) })),
};
mkdirSync(new URL('../../.cache/i18n/', import.meta.url), { recursive: true });
writeFileSync(cacheURL, JSON.stringify({ keys, files, manifest }));
writeFileSync(new URL('../../docs/i18n/corpus.json', import.meta.url), JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify({ files: files.length, keys: keys.length, rejected: rejected.length, originalMatches: files.reduce((n, f) => n + f.expectedOriginal.length, 0), javascriptMatches: files.reduce((n, f) => n + f.expectedJavascript.length, 0), businessBabel: businessVersions }));
