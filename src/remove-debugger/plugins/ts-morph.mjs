import { Project, ts } from 'ts-morph';
import { inList } from '../typescript.mjs';
export function prepare(source, filename) {
  return new Project({ useInMemoryFileSystem: true, skipAddingFilesFromTsConfig: true, compilerOptions: { allowJs: true, target: ts.ScriptTarget.ES2022 } }).createSourceFile(filename, source);
}
export const print = file => file.getFullText();
export function run(file) {
  const nodes = file.getDescendantsOfKind(ts.SyntaxKind.DebuggerStatement);
  for (const node of nodes.reverse()) {
    if (inList(ts, node.compilerNode)) node.remove(); else node.replaceWithText(';');
  }
  return { ast: file, changed: nodes.length };
}
