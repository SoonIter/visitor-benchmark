import assert from 'node:assert/strict';
import { digest } from '../../src/shared/ast.mjs';
import { scenarios } from '../../src/scenarios.mjs';

export async function jobs() {
  const output = [];
  for (const scenario of scenarios) {
    const { variants } = await import(`../../src/${scenario.id}/registry.mjs`);
    const tracks = scenario.runner === 'readonly' ? ['original', 'javascript']
      : (await import(`../../src/${scenario.id}/workload.mjs`)).tracks ?? ['dense', 'sparse'];
    for (const kind of tracks) for (const variant of variants)
      output.push({ scenario: scenario.id, kind, ...variant, name: `${scenario.id}/${kind}/${variant.id}` });
  }
  return output;
}

// The same batch and fresh-parser lifecycle are used for simulation and wall time.
// Only source text is loaded from disk; ASTs are never serialized or cloned.
export async function task(job) {
  let fixtures, impl, invoke, validate, contract;
  if (job.scenario === 'i18n') {
    const { loadCorpus } = await import('../../src/i18n/corpus.mjs');
    const { engine } = await import('../../src/i18n/engine.mjs');
    const { source, keys: contractKeys, expected } = await import('../../src/i18n/fixture.mjs');
    const corpus = loadCorpus(), keys = new Set(corpus.keys);
    fixtures = corpus.files.map(f => ({ filename: f.filename,
      source: job.kind === 'original' ? f.original : f.javascript,
      expected: job.kind === 'original' ? f.expectedOriginal : f.expectedJavascript }));
    impl = await engine(job.id, job.kind);
    contract = () => assert.deepEqual(impl.collect(impl.prepare({ filename: 'fixture.tsx', source }), contractKeys), expected);
    invoke = ast => impl.collect(ast, keys);
    validate = (result, fixture) => {
      // Do not put private literals into error messages or committed output.
      assert.ok(JSON.stringify(result) === JSON.stringify(fixture.expected), 'Ordered i18n output differs');
      return digest(JSON.stringify(result));
    };
  } else {
    const { corpus } = await import(`../../src/${job.scenario}/workload.mjs`);
    const { load } = await import(`../../src/${job.scenario}/execute.mjs`);
    fixtures = corpus(job.kind);
    impl = await load(job);
    invoke = impl.run;
    validate = impl.validate;
  }
  let inputs, results, outputHash;
  return {
    files: fixtures.length,
    sourceHash: digest(fixtures.map(f => f.source).join('\n')),
    get outputHash() { return outputHash; },
    contract,
    prepare() { inputs = fixtures.map(f => impl.prepare(f)); results = new Array(fixtures.length); },
    run() { for (let i = 0; i < fixtures.length; i++) results[i] = invoke(inputs[i], fixtures[i]); },
    validate() {
      const hash = digest(results.map((r, i) => validate(r, fixtures[i])).join(','));
      assert.ok(outputHash === undefined || hash === outputHash, 'Output changed between iterations');
      outputHash = hash;
      for (const r of results) r?.dispose?.();
      inputs = results = undefined;
    },
  };
}
