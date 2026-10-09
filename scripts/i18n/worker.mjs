import { performance } from 'node:perf_hooks';
import { memoryUsage, resourceUsage } from 'node:process';
import { loadCorpus, digest } from '../../src/i18n/corpus.mjs';
import { keys as fixtureKeys, source as fixtureSource, expected as fixtureExpected } from '../../src/i18n/fixture.mjs';
import { engine } from '../../src/i18n/engine.mjs';
const [id, kind, warmArg = '0', iterationsArg = '1'] = process.argv.slice(2);
const warmups = Number(warmArg), iterations = Number(iterationsArg);
const corpus = loadCorpus(), keys = new Set(corpus.keys);
const files = corpus.files.map(f => ({ filename: f.filename, source: kind === 'original' ? f.original : f.javascript, expected: kind === 'original' ? f.expectedOriginal : f.expectedJavascript }));
let filename;
try {
  const impl = await engine(id, kind);
  filename = 'public-contract-fixture';
  const contractAST = impl.prepare({ filename: 'fixture.tsx', source: fixtureSource });
  if (JSON.stringify(impl.collect(contractAST, fixtureKeys)) !== JSON.stringify(fixtureExpected)) throw new Error('Public contract fixture: ordered output differs from Babel');
  const inputHashes = [];
  let normalizedFiles = 0;
  // A separate correctness pass: exact ordered arrays, including duplicates.
  for (const file of files) {
    filename = file.filename;
    const ast = impl.prepare(file), before = impl.snapshot(ast);
    const actual = impl.collect(ast, keys);
    if (JSON.stringify(actual) !== JSON.stringify(file.expected)) throw new Error(`Ordered output mismatch: expected ${file.expected.length} matches, received ${actual.length}`);
    if (impl.snapshot(ast) !== before) normalizedFiles++;
    inputHashes.push(digest(before));
  }
  const samplesMs = [], setupMs = [], heapMiB = [], rssMiB = [];
  for (let i = -warmups; i < iterations; i++) {
    if (i === 0) global.gc?.();
    let elapsed = 0, setup = 0;
    for (const file of files) {
      filename = file.filename;
      let begin = performance.now();
      const ast = impl.prepare(file);
      setup += performance.now() - begin;
      begin = performance.now();
      const actual = impl.collect(ast, keys);
      elapsed += performance.now() - begin;
      if (JSON.stringify(actual) !== JSON.stringify(file.expected)) throw new Error('Ordered output changed during measurement');
    }
    if (i >= 0) {
      samplesMs.push(elapsed); setupMs.push(setup);
      const memory = memoryUsage(); heapMiB.push(memory.heapUsed / 2 ** 20); rssMiB.push(memory.rss / 2 ** 20);
    }
  }
  process.stdout.write(JSON.stringify({ id, kind, status: 'passed', normalizedFiles, samplesMs, setupMs, observedHeapMiB: Math.max(...heapMiB), observedRssMiB: Math.max(...rssMiB), peakRssMiB: resourceUsage().maxRSS / 1024, serverMemoryMiB: null, astHash: digest(inputHashes.join(',')), outputHash: digest(JSON.stringify(files.map(f => f.expected))), sourceHash: digest(files.map(f => f.source).join('\n')), matches: files.reduce((sum, f) => sum + f.expected.length, 0) }));
} catch (error) {
  process.stdout.write(JSON.stringify({ id, kind, status: 'unsupported', filename, reason: error.message.split('\n')[0].slice(0, 200) }));
}
