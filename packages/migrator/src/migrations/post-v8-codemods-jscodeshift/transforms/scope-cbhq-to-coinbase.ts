import type { API, FileInfo } from 'jscodeshift';

type TransformFunction = (file: FileInfo, api: API) => string | undefined;

const PACKAGE_SCOPE_MAPPINGS: Record<string, string> = {
  '@cbhq/cds-common': '@coinbase/cds-common',
  '@cbhq/cds-icons': '@coinbase/cds-icons',
  '@cbhq/cds-illustrations': '@coinbase/cds-illustrations',
  '@cbhq/cds-lottie-files': '@coinbase/cds-lottie-files',
  '@cbhq/cds-mcp-server': '@coinbase/cds-mcp-server',
  '@cbhq/cds-mobile': '@coinbase/cds-mobile',
  '@cbhq/cds-mobile-visualization': '@coinbase/cds-mobile-visualization',
  '@cbhq/cds-web': '@coinbase/cds-web',
  '@cbhq/cds-web-visualization': '@coinbase/cds-web-visualization',
  '@cbhq/cds-utils': '@coinbase/cds-utils',
  '@cbhq/eslint-plugin-cds': '@coinbase/eslint-plugin-cds',
  '@cbhq/ui-mobile-playground': '@coinbase/ui-mobile-playground',
};

const replaceScopedPackage = (value: string): string => {
  for (const [oldScope, newScope] of Object.entries(PACKAGE_SCOPE_MAPPINGS)) {
    if (value === oldScope) return newScope;
    if (value.startsWith(`${oldScope}/`)) return value.replace(oldScope, newScope);
  }
  return value;
};

const transform: TransformFunction = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);
  let modified = false;

  const updateStringNode = (node: any) => {
    if (!node) return;
    // Plain string literal
    if (typeof node.value === 'string') {
      const updated = replaceScopedPackage(node.value);
      if (updated !== node.value) {
        node.value = updated;
        modified = true;
      }
      return;
    }

    // Template literal without expressions: convert to literal for simplicity
    if (node.type === 'TemplateLiteral' && node.expressions.length === 0) {
      const raw = node.quasis.map((q: any) => q.value.cooked ?? '').join('');
      const updated = replaceScopedPackage(raw);
      if (updated !== raw) {
        const literal = j.literal(updated) as any;
        Object.assign(node, literal);
        modified = true;
      }
    }
  };

  root.find(j.ImportDeclaration).forEach((path: any) => updateStringNode(path.value.source));
  root.find(j.ExportNamedDeclaration).forEach((path: any) => updateStringNode(path.value.source));
  root.find(j.ExportAllDeclaration).forEach((path: any) => updateStringNode(path.value.source));

  // Calls like require('...'), jest.mock('...'), etc.
  root.find(j.CallExpression).forEach((path: any) => {
    const firstArg = path.value.arguments?.[0] as any;
    if (firstArg) updateStringNode(firstArg);
  });

  root.find(j.ImportExpression).forEach((path: any) => {
    const source = path.value.source as any;
    updateStringNode(source);
  });

  // Generic string literals and bare template literals (e.g., config objects, arrays)
  root.find(j.Literal).forEach((path: any) => updateStringNode(path.value));
  root.find(j.TemplateLiteral).forEach((path: any) => updateStringNode(path.value));

  return modified ? root.toSource() : file.source;
};

export default transform;
export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
