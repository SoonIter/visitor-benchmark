// The IfStatement normalization phase of Rstest coverage, not full coverage conversion.
// Schema objects only read/build nodes; traversal and edits belong to each adapter.
export function createState(fixture, schema) {
  const hints = new Map();
  let ignoreFile = false;
  for (const comment of fixture.comments) {
    const hint = comment.value.match(/^\s*(?:istanbul|[cv]8|node:coverage)\s+ignore\s+(if|else|next|file)(?=\W|$)/)?.[1];
    if (!hint) continue;
    if (hint === 'file') ignoreFile = true;
    const whitespace = fixture.source.slice(comment.end).search(/\S/);
    hints.set(comment.end + Math.max(0, whitespace), hint);
  }
  const excluded = [], seen = new WeakSet(), metadata = [];
  let changed = 0;
  function plan(node) {
    const start = schema.start(node), end = schema.end(node);
    if (ignoreFile || excluded.some(([a,b]) => a <= start && end <= b)) return { skip: true };
    if (seen.has(node)) return null;
    seen.add(node);
    const hint = hints.get(start);
    if (hint === 'next') { excluded.push([start,end]); return { skip: true }; }
    const arms = schema.arms(node), replacements = [], branches = [];
    for (let i = 0; i < 2; i++) {
      const arm = arms[i];
      if (arm && !schema.isBlock(arm)) {
        replacements.push([i, schema.block(arm)]);
        changed++;
      }
      const ignored = i === 0 ? hint === 'if' : hint === 'else';
      if (ignored) {
        if (arm) excluded.push([schema.start(arm), schema.end(arm)]);
      } else if (arm) {
        branches.push({ start: schema.start(arm) + 1, end: schema.end(arm) - 1, implicit: false });
      } else if (hint !== 'if') {
        branches.push({ start, end, implicit: true });
      }
    }
    metadata.push({ start, end, branches });
    return { replacements };
  }
  return {
    plan,
    // Post-order/query APIs collect first, then perform the same business task in source order.
    order: items => items.sort((a,b) => schema.start(a.node) - schema.start(b.node) || schema.end(b.node) - schema.end(a.node)),
    seen,
    finish(ast, dispose) {
      metadata.sort((a,b) => a.start - b.start || b.end - a.end);
      return { ast, changed, metadata, dispose };
    },
  };
}
export const estree = {
  start: n => n.start, end: n => n.end,
  arms: n => [n.consequent, n.alternate],
  isBlock: n => n.type === 'BlockStatement',
  block: n => ({ type: 'BlockStatement', body: [n], start: n.start, end: n.end }),
};
export function replaceIf(node, plan, state) {
  if (!plan?.replacements?.length) return null;
  const next = { ...node };
  for (const [index, block] of plan.replacements) next[index ? 'alternate' : 'consequent'] = block;
  state.seen.add(next);
  return next;
}
export function editIf(node, plan) {
  for (const [index, block] of plan?.replacements ?? []) node[index ? 'alternate' : 'consequent'] = block;
}
