"""Adapt recorded mutation measurements to the shared chart renderer."""
import json
import sys
import statistics
from pathlib import Path
from chart_theme import render

ROOT = Path(__file__).resolve().parents[2]
scenario = sys.argv[1] if len(sys.argv) > 1 else 'styled-components'
data = json.loads((ROOT / f'results/{scenario}/latest.json').read_text())


def measurement(variant, kind):
    runs = [r for r in data['runs'] if r['id'] == variant['id'] and r['kind'] == kind]
    medians = [statistics.median(r['samplesMs']) for r in runs]
    label = variant['id']
    if label == 'direct-ast' and scenario == 'styled-components':
        label += ' (specialized)'
    return {'id': variant['id'], 'label': label, 'median': statistics.median(medians),
            'min': min(medians), 'max': max(medians)}


for name, estree in [('estree', True), ('native', False)]:
    variants = [v for v in data['variants'] if (v['ast'] == 'ESTree') == estree]
    variants.sort(key=lambda v: measurement(v, 'dense')['median'])
    panels = []
    for kind in ['dense', 'sparse']:
        edits = next(r['edits'] for r in data['runs'] if r['kind'] == kind)
        panels.append({'title': f'{kind.title()} · {edits} edits',
                       'xlabel': 'Milliseconds / 4 files · lower is better',
                       'rows': [measurement(v, kind) for v in variants]})
    env = data['environment']
    title = 'Styled-components' if scenario == 'styled-components' else 'Remove debugger'
    title += ' · Shared ESTree' if estree else ' · Native ASTs'
    subtitle = ('Identical Acorn AST input for every implementation' if estree else
                'Not a same-AST ranking; includes TSQuery print/reparse and ts-morph text updates')
    render(title, subtitle, panels,
           f"{env['cpu']} · Node {env['node']} · {data['createdAt'][:10]}",
           data['config']['repetitions'], ROOT / f'charts/{scenario}/{name}')
