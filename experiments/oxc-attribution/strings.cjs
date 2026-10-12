// Public fixture only. Run with --allow-natives-syntax outside benchmarking.
const { parse } = require('acorn');
const { readFileSync }=require('node:fs');
const ast=parse('const value = left + right;',{ecmaVersion:2022,sourceType:'module',locations:true,ranges:true});
const copied=structuredClone(ast),node=copied.body[0].declarations[0].init;
const names=Object.keys(Object.fromEntries(JSON.parse(readFileSync('.cache/oxc-attribution/schema.json')).types.map(t=>[t,true])));
console.log('Parsed type');%DebugPrint(ast.body[0].declarations[0].init.type);
console.log('Cloned type');%DebugPrint(node.type);
const before=JSON.stringify(copied);node.type=names.find(t=>t===node.type);
console.log('Canonical property-name type');%DebugPrint(node.type);
require('node:assert/strict').equal(JSON.stringify(copied),before);
