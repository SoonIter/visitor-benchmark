import { mkdirSync,writeFileSync } from 'node:fs';
import { corpus } from '../src/workload.mjs';
import { prepare as babel } from '../src/babel-io.mjs';
import { prepare as swc } from '../src/plugins/swc-visitor.mjs';
import { prepare as typescript } from '../src/plugins/typescript.mjs';
import ts from 'typescript';
const dir=new URL('../fixtures/sample/',import.meta.url);mkdirSync(dir,{recursive:true});
const fixture=corpus('dense',true)[0];
const write=(name,content)=>writeFileSync(new URL(name,dir),content);
write('input.js',fixture.source);write('expected.js',fixture.expected);
write('estree.json',JSON.stringify(fixture.ast,null,2)+'\n');
write('babel-not-estree.json',JSON.stringify(babel(fixture.source),null,2)+'\n');
write('swc-not-estree.json',JSON.stringify(swc(fixture.source),null,2)+'\n');
// TS has parent pointers and internal caches: export a navigable shape, not a deserializable native AST.
function describe(n){const children=[];ts.forEachChild(n,c=>{children.push(describe(c));});return {kind:n.kind,kindName:ts.SyntaxKind[n.kind],pos:n.pos,end:n.end,...(typeof n.text==='string'?{text:n.text}:{}),children};}
write('typescript-not-estree-outline.json',JSON.stringify(describe(typescript(fixture.source,fixture.filename)),null,2)+'\n');
write('README.md','# Input AST samples\n\nESTree is the shared input. Babel and SWC JSON are their separate native shapes. The TypeScript file is a readable outline (parent cycles omitted), not an AST to deserialize. Actual native ASTs are prepared outside the timer by each plugin module. ts-morph likewise creates its own Project/SourceFile before timing.\n');
console.log(dir.pathname);
