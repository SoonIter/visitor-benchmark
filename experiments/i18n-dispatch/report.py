import json
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
root=Path(__file__).resolve().parents[2]
s=json.loads((root/'results/i18n-dispatch/summary.json').read_text())
audit=json.loads((root/'results/i18n-dispatch/coverage-audit.json').read_text())
profiles=json.loads((root/'results/i18n-dispatch/profiles-summary.json').read_text())
rows=s['rows'];effects=s['effects']
def row(ident,mode='fresh'):return next(r for r in rows if r['id']==ident and r['mode']==mode)
def effect(label,mode='fresh'):return next(e for e in effects if e['label']==label and e['mode']==mode)
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':11,'svg.fonttype':'none'})
selected=[('yuku-stock','Yuku 0.18.0'),('yuku-keys-hooks-context','Unmodified source clone'),('yuku-direct-hooks-context','Direct child fields only'),('yuku-keys-hooks-readonly','Remove editing context only'),('yuku-direct-hooks-readonly','Direct fields + no context'),('acorn-fixed','Acorn + destructuring fix'),('acorn-full-coverage','Acorn + complete child coverage')]
fig,ax=plt.subplots(figsize=(11,5.4));fig.patch.set_facecolor('#fafbfd');ax.set_facecolor('#fafbfd')
for i,(ident,label) in enumerate(selected):
 r=row(ident);color='#287f78' if ident.startswith('yuku') else '#527bac';ax.barh(i,r['medianMs'],height=.62,color=color,zorder=3)
 ax.errorbar(r['medianMs'],i,xerr=[[r['medianMs']-r['minMs']],[r['maxMs']-r['medianMs']]],fmt='none',ecolor='#263746',capsize=3,zorder=4)
 ax.text(r['maxMs']+.012,i,f"{r['medianMs']:.3f} ms",va='center',fontsize=10)
ax.set_yticks(range(len(selected)),[v[1] for v in selected]);ax.invert_yaxis();ax.set_xlim(0,1.2);ax.set_xlabel('Collection time / 64 files · lower is better')
ax.grid(axis='x',color='#dde4ec',zorder=0);ax.tick_params(length=0)
for spine in ax.spines.values():spine.set_visible(False)
fig.suptitle('Same-AST i18n collection: controlled comparison',x=.035,ha='left',fontsize=17,fontweight='bold')
fig.text(.035,.9,'Fresh Acorn AST · parsing excluded · 7 isolated processes per variant',color='#566677')
fig.text(.035,.025,'Bars: median of process medians. Whiskers: min–max. Acorn complete uses Yuku’s exact child schema.',fontsize=9,color='#566677')
fig.subplots_adjust(left=.32,right=.95,top=.83,bottom=.14)
for ext in ['png','svg']:fig.savefig(root/f'charts/i18n-dispatch/comparison.{ext}',dpi=180,facecolor=fig.get_facecolor())
plt.close(fig)
labels=['Direct child access only','Remove context only','Flatten typed hook arrays only','Direct access + remove context','Map lookup to object lookup only','Remove unused global hooks only']
names=['Direct child field handlers','Remove editing context','Flatten typed hook arrays','Direct fields + no context','Map lookup → object lookup','Remove unused generic hooks']
fig,ax=plt.subplots(figsize=(11,5.4));fig.patch.set_facecolor('#fafbfd');ax.set_facecolor('#fafbfd')
for i,label in enumerate(labels):
 e=effect(label);value=e['reductionPercent'];lo,hi=e['ci95'];color='#287f78' if lo>0 else '#8d99a7';ax.barh(i,value,height=.58,color=color,zorder=3)
 ax.errorbar(value,i,xerr=[[value-lo],[hi-value]],fmt='none',ecolor='#263746',capsize=4,zorder=4);ax.text(hi+1,i,f'{value:.1f}%',va='center',fontsize=10)
ax.set_yticks(range(len(labels)),names);ax.invert_yaxis();ax.set_xlim(-10,48);ax.axvline(0,color='#263746',linewidth=1);ax.grid(axis='x',color='#dde4ec',zorder=0);ax.set_xlabel('Collection-time reduction (%) · positive means faster');ax.tick_params(length=0)
for spine in ax.spines.values():spine.set_visible(False)
fig.suptitle('Which changes produce a repeatable benefit?',x=.035,ha='left',fontsize=17,fontweight='bold')
fig.text(.035,.9,'Fresh AST · one-factor changes against the unmodified Yuku source clone',color='#566677')
fig.text(.035,.025,'Paired geometric-mean effects; whiskers: 95% round-bootstrap intervals. Seven rounds; effects are not additive.',fontsize=9,color='#566677')
fig.subplots_adjust(left=.32,right=.95,top=.83,bottom=.14)
for ext in ['png','svg']:fig.savefig(root/f'charts/i18n-dispatch/effects.{ext}',dpi=180,facecolor=fig.get_facecolor())
plt.close(fig)
for p in (root/'charts/i18n-dispatch').glob('*.svg'):p.write_text('\n'.join(line.rstrip() for line in p.read_text().splitlines())+'\n')
fmt=lambda e:f"{e['reductionPercent']:.1f}% [{e['ci95'][0]:.1f}, {e['ci95'][1]:.1f}]"
text=f'''# Acorn vs Yuku: measured causes

**Direct child-field specialization and editing-context bookkeeping explain substantial costs in this workload. Flattening typed hooks alone does not show a repeatable benefit.** This is a controlled study of `acorn-walk@8.3.5` and `yuku-ast@0.18.0`, not a general ranking of visitor API designs.

[Raw timings](../../results/i18n-dispatch/latest.json) · [Hook controls](../../results/i18n-dispatch/hook-controls.json) · [Experiment source](../../experiments/i18n-dispatch) · [Correctness evidence](../../results/i18n-dispatch/validation.json)

## Findings

| Change from the Yuku source clone | Fresh AST time reduction | Reused AST time reduction | Finding |
| :-- | --: | --: | :-- |
'''
for label,finding in [(labels[0],'Repeatable benefit'),(labels[1],'Repeatable benefit'),(labels[2],'Interval crosses zero'),(labels[3],'Combined benefit; retains typed hook arrays'),(labels[4],'Interval crosses zero'),(labels[5],'Interval crosses zero')]:text+=f"| {label} | {fmt(effect(label))} | {fmt(effect(label,'reused'))} | {finding} |\n"
text+='''
Percentages are geometric means of paired process-median ratios, with descriptive 95% bootstrap intervals over seven rounds. They are not percentages computed from the separately reported median bars, and **must not be added**. The fresh and reused modes show the same qualitative findings.

![Controlled effects](../../charts/i18n-dispatch/effects.svg)

## What each experiment changes

1. **Child access:** replace `CHILD_KEYS[node.type]` iteration and `node[key]` reads with generated per-type child functions using named field accesses. Preserve child coverage, order, null/object/array guards and context semantics. This measures field specialization plus the changed function/inline-cache structure; it does not isolate dot syntax alone.
2. **Editing context:** remove current-position writes, ancestor push/pop, array cursor-frame objects and stop/skip/replace/remove checks together. Keep child coverage and typed enter/leave arrays. This is deliberately a read-only specialization, not a drop-in replacement for the mutable API. It does not establish the individual cost of each bookkeeping component.
3. **Typed hooks:** replace enter/leave arrays with single handler slots, keeping `Map` lookup, child traversal and editing semantics. Separate follow-up controls replace `Map` with a null-prototype object, or remove the unused global enter/leave checks. None of these individual changes produced a stable positive effect. This does not prove the entire hook protocol is free; interactions and other dispatch differences remain.

The eight variants cover every combination of direct/key-based children, array/single hooks and context/read-only traversal. Source generation uses local installed Yuku code; the unmodified clone is the control. Its fresh-AST difference from the package was small (the bootstrap interval includes zero). Measured source hashes are stored with the samples.

## Same work, different traversal coverage

The 64 real JavaScript modules contain **1,247 string-literal occurrences**, of which **58** match the actual i18n dictionary. All timed variants match the exact ordered i18n output; all also match the full ordered string-literal output on this corpus. AST JSON remains unchanged.

The historical Acorn case fails a separate static-string destructuring fixture. The experimental `acorn-fixed` case fixes it. `acorn-full-coverage` goes further: it uses Yuku's exact child schema, with every node occurrence and traversal order checked against Yuku. It still uses Acorn's native `recursive()` handler-override API. These are experimental cases; historical overview timings have not been silently replaced.

| Structural work / 64 modules | Yuku | Acorn fixed | Acorn complete coverage |
| :-- | --: | --: | --: |
'''
text+=f"| Distinct node objects reached | {audit['yuku']['uniqueObjects']:,} | {audit['fixed']['uniqueObjects']:,} | {audit['complete']['uniqueObjects']:,} |\n"
text+=f"| Node visits / dispatch calls* | {audit['yuku']['visits']:,} | {audit['fixed']['dispatches']:,} | {audit['complete']['dispatches']:,} |\n"
text+=f"| Acorn pseudo-type dispatches | N/A | {audit['fixed']['aliasDispatches']:,} | 0 |\n"
text+='''
*These are explicitly different counters: Yuku node visits versus Acorn dispatch calls. Acorn dispatches through pseudo-types such as `Expression`, `Statement` and `Pattern`, so it makes more dispatch calls even while reaching fewer distinct nodes. Shared AST objects can be visited more than once. See the [coverage audit](../../results/i18n-dispatch/coverage-audit.json).

Yuku's unmodified source executes 35,961 child-field checks, two position updates per node visit, 17,825 ancestor push/pop pairs and 4,028 array cursor-frame constructions per corpus. There is one reused `WalkContext` per file, not one per node. These are logical source-level operations, not measured heap allocations: V8 may optimize allocations away.

![Timing comparison](../../charts/i18n-dispatch/comparison.svg)

'''
text+='| Fresh AST variant | Median ms / 64 files | Process-median range |\n| :-- | --: | :-- |\n'
for ident,name in selected:
 r=row(ident);text+=f"| {name} | {r['medianMs']:.3f} | {r['minMs']:.3f}–{r['maxMs']:.3f} |\n"
text+='''
The full-coverage Acorn control remains faster, so omitted identifier/property traversal cannot explain the entire gap. The residual difference after Yuku specialization is not causally assigned to one mechanism: the dispatch protocols, return-value checks, function signatures and V8 code generation still differ.

## CPU profiles and flame graphs

Profiles start **after parsing and warmup**, and sample approximately three seconds of repeated collection at a nominal 200 µs interval. They are separate from all wall-time measurements. Width represents inclusive sampled time; hover over an SVG frame for source and timing.

| Profile | Flame graph | Chrome DevTools CPU profile |
| :-- | :-- | :-- |
'''
for ident in ['yuku-stock','acorn-fixed','acorn-full-coverage','yuku-direct-hooks-readonly']:text+=f'| {ident} | [SVG](../../charts/i18n-dispatch/{ident}-flame.svg) | [cpuprofile](../../results/i18n-dispatch/profiles/{ident}.cpuprofile) |\n'
yuku=next(p for p in profiles if p['id']=='yuku-stock')
visit=next(x for x in yuku['self'] if x['function']=='visit');typed=next(x for x in yuku['self'] if x['function']=='typed')
text+=f'''
In the stock Yuku profile, `visit` accounts for **{visit['selfPercent']:.1f}%** of weighted self time and `typed` for **{typed['selfPercent']:.1f}%**. The profile localizes the work to traversal/dispatch rather than parsing. It cannot separate every inlined branch or show how much cost an alternative implementation will remove. In particular, the `typed` samples **do not imply** replacing `Map` saves that percentage: the direct Map-to-object control did not show a stable improvement. [Weighted self-time data](../../results/i18n-dispatch/profiles-summary.json).

## Reproduce and interpret

- Environment: **{s['environment']['cpu']} · {s['environment']['platform']} · Node {s['environment']['node']}**. Parser: Acorn 8.19.0. Original study metadata and exact source/AST/output hashes are retained.
- Main experiment: **12 variants × 2 modes × 7 isolated processes = 168 runs**. Additional hook controls: **42 runs**. Each process uses 40 warmups and 40 measured samples; reused-AST samples each contain ten corpus collections. Case order rotates/reverses between rounds.
- Fresh mode reparses each file outside its timed collection, matching the cold-AST boundary of the original benchmark. Reused mode holds one parsed corpus throughout and isolates hot traversal. Parsing, validation, I/O and profiling are excluded from reported collection time; normal GC during collection is included.
- All variants use identical Acorn ASTs, business callbacks and i18n keys. Correctness includes exact order and duplicates, all string literals, nested static keys, no AST mutation, and a full-node-order control. All measured source/AST/output hashes agree.
- Peak process RSS and observed JS heap are recorded per run. Memory includes parsing, imports and untimed checks; total/client process RSS are the same, with no server process. They are not per-visitor allocation measurements.
- Seven process rounds and one corpus are limited evidence. Source-level counts and CPU profiles support interpretation; controlled changes establish the local performance effects. None establishes a universal API performance ceiling. Longer warmup and a new run date also mean these timings should not be subtracted from the historical overview.

Reuse the existing ignored `.cache/i18n/corpus.json` to preserve the exact corpus. See the [main README](../../README.md) to prepare it from the private business checkout if missing; verify the manifest before comparing a new checkout.

```sh
node experiments/i18n-dispatch/generate.mjs
node experiments/i18n-dispatch/validate.mjs
node experiments/i18n-dispatch/audit.mjs
node experiments/i18n-dispatch/bench.mjs
node experiments/i18n-dispatch/hook-controls.mjs
# Run each profile separately after all timing processes finish:
node --expose-gc experiments/i18n-dispatch/profile.mjs yuku-stock
node --expose-gc experiments/i18n-dispatch/profile.mjs acorn-fixed
node --expose-gc experiments/i18n-dispatch/profile.mjs acorn-full-coverage
node --expose-gc experiments/i18n-dispatch/profile.mjs yuku-direct-hooks-readonly
python3 experiments/i18n-dispatch/flamegraphs.py
python3 experiments/i18n-dispatch/summarize.py
.cache/charts-venv/bin/python experiments/i18n-dispatch/report.py
```
'''
(root/'docs/i18n-dispatch/README.md').write_text(text)
print('Wrote the study report and comparison/effect charts.')
