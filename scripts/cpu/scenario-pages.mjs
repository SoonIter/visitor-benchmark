import { readFileSync, writeFileSync } from 'node:fs';
import { scenarios } from '../../src/scenarios.mjs';
export function renderScenarioPages(data, rows) {
  for (const scenario of scenarios) {
    const path = `docs/${scenario.id}/README.md`;
    const tracks = [...new Set(rows.filter(r => r.scenario === scenario.id).map(r => r.kind))];
    const result = ['## Results', '',
      '[Ir/Ct numbers and paired wall time](../cpu/results.md) · [Method and reproduction](../cpu/README.md) · [Comparison with the previous wall-time ranking](../cpu/historical-ranks.md)', '',
      'Three independent CPU samples per supported combination. Lower Ir (K) and Ct (K) are better. Ct is a model cost, not hardware elapsed cycles; simulation disables optimizing JIT. Each chart has Ir on the left and Ct on the right.', '',
      ...tracks.map(track => `![${track}: shared ESTree](../../charts/cpu/${scenario.id}-${track}-estree.svg)\n`),
      '<details>\n<summary>Native ASTs — not an ESTree comparison</summary>\n',
      ...tracks.map(track => `![${track}: native ASTs](../../charts/cpu/${scenario.id}-${track}-native.svg)\n`),
      '</details>', '',
      'Native Babel, SWC and TypeScript rows include their own AST representation and API costs. Unsupported combinations have no bar. Compare within each input track and AST family.', '',
    ].join('\n');
    let text = readFileSync(path, 'utf8').replace(/## Results\n[\s\S]*?(?=\n## )/, result);
    text = text.replace('[Full results and API strategies]', '[Historical wall time and API strategies]')
      .replace('[Raw measurements]', '[Historical wall samples]')
      .replace('[Results](../../results/', '[Historical wall results](../../results/')
      .replace('[Raw samples](../../results/', '[Historical raw samples](../../results/')
      .replace('[Full results & compatibility]', '[Historical wall time & compatibility]');
    text = text.replaceAll('Timing includes visitor construction', 'Measured work includes visitor construction');
    text = text.replace(/\[439dba8\]\(https:\/\/github.com\/swc-project\/swc-next\/commit\/439dba831c8f3dd5336013116043b225b27951af\)/g,
      `[${data.swcNext.commit.slice(0,7)}](https://github.com/swc-project/swc-next/commit/${data.swcNext.commit})`);
    if (scenario.id === 'i18n') {
      text = text.replace('The **v7** cases resolve dependencies from the business workspace;', 'The **v7** cases use business-resolved versions (a locked dependency replay in the Linux CPU run);');
      text = text.replace(/- \*\*3 isolated processes × 5 warmups \+ 12 measured iterations\*\*[^\n]*/, '- **CPU:** three isolated samples, each after seven warmups. **Paired wall time:** three processes, eight warmups and twenty samples. Both measure one complete 64-file batch; preparation, explicit pre-measurement GC and validation stay outside the measured region.');
    }
    // Preserve historical runner instructions, but label them explicitly. The
    // primary CPU command is shared because publishing requires the full matrix.
    const marker = '## CPU reproduction';
    if (!text.includes(marker)) {
      const heading = scenario.id === 'rstest-coverage' ? '## Verification and reproduction' : '## Reproduce';
      text = text.replace(heading, `${marker}\n\nSee [CPU setup](../cpu/README.md) for Linux, pinned tools and the private corpus. To check this scenario without overwriting the full published result:\n\n\`\`\`sh\nnpm run bench:cpu -- --match=${scenario.id}/ --work=.cache/cpu-${scenario.id} --output=results/tmp/cpu-${scenario.id}.json\n\`\`\`\n\nThe commands below reproduce the **historical wall-time runner**. Its results and environment are kept for comparison.\n\n${heading}`);
    }
    text = text.replace('PYTHON=.cache/charts-venv/bin/python npm run report\n', 'PYTHON=.cache/charts-venv/bin/python node scripts/render-wall.mjs\n');
    // Historical summaries below the contract remain explicitly historical.
    text = text.replace('Measured 2026-10-12 on Apple M5 Max', 'Historical wall time measured 2026-10-12 on Apple M5 Max');
    text = text.replace('Measured on **Apple M5 Max', 'Historical wall time measured on **Apple M5 Max');
    writeFileSync(path, text);
  }
}
