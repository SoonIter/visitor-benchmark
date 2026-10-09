import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { report } from './report.mjs';
const root=new URL('../',import.meta.url);
const chart=spawnSync(process.env.PYTHON || 'python3',[fileURLToPath(new URL('./charts.py',import.meta.url))],{stdio:'inherit'});
if(chart.error)throw chart.error;
if(chart.status!==0)throw new Error('Chart generation failed. Install scripts/requirements-charts.txt and optionally set PYTHON.');
const data=JSON.parse(readFileSync(new URL('results/latest.json',root)));
const env=data.environment, commit=data.provenance.commit;
writeFileSync(new URL('results/latest.md',root),report(data).markdown);
const styledReadme = `# JavaScript Visitor Benchmark

Compare ${data.variants.length} JavaScript AST traversal and editing implementations using a styled-components \`displayName\` / \`componentId\` transform.

## System

| Property | Value |
| --- | --- |
| CPU | ${env.cpu} |
| OS | ${env.platform} (${env.arch}) |
| Runtime | Node.js ${env.node} |
| Memory | ${env.totalMemoryGiB.toFixed(0)} GiB |
| Measured | ${data.createdAt.slice(0,10)} |

## Benchmarks

### Shared ESTree

Every implementation receives an independent clone of the **same Acorn AST**. Dense: 400 components; sparse: 80 components with more unrelated code. Both workloads contain four files.

\`direct-ast\` edits top-level declarations without a visitor API. It skips unrelated subtrees by design.

![Shared ESTree benchmark](charts/estree.png)

### Native ASTs

Babel, SWC and TypeScript prepare their own ASTs from the same source. **These inputs are not ESTree**; do not treat this chart as a same-AST comparison. Scope-enabled and wrapper APIs include their additional work.

![Native AST benchmark](charts/native.png)

[Full results and memory](results/latest.md) · [Raw samples](results/latest.json) · [Implementations](src/registry.mjs)

## Run

Node.js 24+ and GitHub CLI (\`gh\`) for refreshing the SWC Next branch snapshot:

\`\`\`sh
npm ci
npm test
npm run bench
\`\`\`

Regenerate the charts and this README (Python 3 + Matplotlib):

\`\`\`sh
python3 -m pip install -r scripts/requirements-charts.txt
npm run report
\`\`\`

Use \`npm run bench:quick\` for a smoke run, or \`npm run bench -- --only=swc-next,yuku-ast,oxc-walker --output=focused\` for selected implementations. Set \`PYTHON\` to use a virtual environment for chart generation.

## Methodology

Each implementation runs in ${data.config.repetitions} fresh processes with ${data.config.warmups} warmups and ${data.config.iterations} measured iterations per process. Timing covers visitor setup, traversal and edits; parsing, cloning, printing and output validation are excluded. Every measured output is checked against an independent expected result.

This is a focused config-injection workload, **not the complete styled-components plugin**. See [methodology and coverage](docs/methodology.md) for semantics, exclusions and memory definitions.

SWC Next is pinned to [\`${commit.slice(0,7)}\`](https://github.com/swc-project/swc-next/commit/${commit}) on \`${data.provenance.branch}\`. The default \`npm run bench\` refreshes this snapshot automatically. Use \`npm run bench:pinned\` to explicitly reuse it offline.

Presentation inspired by [Native ECMAScript Parser Benchmark](https://github.com/yuku-toolchain/ecmascript-parser-benchmark-native).
`;
writeFileSync(new URL('docs/styled-components.md', root), styledReadme.replaceAll('](charts/', '](../charts/').replaceAll('](results/', '](../results/').replaceAll('](src/', '](../src/').replaceAll('](docs/methodology.md)', '](methodology.md)'));
function files(dir){return readdirSync(new URL(dir,root),{withFileTypes:true}).flatMap(x=>x.isDirectory()?files(`${dir}/${x.name}`):[`${dir}/${x.name}`]);}
const names=['package.json','package-lock.json',...files('src'),...files('scripts'),...files('vendor')];
writeFileSync(new URL('results/source-manifest.json',root),JSON.stringify(Object.fromEntries(names.sort().map(name=>[name,createHash('sha256').update(readFileSync(new URL(name,root))).digest('hex')])),null,2)+'\n');
console.log('Updated docs/styled-components.md, charts/, results/latest.md and source-manifest.json.');
