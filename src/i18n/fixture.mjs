export const keys = new Set(['module-key', 'title-key', 'nested-key']);
export const source = `"use strict";
import value from 'module-key';
const obj = { 'title-key': 'nested-key', ignored: 'not-a-key' };
function f() { return ['title-key', () => 'nested-key', \`title-key\`, 42]; }
class Example { 'title-key'() { return 'nested-key'; } }
`;
export const expected = ['module-key', 'title-key', 'nested-key', 'title-key', 'nested-key', 'title-key', 'nested-key'];
