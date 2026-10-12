import { parse } from 'acorn';
import { createHash } from 'node:crypto';
export const parseESTree = source => parse(source, { ecmaVersion: 2022, sourceType: 'module', locations: true, ranges: true });
// Independent oracle: expected source is generated with the fixtures, not by a benchmark plugin.
function clean(node) {
  if(Array.isArray(node)) return node.map(clean);
  if(node && typeof node==='object') return Object.fromEntries(Object.entries(node).filter(([k])=>!['start','end','loc','range','raw'].includes(k)).map(([k,v])=>[k,clean(v)]));
  return node;
}
export const canonical = ast => JSON.stringify(clean(ast));
export const digest = value => createHash('sha256').update(value).digest('hex');
export function verifyCode(code, fixture) {
  const actual=canonical(parseESTree(code)), expected=canonical(parseESTree(fixture.expected));
  if(actual!==expected) throw new Error(`Output mismatch: ${fixture.filename}`);
  return digest(actual);
}
