export { prepare, print } from './babel-traverse.mjs';
import { run as transform } from './babel-traverse.mjs';
export const run = (ast,filename) => transform(ast,filename,true);
