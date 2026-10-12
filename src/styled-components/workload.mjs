import { parseESTree } from '../shared/ast.mjs';
export { canonical, digest, verifyCode } from '../shared/ast.mjs';
export function hash(value) { let h=2166136261; for (let i=0;i<value.length;i++) h=Math.imul(h ^ value.charCodeAt(i),16777619); return (h>>>0).toString(36); }
export const metadata = (filename,name,index) => ({displayName: `${filename.replace('.js','')}__${name}`, componentId:`sc-${hash(filename)}-${index}`});
export function corpus(kind='dense', small=false) {
  const count=small?4:kind==='dense'?100:20, noise=small?2:kind==='dense'?10:180;
  return Array.from({length:small?1:4},(_,file)=>{
    const filename=`Widget${file}.js`, alias=file%2?'styled':'sc';
    const imports=`import ${alias}, { css } from 'styled-components';\nimport { widget } from 'unrelated';\n`;
    let source=imports,expected=imports;
    for(let i=0;i<noise;i++){
      const s=`function noise${i}(x) { const y = x.map(v => ({ value: v + ${i} })); return y.filter(v => v.value > 2); }\n`;
      source+=s; expected+=s;
    }
    for(let i=0;i<count;i++){
      const name=`Card${i}`, tag=[`${alias}.div`,`${alias}('button')`,`${alias}.section.attrs({ role: 'region' })`][i%3];
      const template='`\n color: ${p => p.active ? "red" : "blue"};\n ${css`padding: 4px;`}\n`';
      const props=metadata(filename,name,i), config=`{ displayName: ${JSON.stringify(props.displayName)}, componentId: ${JSON.stringify(props.componentId)} }`;
      source+=`export const ${name} = ${tag}${template};\n`;
      expected+=`export const ${name} = ${tag}.withConfig(${config})${template};\n`;
    }
    // Negative controls are preserved byte-semantically by every implementation.
    const tail=`const Existing = ${alias}.div.withConfig({ componentId: 'keep-me' })\`color: red;\`;\nconst Other = widget.div\`margin: 0;\`;\nconst Helper = css\`display: flex;\`;\n`;
    source+=tail;expected+=tail;
    return {filename,source,expected,count,ast:parseESTree(source)};
  });
}
