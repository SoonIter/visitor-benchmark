import json,math,random,statistics
from pathlib import Path
root=Path(__file__).resolve().parents[2]
data=json.loads((root/'results/i18n-dispatch/latest.json').read_text())
hooks=json.loads((root/'results/i18n-dispatch/hook-controls.json').read_text())
assert len(data['runs'])==168 and len(hooks['runs'])==42

def summarize(runs):
    groups={}
    for run in runs: groups.setdefault((run['mode'],run['id']),[]).append(run)
    rows=[]
    for (mode,ident),items in groups.items():
        assert len(items)==7
        values=[statistics.median(r['samplesMs']) for r in items]
        rows.append({'mode':mode,'id':ident,'medianMs':statistics.median(values),'minMs':min(values),'maxMs':max(values),'processMedians':{str(r['repeat']):statistics.median(r['samplesMs']) for r in items},'peakRssMiB':max(r['peakRssMiB'] for r in items),'observedHeapMiB':max(r['observedHeapMiB'] for r in items)})
    return rows
rows=summarize(data['runs']);hookrows=summarize(hooks['runs']);rng=random.Random(830018)
def contrast(rows,mode,base,changed,label):
    a=next(r for r in rows if r['mode']==mode and r['id']==base)['processMedians'];b=next(r for r in rows if r['mode']==mode and r['id']==changed)['processMedians']
    logs=[math.log(b[k]/a[k]) for k in a]
    effects=sorted(100*(1-math.exp(statistics.mean(rng.choices(logs,k=7)))) for _ in range(10000))
    return {'mode':mode,'label':label,'baseline':base,'changed':changed,'reductionPercent':100*(1-math.exp(statistics.mean(logs))),'ci95':[effects[249],effects[9749]]}
effects=[]
for mode in ['fresh','reused']:
    for changed,label in [('yuku-direct-hooks-context','Direct child access only'),('yuku-keys-hooks-readonly','Remove context only'),('yuku-keys-flat-context','Flatten typed hook arrays only'),('yuku-direct-hooks-readonly','Direct access + remove context'),('yuku-direct-flat-readonly','All three changes'),('yuku-stock','Unmodified clone vs package control')]:
        effects.append(contrast(rows,mode,'yuku-keys-hooks-context',changed,label))
    for changed,label in [('yuku-keys-object-hooks-context','Map lookup to object lookup only'),('yuku-keys-hooks-no-generic-context','Remove unused global hooks only')]:effects.append(contrast(hookrows,mode,'yuku-keys-hooks-context',changed,label))
# Conditional contrasts expose interaction; percentages must not be added.
conditional=[]
for mode in ['fresh','reused']:
 for fields in ['keys','direct']:
  for hook in ['hooks','flat']:
   conditional.append(contrast(rows,mode,f'yuku-{fields}-{hook}-context',f'yuku-{fields}-{hook}-readonly',f'Remove context under {fields}/{hook}'))
summary={'environment':{k:data[k] for k in ['timestamp','node','cpu','platform']},'rows':rows,'hookRows':hookrows,'effects':effects,'conditionalEffects':conditional,'method':'Median of seven process medians; contrast is geometric mean of paired within-round time ratios. CI is paired bootstrap over seven rounds (10000 draws, fixed seed), descriptive rather than proof of universal significance.'}
(root/'results/i18n-dispatch/summary.json').write_text(json.dumps(summary,indent=2)+'\n')
for effect in effects:
 print(effect['mode'],effect['label'],round(effect['reductionPercent'],1),[round(v,1) for v in effect['ci95']])
