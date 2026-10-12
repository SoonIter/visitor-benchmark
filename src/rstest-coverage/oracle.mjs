// Independent reference for the selected IfStatement phase. It intentionally
// follows the original mutable algorithm, not any contestant's business helper.
// Source: Rstest f3b95e42, v8AstConverter.ts (MIT; vendored with provenance).
export function oracle(ast, source, comments) {
  if (comments.some(c => /^\s*(?:istanbul|[cv]8|node:coverage)\s+ignore\s+file(?=\W|$)/.test(c.value))) return { ast, changed: 0, metadata: [] };
  const ignored = new WeakSet(), metadata = [];
  let changed = 0;
  function hint(node) {
    for (const c of comments) {
      const match = c.value.match(/^\s*(?:istanbul|[cv]8|node:coverage)\s+ignore\s+(if|else|next|file)(?=\W|$)/);
      if (match?.[1] === 'file') return 'file';
      if (match && c.end + Math.max(0, source.slice(c.end).search(/\S/)) === node.start) return match[1];
    }
  }
  function walk(node) {
    if (!node || typeof node.type !== 'string') return;
    if (node.type === 'IfStatement') {
      const h = hint(node);
      if (h === 'file' || h === 'next' || ignored.has(node)) return;
      const branches = [];
      for (const key of ['consequent', 'alternate']) {
        let arm = node[key];
        if (arm && arm.type !== 'BlockStatement') {
          arm = node[key] = { type: 'BlockStatement', body: [arm], start: arm.start, end: arm.end };
          changed++;
        }
        const skip = key === 'consequent' ? h === 'if' : h === 'else';
        if (skip) { if (arm) ignored.add(arm); }
        else if (arm) branches.push({ start: arm.start + 1, end: arm.end - 1, implicit: false });
        else if (h !== 'if') branches.push({ start: node.start, end: node.end, implicit: true });
      }
      metadata.push({ start: node.start, end: node.end, branches });
    }
    if (ignored.has(node)) return;
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) for (const child of value) walk(child);
      else if (value && typeof value === 'object') walk(value);
    }
  }
  walk(ast);
  metadata.sort((a,b) => a.start - b.start || b.end - a.end);
  return { ast, changed, metadata };
}
