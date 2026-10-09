import { stateFor, edit } from '../estree-plugin.mjs';

// Task-specific baseline: the fixtures declare all styled components at module level.
// No visitor API, child-key table, recursive AST walk, or callback dispatch.
export function run(ast, filename) {
  const state = stateFor(ast, filename);
  for (const statement of ast.body) {
    const declaration = statement.type === 'ExportNamedDeclaration'
      ? statement.declaration
      : statement;
    if (declaration?.type !== 'VariableDeclaration') continue;
    for (const declarator of declaration.declarations) {
      edit(declarator, state);
    }
  }
  return { ast, changed: state.changed };
}
