import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { babelOptions } from './corpus.mjs';
export async function engine(id, kind) {
  const original = kind === 'original';
  let prepare, snapshot = ast => JSON.stringify(ast);
  if (id.startsWith('babel-business')) {
    const root = process.env.FLOW_WEB_ROOT || '/Users/bytedance/Documents/codes/flow-web-monorepo';
    const req = createRequire(resolve(root, 'packages/Infra/build/src/plugins/edenx/inline-i18n/rspack-plugin/loader/index.ts'));
    const { parse } = req('@babel/parser'), traverse = req('@babel/traverse').default;
    const { traverseFast } = createRequire(req.resolve('@babel/traverse'))('@babel/types');
    const collect = id === 'babel-business-fast' ? (ast, keys) => {
      const output = [];
      traverseFast(ast, node => { if (node.type === 'StringLiteral' && keys.has(node.value)) output.push(node.value); });
      return output;
    } : (ast, keys) => {
      const output = [];
      const hooks = { StringLiteral(path) { if (keys.has(path.node.value)) output.push(path.node.value); } };
      if (id === 'babel-business-no-scope') hooks.noScope = true;
      traverse(ast, hooks);
      return output;
    };
    return { prepare: f => parse(f.source, babelOptions), snapshot, collect };
  }
  const { collect } = await import(`./plugins/${id}.mjs`);
  if (id.startsWith('babel')) {
    const { parse } = await import('@babel/parser');
    prepare = f => parse(f.source, babelOptions);
  } else if (id === 'swc-visitor') {
    const { parseSync } = await import('@swc/core');
    prepare = f => parseSync(f.source, { syntax: original ? 'typescript' : 'ecmascript', tsx: original && f.filename.endsWith('.tsx'), decorators: true, target: 'es2022' });
  } else if (id === 'typescript' || id === 'tsquery') {
    const { default: ts } = await import('typescript');
    prepare = f => ts.createSourceFile(original ? f.filename : f.filename + '.js', f.source, ts.ScriptTarget.Latest, true);
    snapshot = ast => ast.getFullText();
  } else if (id === 'ts-morph') {
    const { Project, ts } = await import('ts-morph');
    prepare = f => new Project({ useInMemoryFileSystem: true, skipAddingFilesFromTsConfig: true, compilerOptions: { target: ts.ScriptTarget.Latest, allowJs: true } }).createSourceFile(original ? f.filename : f.filename + '.js', f.source);
    snapshot = ast => ast.getFullText();
  } else {
    // Each ESTree participant gets fresh clones of exactly the same parser output.
    if (original) {
      const { parseSync } = await import('oxc-parser');
      prepare = f => {
        const result = parseSync(f.filename, f.source, { sourceType: 'module' });
        if (result.errors.length) throw new Error('Oxc rejected original source');
        return structuredClone(result.program);
      };
    } else {
      const { parse } = await import('acorn');
      prepare = f => parse(f.source, { ecmaVersion: 2022, sourceType: 'module', locations: true, ranges: true });
    }
  }
  return { prepare, collect, snapshot };
}
