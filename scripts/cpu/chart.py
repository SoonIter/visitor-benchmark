import json
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'shared'))
from chart_theme import render

data = json.loads(Path('results/cpu/latest.json').read_text())
rows = json.loads(Path('results/cpu/summary.json').read_text())['rows']
titles = {'styled-components': 'Styled-components', 'remove-debugger': 'Remove debugger',
          'rstest-coverage': 'Normalize coverage branches', 'i18n': 'Collect i18n strings'}
for scenario, title in titles.items():
    for kind in dict.fromkeys(r['kind'] for r in rows if r['scenario'] == scenario):
        for family in ['estree', 'native']:
            group = [r for r in rows if r['scenario'] == scenario and r['kind'] == kind
                     and (r['ast'] == 'ESTree') == (family == 'estree')]
            group.sort(key=lambda r: r.get('Ct', {}).get('median', float('inf')))
            panels = []
            for metric, divisor, label in [('Ir', 1000, 'Instructions (K)'), ('Ct', 100000, 'Simulated throughput cycles (K)')]:
                bars = []
                for r in group:
                    row = {'id': r['id'], 'median': None}
                    if r['status'] == 'passed':
                        row.update({k: r[metric][k] / divisor for k in ['median', 'min', 'max']})
                    bars.append(row)
                panels.append({'title': metric, 'xlabel': label, 'rows': bars})
            env = data['environment']
            render(f'{title} / {kind}',
                   ('Shared ESTree' if family == 'estree' else 'Native ASTs (not ESTree; different tree representations)') +
                   ' · Fresh ASTs · No TurboFan/Maglev · Ct: ' + ('Cortex-A72 model' if data['environment']['arch'] == 'arm64' else 'instruction cost model'),
                   panels, f"{env['node']} · {env['platform']}/{env['arch']} · {env['codspeed']} · {data['createdAt'][:10]}",
                   data['repetitions'], f'charts/cpu/{scenario}-{kind}-{family}',
                   footer=f"Median of {data['repetitions']} independent counter samples · Whiskers: min–max · Lower is better · External parsing/validation excluded")
