export const isDebugger = node => node?.type === 'DebuggerStatement';
export const empty = () => ({ type: 'EmptyStatement' });
export const listParents = { Program: 'body', BlockStatement: 'body', StaticBlock: 'body', SwitchCase: 'consequent' };
export const singleParents = { IfStatement: ['consequent', 'alternate'], WhileStatement: ['body'], DoWhileStatement: ['body'], ForStatement: ['body'], ForInStatement: ['body'], ForOfStatement: ['body'], LabeledStatement: ['body'], WithStatement: ['body'] };
export const parentTypes = [...Object.keys(listParents), ...Object.keys(singleParents)];
// Only edits immediate statement slots. This is NOT a traversal adapter.
// Used by APIs without a built-in current-node deletion operation.
export function editSlots(node, state) {
  const key = listParents[node.type];
  if (key) {
    const list = node[key];
    for (let i = 0; i < list.length; i++) {
      if (isDebugger(list[i])) { list.splice(i--, 1); state.changed++; }
    }
  }
  for (const key of singleParents[node.type] || []) {
    if (isDebugger(node[key])) { node[key] = empty(); state.changed++; }
  }
}
