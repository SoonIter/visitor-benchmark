# Input AST samples

ESTree is the shared input. Babel and SWC JSON are their separate native shapes. The TypeScript file is a readable outline (parent cycles omitted), not an AST to deserialize. Actual native ASTs are prepared outside the timer by each plugin module. ts-morph likewise creates its own Project/SourceFile before timing.
