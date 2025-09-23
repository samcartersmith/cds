/**
 * Codemod to migrate elevated components to add `bordered` prop.
 *
 * Example transformations:
 * Before:
 * ```
 * <Box elevation={1}>Content</Box>
 * <HStack elevation={2}>Content</HStack>
 * <VStack elevation={1}>Content</VStack>
 * ```
 *
 * After:
 * ```
 * <Box elevation={1} bordered>Content</Box>
 * <HStack elevation={2} bordered>Content</HStack>
 * <VStack elevation={1} bordered>Content</VStack>
 * ```
 */
import type { API, ASTPath, FileInfo, ImportDeclaration, Options } from 'jscodeshift';

import { logManualMigration } from '../helpers/manual-migration-logger';

const targetedComponents = [
  'Box',
  'HStack',
  'VStack',
  'Card',
  'AnnouncementCard',
  'DataCard',
  'FeatureEntryCard',
  'FeedCard',
];

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let modified = false;

  // Get platform from options
  const platform = options.platform as string | undefined;
  const targetPackage = platform === 'mobile' ? '@cbhq/cds-mobile' : '@cbhq/cds-web';

  // Step 1: Check if any CDS packages are imported
  let hasCdsImport = false;
  const importedComponents = new Set<string>();

  root.find(j.ImportDeclaration).forEach((path: ASTPath<ImportDeclaration>) => {
    const sourceValue = path.value.source.value;
    if (
      typeof sourceValue === 'string' &&
      (sourceValue.startsWith('@cbhq/cds-web') || sourceValue.startsWith('@cbhq/cds-mobile'))
    ) {
      hasCdsImport = true;

      path.value.specifiers?.forEach((spec) => {
        if (spec.type === 'ImportSpecifier') {
          const importedName =
            typeof spec.imported.name === 'string'
              ? spec.imported.name
              : (spec.imported.name as any).name;

          if (targetedComponents.includes(importedName)) {
            importedComponents.add(importedName);
          }
        }
      });
    }
  });

  // If no CDS imports are found, skip transformation
  if (!hasCdsImport) {
    return file.source;
  }

  // If no targeted components are imported, skip transformation
  if (importedComponents.size === 0) {
    return file.source;
  }

  // Step 2: Find and transform JSX elements for targeted components
  root.find(j.JSXElement).forEach((path) => {
    const openingElement = path.value.openingElement;

    if (openingElement.name.type === 'JSXIdentifier') {
      const componentName = openingElement.name.name;

      // Check if this component is in our target list and was imported
      if (importedComponents.has(componentName)) {
        // Find the elevation prop attribute
        const elevationPropAttr = openingElement.attributes?.find(
          (attr) =>
            attr.type === 'JSXAttribute' &&
            attr.name.type === 'JSXIdentifier' &&
            attr.name.name === 'elevation',
        );

        if (elevationPropAttr && elevationPropAttr.type === 'JSXAttribute') {
          let elevationValue: number | undefined;
          let shouldSkipTransformation = false;

          // Handle string literal values
          if (elevationPropAttr.value?.type === 'StringLiteral') {
            const numValue = parseInt(elevationPropAttr.value.value, 10);
            if (!isNaN(numValue)) {
              elevationValue = numValue;
            }
          }
          // Handle JSX expressions
          else if (elevationPropAttr.value?.type === 'JSXExpressionContainer') {
            const expression = elevationPropAttr.value.expression;

            // Handle number literals
            if (expression.type === 'NumericLiteral' || expression.type === 'Literal') {
              const numValue = typeof expression.value === 'number' ? expression.value : undefined;
              if (numValue !== undefined) {
                elevationValue = numValue;
              }
            }
            // Handle conditional expressions (ternary operators)
            else if (expression.type === 'ConditionalExpression') {
              const expressionCode = j(expression).toSource();
              logManualMigration(
                file.path,
                `<${componentName} elevation={${expressionCode}} />`,
                `Elevation value is a ternary operator. Please manually check if this resolves to 1 or 2, and add the 'bordered' prop if needed.`,
              );
              shouldSkipTransformation = true;
            }
            // Handle variable identifiers
            else if (expression.type === 'Identifier') {
              const variableName = expression.name;
              logManualMigration(
                file.path,
                `<${componentName} elevation={${variableName}} />`,
                `Elevation value is a variable (${variableName}). Please manually check if this variable resolves to 1 or 2, and add the 'bordered' prop if needed.`,
              );
              shouldSkipTransformation = true;
            }
            // Handle member expressions (e.g., props.elevation, obj.elevation)
            else if (expression.type === 'MemberExpression') {
              const expressionCode = j(expression).toSource();
              logManualMigration(
                file.path,
                `<${componentName} elevation={${expressionCode}} />`,
                `Elevation value is a member expression (${expressionCode}). Please manually check if this resolves to 1 or 2, and add the 'bordered' prop if needed.`,
              );
              shouldSkipTransformation = true;
            }
            // Handle other complex expressions (function calls, logical expressions, etc.)
            else if (
              expression.type === 'CallExpression' ||
              expression.type === 'LogicalExpression' ||
              expression.type === 'BinaryExpression'
            ) {
              const expressionCode = j(expression).toSource();
              logManualMigration(
                file.path,
                `<${componentName} elevation={${expressionCode}} />`,
                `Elevation value is a complex expression (${expressionCode}). Please manually check if this resolves to 1 or 2, and add the 'bordered' prop if needed.`,
              );
              shouldSkipTransformation = true;
            }
          }

          // Skip transformation if we encountered a complex expression
          if (shouldSkipTransformation) {
            return;
          }

          // Check if elevation value is 1 or 2
          if (elevationValue === 1 || elevationValue === 2) {
            // Check if bordered prop already exists
            const existingBorderedProp = openingElement.attributes?.find(
              (attr) =>
                attr.type === 'JSXAttribute' &&
                attr.name.type === 'JSXIdentifier' &&
                attr.name.name === 'bordered',
            );

            if (!existingBorderedProp) {
              // Add the bordered prop as a boolean attribute (shorthand for {true})
              const borderedProp = j.jsxAttribute(j.jsxIdentifier('bordered'));
              openingElement.attributes = openingElement.attributes || [];
              openingElement.attributes.push(borderedProp);
              modified = true;
            }
          }
        }
      }
    }
  });

  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
