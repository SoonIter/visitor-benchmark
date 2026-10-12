import { parseESTree } from '../shared/ast.mjs';
export { canonical, digest, verifyCode } from '../shared/ast.mjs';
// Each marker has an independently authored expected replacement. List slots
// disappear; required/optional single-statement slots become EmptyStatement.
export function fixture(filename, template) {
  const count = (template.match(/@REMOVE@|@EMPTY@/g) || []).length;
  const source = template.replaceAll('@REMOVE@', 'debugger;').replaceAll('@EMPTY@', 'debugger;');
  const expected = template.replaceAll('@REMOVE@', '').replaceAll('@EMPTY@', ';');
  return { filename, source, expected, count, ast: parseESTree(source) };
}
export function corpus(kind = 'dense', small = false) {
  const count = small ? 1 : kind === 'dense' ? 16 : 3;
  const noise = small ? 1 : kind === 'dense' ? 8 : 120;
  return Array.from({ length: small ? 1 : 4 }, (_, file) => {
    let input = `export const marker = "debugger;"; const object = { debugger: 1 };\n`;
    for (let i = 0; i < noise; i++) input += `function noise${i}(xs) { return xs.map(x => ({ value: x + ${i} })).filter(x => x.value > 0); }\n`;
    for (let i = 0; i < count; i++) input += `
      @REMOVE@ @REMOVE@
      export function task${i}(flag, xs) {
        @REMOVE@ @REMOVE@
        if (flag) @EMPTY@ else @EMPTY@
        while (false) @EMPTY@
        for (let k = 0; k < 0; k++) @EMPTY@
        for (const x of xs) @EMPTY@
        for (const k in {}) @EMPTY@
        do @EMPTY@ while (false);
        label${i}: @EMPTY@
        switch (flag) { case 1: @REMOVE@ @REMOVE@ break; default: @REMOVE@ }
        try { @REMOVE@ } catch (error) { @REMOVE@ } finally { @REMOVE@ }
        const nested = () => { @REMOVE@ return "debugger"; };
        class Local { method() { @REMOVE@ return 1; } }
        return nested;
      }
    `;
    return fixture(`debugger-${file}.js`, input);
  });
}
