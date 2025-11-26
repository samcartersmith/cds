/**
 * Codemod to transform onPress and onBackButtonPress props for CDS components.
 *
 * Example transformations:
 * Before:
 * ```
 * // Web
 * <Button onPress={() => {}}>Test</Button>
 * <ModalHeader onBackButtonPress={() => {}}>Content</ModalHeader>
 *
 * // Mobile
 * <ModalHeader onBackButtonPress={() => {}}>Content</ModalHeader>
 * ```
 *
 * After:
 * ```
 * // Web
 * <Button onClick={() => {}}>Test</Button>
 * <ModalHeader onBackButtonClick={() => {}}>Content</ModalHeader>
 *
 * // Mobile
 * <ModalHeader onBackButtonClick={() => {}}>Content</ModalHeader>
 * ```
 */

import type {
  API,
  ASTPath,
  FileInfo,
  ImportDeclaration,
  JSXElement,
  Options,
  VariableDeclarator,
} from 'jscodeshift';

import { getCustomPackages } from '../helpers/get-custom-packages';

const webPropMapping = {
  onPress: 'onClick',
  onBackButtonPress: 'onBackButtonClick',
} as const;

const mobilePropMapping = {
  onBackButtonPress: 'onBackButtonClick',
} as const;

const CDS_PACKAGES = ['@cbhq/cds-web', '@cbhq/cds-mobile'];

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const platform = options.platform as 'web' | 'mobile' | undefined;

  const customPackages = getCustomPackages(options);
  const PACKAGE_PATHS = [...CDS_PACKAGES, ...customPackages];

  if (!platform) {
    console.warn('No platform specified. Use --platform=web or --platform=mobile');
    return file.source;
  }

  // Determine which prop mapping to use based on platform
  const propMapping = platform === 'web' ? webPropMapping : mobilePropMapping;

  // Check if the file has the relevant CDS import
  const hasCDSImport = root
    .find(j.ImportDeclaration)
    .some(
      (path: ASTPath<ImportDeclaration>) =>
        path.value.source &&
        typeof path.value.source.value === 'string' &&
        PACKAGE_PATHS.some((pkg) => (path.value.source.value as string).startsWith(pkg)),
    );

  if (!hasCDSImport) {
    // If no relevant CDS imports are found, return the original source unchanged
    // This avoids the re-parsing/re-printing formatting changes.
    return file.source;
  }

  // 1. Find all imported component names from relevant CDS packages
  const importedComponentNames = new Set<string>();
  const componentNamespaceNames = new Set<string>(); // Keep track of namespace imports e.g., import * as CDS from '...'

  root
    .find(j.ImportDeclaration)
    .filter((path: ASTPath<ImportDeclaration>) => {
      const source = path.node.source.value;
      return typeof source === 'string' && PACKAGE_PATHS.some((pkg) => source.startsWith(pkg));
    })
    .forEach((path: ASTPath<ImportDeclaration>) => {
      path.node.specifiers?.forEach((spec) => {
        if (spec.type === 'ImportSpecifier' && spec.imported.type === 'Identifier') {
          const localName =
            spec.local && spec.local.type === 'Identifier' ? spec.local.name : spec.imported.name;
          importedComponentNames.add(localName);
        } else if (
          spec.type === 'ImportDefaultSpecifier' &&
          spec.local &&
          spec.local.type === 'Identifier'
        ) {
          importedComponentNames.add(spec.local.name);
        } else if (
          spec.type === 'ImportNamespaceSpecifier' &&
          spec.local &&
          spec.local.type === 'Identifier'
        ) {
          // Namespace imports: e.g. import * as CDS from ...
          componentNamespaceNames.add(spec.local.name);
        }
      });
    });

  // 2. Find variables assigned to imported CDS components
  const variableComponentNames = new Set<string>();
  root.find(j.VariableDeclarator).forEach((path: ASTPath<VariableDeclarator>) => {
    const varName = path.node.id.type === 'Identifier' ? path.node.id.name : null;
    if (!varName || !path.node.init) return;

    let isRelevant = false;
    const init = path.node.init;

    // Check direct assignment: const Title = TextTitle2;
    if (init.type === 'Identifier' && importedComponentNames.has(init.name)) {
      isRelevant = true;
    }
    // Check ternary assignment: const Title = cond ? TextTitle2 : TextDisplay1;
    else if (init.type === 'ConditionalExpression') {
      const { consequent, alternate } = init;
      if (
        (consequent.type === 'Identifier' && importedComponentNames.has(consequent.name)) ||
        (alternate.type === 'Identifier' && importedComponentNames.has(alternate.name))
      ) {
        isRelevant = true;
      }
    }

    if (isRelevant) {
      variableComponentNames.add(varName);
    }
  });

  // Combine imported names, namespace names, and variable names into relevant tag names
  const relevantTagNames = new Set([...importedComponentNames, ...variableComponentNames]);
  const componentName = options.component as string | undefined;

  // 3. Find all JSX elements whose tag matches a relevant name or namespace
  const elements = root.find(j.JSXElement).filter((path: ASTPath<JSXElement>) => {
    const openingElement = path.node.openingElement;
    let currentComponentName: string | undefined;

    if (openingElement.name.type === 'JSXIdentifier') {
      currentComponentName = openingElement.name.name;
      if (!relevantTagNames.has(currentComponentName)) return false;
    } else if (openingElement.name.type === 'JSXMemberExpression') {
      const object = openingElement.name.object;
      if (object.type !== 'JSXIdentifier' || !componentNamespaceNames.has(object.name)) {
        return false;
      }
    } else {
      return false;
    }

    // If a component name is passed, only transform that component
    if (componentName && currentComponentName !== componentName) {
      return false;
    }

    return true;
  });

  // 4. For each matching element, map old prop names to new prop names
  let modified = false;
  elements.forEach((path: ASTPath<JSXElement>) => {
    const attributes = path.node.openingElement.attributes || [];
    attributes.forEach((attr) => {
      if (
        attr.type === 'JSXAttribute' &&
        attr.name.type === 'JSXIdentifier' &&
        Object.prototype.hasOwnProperty.call(propMapping, attr.name.name)
      ) {
        attr.name.name = propMapping[attr.name.name as keyof typeof propMapping];
        modified = true; // Mark that a change was made
      }
    });
  });

  // Only return new source if changes were made, otherwise return original
  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
