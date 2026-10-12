"""One visual system for every main benchmark chart; data adapters stay separate."""
from pathlib import Path

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.ticker import MaxNLocator

TEXT = '#172033'
MUTED = '#64748b'
GRID = '#e2e8f0'
COLORS = {'swc-next': '#7c3aed', 'direct-ast': '#059669'}
DEFAULT_COLOR = '#2563eb'

plt.rcParams.update({
    'font.family': 'DejaVu Sans', 'font.size': 10,
    'figure.facecolor': 'white', 'axes.facecolor': 'white',
    'text.color': TEXT, 'axes.labelcolor': MUTED,
    'xtick.color': MUTED, 'ytick.color': TEXT,
    'axes.spines.top': False, 'axes.spines.right': False,
    'axes.spines.left': False, 'axes.spines.bottom': False,
    'svg.fonttype': 'none', 'svg.hashsalt': 'visitor-benchmark',
})


def render(title, subtitle, panels, environment, repetitions, output):
    """Panels contain title/xlabel/rows; each row has id, median, min, max, label?."""
    height = max(6.4, max(len(panel['rows']) for panel in panels) * .35 + 2.2)
    fig, axes = plt.subplots(1, 2, figsize=(16, height))
    # Both panels always reserve space for names, including long Babel API names.
    fig.subplots_adjust(left=.225, right=.955, bottom=.18, top=.79, wspace=.90)
    fig.text(.035, .955, title, fontsize=22, weight='bold', va='top')
    fig.text(.035, .895, subtitle, fontsize=10, color=MUTED, va='top')
    for ax, panel in zip(axes, panels):
        rows = panel['rows']
        values = [r['median'] for r in rows]
        positions = list(range(len(rows)))
        colors = [COLORS.get(r['id'], DEFAULT_COLOR) for r in rows]
        ax.barh(positions, values, height=.60, color=colors, zorder=3)
        ax.errorbar(values, positions,
                    xerr=[[r['median'] - r['min'] for r in rows],
                          [r['max'] - r['median'] for r in rows]],
                    fmt='none', ecolor=TEXT, capsize=2, elinewidth=.9, zorder=4)
        upper = max(r['max'] for r in rows)
        for y, row in enumerate(rows):
            ax.text(row['max'] + upper*.025, y, f"{row['median']:.3f}",
                    va='center', fontsize=9, color=TEXT)
        ax.set_xlim(0, upper*1.25)
        ax.set_yticks(positions, [r.get('label', r['id']) for r in rows])
        # Keep physical row spacing consistent even when the groups differ in size.
        ax.set_ylim(max(len(p['rows']) for p in panels) - .4, -.6)
        ax.tick_params(axis='both', length=0, pad=8)
        for tick, row in zip(ax.get_yticklabels(), rows):
            if row['id'] in COLORS:
                tick.set_color(COLORS[row['id']])
                tick.set_weight('bold')
        ax.xaxis.set_major_locator(MaxNLocator(5))
        ax.grid(axis='x', color=GRID, linewidth=.7, zorder=0)
        ax.set_axisbelow(True)
        ax.set_title(panel['title'], loc='left', fontsize=12, weight='bold', pad=16)
        ax.set_xlabel(panel['xlabel'], fontsize=9, labelpad=12)
    fig.text(.035, .065, environment, fontsize=9, color=MUTED)
    fig.text(.035, .029,
             f'Median of {repetitions} process medians · Whiskers: min–max · Lower is better · Parsing and external printing excluded',
             fontsize=8.5, color=MUTED)
    output = Path(output)
    output.parent.mkdir(parents=True, exist_ok=True)
    for ext in ['svg', 'png']:
        fig.savefig(output.with_suffix('.' + ext), dpi=180, facecolor='white',
                    metadata={'Date': None} if ext == 'svg' else None)
    plt.close(fig)
    svg = output.with_suffix('.svg')
    svg.write_text('\n'.join(line.rstrip() for line in svg.read_text().splitlines()) + '\n')
