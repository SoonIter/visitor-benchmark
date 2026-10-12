import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { digest } from '../../src/shared/ast.mjs';
export const out = new URL('../../.cache/oxc-attribution/', import.meta.url);
mkdirSync(out, { recursive: true });
const root = new URL('../../node_modules/', import.meta.url);
const walker = readFileSync(new URL('oxc-walker/dist/index.mjs', root), 'utf8').split('const LANG_RE =')[0] + '\nexport { walk };\n';
const generated = readFileSync(new URL('oxc-parser/src-js/generated/visit/walk.js', root), 'utf8');
const fields = {}, types = [];
for (const match of generated.matchAll(/function walk(\w+)\(node, visitors\) \{([\s\S]*?)\n\}/g)) {
  const [,type,body] = match;
  if (type === 'Node') continue;
  types.push(type);
  fields[type] = [...body.matchAll(/walkNode\(node\.(\w+), visitors\);/g)].map(m => m[1]);
}
const keyWalk = generated.replace(/function walk(\w+)\(node, visitors\) \{([\s\S]*?)\n\}/g, (whole,type,body) => {
  if (!fields[type]?.length) return whole;
  const calls = body.match(/(?:  walkNode\(node\.\w+, visitors\);\n)+/g);
  if (calls?.length !== 1 || (calls[0].match(/walkNode/g)||[]).length !== fields[type].length) throw new Error('Unexpected child traversal: '+type);
  return whole.replace(calls[0], `  for (const key of childFields.${type}) walkNode(node[key], visitors);\n`);
}) + '\nconst childFields = '+JSON.stringify(fields)+';\n';
let readOnly = walker;
const enterStart = readOnly.indexOf('\t\t\tif (enter && !skip) {');
const childrenStart = readOnly.indexOf('\t\t\tif ((!skipChildren || scopeTracker)');
readOnly = readOnly.slice(0, enterStart) + '\t\t\tif (enter) { ctx.key = key; ctx.index = index; enter.call(contextEnter, input, parent, ctx); }\n' + readOnly.slice(childrenStart);
const leaveStart = readOnly.indexOf('\t\t\tif (leave && !skip) {');
const returnStart = readOnly.indexOf('\t\t\treturn currentNode;', leaveStart);
readOnly = readOnly.slice(0, leaveStart) + '\t\t\tif (leave) { ctx.key = key; ctx.index = index; leave.call(contextLeave, input, parent, ctx); }\n' + readOnly.slice(returnStart);
const fresh = walker.replace(/\t\tconst ctx = \{[\s\S]*?\n\t\t\};\n/, '').replace('const _walk = (input, parent, key, index, skip) => {', 'const astRoot = input;\n\t\tconst _walk = (input, parent, key, index, skip) => {\n\t\t\tconst ctx = { key: null, index: index ?? null, ast: astRoot };');
const variants = {
  'walker-clone.mjs': walker,
  'walker-keys.mjs': walker.replaceAll('for (const k in currentNode)', 'for (const k of Object.keys(currentNode))'),
  'walker-no-meta-skip.mjs': walker.replaceAll('if (k === "type" || k === "start" || k === "end") continue;', ''),
  'walker-fresh-context.mjs': fresh,
  'walker-readonly.mjs': readOnly,
  'visitor-clone.mjs': generated,
  'visitor-generic.mjs': generated.replace(/let visit = visitors\[\d+\]/g, 'let visit = visitors.allLeaf').replace(/let enterExit = visitors\[\d+\]/g, 'let enterExit = visitors.allBranch'),
  'visitor-keys.mjs': keyWalk,
  'schema.json': JSON.stringify({types,fields},null,2),
};
const hashes = {};
for (const [name,source] of Object.entries(variants)) { writeFileSync(new URL(name,out),source); hashes[name]=digest(source); }
writeFileSync(new URL('generated.json',out), JSON.stringify({hashes,upstream:{walker:digest(walker),visitor:digest(generated)}},null,2));
console.log(JSON.stringify({variants:Object.keys(variants),types:types.length}));
const direct = readFileSync(new URL('../../src/remove-debugger/plugins/direct-ast.mjs',import.meta.url),'utf8').replace("'../edit.mjs'", "'../../src/remove-debugger/edit.mjs'");
const forIn = direct.replace('for (const key of Object.keys(node))', 'for (const key in node)');
if(forIn===direct)throw new Error('Direct source changed');
const guarded=forIn.replace('const value = node[key];','if (key === "type" || key === "start" || key === "end") continue;\n      const value = node[key];\n      if (!value || typeof value !== "object") continue;');
for(const [name,source] of Object.entries({'direct-for-in.mjs':forIn,'direct-guarded.mjs':guarded})) {writeFileSync(new URL(name,out),source);hashes[name]=digest(source);}
writeFileSync(new URL('generated.json',out), JSON.stringify({hashes,upstream:{walker:digest(walker),visitor:digest(generated)}},null,2));
