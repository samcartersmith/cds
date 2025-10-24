import type { API, FileInfo } from 'jscodeshift';

/**
 * Standalone codemod: Add spacingVariant="condensed" to ListCell and ListCellFallback
 *
 * What it does
 * - Finds usages of ListCell and ListCellFallback and adds the prop spacingVariant="condensed"
 *   when the prop is missing.
 * - Supports web and mobile CDS packages and these import styles:
 *   - Named imports:   import { ListCell, ListCellFallback } from '@cbhq/cds-web/cells'
 *   - Namespace usage: import * as CDS from '@cbhq/cds-web/cells'; <CDS.ListCell />
 *
 * Prerequisites
 * - The codebase should already be migrated to CDS v8 for ListCell/ListCellFallback.
 * - This script intentionally ignores and skips files that still import from '/v7'.
 *
 * Limitations
 * - Only acts on imports from '@cbhq/cds-web' or '@cbhq/cds-mobile'. Relative/local design system
 *   paths are ignored to avoid migrating non-CDS components.
 * - Does not modify import sources (e.g., will not promote '/v7' to v8).
 * - Does not rename props or handle wrapper components; it only adds spacingVariant when missing.
 * - Idempotent: re-running will not duplicate the prop.
 */

// jscodeshift transform entry signature (no Options are required for this codemod)
type TransformFunction = (file: FileInfo, api: API) => string | undefined;

const COMPONENT_NAMES = new Set(['ListCell', 'ListCellFallback']);

// Only operate on imports coming from CDS packages (v8). Relative/local DS wrappers are ignored intentionally
const ALLOWED_PACKAGE_PREFIXES = ['@cbhq/cds-web', '@cbhq/cds-mobile'];

// Returns true for CDS import sources like '@cbhq/cds-web/cells'
const isFromAllowedPackage = (sourceValue: string | undefined): boolean => {
  if (!sourceValue) return false;
  return ALLOWED_PACKAGE_PREFIXES.some(
    (pkg) => sourceValue === pkg || sourceValue.startsWith(`${pkg}/`),
  );
};

// Appends spacingVariant="condensed" if the attribute is not already present on the opening element
// Returns true if the element was modified
const addSpacingVariantIfMissing = (jscodeshift: any, openingElement: any): boolean => {
  const hasSpacingVariant = (openingElement.attributes || []).some(
    (attribute: any) =>
      attribute?.type === 'JSXAttribute' && attribute.name?.name === 'spacingVariant',
  );
  if (hasSpacingVariant) return false;
  openingElement.attributes = openingElement.attributes || [];
  openingElement.attributes.push(
    jscodeshift.jsxAttribute(
      jscodeshift.jsxIdentifier('spacingVariant'),
      jscodeshift.stringLiteral('condensed'),
    ),
  );
  return true;
};

const transform: TransformFunction = (file, api) => {
  const jscodeshift = api.jscodeshift;
  const rootCollection = jscodeshift(file.source);

  // Track: (1) how the components are imported by local name, (2) imported namespaces,
  // and (3) any v7-related imports/namespaces (to decide whether to bail out entirely).
  const localNames = new Set<string>();
  const namespaces = new Set<string>();
  const v7Namespaces = new Set<string>();
  let v7ListCellDetected = false;

  rootCollection.find(jscodeshift.ImportDeclaration).forEach((declarationPath) => {
    const importSource: string | undefined =
      (declarationPath.value.source && (declarationPath.value.source as any).value) || undefined;
    if (!isFromAllowedPackage(importSource)) {
      return;
    }
    (declarationPath.value.specifiers || []).forEach((specifier) => {
      // Named import: import { ListCell as Local } from '@cbhq/cds-web/cells'
      if (specifier.type === 'ImportSpecifier' && specifier.imported.type === 'Identifier') {
        const importedName = specifier.imported.name;
        let localName: string = importedName;
        if (specifier.local && (specifier.local as any).name)
          localName = (specifier.local as any).name as string;
        if (COMPONENT_NAMES.has(importedName)) localNames.add(localName);
        if (importSource && importSource.includes('/v7') && COMPONENT_NAMES.has(importedName)) {
          v7ListCellDetected = true;
        }
      }
      // Namespace import: import * as CDS from '@cbhq/cds-web/cells'
      if (specifier.type === 'ImportNamespaceSpecifier' && specifier.local) {
        const namespaceName = (specifier.local as any).name as string;
        namespaces.add(namespaceName);
        if (importSource && importSource.includes('/v7')) v7Namespaces.add(namespaceName);
      }
    });
  });

  // If any v7 imports are present and used (via a v7 namespace), bail out.
  // We purposely skip the entire file when v7 usage is detected to avoid mixing semantics.
  if (!v7ListCellDetected) {
    rootCollection.find(jscodeshift.JSXElement).forEach((elementPath) => {
      const openingElement = elementPath.value.openingElement;
      if (openingElement.name.type === 'JSXMemberExpression') {
        const objectNode = openingElement.name.object;
        const propertyNode = openingElement.name.property;
        if (objectNode.type === 'JSXIdentifier' && propertyNode.type === 'JSXIdentifier') {
          const namespaceName = objectNode.name as unknown as string;
          const componentName = propertyNode.name as unknown as string;
          if (v7Namespaces.has(namespaceName) && COMPONENT_NAMES.has(componentName)) {
            v7ListCellDetected = true;
          }
        }
      }
    });
  }

  if (v7ListCellDetected) {
    console.error(
      `ERROR [${file.path}]: Detected v7 ListCell/ListCellFallback usage. Skipping this file for spacingVariant migration.`,
    );
    return file.source;
  }

  let modified = false;

  // Add spacingVariant to qualifying elements
  rootCollection.find(jscodeshift.JSXElement).forEach((elementPath) => {
    const openingElement = elementPath.value.openingElement;
    if (openingElement.name.type === 'JSXIdentifier') {
      const tagName = openingElement.name.name as unknown as string;
      if (localNames.has(tagName)) {
        if (addSpacingVariantIfMissing(jscodeshift, openingElement)) modified = true;
      }
    } else if (openingElement.name.type === 'JSXMemberExpression') {
      const objectNode = openingElement.name.object;
      const propertyNode = openingElement.name.property;
      if (objectNode.type === 'JSXIdentifier' && propertyNode.type === 'JSXIdentifier') {
        const namespaceName = objectNode.name as unknown as string;
        const componentName = propertyNode.name as unknown as string;
        if (namespaces.has(namespaceName) && COMPONENT_NAMES.has(componentName)) {
          if (addSpacingVariantIfMissing(jscodeshift, openingElement)) modified = true;
        }
      }
    }
  });

  return modified ? rootCollection.toSource() : file.source;
};

export default transform;
export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
