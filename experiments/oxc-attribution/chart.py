import sys,json
from pathlib import Path
root=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(root/'scripts/shared'))
from chart_theme import render
summary=json.loads((root/'results/oxc-attribution/strings-summary.json').read_text())
labels={'parsed':'Parser output','cloned':'Structured clone','self-assigned':'Clone + self-assign type','interned':'Clone + canonical type'}
panels=[]
for ident,label in [('walker-stock','oxc-walker'),('visitor-stock','Oxc Visitor')]:
    rows=[]
    for shape in labels:
        r=next(r for r in summary['rows'] if r['track']=='debugger-sparse' and r['id']==ident and r['shape']==shape)
        rows.append({'id':shape,'label':labels[shape],'median':r['medianMs'],'min':r['minMs'],'max':r['maxMs']})
    panels.append({'title':label,'xlabel':'Milliseconds per corpus', 'rows':rows})
render('Oxc traversal · AST representation matters','Remove debugger · Sparse workload · Identical serialized AST · Preparation excluded',panels,'Node 24.20.0 · Apple M5 Max · darwin arm64',7,root/'charts/oxc-attribution/representation')
