import { Project, ts } from 'ts-morph';
import { inList } from '../typescript.mjs';
export function prepare(source, filename) {
  return new Project({ useInMemoryFileSystem: true, skipAddingFilesFromTsConfig: true, compilerOptions: { allowJs: true, target: ts.ScriptTarget.ES2022 } }).createSourceFile(filename, source);
}
export const print = file => file.getFullText();
export function run(file) {
  let changed = 0;
  // One bulk transform/text synchronization, not one text edit per debugger.
  file.transform(traversal => {
    const node = traversal.visitChildren(), factory = traversal.factory;
    if (ts.isDebuggerStatement(node)) {
      // The parent transform removes list elements. A required statement slot
      // must retain an EmptyStatement, just like every other implementation.
      if (inList(ts, node)) return node;
      changed++;
      return factory.createEmptyStatement();
    }
    if (ts.isSourceFile(node) || ts.isBlock(node) || ts.isCaseClause(node) || ts.isDefaultClause(node)) {
      const statements = node.statements.filter(statement => {
        if (!ts.isDebuggerStatement(statement)) return true;
        changed++;
        return false;
      });
      if (statements.length === node.statements.length) return node;
      if (ts.isSourceFile(node)) return factory.updateSourceFile(node, statements);
      if (ts.isBlock(node)) return factory.updateBlock(node, statements);
      if (ts.isCaseClause(node)) return factory.updateCaseClause(node, node.expression, statements);
      return factory.updateDefaultClause(node, statements);
    }
    return node;
  });
  return { ast: file, changed };
}
