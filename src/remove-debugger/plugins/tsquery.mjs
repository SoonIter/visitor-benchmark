import ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';
import { transform } from '../typescript.mjs';
export { prepare, print } from './typescript.mjs';
export const run = ast => transform(ts, ast, new Set(tsquery(ast, 'DebuggerStatement')));
