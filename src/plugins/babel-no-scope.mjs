export { prepare, print } from './babel.mjs';
import { run as transform } from './babel.mjs';
export const run = (ast,filename) => transform(ast,filename,true);
