// Diagnostic only, requires node --allow-natives-syntax. Never timed.
const { parse } = require('acorn');
const ast = parse('const value = left + right; function f(x) { return x + 1; }', {ecmaVersion:2022,sourceType:'module',locations:true,ranges:true});
const copy = structuredClone(ast);
for(const [label,node] of [['parsed Program',ast],['cloned Program',copy],['parsed BinaryExpression',ast.body[0].declarations[0].init],['cloned BinaryExpression',copy.body[0].declarations[0].init]]) {
  console.log(label, 'fastProperties:', %HasFastProperties(node));
  %DebugPrint(node);
}
