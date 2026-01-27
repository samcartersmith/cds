import type { API, FileInfo } from 'jscodeshift';

/**
 * Standalone codemod: Replace PressableOpacity with Pressable and add transparent props
 *
 * What it does
 * - Finds usages of PressableOpacity and replaces them with Pressable
 * - Adds background="transparent" prop for all PressableOpacity usages
 * - Adds borderColor="transparent" prop for mobile PressableOpacity usages only
 * - Updates the import statement to import Pressable instead of PressableOpacity
 * - Supports web and mobile CDS packages and these import styles:
 *   - Named imports:   import { PressableOpacity } from '@cbhq/cds-web'
 *   - Namespace usage: import * as CDS from '@cbhq/cds-web'; <CDS.PressableOpacity />
 *
 * Note: PressableOpacity intentionally omits background, borderColor, borderRadius,
 * borderWidth, and transparentWhileInactive props. The transparent props are always
 * added since users cannot customize them on PressableOpacity.
 *
 * Prerequisites
 * - The codebase should already be migrated to CDS v8.
 *
 * Limitations
 * - Only acts on imports from '@cbhq/cds-web' or '@cbhq/cds-mobile'. Relative/local design system
 *   paths are ignored to avoid migrating non-CDS components.
 */

type TransformFunction = (file: FileInfo, api: API) => string | undefined;

const PRESSABLE_OPACITY_NAME = 'PressableOpacity';
const PRESSABLE_NAME = 'Pressable';

const CDS_WEB_PREFIX = '@cbhq/cds-web';
const CDS_MOBILE_PREFIX = '@cbhq/cds-mobile';

// Only operate on imports coming from CDS packages (v8). Relative/local DS wrappers are ignored intentionally
const ALLOWED_PACKAGE_PREFIXES = [CDS_WEB_PREFIX, CDS_MOBILE_PREFIX];

// Returns true for CDS import sources like '@cbhq/cds-web'
const isFromAllowedPackage = (sourceValue: string | undefined): boolean => {
  if (!sourceValue) return false;
  return ALLOWED_PACKAGE_PREFIXES.some(
    (pkg) => sourceValue === pkg || sourceValue.startsWith(`${pkg}/`),
  );
};

// Returns true if the import source is from CDS mobile
const isFromMobilePackage = (sourceValue: string | undefined): boolean => {
  if (!sourceValue) return false;
  return sourceValue === CDS_MOBILE_PREFIX || sourceValue.startsWith(`${CDS_MOBILE_PREFIX}/`);
};

// Adds background="transparent" prop (always) and borderColor="transparent" prop (mobile only)
const addTransparentProps = (jscodeshift: any, openingElement: any, isMobile: boolean): void => {
  openingElement.attributes = openingElement.attributes || [];
  if (isMobile) {
    openingElement.attributes.unshift(
      jscodeshift.jsxAttribute(
        jscodeshift.jsxIdentifier('borderColor'),
        jscodeshift.stringLiteral('transparent'),
      ),
    );
  }
  openingElement.attributes.unshift(
    jscodeshift.jsxAttribute(
      jscodeshift.jsxIdentifier('background'),
      jscodeshift.stringLiteral('transparent'),
    ),
  );
};

const transform: TransformFunction = (file, api) => {
  const jscodeshift = api.jscodeshift;
  const rootCollection = jscodeshift(file.source);

  // Track: (1) how the components are imported by local name, (2) imported namespaces,
  // and (3) whether the import is from mobile (for borderColor prop).
  const localNames = new Set<string>();
  const namespaces = new Set<string>();
  const mobileNamespaces = new Set<string>();
  const mobileLocalNames = new Set<string>();
  let hasPressableImport = false;

  rootCollection.find(jscodeshift.ImportDeclaration).forEach((declarationPath) => {
    const importSource: string | undefined =
      (declarationPath.value.source && (declarationPath.value.source as any).value) || undefined;
    if (!isFromAllowedPackage(importSource)) {
      return;
    }
    const isMobile = isFromMobilePackage(importSource);
    (declarationPath.value.specifiers || []).forEach((specifier) => {
      // Named import: import { PressableOpacity as Local } from '@cbhq/cds-web'
      if (specifier.type === 'ImportSpecifier' && specifier.imported.type === 'Identifier') {
        const importedName = specifier.imported.name;
        let localName: string = importedName;
        if (specifier.local && (specifier.local as any).name)
          localName = (specifier.local as any).name as string;
        if (importedName === PRESSABLE_OPACITY_NAME) {
          localNames.add(localName);
          if (isMobile) mobileLocalNames.add(localName);
        }
        if (importedName === PRESSABLE_NAME) hasPressableImport = true;
      }
      // Namespace import: import * as CDS from '@cbhq/cds-web'
      if (specifier.type === 'ImportNamespaceSpecifier' && specifier.local) {
        const namespaceName = (specifier.local as any).name as string;
        namespaces.add(namespaceName);
        if (isMobile) mobileNamespaces.add(namespaceName);
      }
    });
  });

  // No PressableOpacity found, nothing to do
  if (localNames.size === 0 && namespaces.size === 0) {
    return file.source;
  }

  let modified = false;

  // Update import declarations: rename PressableOpacity to Pressable
  rootCollection.find(jscodeshift.ImportDeclaration).forEach((declarationPath) => {
    const importSource: string | undefined =
      (declarationPath.value.source && (declarationPath.value.source as any).value) || undefined;
    if (!isFromAllowedPackage(importSource)) {
      return;
    }

    const specifiers = declarationPath.value.specifiers || [];
    const specifiersToRemove: number[] = [];

    specifiers.forEach((specifier, index) => {
      if (specifier.type === 'ImportSpecifier' && specifier.imported.type === 'Identifier') {
        if (specifier.imported.name === PRESSABLE_OPACITY_NAME) {
          if (hasPressableImport) {
            // If Pressable is already imported, mark PressableOpacity for removal
            specifiersToRemove.push(index);
            modified = true;
          } else {
            // Rename PressableOpacity to Pressable
            specifier.imported.name = PRESSABLE_NAME;
            if (specifier.local && (specifier.local as any).name === PRESSABLE_OPACITY_NAME) {
              (specifier.local as any).name = PRESSABLE_NAME;
            }
            hasPressableImport = true; // Prevent duplicates if there are multiple import statements
            modified = true;
          }
        }
      }
    });

    // Remove specifiers marked for removal (in reverse order to maintain indices)
    for (let i = specifiersToRemove.length - 1; i >= 0; i--) {
      specifiers.splice(specifiersToRemove[i], 1);
    }
  });

  // Update JSX elements: rename tags and add props
  rootCollection.find(jscodeshift.JSXElement).forEach((elementPath) => {
    const openingElement = elementPath.value.openingElement;
    const closingElement = elementPath.value.closingElement;

    let shouldTransform = false;
    let isMobile = false;

    if (openingElement.name.type === 'JSXIdentifier') {
      const tagName = openingElement.name.name as unknown as string;
      if (localNames.has(tagName)) {
        shouldTransform = true;
        isMobile = mobileLocalNames.has(tagName);
      }
    } else if (openingElement.name.type === 'JSXMemberExpression') {
      const objectNode = openingElement.name.object;
      const propertyNode = openingElement.name.property;
      if (objectNode.type === 'JSXIdentifier' && propertyNode.type === 'JSXIdentifier') {
        const namespaceName = objectNode.name as unknown as string;
        const componentName = propertyNode.name as unknown as string;
        if (namespaces.has(namespaceName) && componentName === PRESSABLE_OPACITY_NAME) {
          shouldTransform = true;
          isMobile = mobileNamespaces.has(namespaceName);
        }
      }
    }

    if (!shouldTransform) return;

    // Rename the JSX tag
    if (openingElement.name.type === 'JSXIdentifier') {
      const tagName = openingElement.name.name as unknown as string;
      if (tagName === PRESSABLE_OPACITY_NAME) {
        (openingElement.name as any).name = PRESSABLE_NAME;
        if (closingElement && closingElement.name.type === 'JSXIdentifier') {
          (closingElement.name as any).name = PRESSABLE_NAME;
        }
        modified = true;
      }
    } else if (openingElement.name.type === 'JSXMemberExpression') {
      const propertyNode = openingElement.name.property;
      if (
        propertyNode.type === 'JSXIdentifier' &&
        (propertyNode.name as unknown as string) === PRESSABLE_OPACITY_NAME
      ) {
        (propertyNode as any).name = PRESSABLE_NAME;
        if (
          closingElement &&
          closingElement.name.type === 'JSXMemberExpression' &&
          closingElement.name.property.type === 'JSXIdentifier'
        ) {
          (closingElement.name.property as any).name = PRESSABLE_NAME;
        }
        modified = true;
      }
    }

    // Add transparent props (borderColor only for mobile)
    addTransparentProps(jscodeshift, openingElement, isMobile);
    modified = true;
  });

  return modified ? rootCollection.toSource() : file.source;
};

export default transform;
export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
