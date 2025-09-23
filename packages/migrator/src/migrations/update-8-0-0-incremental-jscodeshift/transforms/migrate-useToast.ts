/**
 * Codemod to migrate useToast variants.
 *
 * Example transformations:
 * Before:
 * import { useToast } from '@cbhq/cds-web/overlays/useToast';
 * const toast = useToast();
 * toast.show('Toast copy', {
 *   action: { label: 'Action', onPress: onActionPressConsole },
 *   variant: 'negative'
 * });
 *
 * After:
 * import { useToast } from '@cbhq/cds-web/overlays/useToast';
 * const toast = useToast();
 * toast.show('Toast copy', {
 *   action: { label: 'Action', onPress: onActionPressConsole },
 *   variant: 'bgNegative',
 * });
 */

import type { API, ASTPath, FileInfo, ImportDeclaration, Options } from 'jscodeshift';

const variantMap: Record<string, string> = {
  primary: 'bgPrimary',
  negative: 'bgNegative',
  positive: 'bgPositive',
};
export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let modified = false;

  // Step 1: Check for useToast imports from @cbhq/cds-web or @cbhq/cds-mobile
  const useToastImports: string[] = [];

  root.find(j.ImportDeclaration).forEach((path) => {
    const importPath = path.node.source.value;
    if (
      typeof importPath === 'string' &&
      (importPath.includes('@cbhq/cds-web') || importPath.includes('@cbhq/cds-mobile')) &&
      importPath.includes('useToast')
    ) {
      // Find the imported name (could be aliased)
      path.node.specifiers?.forEach((spec) => {
        if (j.ImportSpecifier.check(spec) && spec.imported.name === 'useToast') {
          const localName =
            spec.local && j.Identifier.check(spec.local) ? spec.local.name : 'useToast';
          useToastImports.push(localName);
        }
      });
    }
  });

  if (useToastImports.length === 0) {
    return file.source; // No useToast imports found
  }

  // Step 2: Find useToast instances and track variable names
  const toastVariables: string[] = [];

  useToastImports.forEach((importName) => {
    root.find(j.VariableDeclarator).forEach((path) => {
      if (
        j.CallExpression.check(path.node.init) &&
        j.Identifier.check(path.node.init.callee) &&
        path.node.init.callee.name === importName
      ) {
        if (j.Identifier.check(path.node.id)) {
          toastVariables.push(path.node.id.name);
        }
      }
    });
  });

  // Step 3: Find toast.show() calls and update variant
  toastVariables.forEach((toastVar) => {
    root.find(j.CallExpression).forEach((path) => {
      if (
        j.MemberExpression.check(path.node.callee) &&
        j.Identifier.check(path.node.callee.object) &&
        path.node.callee.object.name === toastVar &&
        j.Identifier.check(path.node.callee.property) &&
        path.node.callee.property.name === 'show'
      ) {
        // Check if there's a second parameter (options object)
        if (path.node.arguments.length >= 2) {
          const secondArg = path.node.arguments[1];

          if (j.ObjectExpression.check(secondArg)) {
            // Look for variant property
            secondArg.properties.forEach((prop) => {
              if (
                j.ObjectProperty.check(prop) &&
                j.Identifier.check(prop.key) &&
                prop.key.name === 'variant' &&
                j.StringLiteral.check(prop.value)
              ) {
                const currentVariant = prop.value.value;
                if (variantMap[currentVariant]) {
                  prop.value.value = variantMap[currentVariant];
                  modified = true;
                }
              }
            });
          }
        }
      }
    });
  });

  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
