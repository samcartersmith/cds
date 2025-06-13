/**
 * Codemod to transform spacerGap props to gap props for CDS web components.
 *
 * Example transformations:
 * Before:
 * ```
 * <VStack spacerGap={10}>
 *   <Box>Test1</Box>
 *   <Box>Test2</Box>
 * </VStack>
 * ```
 *
 * After:
 * ```
 * <VStack gap={10}>
 *   <Box>Test1</Box>
 *   <Box>Test2</Box>
 * </VStack>
 * ```
 */

import {
  API,
  ASTPath,
  FileInfo,
  ImportDeclaration,
  JSXElement,
  Options,
  VariableDeclarator,
} from 'jscodeshift';

const propMapping = {
  spacerGap: 'gap',
} as const;

const CDS_PACKAGES = ['@cbhq/cds-web'];

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Check if the file has a CDS import
  const hasCDSImport = root
    .find(j.ImportDeclaration)
    .some(
      (path: ASTPath<ImportDeclaration>) =>
        path.value.source &&
        typeof path.value.source.value === 'string' &&
        CDS_PACKAGES.some(
          (pkg) =>
            typeof path.value.source.value === 'string' && path.value.source.value.startsWith(pkg),
        ),
    );

  if (!hasCDSImport) {
    // If no CDS imports are found, return the original source unchanged
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
      return typeof source === 'string' && source.startsWith(CDS_PACKAGES[0]);
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

  // 3. Find all JSX elements whose tag matches a relevant name or namespace
  const elements = root.find(j.JSXElement).filter((path: ASTPath<JSXElement>) => {
    const openingElement = path.node.openingElement;
    if (openingElement.name.type === 'JSXIdentifier') {
      // <Box ...> or <Title ...>
      return relevantTagNames.has(openingElement.name.name);
    }
    if (openingElement.name.type === 'JSXMemberExpression') {
      // <CDS.Box ...>
      const object = openingElement.name.object;
      if (object.type === 'JSXIdentifier') {
        return componentNamespaceNames.has(object.name);
      }
    }
    return false;
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
