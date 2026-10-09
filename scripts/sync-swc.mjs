// Fetch an immutable snapshot of the latest committed PR head. Never read working-tree edits.
import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
const repo='swc-project/swc-next';
const gh=args=>execFileSync('gh',args,{encoding:'utf8'});
const head=JSON.parse(gh(['pr','view','840','--repo',repo,'--json','headRefOid,headRefName']));
const base=new URL('../vendor/swc-next/',import.meta.url);
mkdirSync(base,{recursive:true});
const files=new Map();
function get(path){const value=JSON.parse(gh(['api',`repos/${repo}/contents/${path}?ref=${head.headRefOid}`]));return Buffer.from(value.content,'base64');}
function visit(name){
 if(files.has(name))return;
 if(!/^[\w.-]+\.js$/.test(name))throw new Error(`Unexpected relative import: ${name}`);
 const contents=get(`npm/core/src-js/${name}`);files.set(name,contents);
 for(const match of contents.toString().matchAll(/from\s+["']\.\/([^"']+\.js)["']/g))visit(match[1]);
}
visit('ast.js');
files.set('LICENSE',get('LICENSE'));
for(const [name,contents] of files)writeFileSync(new URL(name,base),contents);
const provenance={repository:`https://github.com/${repo}`,branch:head.headRefName,commit:head.headRefOid,
 sha256:Object.fromEntries([...files].filter(([name])=>name.endsWith('.js')).map(([name,bytes])=>[`vendor/swc-next/${name}`,createHash('sha256').update(bytes).digest('hex')]))};
writeFileSync(new URL('../vendor/provenance.json',import.meta.url),JSON.stringify(provenance,null,2)+'\n');
console.log(`Pinned SWC Next to ${head.headRefName} @ ${head.headRefOid}. Rerun npm test, npm run bench and npm run report to refresh results.`);
