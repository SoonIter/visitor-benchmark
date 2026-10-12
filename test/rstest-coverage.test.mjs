import test from 'node:test';
import assert from 'node:assert/strict';
import { variants } from '../src/rstest-coverage/registry.mjs';
import { fixture, corpus } from '../src/rstest-coverage/workload.mjs';
import { load } from '../src/rstest-coverage/execute.mjs';
const cases = [
  fixture('nested.js', 'function f(a,b) { if(a) if(b) return 1; else return 2; else return 3; }'),
  fixture('empty.js', 'if (a); else; if (b) f(); if (c) { f(); } else g();'),
  fixture('ignore.js', '/* v8 ignore next */ if(a) if(b) f();\n/* v8 ignore if */ if(c) if(d) g(); else h();\n/* v8 ignore else */ if(e) f(); else if(g) h();'),
  fixture('unicode.js', 'const text="中文😀"; function f(参数) { if(参数) return text; else throw "错"; }'),
  fixture('unchanged.js', 'function f() { return "if (a) b();"; }'),
  fixture('file.js', '/* v8 ignore file */ if(a) f(); else g();'),
];
// Expectations independent of both oracle and contestant implementations.
assert.equal(cases[0].count, 4);
assert.equal(cases[1].count, 4);
assert.equal(cases[2].count, 3);
assert.deepEqual(fixture('empty-range.js', 'if(a);').metadata, [{ start: 0, end: 6, branches: [{start:6,end:5,implicit:false},{start:0,end:6,implicit:true}] }]);
assert.deepEqual(fixture('one.js', 'if(a)b();').metadata, [{ start: 0, end: 9, branches: [{start:6,end:8,implicit:false},{start:0,end:9,implicit:true}] }]);
for (const variant of variants) test(`rstest-coverage ${variant.id}: real modules, nested edits, hints, empty arms and UTF-16`, async () => {
  const engine = await load(variant);
  for (const f of [...cases, ...corpus('runtime'), ...corpus('tooling')]) {
    const input = engine.prepare(f);
    const before = variant.id === 'zimmerframe' ? structuredClone(input) : null;
    const result = engine.run(input, f);
    try { assert.match(engine.validate(result, f), /^[a-f0-9]{64}$/); }
    finally { result.dispose?.(); }
    if (before) assert.deepEqual(input, before);
  }
});
