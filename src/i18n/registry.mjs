import { implementations as editingVariants } from '../shared/implementations.mjs';
const babelIds = {
  "babel-traverse": "babel-traverse-v8",
  "babel-traverse-no-scope": "babel-traverse-no-scope-v8",
  "babel-types-traverse-fast": "babel-types-traverse-fast-v8",
  "babel-types-traverse": "babel-types-traverse-v8"
};
export const variants = editingVariants.map(({id, ast, group}) => ({ id: babelIds[id] || id, ast, group }));
variants.push({ id: 'babel-traverse-v7', ast: 'Babel 7 AST (not ESTree)', group: 'path' });
variants.push({ id: 'babel-traverse-no-scope-v7', ast: 'Babel 7 AST (not ESTree)', group: 'path' });
variants.push({ id: 'babel-types-traverse-fast-v7', ast: 'Babel 7 AST (not ESTree)', group: 'recursive' });
