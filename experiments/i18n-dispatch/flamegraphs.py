import json, html, hashlib
from pathlib import Path
from collections import defaultdict
root=Path(__file__).resolve().parents[2]
out=root/'charts/i18n-dispatch'
out.mkdir(parents=True,exist_ok=True)
summaries=[]
for path in sorted((root/'results/i18n-dispatch/profiles').glob('*.cpuprofile')):
    p=json.loads(path.read_text());nodes={n['id']:n for n in p['nodes']};parents={c:n['id'] for n in p['nodes'] for c in n.get('children',[])}
    self_times=defaultdict(float);stacks=defaultdict(float);by_file=defaultdict(float)
    for ident,delta in zip(p['samples'],p['timeDeltas']):
        node=nodes[ident];cf=node['callFrame'];name=cf['functionName'] or '(anonymous)';url=cf['url'];line=cf['lineNumber']+1
        rel=url.split('/visitor-benchmark/')[-1]
        self_times[(name,rel,line)]+=delta;by_file[rel or name]+=delta
        stack=[];at=ident
        while at in nodes:
            f=nodes[at]['callFrame'];stack.append((f['functionName'] or '(anonymous)',f['url'].split('/visitor-benchmark/')[-1],f['lineNumber']+1))
            if at not in parents:break
            at=parents[at]
        stacks[tuple(reversed(stack))]+=delta
    tree={'value':0,'children':{}}
    for stack,weight in stacks.items():
        at=tree;at['value']+=weight
        for frame in stack:
            at=at['children'].setdefault(frame,{'value':0,'children':{}});at['value']+=weight
    max_depth=max(map(len,stacks));width=1600;height=120+max_depth*21;total=tree['value']
    parts=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',f'<rect width="{width}" height="{height}" fill="#fafbfd"/>',f'<text x="20" y="30" font-family="sans-serif" font-size="22" font-weight="bold">{html.escape(path.stem)} · CPU flame graph</text>',f'<text x="20" y="55" font-family="sans-serif" font-size="13">Reused AST · profiler enabled only during collection · nominal 200 μs interval · hover for source and inclusive time</text>']
    def draw(t,x,depth):
        for frame,child in t['children'].items():
            w=child['value']/total*(width-40);y=height-25-(depth+1)*21
            color='#'+''.join(f'{v:02x}' for v in [205+int(hashlib.sha1(str(frame).encode()).hexdigest()[:2],16)%45,125+int(hashlib.sha1(str(frame).encode()).hexdigest()[2:4],16)%90,65])
            title=f'{frame[0]} | {frame[1]}:{frame[2]} | {child["value"]/1000:.1f} ms inclusive ({100*child["value"]/total:.2f}%)'
            parts.append(f'<g><title>{html.escape(title)}</title><rect x="{x:.3f}" y="{y}" width="{max(0,w-.2):.3f}" height="20" fill="{color}"/>')
            if w>35:parts.append(f'<text x="{x+3:.3f}" y="{y+14}" font-family="monospace" font-size="11">{html.escape(frame[0][:max(1,int(w/6.7)-1)])}</text>')
            parts.append('</g>');draw(child,x,depth+1);x+=w
    draw(tree,20,0);parts.append('</svg>');(out/f'{path.stem}-flame.svg').write_text('\n'.join(parts)+'\n')
    summaries.append({'id':path.stem,'samples':len(p['samples']),'sampledMs':total/1000,'files':[{'file':f,'selfMs':t/1000,'selfPercent':100*t/total}for f,t in sorted(by_file.items(),key=lambda v:-v[1])[:15]],'self':[{'function':f[0],'file':f[1],'line':f[2],'selfMs':t/1000,'selfPercent':100*t/total}for f,t in sorted(self_times.items(),key=lambda v:-v[1])[:25]]})
(root/'results/i18n-dispatch/profiles-summary.json').write_text(json.dumps(summaries,indent=2)+'\n')
print('Wrote four flame graphs and weighted self-time summaries.')
