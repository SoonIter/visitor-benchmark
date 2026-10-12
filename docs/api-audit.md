# Editing API audit

Audited 2026-10-12: **27 styled-components adapters, 27 remove-debugger adapters and 30 i18n adapters**. Read the installed, pinned implementations and public API documentation; checked all production adapters. Versions are recorded in each result JSON.

**Compare the task through each tool's editing API.** Removal, replacement, path maintenance, immutable reconstruction and internal text work belong in the measured cost. Equal output does not require identical editing algorithms.

## Findings and fixes

| Finding | Affected cases | Resolution |
| :-- | :-- | :-- |
| Structural tag assignment bypassed replacement APIs | 12 styled adapters: SWC Next, Yuku, both walkers, Estraverse, both ESTree Toolkit modes, ast-types, jscodeshift, Zimmerframe and both Babel Traverse modes | Use context/path replacement or returned nodes; consume returned roots where applicable |
| Zimmerframe mutated its immutable input | Both editing scenarios | Return replacement nodes/parents; preserve child transformations and consume the returned root |
| TSQuery editing used a custom query + TypeScript transform | Both editing scenarios | Use the public `map()` API for replacement/removal; include its internal print/reparse |

This changes **13 styled adapters and 2 removal adapters**; rows above overlap. All i18n collectors are read-only and need no editing-API changes.

## Complete adapter matrix

“Manual” means the selected API has no structural editor, not an omitted native editing cost. All read-only entries use the named library's traversal/query interface; direct-ast is the explicit exception.

| Adapter | Styled-components | Remove debugger | Read-only i18n |
| :-- | :-- | :-- | :-- |
| direct-ast | Manual, top-level specialization | Manual recursive edits | Manual recursion |
| swc-next | `ctx.replace` | `ctx.remove` / `ctx.replace` | Typed Literal hook |
| yuku-ast | `ctx.replace` | `ctx.remove` / `ctx.replace` | Typed Literal hook |
| estree-walker | `this.replace` | `this.remove` / `this.replace` | Generic enter |
| oxc-walker | `this.replace` | `this.remove` / `this.replace` | Generic enter |
| oxc-visitor | Manual tag assignment | Manual parent-slot edits on exit | Typed Literal hook |
| acorn-simple | Manual tag assignment | Manual parent-slot edits | `simple` Literal callback |
| acorn-recursive | Manual tag assignment | Manual parent-slot edits before recursion | `recursive` Literal callback |
| acorn-full | Manual tag assignment | Manual parent-slot edits | `full` callback |
| estraverse | `replace`, return replacement | `VisitorOption.Remove` / return node | `traverse` enter |
| esrecurse | Manual tag assignment | Manual parent-slot edits before recursion | Literal visitor |
| estree-toolkit | Child `path.replaceWith`, no scope | `path.remove` / `replaceWith` | Literal visitor, no scope |
| estree-toolkit-scope | Child `path.replaceWith`, scope enabled | `path.remove` / `replaceWith` | Literal visitor, scope enabled |
| ast-types | Child `path.replace` | `path.replace()` / `path.replace(node)` | `visitLiteral` |
| zimmerframe | Return immutable replacement | Return immutable parent with updated slots | Literal visitor |
| jscodeshift | `find` + exposed child `path.replace` | `find` + exposed `path.replace` | `find(Literal)` |
| esquery | Query + manual tag assignment | Query + manual parent-slot edits | Literal selector |
| estree-util-visit | Manual tag assignment | Manual splice + `[SKIP, index]` | Enter callback |
| typescript-eslint | `simpleTraverse` + deferred manual edits | Manual parent-slot edits on enter | Typed Literal visitor |
| babel-types-traverse | Manual tag assignment | Manual parent-slot edits | Enter callback (Babel 8) |
| babel-types-traverse-fast | Deferred manual tag assignment | Manual parent-slot edits | Fast callback (Babel 7 and 8) |
| babel-traverse | Child `path.replaceWith` | `path.remove` / `replaceWith` | StringLiteral visitor (Babel 7 and 8) |
| babel-traverse-no-scope | Same replacement API, no scope | Same removal API, no scope | StringLiteral visitor (Babel 7 and 8) |
| swc-visitor | Mutable Visitor, return transformed node | Filter statement lists; return EmptyStatement for single slots | `visitStringLiteral` |
| typescript | Factory updates returned via `ts.transform` | Return `undefined` / EmptyStatement | `forEachChild` recursion |
| tsquery | `map`, return factory update | `map`, return `undefined` / EmptyStatement | StringLiteral query |
| ts-morph | `SourceFile.transform` + factory | Bulk transform + factory list updates | `forEachDescendant` |

Compatibility failures in i18n remain explicitly reported in [its results](i18n/results.md); an API listed here is not a claim of support for both AST tracks. Acorn's collector uses a documented base-walker extension for static destructuring keys so output parity is preserved.

## Valid differences to retain

- **No editor:** Oxc Visitor, Acorn, esrecurse, ESQuery, `@babel/types` walkers and typescript-eslint's simpleTraverse expose nodes, not a remove/replace context. Manual AST edits are required for these selected APIs. estree-util-visit supplies traversal index control, not a deletion primitive.
- **Native path API:** ast-types `path.replace()` removes a list element. jscodeshift exposes these paths; using their methods is native editing, unlike assigning `path.node.init.tag`.
- **Immutable API:** Zimmerframe has replacement by return value but no current-node removal sentinel. Returning a copied parent with a filtered statement list is appropriate; its ancestor reconstruction stays timed. Its inputs are now covered by deep-freeze regression tests.
- **Official bulk API:** ts-morph's `SourceFile.transform` is a documented editing API. It does not bypass the tool by mutating `compilerNode`; factory results flow through its text synchronization. This measures bulk transform, not repeated wrapper `.remove()` calls. SWC's legacy Visitor is itself mutable and has no path removal context.
- **Public API costs:** TSQuery 6.2.0 `map()` performs selection, a TypeScript transform, printing and reparsing internally. All remain timed. Its editing bar is consequently not a pure walker time. Its read-only query does not use `map()`.
- **Algorithm choices:** Parent-exit scanning and target-node removal may visit different numbers of nodes. Both can be legitimate for their APIs; parent-exit is not a requirement of Oxc Visitor. This audit retains the existing no-editor traversal strategies rather than introducing unrelated algorithm optimizations.

## Evidence and interpretation

[Zimmerframe immutable contract](https://github.com/sveltejs/zimmerframe#immutability) · [TSQuery map API](https://github.com/phenomnomnominal/tsquery#map) · [ts-morph bulk transforms](https://ts-morph.com/manipulation/transforms) · [ESTree visitor edit/index contract](https://github.com/syntax-tree/estree-util-visit#visitor) · [Babel traversal](https://babel.dev/docs/babel-traverse).

The previous [Oxc attribution study](oxc-attribution/README.md) remains a historical experiment. Its manual styled edits and equal-algorithm controls isolate selected costs; they do not define the corrected production adapters. Reproduce the old study at its recorded commit. Existing mutation helpers used by that study retain their behavior.

Both editing scenarios must be fully rerun after this correction. Compare updated charts within their AST track; do not carry earlier rankings over to the new API policy. Read-only source and timing results remain unchanged.
