// TODO: update this to adapt to increm v8
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

import { getCustomPackages } from '../helpers/get-custom-packages';
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

const CDS_PACKAGES = ['@cbhq/cds-web', '@cbhq/cds-mobile'];

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let modified = false;

  const customPackages = getCustomPackages(options);
  const PACKAGE_PATHS = [...CDS_PACKAGES, ...customPackages];

  const targetComponent = options.component as string | undefined;

  // Validate target component if specified
  if (targetComponent && !targetedComponents.includes(targetComponent)) {
    // If component is specified but not in targetedComponents, skip transformation
    return file.source;
  }

  // Step 1: Check if any CDS packages are imported
  let hasCdsImport = false;
  const importedComponents = new Set<string>();

  root.find(j.ImportDeclaration).forEach((path: ASTPath<ImportDeclaration>) => {
    const sourceValue = path.value.source.value;
    if (
      typeof sourceValue === 'string' &&
      PACKAGE_PATHS.some((pkg) => sourceValue.startsWith(pkg))
    ) {
      hasCdsImport = true;

      path.value.specifiers?.forEach((spec) => {
        if (spec.type === 'ImportSpecifier') {
          const importedName =
            typeof spec.imported.name === 'string'
              ? spec.imported.name
              : (spec.imported.name as any).name;

          // Filter by target component if specified, otherwise include all targeted components
          const shouldInclude = targetComponent
            ? importedName === targetComponent
            : targetedComponents.includes(importedName);

          if (shouldInclude) {
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
      // Also check if it matches the target component filter (if specified)
      const isTargetComponent = targetComponent ? componentName === targetComponent : true;

      if (importedComponents.has(componentName) && isTargetComponent) {
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
