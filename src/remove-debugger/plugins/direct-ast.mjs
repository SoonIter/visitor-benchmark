import { isDebugger, empty } from '../edit.mjs';
export function run(ast) {
  let changed = 0;
  function visit(node) {
    for (const key of Object.keys(node)) {
      const value = node[key];
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const item = value[i];
          if (isDebugger(item)) { value.splice(i--, 1); changed++; }
          else if (item && typeof item.type === 'string') visit(item);
        }
      } else if (isDebugger(value)) { node[key] = empty(); changed++; }
      else if (value && typeof value.type === 'string') visit(value);
    }
  }
  visit(ast);
  return { ast, changed };
}
