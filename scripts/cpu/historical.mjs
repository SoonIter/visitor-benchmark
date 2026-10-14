import { readFileSync, writeFileSync } from 'node:fs';
import { median, spearman } from './metrics.mjs';

export function historicalComparison(data, rows) {
  const comparisons = [];
  for (const scenario of new Set(rows.map(r => r.scenario))) {
    const previous = JSON.parse(readFileSync(`results/${scenario}/latest.json`));
    const changed = Object.entries(previous.sourceManifest.sha256)
      .filter(([path, hash]) => (path.startsWith('src/') || path.startsWith('vendor/swc-next/')) && data.sourceManifest.sha256[path] !== hash)
      .map(([path]) => path);
    for (const kind of new Set(rows.filter(r => r.scenario === scenario).map(r => r.kind))) {
      const group = rows.filter(r => r.scenario === scenario && r.kind === kind && r.ast === 'ESTree' && r.status === 'passed');
      const old = group.map(row => previous.runs.filter(r => r.id === row.id && r.kind === kind && r.samplesMs));
      const inputsMatch = group.every((row, i) => old[i].length > 0 && old[i].every(r =>
        (r.sourceHash ?? r.inputHash) === data.checks.find(c => c.name === row.name).sourceHash));
      if (changed.length || !inputsMatch || previous.astPreparation !== 'fresh-parse-v1') {
        comparisons.push({ scenario, kind, status: 'not-comparable', changedBusinessFiles: changed, inputsMatch });
        continue;
      }
      const historicalMs = old.map(runs => median(runs.map(r => median(r.samplesMs))));
      const best = values => group.map((r, i) => ({ id: r.id, value: values[i] })).filter(r => r.id !== 'direct-ast').sort((a,b) => a.value-b.value)[0]?.id;
      comparisons.push({ scenario, kind, status: 'compared', sourceHashesMatch: true, businessSourcesMatch: true,
        historicalDate: previous.createdAt ?? previous.timestamp,
        historicalEnvironment: previous.environment ?? { node: previous.node, platform: previous.platform, cpu: previous.cpu },
        IrVsHistoricalWall: spearman(group.map(r => r.Ir.median), historicalMs),
        CtVsHistoricalWall: spearman(group.map(r => r.Ct.median), historicalMs),
        pairedVsHistoricalWall: spearman(group.map(r => r.wall.median), historicalMs),
        historicalWinner: best(historicalMs), pairedWinner: best(group.map(r => r.wall.median)),
        CtWinner: best(group.map(r => r.Ct.median)),
        rows: group.map((r, i) => ({ id: r.id, historicalMs: historicalMs[i], pairedMs: r.wall.median, Ir: r.Ir.median, Ct: r.Ct.median })) });
    }
  }
  writeFileSync('results/cpu/historical-ranks.json', JSON.stringify(comparisons, null, 2) + '\n');
  const lines = comparisons.map(c => c.status !== 'compared' ? `| ${c.scenario} / ${c.kind} | Not comparable | — | — | — | — | — |`
    : `| ${c.scenario} / ${c.kind} | ${c.IrVsHistoricalWall.toFixed(3)} | ${c.CtVsHistoricalWall.toFixed(3)} | ${c.pairedVsHistoricalWall.toFixed(3)} | ${c.historicalWinner} | ${c.pairedWinner} | ${c.CtWinner} |`);
  writeFileSync('docs/cpu/historical-ranks.md', '# Comparison with the previous wall-time ranking\n\nThe committed macOS results are kept intact. These comparisons first verify fresh-parser preparation, identical input-source hashes, and unchanged business adapters / vendored walker runtime. Only supported ESTree participants in the same track are compared.\n\nThe old run used macOS, per-file timing and no explicit GC before every sample. The paired control uses Linux, whole-corpus batches and pre-measurement GC. Thus changes versus the old ranking include environment and harness effects; they cannot be attributed solely to the metric. The same-environment paired comparison in the main README is the primary control.\n\nSpearman ρ uses all supported ESTree rows; winners exclude the manual direct-ast baseline.\n\n| Scenario / track | Ir ↔ old wall ρ | Ct ↔ old wall ρ | New ↔ old wall ρ | Old wall library | New wall library | Ct library |\n| :-- | --: | --: | --: | :-- | :-- | :-- |\n' + lines.join('\n') + '\n\n[Raw comparisons and historical environment](../../results/cpu/historical-ranks.json) · [Previous charts and method](wall-time-baseline.md).\n');
}
