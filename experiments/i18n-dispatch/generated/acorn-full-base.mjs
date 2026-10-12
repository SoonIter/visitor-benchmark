export const base = Object.create(null);
base["SequenceExpression"] = function childrenSequenceExpression(node, state, visit) {
{ const value = node.expressions;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ParenthesizedExpression"] = function childrenParenthesizedExpression(node, state, visit) {
{ const value = node.expression;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ArrowFunctionExpression"] = function childrenArrowFunctionExpression(node, state, visit) {
{ const value = node.typeParameters;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.params;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.returnType;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["FunctionDeclaration"] = function childrenFunctionDeclaration(node, state, visit) {
{ const value = node.id;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeParameters;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.params;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.returnType;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["FunctionExpression"] = function childrenFunctionExpression(node, state, visit) {
{ const value = node.id;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeParameters;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.params;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.returnType;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSDeclareFunction"] = function childrenTSDeclareFunction(node, state, visit) {
{ const value = node.id;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeParameters;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.params;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.returnType;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSEmptyBodyFunctionExpression"] = function childrenTSEmptyBodyFunctionExpression(node, state, visit) {
{ const value = node.id;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeParameters;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.params;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.returnType;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["BlockStatement"] = function childrenBlockStatement(node, state, visit) {
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["BinaryExpression"] = function childrenBinaryExpression(node, state, visit) {
{ const value = node.left;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.right;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["LogicalExpression"] = function childrenLogicalExpression(node, state, visit) {
{ const value = node.left;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.right;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ConditionalExpression"] = function childrenConditionalExpression(node, state, visit) {
{ const value = node.test;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.consequent;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.alternate;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["UnaryExpression"] = function childrenUnaryExpression(node, state, visit) {
{ const value = node.argument;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["UpdateExpression"] = function childrenUpdateExpression(node, state, visit) {
{ const value = node.argument;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["AssignmentExpression"] = function childrenAssignmentExpression(node, state, visit) {
{ const value = node.left;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.right;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ArrayExpression"] = function childrenArrayExpression(node, state, visit) {
{ const value = node.elements;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ObjectExpression"] = function childrenObjectExpression(node, state, visit) {
{ const value = node.properties;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["SpreadElement"] = function childrenSpreadElement(node, state, visit) {
{ const value = node.argument;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["Property"] = function childrenProperty(node, state, visit) {
{ const value = node.key;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.value;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["MemberExpression"] = function childrenMemberExpression(node, state, visit) {
{ const value = node.object;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.property;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["CallExpression"] = function childrenCallExpression(node, state, visit) {
{ const value = node.callee;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeArguments;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.arguments;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ChainExpression"] = function childrenChainExpression(node, state, visit) {
{ const value = node.expression;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TaggedTemplateExpression"] = function childrenTaggedTemplateExpression(node, state, visit) {
{ const value = node.tag;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeArguments;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.quasi;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["NewExpression"] = function childrenNewExpression(node, state, visit) {
{ const value = node.callee;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeArguments;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.arguments;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["AwaitExpression"] = function childrenAwaitExpression(node, state, visit) {
{ const value = node.argument;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["YieldExpression"] = function childrenYieldExpression(node, state, visit) {
{ const value = node.argument;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["MetaProperty"] = function childrenMetaProperty(node, state, visit) {
{ const value = node.meta;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.property;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["Decorator"] = function childrenDecorator(node, state, visit) {
{ const value = node.expression;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ClassDeclaration"] = function childrenClassDeclaration(node, state, visit) {
{ const value = node.decorators;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.id;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeParameters;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.superClass;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.superTypeArguments;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.implements;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ClassExpression"] = function childrenClassExpression(node, state, visit) {
{ const value = node.decorators;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.id;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeParameters;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.superClass;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.superTypeArguments;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.implements;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ClassBody"] = function childrenClassBody(node, state, visit) {
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["MethodDefinition"] = function childrenMethodDefinition(node, state, visit) {
{ const value = node.decorators;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.key;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.value;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSAbstractMethodDefinition"] = function childrenTSAbstractMethodDefinition(node, state, visit) {
{ const value = node.decorators;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.key;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.value;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["PropertyDefinition"] = function childrenPropertyDefinition(node, state, visit) {
{ const value = node.decorators;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.key;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.value;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["AccessorProperty"] = function childrenAccessorProperty(node, state, visit) {
{ const value = node.decorators;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.key;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.value;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSAbstractPropertyDefinition"] = function childrenTSAbstractPropertyDefinition(node, state, visit) {
{ const value = node.decorators;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.key;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.value;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSAbstractAccessorProperty"] = function childrenTSAbstractAccessorProperty(node, state, visit) {
{ const value = node.decorators;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.key;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.value;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["StaticBlock"] = function childrenStaticBlock(node, state, visit) {
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["Super"] = function childrenSuper(node, state, visit) {

};
base["Literal"] = function childrenLiteral(node, state, visit) {

};
base["ThisExpression"] = function childrenThisExpression(node, state, visit) {

};
base["TemplateLiteral"] = function childrenTemplateLiteral(node, state, visit) {
{ const value = node.quasis;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.expressions;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TemplateElement"] = function childrenTemplateElement(node, state, visit) {

};
base["Identifier"] = function childrenIdentifier(node, state, visit) {
{ const value = node.decorators;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["PrivateIdentifier"] = function childrenPrivateIdentifier(node, state, visit) {

};
base["ExpressionStatement"] = function childrenExpressionStatement(node, state, visit) {
{ const value = node.expression;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["IfStatement"] = function childrenIfStatement(node, state, visit) {
{ const value = node.test;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.consequent;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.alternate;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["SwitchStatement"] = function childrenSwitchStatement(node, state, visit) {
{ const value = node.discriminant;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.cases;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["SwitchCase"] = function childrenSwitchCase(node, state, visit) {
{ const value = node.test;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.consequent;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ForStatement"] = function childrenForStatement(node, state, visit) {
{ const value = node.init;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.test;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.update;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ForInStatement"] = function childrenForInStatement(node, state, visit) {
{ const value = node.left;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.right;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ForOfStatement"] = function childrenForOfStatement(node, state, visit) {
{ const value = node.left;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.right;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["WhileStatement"] = function childrenWhileStatement(node, state, visit) {
{ const value = node.test;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["DoWhileStatement"] = function childrenDoWhileStatement(node, state, visit) {
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.test;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["BreakStatement"] = function childrenBreakStatement(node, state, visit) {
{ const value = node.label;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ContinueStatement"] = function childrenContinueStatement(node, state, visit) {
{ const value = node.label;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["LabeledStatement"] = function childrenLabeledStatement(node, state, visit) {
{ const value = node.label;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["WithStatement"] = function childrenWithStatement(node, state, visit) {
{ const value = node.object;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ReturnStatement"] = function childrenReturnStatement(node, state, visit) {
{ const value = node.argument;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ThrowStatement"] = function childrenThrowStatement(node, state, visit) {
{ const value = node.argument;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TryStatement"] = function childrenTryStatement(node, state, visit) {
{ const value = node.block;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.handler;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.finalizer;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["CatchClause"] = function childrenCatchClause(node, state, visit) {
{ const value = node.param;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["DebuggerStatement"] = function childrenDebuggerStatement(node, state, visit) {

};
base["EmptyStatement"] = function childrenEmptyStatement(node, state, visit) {

};
base["VariableDeclaration"] = function childrenVariableDeclaration(node, state, visit) {
{ const value = node.declarations;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["VariableDeclarator"] = function childrenVariableDeclarator(node, state, visit) {
{ const value = node.id;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.init;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["AssignmentPattern"] = function childrenAssignmentPattern(node, state, visit) {
{ const value = node.decorators;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.left;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.right;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["RestElement"] = function childrenRestElement(node, state, visit) {
{ const value = node.decorators;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.argument;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ArrayPattern"] = function childrenArrayPattern(node, state, visit) {
{ const value = node.decorators;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.elements;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ObjectPattern"] = function childrenObjectPattern(node, state, visit) {
{ const value = node.decorators;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.properties;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["Program"] = function childrenProgram(node, state, visit) {
{ const value = node.hashbang;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ImportExpression"] = function childrenImportExpression(node, state, visit) {
{ const value = node.source;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.options;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ImportDeclaration"] = function childrenImportDeclaration(node, state, visit) {
{ const value = node.specifiers;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.source;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.attributes;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ImportSpecifier"] = function childrenImportSpecifier(node, state, visit) {
{ const value = node.imported;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.local;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ImportDefaultSpecifier"] = function childrenImportDefaultSpecifier(node, state, visit) {
{ const value = node.local;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ImportNamespaceSpecifier"] = function childrenImportNamespaceSpecifier(node, state, visit) {
{ const value = node.local;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ImportAttribute"] = function childrenImportAttribute(node, state, visit) {
{ const value = node.key;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.value;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ExportNamedDeclaration"] = function childrenExportNamedDeclaration(node, state, visit) {
{ const value = node.declaration;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.specifiers;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.source;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.attributes;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ExportDefaultDeclaration"] = function childrenExportDefaultDeclaration(node, state, visit) {
{ const value = node.declaration;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ExportAllDeclaration"] = function childrenExportAllDeclaration(node, state, visit) {
{ const value = node.exported;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.source;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.attributes;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["ExportSpecifier"] = function childrenExportSpecifier(node, state, visit) {
{ const value = node.local;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.exported;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSTypeAnnotation"] = function childrenTSTypeAnnotation(node, state, visit) {
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSAnyKeyword"] = function childrenTSAnyKeyword(node, state, visit) {

};
base["TSUnknownKeyword"] = function childrenTSUnknownKeyword(node, state, visit) {

};
base["TSNeverKeyword"] = function childrenTSNeverKeyword(node, state, visit) {

};
base["TSVoidKeyword"] = function childrenTSVoidKeyword(node, state, visit) {

};
base["TSNullKeyword"] = function childrenTSNullKeyword(node, state, visit) {

};
base["TSUndefinedKeyword"] = function childrenTSUndefinedKeyword(node, state, visit) {

};
base["TSStringKeyword"] = function childrenTSStringKeyword(node, state, visit) {

};
base["TSNumberKeyword"] = function childrenTSNumberKeyword(node, state, visit) {

};
base["TSBigIntKeyword"] = function childrenTSBigIntKeyword(node, state, visit) {

};
base["TSBooleanKeyword"] = function childrenTSBooleanKeyword(node, state, visit) {

};
base["TSSymbolKeyword"] = function childrenTSSymbolKeyword(node, state, visit) {

};
base["TSObjectKeyword"] = function childrenTSObjectKeyword(node, state, visit) {

};
base["TSIntrinsicKeyword"] = function childrenTSIntrinsicKeyword(node, state, visit) {

};
base["TSThisType"] = function childrenTSThisType(node, state, visit) {

};
base["TSTypeReference"] = function childrenTSTypeReference(node, state, visit) {
{ const value = node.typeName;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeArguments;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSQualifiedName"] = function childrenTSQualifiedName(node, state, visit) {
{ const value = node.left;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.right;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSTypeQuery"] = function childrenTSTypeQuery(node, state, visit) {
{ const value = node.exprName;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeArguments;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSImportType"] = function childrenTSImportType(node, state, visit) {
{ const value = node.source;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.options;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.qualifier;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeArguments;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSTypeParameter"] = function childrenTSTypeParameter(node, state, visit) {
{ const value = node.name;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.constraint;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.default;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSTypeParameterDeclaration"] = function childrenTSTypeParameterDeclaration(node, state, visit) {
{ const value = node.params;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSTypeParameterInstantiation"] = function childrenTSTypeParameterInstantiation(node, state, visit) {
{ const value = node.params;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSLiteralType"] = function childrenTSLiteralType(node, state, visit) {
{ const value = node.literal;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSTemplateLiteralType"] = function childrenTSTemplateLiteralType(node, state, visit) {
{ const value = node.quasis;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.types;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSArrayType"] = function childrenTSArrayType(node, state, visit) {
{ const value = node.elementType;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSIndexedAccessType"] = function childrenTSIndexedAccessType(node, state, visit) {
{ const value = node.objectType;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.indexType;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSTupleType"] = function childrenTSTupleType(node, state, visit) {
{ const value = node.elementTypes;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSNamedTupleMember"] = function childrenTSNamedTupleMember(node, state, visit) {
{ const value = node.label;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.elementType;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSOptionalType"] = function childrenTSOptionalType(node, state, visit) {
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSRestType"] = function childrenTSRestType(node, state, visit) {
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSJSDocNullableType"] = function childrenTSJSDocNullableType(node, state, visit) {
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSJSDocNonNullableType"] = function childrenTSJSDocNonNullableType(node, state, visit) {
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSJSDocUnknownType"] = function childrenTSJSDocUnknownType(node, state, visit) {

};
base["TSUnionType"] = function childrenTSUnionType(node, state, visit) {
{ const value = node.types;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSIntersectionType"] = function childrenTSIntersectionType(node, state, visit) {
{ const value = node.types;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSConditionalType"] = function childrenTSConditionalType(node, state, visit) {
{ const value = node.checkType;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.extendsType;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.trueType;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.falseType;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSInferType"] = function childrenTSInferType(node, state, visit) {
{ const value = node.typeParameter;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSTypeOperator"] = function childrenTSTypeOperator(node, state, visit) {
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSParenthesizedType"] = function childrenTSParenthesizedType(node, state, visit) {
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSFunctionType"] = function childrenTSFunctionType(node, state, visit) {
{ const value = node.typeParameters;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.params;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.returnType;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSConstructorType"] = function childrenTSConstructorType(node, state, visit) {
{ const value = node.typeParameters;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.params;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.returnType;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSTypePredicate"] = function childrenTSTypePredicate(node, state, visit) {
{ const value = node.parameterName;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSTypeLiteral"] = function childrenTSTypeLiteral(node, state, visit) {
{ const value = node.members;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSMappedType"] = function childrenTSMappedType(node, state, visit) {
{ const value = node.key;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.constraint;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.nameType;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSPropertySignature"] = function childrenTSPropertySignature(node, state, visit) {
{ const value = node.key;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSMethodSignature"] = function childrenTSMethodSignature(node, state, visit) {
{ const value = node.key;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeParameters;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.params;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.returnType;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSCallSignatureDeclaration"] = function childrenTSCallSignatureDeclaration(node, state, visit) {
{ const value = node.typeParameters;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.params;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.returnType;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSConstructSignatureDeclaration"] = function childrenTSConstructSignatureDeclaration(node, state, visit) {
{ const value = node.typeParameters;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.params;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.returnType;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSIndexSignature"] = function childrenTSIndexSignature(node, state, visit) {
{ const value = node.parameters;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSTypeAliasDeclaration"] = function childrenTSTypeAliasDeclaration(node, state, visit) {
{ const value = node.id;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeParameters;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSInterfaceDeclaration"] = function childrenTSInterfaceDeclaration(node, state, visit) {
{ const value = node.id;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeParameters;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.extends;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSInterfaceBody"] = function childrenTSInterfaceBody(node, state, visit) {
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSInterfaceHeritage"] = function childrenTSInterfaceHeritage(node, state, visit) {
{ const value = node.expression;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeArguments;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSClassImplements"] = function childrenTSClassImplements(node, state, visit) {
{ const value = node.expression;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeArguments;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSEnumDeclaration"] = function childrenTSEnumDeclaration(node, state, visit) {
{ const value = node.id;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSEnumBody"] = function childrenTSEnumBody(node, state, visit) {
{ const value = node.members;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSEnumMember"] = function childrenTSEnumMember(node, state, visit) {
{ const value = node.id;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.initializer;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSModuleDeclaration"] = function childrenTSModuleDeclaration(node, state, visit) {
{ const value = node.id;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSModuleBlock"] = function childrenTSModuleBlock(node, state, visit) {
{ const value = node.body;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSParameterProperty"] = function childrenTSParameterProperty(node, state, visit) {
{ const value = node.decorators;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.parameter;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSAsExpression"] = function childrenTSAsExpression(node, state, visit) {
{ const value = node.expression;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSSatisfiesExpression"] = function childrenTSSatisfiesExpression(node, state, visit) {
{ const value = node.expression;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSTypeAssertion"] = function childrenTSTypeAssertion(node, state, visit) {
{ const value = node.typeAnnotation;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.expression;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSNonNullExpression"] = function childrenTSNonNullExpression(node, state, visit) {
{ const value = node.expression;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSInstantiationExpression"] = function childrenTSInstantiationExpression(node, state, visit) {
{ const value = node.expression;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeArguments;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSExportAssignment"] = function childrenTSExportAssignment(node, state, visit) {
{ const value = node.expression;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSNamespaceExportDeclaration"] = function childrenTSNamespaceExportDeclaration(node, state, visit) {
{ const value = node.id;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSImportEqualsDeclaration"] = function childrenTSImportEqualsDeclaration(node, state, visit) {
{ const value = node.id;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.moduleReference;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["TSExternalModuleReference"] = function childrenTSExternalModuleReference(node, state, visit) {
{ const value = node.expression;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["JSXElement"] = function childrenJSXElement(node, state, visit) {
{ const value = node.openingElement;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.children;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.closingElement;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["JSXOpeningElement"] = function childrenJSXOpeningElement(node, state, visit) {
{ const value = node.name;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.typeArguments;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.attributes;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["JSXClosingElement"] = function childrenJSXClosingElement(node, state, visit) {
{ const value = node.name;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["JSXFragment"] = function childrenJSXFragment(node, state, visit) {
{ const value = node.openingFragment;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.children;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.closingFragment;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["JSXOpeningFragment"] = function childrenJSXOpeningFragment(node, state, visit) {

};
base["JSXClosingFragment"] = function childrenJSXClosingFragment(node, state, visit) {

};
base["JSXIdentifier"] = function childrenJSXIdentifier(node, state, visit) {

};
base["JSXNamespacedName"] = function childrenJSXNamespacedName(node, state, visit) {
{ const value = node.namespace;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.name;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["JSXMemberExpression"] = function childrenJSXMemberExpression(node, state, visit) {
{ const value = node.object;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.property;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["JSXAttribute"] = function childrenJSXAttribute(node, state, visit) {
{ const value = node.name;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
{ const value = node.value;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["JSXSpreadAttribute"] = function childrenJSXSpreadAttribute(node, state, visit) {
{ const value = node.argument;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["JSXExpressionContainer"] = function childrenJSXExpressionContainer(node, state, visit) {
{ const value = node.expression;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["JSXEmptyExpression"] = function childrenJSXEmptyExpression(node, state, visit) {

};
base["JSXText"] = function childrenJSXText(node, state, visit) {

};
base["JSXSpreadChild"] = function childrenJSXSpreadChild(node, state, visit) {
{ const value = node.expression;
if (value !== null && value !== undefined && typeof value === 'object') {
if (Array.isArray(value)) {
for (let i = 0; i < value.length; i++) {
const item = value[i];
if (item !== null) { visit(item); }
}
} else { visit(value); }
}
}
};
base["Hashbang"] = function childrenHashbang(node, state, visit) {

};