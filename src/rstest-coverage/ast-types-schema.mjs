// ast-types 0.16 lacks Acorn's ESTree class-field name. Register it through
// its public schema extension API; do not rewrite the shared input AST.
export function extend(types) {
  types.Type.def('PropertyDefinition').bases('ClassProperty');
  types.finalize();
}
