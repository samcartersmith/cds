/**
 * Codemod to migrate RemoteImage width/height string values to numbers (when unitless).
 *
 * Example transformations:
 * Before:
 * import { RemoteImage } from '@cbhq/cds-web/media/RemoteImage';
 * <RemoteImage source="https://example.com/image.jpg" width="32" height="32" />
 *
 * After:
 * import { RemoteImage } from '@cbhq/cds-web/media/RemoteImage';
 * <RemoteImage source="https://example.com/image.jpg" width={32} height={32} />
 */

import type { API, ASTPath, FileInfo, ImportDeclaration, JSXElement } from 'jscodeshift';

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let modified = false;

  // Step 1: Collect RemoteImage local names imported from @cbhq/cds-web
  const remoteImageLocalNames: string[] = [];

  root.find(j.ImportDeclaration).forEach((path: ASTPath<ImportDeclaration>) => {
    const importPath = path.node.source.value;
    if (typeof importPath === 'string' && importPath.includes('@cbhq/cds-web')) {
      // Find the imported name (could be aliased)
      for (const spec of path.node.specifiers || []) {
        if (j.ImportSpecifier.check(spec) && spec.imported.name === 'RemoteImage') {
          const localName =
            spec.local && j.Identifier.check(spec.local) ? spec.local.name : 'RemoteImage';
          remoteImageLocalNames.push(localName);
        }
      }
    }
  });

  if (remoteImageLocalNames.length === 0) {
    return file.source;
  }

  // Helper: detect unitless numeric strings like "32" or "32.5"
  const isUnitlessNumericString = (value: string) => {
    return /^\s*\d+(\.\d+)?\s*$/.test(value);
  };

  // Step 2: Find <RemoteImage ... width="32" height="32" /> and convert to numbers
  root.find(j.JSXElement).forEach((path: ASTPath<JSXElement>) => {
    const opening = path.node.openingElement;
    if (!j.JSXIdentifier.check(opening.name)) return;
    const tagName = opening.name.name;
    if (!remoteImageLocalNames.includes(tagName)) return;

    const attrs = opening.attributes || [];
    for (const attr of attrs) {
      if (!j.JSXAttribute.check(attr) || !j.JSXIdentifier.check(attr.name)) continue;
      const attrName = attr.name.name;
      if (attrName !== 'width' && attrName !== 'height') continue;
      const attrValue = attr.value;
      if (!attrValue) continue;

      // Case 1: width="32"
      if (j.StringLiteral.check(attrValue)) {
        const strVal = attrValue.value;
        if (isUnitlessNumericString(strVal)) {
          const num = Number(strVal.trim());
          attr.value = j.jsxExpressionContainer(j.literal(num));
          modified = true;
        }
        continue;
      }

      // Case 2: width={'32'}
      if (j.JSXExpressionContainer.check(attrValue)) {
        const expr = attrValue.expression;
        if (j.StringLiteral.check(expr)) {
          const strVal = expr.value;
          if (isUnitlessNumericString(strVal)) {
            const num = Number(strVal.trim());
            attr.value = j.jsxExpressionContainer(j.literal(num));
            modified = true;
          }
        }
      }
    }
  });

  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
