import json
from pathlib import Path
root=Path(__file__).resolve().parents[2]
folder=root/'results/oxc-attribution'
fresh=json.loads((folder/'fresh-summary.json').read_text())
cloned=json.loads((folder/'cloned-summary.json').read_text())
strings=json.loads((folder/'strings-summary.json').read_text())
profiles=json.loads((folder/'profiles-summary.json').read_text())
def effect(data,track,changed,base=None):
    return next(e for e in data['effects'] if e['track']==track and e['changed']==changed and (base is None or e['baseline']==base))
def fmt(e):return f'{e["deltaPercent"]:+.1f}% [{e["ci95"][0]:+.1f}, {e["ci95"][1]:+.1f}]'
def row(data,track,ident):return next(r for r in data['rows'] if r['track']==track and r['id']==ident)
def ms(data,track,ident):return f'{row(data,track,ident)["medianMs"]:.3f}'
controls=[
('Walker: replace `for…in` with `Object.keys`',cloned,'debugger-sparse','walker-keys','walker-clone'),
('Walker: stop skipping `type/start/end` early',cloned,'debugger-sparse','walker-no-meta-skip','walker-clone'),
('Walker: create a position context for every node',cloned,'debugger-sparse','walker-fresh-context','walker-clone'),
('Visitor: replace direct child access with key loops',cloned,'debugger-sparse','visitor-keys','visitor-clone'),
('Visitor: use generic dispatch and a callback on every node',cloned,'debugger-sparse','visitor-generic','visitor-clone'),
]
lines=['# Why Oxc traversal is fast','',
'**Measured causes: child-field access, callback dispatch, property enumeration, and the editing strategy. AST preparation and canonicalizing `node.type` also matter, with workload-dependent effects.**','',
'Tested `oxc-walker@1.1.1` and `oxc-parser@0.153.0`\'s `Visitor` on Node 24.20.0 / Apple M5 Max. Both traversal implementations run in JavaScript. Parsing and printing are outside timing; Rust parser speed is not part of these numbers.','',
'![AST representation control](../../charts/oxc-attribution/representation.svg)','',
'## 1. Costs isolated inside each implementation','',
'Sparse remove-debugger workload, fresh **cloned Acorn AST**, matching the main edit benchmark preparation. Each row changes the stated traversal strategy from the unmodified local clone. Positive means **more time**; brackets show descriptive 95% bootstrap intervals. Percentages are not additive. Times are medians of process medians; effects are geometric means of paired round ratios, so an effect need not equal the ratio of displayed medians.','',
'| Controlled change | Time change |','|---|---:|']
for label,data,track,changed,base in controls:lines.append(f'| {label} | {fmt(effect(data,track,changed,base))} |')
lines += ['',
'**Visitor:** generated functions read known children (`node.left`, `node.right`) and use numeric slots in a compiled hook table. In the sparse debugger input, the typed plugin invokes 664 parent hooks while the generic control invokes 14,020 node hooks. The key-loop control visits the exact same children in the exact same order. The generic control uses shared named handler slots instead of numeric typed slots and adds a type filter. Its percentage measures this dispatch strategy, not callback-call cost alone. Numeric indexing itself was not separately ablated.','',
'**Walker:** uses a `for…in` loop, skips `type/start/end` before reading their values, rejects non-objects early, and reuses callback context. It still enumerates properties and still maintains editing flags. `for…in` and context reuse are not unique to Oxc: `estree-walker` also uses both. These measurements do not explain every pairwise package gap.','',
'**Context reuse is not established as a major win here.** The per-node position-object control is small and its interval includes zero in the cloned sparse case. Callbacks do not retain the context, so V8 may optimize allocations; this is not an allocation profile. Removing unused edit-flag handling changes time by '+fmt(effect(fresh,'i18n-javascript','walker-readonly'))+' on JS i18n and '+fmt(effect(fresh,'i18n-original','walker-readonly'))+' on original TS/TSX i18n. That control cannot skip, remove, or replace nodes.','',
'## 2. The deletion strategy changes the winner','',
'Visitor has no current-node deletion context. Its plugin scans statement slots when leaving a parent. The normal Walker plugin removes the matched debugger on entry. Giving Walker the same parent-exit helper produces:','',
'| Sparse debugger, cloned AST | ms / corpus |','|---|---:|',
f'| Walker, remove on debugger entry | {ms(cloned,"debugger-sparse","walker-stock")} |',
f'| Walker, edit parent slots on exit | {ms(cloned,"debugger-sparse","walker-parent-exit")} |',
f'| Visitor, edit parent slots on exit | {ms(cloned,"debugger-sparse","visitor-stock")} |','',
'With the same parent-exit strategy, switching from Walker to Visitor changes time by '+fmt(effect(cloned,'debugger-sparse','visitor-stock','walker-parent-exit'))+'. The original ranking therefore combines traversal cost and plugin strategy. Both implementations produce the same independently checked output.','',
'## 3. Identical AST JSON can have different performance','',
'`structuredClone` preserves AST values but changes their runtime representation. On the public diagnostic fixture, V8 reports `node.type` as `INTERNALIZED_ONE_BYTE_STRING_TYPE` after parsing and `SEQ_ONE_BYTE_STRING_TYPE` after cloning. The control replaces only `type` values with canonical property-name strings before timing. A separate self-assignment control traverses and assigns the same fields without canonicalizing.','',
'| Workload | API | Cloned AST (ms) | Canonical `type` (ms) | Change vs clone |','|---|---|---:|---:|---:|']
for track in ['debugger-sparse','styled-sparse','i18n-javascript','i18n-original']:
 for ident,label in [('walker-stock','Walker'),('visitor-stock','Visitor')]:
    a=next(r for r in strings['rows'] if (r['track'],r['id'],r['shape'])==(track,ident,'cloned'))
    b=next(r for r in strings['rows'] if (r['track'],r['id'],r['shape'])==(track,ident,'interned'))
    e=next(e for e in strings['effects'] if (e['track'],e['id'],e['baseline'],e['changed'])==(track,ident,'cloned','interned'))
    lines.append(f'| {track} | {label} | {a["medianMs"]:.3f} | {b["medianMs"]:.3f} | {fmt(e)} |')
lines += ['',
'Every preparation has identical serialized input and verified output. This tests canonicalizing `node.type`, including any resulting changes to V8 field constness and optimization feedback; it does not assign the entire residual parsed-versus-cloned difference to strings. The clone also changes prototypes and property storage. The V8 dump shows some child fields moving from in-object storage to the property array. That layout effect was observed, but its standalone cost was not measured. [V8 property representation](https://v8.dev/blog/fast-properties) explains the storage distinction.','',
'Canonicalization is performed **outside** timing as an attribution control. Its own cost is excluded, so this is not an end-to-end optimization claim or a recommendation to add another AST pass. Results are workload-dependent, including regressions on some Acorn inputs. A parser/decoder should test the representation it actually emits instead of assuming that identical AST JSON implies identical execution cost.','',
'## 4. Metadata explains part of the read-only variation','',
'The original TS/TSX track has 25,310 nodes and no `loc/range`. The pre-transpiled JS track has 19,769 nodes, yet its `range` arrays add 39,538 numeric entries to generic traversal. Comparing those two source tracks alone cannot isolate a cause. Parsing the **same JS** without `loc/range` gives:','',
'| API | Time change without `loc/range` |','|---|---:|']
for ident,label in [('walker-stock','Walker'),('visitor-stock','Visitor')]:lines.append(f'| {label} | {fmt(effect(fresh,"i18n-javascript",ident,ident))} |')
lines += ['',
'Visitor ignores metadata fields already; its smaller change is consistent with layout, allocation/GC pressure, or cache effects even when the visitor never traverses metadata. This experiment does not distinguish those VM effects. Removing metadata also changes object shape, so the measured percentage is not purely a count of avoided property checks.','',
'## Profiles and reproducibility','',
'- [Full measurements and all contrasts](results.md), including self-assignment controls.','- [Experiment scripts and exact changes](../../experiments/oxc-attribution/README.md).','- [Fresh parser results](../../results/oxc-attribution/fresh.json), [cloned AST results](../../results/oxc-attribution/cloned.json), [string controls](../../results/oxc-attribution/strings.json).','- [Traversal coverage](../../results/oxc-attribution/coverage.json), [V8 string dump](../../results/oxc-attribution/v8-strings.txt), [V8 object dump](../../results/oxc-attribution/v8-shapes.txt).','',
'Unprofiled timings: 924 isolated worker processes, 7 rotated/reversed rounds, 20 warmups + 20 samples each; 18,480 measured corpus iterations. Every output is checked outside timing. The Oxc implementations visit the same node identities/occurrence counts; generated field/key-loop order is identical. Unmodified local clones serve as extraction controls; small clone/package differences are included in the full results.','',
'Profiles run separately with reused read-only ASTs, 300 warmup corpora and a nominal 200 µs sampling interval. They locate hot code; their sample shares are not fresh-AST time savings and must not be subtracted between profiles.','',
'| Profile | `walkNode` self samples | `_walk` self samples |','|---|---:|---:|']
for p in profiles:
    def pct(name):return sum(r['selfPercent'] for r in p['self'] if r['function']==name)
    lines.append(f'| [{p["id"]}](../../charts/oxc-attribution/{p["id"]}-flame.svg) | {pct("walkNode"):.1f}% | {pct("_walk"):.1f}% |')
lines+=['','The main benchmark results and production package sources were not changed. No private business source or dictionary values are included in these artifacts.','']
(root/'docs/oxc-attribution/README.md').write_text('\n'.join(lines))
all_lines=['# Oxc attribution: full results','','Positive deltas mean slower. Intervals are descriptive paired-round bootstrap intervals, not guarantees across corpora or machines.','','## Controls']
for label,data in [('Fresh parser output',fresh),('Cloned parser output',cloned)]:
    all_lines += ['',f'### {label}','','| Workload | Variant | Median ms | Process min–max |','|---|---|---:|---:|']
    for r in data['rows']:all_lines.append(f'| {r["track"]} | {r["id"]} | {r["medianMs"]:.4f} | {r["minMs"]:.4f}–{r["maxMs"]:.4f} |')
    all_lines += ['','| Workload | Change | Time delta [95% interval] |','|---|---|---:|']
    for e in data['effects']:all_lines.append(f'| {e["track"]} | {e["label"]} | {fmt(e)} |')
all_lines+=['','## String representation controls','','| Workload | API | Preparation | Median ms | Process min–max |','|---|---|---|---:|---:|']
for r in strings['rows']:all_lines.append(f'| {r["track"]} | {r["id"]} | {r["shape"]} | {r["medianMs"]:.4f} | {r["minMs"]:.4f}–{r["maxMs"]:.4f} |')
all_lines+=['','| Workload | API | Change | Time delta [95% interval] |','|---|---|---|---:|']
for e in strings['effects']:all_lines.append(f'| {e["track"]} | {e["id"]} | {e["baseline"]} → {e["changed"]} | {fmt(e)} |')
(root/'docs/oxc-attribution/results.md').write_text('\n'.join(all_lines)+'\n')
