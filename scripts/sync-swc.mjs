// Fetch an immutable committed snapshot. Never read working-tree edits.
import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { parseArgs } from 'node:util';
const { values } = parseArgs({ options: {
 'local-repo': { type: 'string' }, ref: { type: 'string' },
} });
if (Boolean(values['local-repo']) !== Boolean(values.ref)) {
 throw new Error('--local-repo and --ref must be provided together');
}
const repo='swc-project/swc-next';
const gh=args=>execFileSync('gh',args,{encoding:'utf8'});
const localRepo=values['local-repo'];
const git=args=>execFileSync('git',['-C',localRepo,...args],{maxBuffer:16*1024*1024});
const localCommit=localRepo?git(['rev-parse','--verify','--end-of-options',`${values.ref}^{commit}`]).toString().trim():null;
const head=localRepo?{
 headRefOid:localCommit,
 headRefName:git(['name-rev','--name-only',localCommit]).toString().trim(),
}:JSON.parse(gh(['pr','view','840','--repo',repo,'--json','headRefOid,headRefName']));
const base=new URL('../vendor/swc-next/',import.meta.url);
mkdirSync(base,{recursive:true});
const files=new Map();
const sourceFiles=new Map();
const sourceDirectory='packages/walker';
function get(path){
 if(localRepo)return git(['show',`${head.headRefOid}:${path}`]);
 const value=JSON.parse(gh(['api',`repos/${repo}/contents/${path}?ref=${head.headRefOid}`]));return Buffer.from(value.content,'base64');
}
function visit(name){
 if(files.has(name))return;
 if(!/^[\w.-]+\.js$/.test(name))throw new Error(`Unexpected relative import: ${name}`);
 // Keep the benchmark's historical local filename; the package entry is index.js.
 const sourcePath=`${sourceDirectory}/${name === 'ast.js' ? 'index.js' : name}`;
 const contents=get(sourcePath);files.set(name,contents);sourceFiles.set(`vendor/swc-next/${name}`,sourcePath);
 for(const match of contents.toString().matchAll(/from\s+["']\.\/([^"']+\.js)["']/g))visit(match[1]);
}
visit('ast.js');
files.set('LICENSE',get('LICENSE'));
for(const [name,contents] of files)writeFileSync(new URL(name,base),contents);
const provenance={repository:`https://github.com/${repo}`,...(localRepo?{source:'local-git',note:'Committed local snapshot; this commit is not necessarily available upstream.'}:{}),branch:head.headRefName,commit:head.headRefOid,package:'@swc-next/walker',sourceFiles:Object.fromEntries(sourceFiles),
 sha256:Object.fromEntries([...files].filter(([name])=>name.endsWith('.js')).map(([name,bytes])=>[`vendor/swc-next/${name}`,createHash('sha256').update(bytes).digest('hex')]))};
writeFileSync(new URL('../vendor/provenance.json',import.meta.url),JSON.stringify(provenance,null,2)+'\n');
console.log(`Pinned SWC Next to ${head.headRefName} @ ${head.headRefOid}. Rerun npm test, npm run bench and npm run report to refresh results.`);
