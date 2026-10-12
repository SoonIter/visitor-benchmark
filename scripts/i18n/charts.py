"""Group i18n charts by AST family, with the two inputs in matching columns."""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'scripts/shared'))
from chart_theme import render

data = json.loads((ROOT / 'results/i18n/summary.json').read_text())
raw = json.loads((ROOT / 'results/i18n/latest.json').read_text())
for name, estree in [('estree', True), ('native', False)]:
    groups = {kind: {r['id']: r for r in data['rows'] if r['kind'] == kind and (r['ast'] == 'ESTree') == estree}
              for kind in ['original', 'javascript']}
    # Like the editing charts, align implementation rows across input tracks.
    # Rank by the left panel first; append JS-only implementations by JS timing.
    identifiers = sorted(set(groups['original']) | set(groups['javascript']),
                         key=lambda id: (0, groups['original'][id]['medianMs']) if id in groups['original']
                         else (1, groups['javascript'][id]['medianMs']))
    panels = []
    for kind, label in [('original', 'Original TS / TSX'), ('javascript', 'Pre-transpiled JavaScript')]:
        rows = []
        for id in identifiers:
            r = groups[kind].get(id)
            if r is None:
                assert any(run['id'] == id and run['kind'] == kind and run['status'] == 'unsupported'
                           for run in raw['runs']), (id, kind)
                rows.append({'id': id, 'median': None})
            else:
                rows.append({'id': id, 'median': r['medianMs'], 'min': r['minMs'], 'max': r['maxMs']})
        panels.append({'title': label, 'xlabel': 'Milliseconds / 64 files · lower is better', 'rows': rows})
    title = 'Collect i18n strings · ' + ('Shared ESTree' if estree else 'Native ASTs')
    subtitle = ('Identical AST within each track · Compare implementations within a panel; inputs differ between tracks'
                if estree else 'Babel and TypeScript ASTs are not ESTree · Different inputs across tracks; no same-AST ranking')
    render(title, subtitle, panels,
           f"{data['cpu']} · Node {data['node']} · {raw['timestamp'][:10]}",
           raw['repeats'], ROOT / f'charts/i18n/{name}')
