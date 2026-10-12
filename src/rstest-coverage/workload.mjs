import { readFileSync } from 'node:fs';
import { parse } from 'acorn';
import { canonical, digest, parseESTree } from '../shared/ast.mjs';
import { oracle } from './oracle.mjs';
export { digest } from '../shared/ast.mjs';
export const tracks = ['runtime', 'tooling'];
export function fixture(filename, source) {
  const comments = [];
  const ast = parse(source, { ecmaVersion: 2022, sourceType: 'module', locations: true, ranges: true, onComment: comments });
  const reference = oracle(parseESTree(source), source, comments);
  return { filename, source, ast, comments, expected: canonical(reference.ast), metadata: reference.metadata, count: reference.changed };
}
export function corpus(kind = 'runtime') {
  const data = JSON.parse(readFileSync(new URL('../../vendor/rstest-coverage/corpus.json', import.meta.url)));
  return data.files.filter(f => f.track === kind).map(f => fixture(f.filename, f.source));
}
