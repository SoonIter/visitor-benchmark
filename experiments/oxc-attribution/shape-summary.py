import json,math,random,statistics
from pathlib import Path
root=Path(__file__).resolve().parents[2]
data=json.loads((root/'results/oxc-attribution/strings.json').read_text())
groups={}
for r in data['runs']:groups.setdefault((r['track'],r['id'],r['shape']),[]).append(r)
rows=[]
for (track,ident,shape),runs in groups.items():
    assert len(runs)==7
    medians={r['round']:statistics.median(r['samplesMs']) for r in runs}
    rows.append(dict(track=track,id=ident,shape=shape,medianMs=statistics.median(medians.values()),minMs=min(medians.values()),maxMs=max(medians.values()),processMedians=medians))
lookup={(r['track'],r['id'],r['shape']):r for r in rows}
rng=random.Random(120153);effects=[]
for track in dict.fromkeys(r['track'] for r in rows):
    for ident in ['walker-stock','visitor-stock']:
        for base,changed in [('parsed','cloned'),('cloned','interned'),('cloned','self-assigned')]:
            a=lookup[(track,ident,base)]['processMedians'];b=lookup[(track,ident,changed)]['processMedians'];logs=[math.log(b[k]/a[k]) for k in a]
            draws=sorted(100*(math.exp(statistics.mean(rng.choices(logs,k=7)))-1) for _ in range(10000))
            effects.append(dict(track=track,id=ident,baseline=base,changed=changed,deltaPercent=100*(math.exp(statistics.mean(logs))-1),ci95=[draws[249],draws[9749]]))
summary={'rows':rows,'effects':effects,'method':'Fresh input per iteration. Same serialized AST for every preparation. Seven isolated rounds; median of process medians; paired geometric time ratios and descriptive 95% bootstrap intervals.'}
(root/'results/oxc-attribution/strings-summary.json').write_text(json.dumps(summary,indent=2)+'\n')
for e in effects:print(f'{e["track"]:20s} {e["id"]:16s} {e["baseline"]} -> {e["changed"]:14s} {e["deltaPercent"]:+.1f}% [{e["ci95"][0]:+.1f}, {e["ci95"][1]:+.1f}]')
