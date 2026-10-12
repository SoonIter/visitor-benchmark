"""Adapt recorded read-only measurements to the shared chart renderer."""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'scripts/shared'))
from chart_theme import render

data = json.loads((ROOT / 'results/i18n/summary.json').read_text())
raw = json.loads((ROOT / 'results/i18n/latest.json').read_text())
for kind, title in [('original', 'Collect i18n strings · Original TS / TSX'),
                    ('javascript', 'Collect i18n strings · Pre-transpiled JavaScript')]:
    panels = []
    for estree, label in [(True, 'Shared ESTree'), (False, 'Native ASTs · not ESTree')]:
        group = sorted((r for r in data['rows'] if r['kind'] == kind and (r['ast'] == 'ESTree') == estree),
                       key=lambda r: r['medianMs'])
        panels.append({'title': label, 'xlabel': 'Milliseconds / 64 files · lower is better',
                       'rows': [{'id': r['id'], 'median': r['medianMs'], 'min': r['minMs'], 'max': r['maxMs']} for r in group]})
    render(title, 'Real business dictionary · Exact ordered results · Fresh AST per collection', panels,
           f"{data['cpu']} · Node {data['node']} · {raw['timestamp'][:10]}",
           raw['repeats'], ROOT / f'charts/i18n/{kind}')
