import json
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.ticker import MaxNLocator
root = Path(__file__).resolve().parents[2]
data = json.loads((root / 'results/i18n/summary.json').read_text())
plt.rcParams.update({'font.family': 'DejaVu Sans', 'font.size': 10, 'svg.fonttype': 'none'})
for kind, title in [('original', 'Original business TS / TSX'), ('javascript', 'Pre-transpiled business JavaScript')]:
    rows = [r for r in data['rows'] if r['kind'] == kind]
    groups = [[r for r in rows if (r['ast'] == 'ESTree') == estree] for estree in [True, False]]
    height = max(6.4, max(map(len, groups)) * .35 + 1.9)
    fig, axes = plt.subplots(1, 2, figsize=(14, height), gridspec_kw={'wspace': .68})
    fig.patch.set_facecolor('#fafbfd')
    for ax, group, label in zip(axes, groups, ['Shared ESTree', 'Native ASTs (not ESTree)']):
        group.sort(key=lambda r: r['medianMs'])
        labels = [r['id'] for r in group]
        values = [r['medianMs'] for r in group]
        colors = ['#e78831' if r['id'] == 'swc-next' else '#874dc7' if r['id'] == 'babel-traverse-v7' else '#27877d' if r['ast'] == 'ESTree' else '#4b78ad' for r in group]
        ax.set_facecolor('#fafbfd')
        ax.barh(labels, values, height=.65, color=colors, zorder=3)
        ax.errorbar(values, range(len(group)), xerr=[[r['medianMs']-r['minMs'] for r in group], [r['maxMs']-r['medianMs'] for r in group]], fmt='none', ecolor='#25364a', capsize=2, linewidth=.8, zorder=4)
        for y, row in enumerate(group): ax.text(row['maxMs'] + max(values)*.025, y, f"{row['medianMs']:.3f}", va='center', fontsize=9, color='#25364a')
        ax.invert_yaxis()
        ax.set_xlim(0, max(r['maxMs'] for r in group)*1.25)
        ax.set_xlabel('Collection time / 64 files (ms) · lower is better', labelpad=10)
        ax.set_title(label, loc='left', fontsize=13, fontweight='bold', pad=14)
        ax.xaxis.set_major_locator(MaxNLocator(5))
        ax.grid(axis='x', color='#e0e5eb', zorder=0)
        ax.tick_params(axis='both', length=0, pad=6)
        for spine in ax.spines.values(): spine.set_visible(False)
    fig.suptitle(title, x=.04, y=.98, ha='left', fontsize=19, fontweight='bold', color='#15263c')
    fig.text(.04, .91, 'Real i18n dictionary · exact ordered results · parsing excluded · fresh AST per collection', fontsize=11, color='#536376')
    fig.text(.04, .025, f"{data['cpu']}  |  Node {data['node']}  |  Median of 3 process medians; whiskers show their range", fontsize=9, color='#536376')
    fig.subplots_adjust(left=.18, right=.955, top=.80, bottom=.16)
    for ext in ['svg', 'png']: fig.savefig(root / f'charts/i18n/{kind}.{ext}', dpi=180, facecolor=fig.get_facecolor())
    svg_path = root / f'charts/i18n/{kind}.svg'
    svg_path.write_text('\n'.join(line.rstrip() for line in svg_path.read_text().splitlines()) + '\n')
    plt.close(fig)
