import { base } from 'acorn-walk';
// Acorn intentionally skips non-computed property names and module specifier
// names. Babel StringLiteral visits them, so the collection task needs these
// native base-walker overrides. No adapter changes the walker's dispatch.
function property(node, state, next) {
  if (node.computed || node.key.type === 'Literal') next(node.key, state);
  if (node.value) next(node.value, state);
}
export const collectionBase = {
  ...base,
  Property: property,
  MethodDefinition: property,
  PropertyDefinition: property,
  ImportSpecifier(node, state, next) { if (node.imported.type === 'Literal') next(node.imported, state); },
  ExportSpecifier(node, state, next) {
    if (node.local.type === 'Literal') next(node.local, state);
    if (node.exported.type === 'Literal') next(node.exported, state);
  },
  ExportNamedDeclaration(node, state, next) {
    if (node.declaration) next(node.declaration, state);
    for (const specifier of node.specifiers) next(specifier, state);
    if (node.source) next(node.source, state);
    for (const attribute of node.attributes || []) next(attribute, state);
  },
  ImportAttribute(node, state, next) {
    if (node.key.type === 'Literal') next(node.key, state);
    next(node.value, state);
  },
};
