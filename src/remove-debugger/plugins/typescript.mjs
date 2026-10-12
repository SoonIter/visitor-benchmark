import ts from 'typescript';
import { transform } from '../typescript.mjs';
export const prepare = (source, filename) => ts.createSourceFile(filename, source, ts.ScriptTarget.ES2022, true, ts.ScriptKind.JS);
export const print = ast => ts.createPrinter().printFile(ast);
export const run = ast => transform(ts, ast);
