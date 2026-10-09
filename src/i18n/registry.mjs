import { variants as editingVariants } from '../registry.mjs';
export const variants = editingVariants.map(({id, ast, group}) => ({ id, ast, group }));
variants.push({ id: 'babel-business', ast: 'Babel 7 AST (not ESTree)', group: 'path' });
variants.push({ id: 'babel-business-no-scope', ast: 'Babel 7 AST (not ESTree)', group: 'path' });
variants.push({ id: 'babel-business-fast', ast: 'Babel 7 AST (not ESTree)', group: 'recursive' });
