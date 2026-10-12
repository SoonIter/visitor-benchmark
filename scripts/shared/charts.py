"""Render charts from recorded measurements; no benchmark reruns or inferred data."""
import json
import sys
import statistics
from pathlib import Path

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.ticker import MaxNLocator

ROOT = Path(__file__).resolve().parents[2]
scenario = sys.argv[1] if len(sys.argv) > 1 else 'styled-components'
data = json.loads((ROOT / f'results/{scenario}/latest.json').read_text())
plt.rcParams.update({'font.family': 'DejaVu Sans', 'font.size': 10, 'axes.spines.top': False,
                     'axes.spines.right': False, 'axes.spines.left': False, 'axes.edgecolor': '#cbd5e1',
                     'text.color': '#172033', 'axes.labelcolor': '#475569', 'xtick.color': '#64748b',
                     'ytick.color': '#172033', 'svg.fonttype': 'none'})

def measurement(identifier, kind):
    runs = [r for r in data['runs'] if r['id'] == identifier and r['kind'] == kind]
    medians = [statistics.median(r['samplesMs']) for r in runs]
    return statistics.median(medians), min(medians), max(medians)

for name, estree in [('estree', True), ('native', False)]:
    variants = [v for v in data['variants'] if (v['ast'] == 'ESTree') == estree]
    variants.sort(key=lambda v: measurement(v['id'], 'dense')[0])
    height = max(6.1, len(variants) * .34 + 2.15)
    fig, axes = plt.subplots(1, 2, figsize=(13, height), sharey=True)
    fig.set_facecolor('white')
    fig.subplots_adjust(left=.21, right=.94, bottom=.18, top=.79, wspace=.17)
    title = 'Shared ESTree' if estree else 'Native ASTs · not ESTree'
    subtitle = ('Identical Acorn AST input for every implementation' if estree else
                'Babel, SWC and TypeScript use different ASTs; this is not a same-AST ranking')
    fig.text(.035, .95, title, fontsize=22, weight='bold', va='top')
    fig.text(.035, .89, subtitle, fontsize=10, color='#64748b', va='top')
    for ax, kind in zip(axes, ['dense', 'sparse']):
        values = [measurement(v['id'], kind) for v in variants]
        colors = ['#7c3aed' if v['id']=='swc-next' else '#059669' if v['id']=='direct-ast' else '#2563eb' for v in variants]
        positions = list(range(len(variants)))
        ax.barh(positions, [x[0] for x in values], color=colors, height=.60, zorder=3)
        ax.errorbar([x[0] for x in values], positions,
                    xerr=[[x[0]-x[1] for x in values], [x[2]-x[0] for x in values]],
                    fmt='none', ecolor='#172033', capsize=2, elinewidth=.9, zorder=4)
        upper = max(x[2] for x in values)
        for y, (value, low, high) in zip(positions, values):
            ax.text(high + upper*.025, y, f'{value:.3f}', va='center', fontsize=9, color='#334155')
        ax.set_xlim(0, upper*1.22)
        ax.set_yticks(positions, [v['id'] + ' (specialized)' if v['id']=='direct-ast' and scenario=='styled-components' else v['id'] for v in variants])
        ax.tick_params(axis='y', length=0, pad=10)
        ax.xaxis.set_major_locator(MaxNLocator(5))
        ax.grid(axis='x', color='#e2e8f0', linewidth=.7, zorder=0)
        ax.set_axisbelow(True)
        edits = next(r['edits'] for r in data['runs'] if r['kind'] == kind)
        ax.set_title(f'{kind.title()} · {edits} edits', loc='left', fontsize=12, pad=16, weight='bold')
        ax.set_xlabel('Milliseconds per four-file iteration · lower is better', fontsize=9, labelpad=9)
    axes[0].invert_yaxis()
    if estree:
        for tick in axes[0].get_yticklabels():
            if tick.get_text()=='swc-next': tick.set_color('#7c3aed');tick.set_weight('bold')
    env = data['environment']
    fig.text(.035, .058, f"{env['cpu']}  ·  {env['node']}  ·  {data['createdAt'][:10]}  ·  {scenario}", fontsize=9, color='#64748b')
    fig.text(.035, .024, f"Bars: median of {data['config']['repetitions']} process medians. Whiskers: min–max. Parsing and external printing excluded.", fontsize=8.5, color='#64748b')
    (ROOT/f'charts/{scenario}').mkdir(parents=True, exist_ok=True)
    fig.savefig(ROOT/f'charts/{scenario}/{name}.png', dpi=180, facecolor='white')
    fig.savefig(ROOT/f'charts/{scenario}/{name}.svg', facecolor='white')
    plt.close(fig)

    svg_path = ROOT / f'charts/{scenario}/{name}.svg'
    svg_path.write_text('\n'.join(line.rstrip() for line in svg_path.read_text().splitlines()) + '\n')
