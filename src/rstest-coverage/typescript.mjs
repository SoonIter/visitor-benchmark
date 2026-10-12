export function schema(ts, sourceFile) {
  return {
    start: node => node.getStart(sourceFile), end: node => node.end,
    arms: node => [node.thenStatement, node.elseStatement],
    isBlock: ts.isBlock,
    block: node => ts.setTextRange(ts.factory.createBlock([node], true), node),
  };
}
export function update(ts, node, plan) {
  if (!plan?.replacements?.length) return node;
  let then = node.thenStatement, alternate = node.elseStatement;
  for (const [i, block] of plan.replacements) {
    // Children may have been transformed since the plan was created.
    const current = i ? alternate : then;
    const next = current === block.statements[0] ? block : ts.setTextRange(ts.factory.createBlock([current], true), block);
    if (i) alternate = next; else then = next;
  }
  return ts.factory.updateIfStatement(node, node.expression, then, alternate);
}
export function visitFactory(ts, state, ctx) {
  function visit(node) {
    if (ts.isIfStatement(node)) {
      const plan = state.plan(node);
      if (plan?.skip) return node;
      node = update(ts, node, plan);
    }
    return ts.visitEachChild(node, visit, ctx);
  }
  return visit;
}
