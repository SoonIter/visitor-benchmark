// Direct recursive object inspection: no library visitor, visitor keys, or assumed source layout.
export function collect(ast, keys) {
  const output = [];
  function collect(node) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { for (const child of node) collect(child); return; }
    if (typeof node.type !== 'string') return;
    if (node.type === 'Literal') { if (typeof node.value === 'string' && keys.has(node.value)) output.push(node.value); }
    for (const key in node) { const child = node[key]; if (child && typeof child === 'object') collect(child); }
  }
  collect(ast);
  return output;
}
