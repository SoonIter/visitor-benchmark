export function inList(ts, node) {
  const parent = node.parent;
  return ts.isSourceFile(parent) || ts.isBlock(parent) || ts.isCaseClause(parent) || ts.isDefaultClause(parent);
}
export function transform(ts, ast, selected) {
  let changed = 0;
  const result = ts.transform(ast, [ctx => {
    function visit(node) {
      if (selected ? selected.has(node) : ts.isDebuggerStatement(node)) {
        changed++;
        return inList(ts, node) ? undefined : ctx.factory.createEmptyStatement();
      }
      return ts.visitEachChild(node, visit, ctx);
    }
    return root => ts.visitNode(root, visit);
  }]);
  return { ast: result.transformed[0], changed, dispose: () => result.dispose() };
}
