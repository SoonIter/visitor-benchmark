import json, math, random, statistics, sys
from pathlib import Path
root=Path(__file__).resolve().parents[2]
name=sys.argv[1] if len(sys.argv)>1 else 'fresh'
data=json.loads((root/f'results/oxc-attribution/{name}.json').read_text())
groups={}
for r in data['runs']:groups.setdefault((r['track'],r['id']),[]).append(r)
rows=[]
for (track,ident),runs in groups.items():
    assert len(runs)==data['repeats']
    medians={str(r['round']):statistics.median(r['samplesMs']) for r in runs}
    rows.append(dict(track=track,id=ident,medianMs=statistics.median(medians.values()),processMedians=medians,minMs=min(medians.values()),maxMs=max(medians.values())))
lookup={(r['track'],r['id']):r for r in rows}
rng=random.Random(120153)
def contrast(track,base,changed,label,target_track=None):
    a=lookup[(track,base)]['processMedians'];b=lookup[(target_track or track,changed)]['processMedians']
    logs=[math.log(b[k]/a[k]) for k in a]
    draws=sorted(100*(math.exp(statistics.mean(rng.choices(logs,k=len(logs))))-1) for _ in range(10000))
    return dict(track=track,baseline=base,changed=changed,changedTrack=target_track or track,label=label,deltaPercent=100*(math.exp(statistics.mean(logs))-1),ci95=[draws[249],draws[9749]])
effects=[]
for track in dict.fromkeys(r['track'] for r in rows):
    pairs=[('walker-stock','walker-clone','Unmodified walker clone'),('visitor-stock','visitor-clone','Unmodified visitor clone'),('visitor-clone','visitor-keys','Direct child fields to key loop'),('visitor-clone','visitor-generic','Typed callbacks to callback for every node'),('walker-clone','walker-keys','for-in to Object.keys'),('walker-clone','walker-no-meta-skip','Stop skipping type/start/end'),('walker-clone','walker-fresh-context','Create callback position object per node'),('walker-clone','walker-readonly','Remove unused edit flag handling (read-only only)'),('walker-stock','walker-parent-exit','Use parent-exit deletion strategy'),('walker-parent-exit','visitor-stock','Same parent-exit strategy: walker to visitor'),('direct-stock','direct-for-in','Direct baseline: Object.keys to for-in'),('direct-for-in','direct-guarded','Direct baseline: add metadata/object guards')]
    for a,b,label in pairs:
        if (track,a) in lookup and (track,b) in lookup:effects.append(contrast(track,a,b,label))
if ('i18n-javascript-compact','walker-stock') in lookup:
    for ident in ['walker-stock','visitor-stock']:effects.append(contrast('i18n-javascript',ident,ident,'Parse same JS without loc/range','i18n-javascript-compact'))
result={'environment':{k:data[k] for k in ['timestamp','node','cpu','platform']},'method':'Median of seven independent process medians. Effects: geometric mean of paired round time ratios, positive means slower. Descriptive 95% paired bootstrap interval, 10000 resamples, fixed seed. Pairing controls round-level drift, not simultaneous timing; variants run in separate serial processes.','rows':rows,'effects':effects}
(root/f'results/oxc-attribution/{name}-summary.json').write_text(json.dumps(result,indent=2)+'\n')
for e in effects:print(f'{e["track"]:26s} {e["label"]:57s} {e["deltaPercent"]:+6.1f}% [{e["ci95"][0]:+.1f}, {e["ci95"][1]:+.1f}]')
