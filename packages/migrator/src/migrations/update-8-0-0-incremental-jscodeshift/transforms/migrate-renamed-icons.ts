/**
 * Codemod to migrate specific import paths that have changed in v8.
 *
 * Example transformations:
 * Before:
 * Case 1:
 * <Icon name="visibleInactive" />
 * <IconButton name="visibleInactive" />
 * <CellMedia name="visibleInactive" />
 * <DotSymbol iconName="visibleInactive" />
 * <InputIcon name="visibleInactive" />
 * <InputIconButton name="visibleInactive" />
 * <Banner startIcon="visibleInactive" />
 * <Button startIcon="visibleInactive" endIcon="followInactive" />
 * <Icon name={collapsed ? 'visibleActive' : 'visibleInactive'} />
 *
 * Case 2:
 * <Icon name="add" />
 * <IconButton name="add" />
 * <CellMedia name="add" />
 * <DotSymbol iconName="add" />
 * <InputIcon name="add" />
 * <InputIconButton name="add" />
 * <Banner startIcon="add" />
 * <Button startIcon="add" endIcon="affiliates" />
 *
 * After:
 * Case 1:
 * <Icon name="invisible" />
 * <IconButton name="invisible" />
 * <CellMedia name="invisible" />
 * <DotSymbol iconName="invisible" />
 * <InputIcon name="invisible" />
 * <InputIconButton name="invisible" />
 * <Banner startIcon="invisible" />
 * <Button startIcon="invisible" endIcon="followAdd" />
 * <Icon name={collapsed ? 'visibleActive' : 'invisible'} />
 *
 * Case 2:
 * <Icon name="add" active />
 * <IconButton name="add" active />
 * <CellMedia name="add" active />
 * <DotSymbol iconName="add" active />
 * <InputIcon name="add" active />
 * <InputIconButton name="add" active />
 * <Banner startIcon="add" startIconActive />
 * <Button startIcon="add" startIconActive endIcon="affiliates" endIconActive />
 */
import type { API, ASTPath, FileInfo, ImportDeclaration, Options } from 'jscodeshift';

import { getCustomPackages } from '../helpers/get-custom-packages';
import { logManualMigration } from '../helpers/manual-migration-logger';

// Helper function to detect if a variable is potentially from props
function isPotentiallyFromProps(variableName: string, jsxPath: any): boolean {
  // Look for function parameters (component props)
  let currentPath = jsxPath;
  while (currentPath) {
    const node = currentPath.node;

    // Check if we're inside a function component with destructured parameters
    if (node.type === 'FunctionDeclaration' || node.type === 'ArrowFunctionExpression') {
      const params = node.params;
      if (params && params.length > 0) {
        const firstParam = params[0];

        // Check for destructured parameter: function Component({ iconName })
        if (firstParam.type === 'ObjectPattern') {
          const hasProperty = firstParam.properties.some((prop: any) => {
            return (
              prop.type === 'Property' &&
              prop.key.type === 'Identifier' &&
              prop.key.name === variableName
            );
          });
          if (hasProperty) return true;
        }
      }
    }

    currentPath = currentPath.parent;
  }

  // Look for variable declarations that destructure from props
  // This is a simplified check - would need to be more sophisticated for real use
  if (variableName.includes('Icon') || variableName.includes('icon')) {
    // Common prop naming patterns
    const propPatterns = [
      /^(start|end)?[Ii]con(Name)?$/,
      /^(active|inactive)?[Ii]con$/,
      /^icon(Start|End|Name)?$/,
    ];

    return propPatterns.some((pattern) => pattern.test(variableName));
  }

  return false;
}

const renamedIconMap: Record<string, string> = {
  visibleInactive: 'invisible',
  followInactive: 'followAdd',
  visibleFilled: 'visible',
  rocketInactive: 'noRocket',
  followActive: 'following',
};

const componentPropMap: Record<string, string[] | [string, string][]> = {
  Icon: ['name', 'active'],
  NavigationIcon: ['name', 'active'],
  NavigationIconButton: ['name', 'active'],
  CellMedia: ['name', 'active'],
  DotSymbol: ['iconName', 'active'],
  IconButton: ['name', 'active'],
  InputIcon: ['name', 'active'],
  InputIconButton: ['name', 'active'],
  Banner: ['startIcon', 'startIconActive'],
  Button: [
    ['startIcon', 'startIconActive'],
    ['endIcon', 'endIconActive'],
  ],
};

const uiIconExceptions = [
  'add',
  'affiliates',
  'airdrop',
  'artwork',
  'avatar',
  'bell',
  'book',
  'briefcase',
  'calculator',
  'camera',
  'chartBar',
  'chartPie',
  'chartPieCircle',
  'chatBubble',
  'circleCheckmark',
  'circleCross',
  'clock',
  'coinbaseOne',
  'crypto',
  'cryptobasics',
  'currencies',
  'defi',
  'dot',
  'email',
  'error',
  'ethereum',
  'flame',
  'games',
  'gavel',
  'gear',
  'giftCard',
  'group',
  'home',
  'info',
  'institute',
  'keyboard',
  'lightbulb',
  'lightningBolt',
  'lock',
  'marketCap',
  'megaphone',
  'microphone',
  'music',
  'newsFeed',
  'newsletter',
  'nft',
  'orderHistory',
  'paperAirplane',
  'passport',
  'pencil',
  'play',
  'profile',
  'questionMark',
  'regulated',
  'safe',
  'save',
  'shield',
  'sortDoubleArrow',
  'sortDown',
  'sortDownCenter',
  'sortUp',
  'sortUpCenter',
  'soundOff',
  'soundOn',
  'sparkle',
  'speaker',
  'stake',
  'taxesReceipt',
  'telephone',
  'thumbsDown',
  'thumbsUp',
  'trashCan',
  'trophy',
  'unlock',
  'verifiedBadge',
  'visibleFilled',
  'wallet',
  'warning',
  'wrapToken',
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
  if (targetComponent && !Object.keys(componentPropMap).includes(targetComponent)) {
    // If component is specified but not in componentPropMap, skip transformation
    return file.source;
  }

  // Step 1: Check if any targeted components are imported from the target package
  const importedComponents = new Set<string>();

  root.find(j.ImportDeclaration).forEach((path: ASTPath<ImportDeclaration>) => {
    const sourceValue = path.value.source.value;
    if (
      typeof sourceValue === 'string' &&
      PACKAGE_PATHS.some((pkg) => sourceValue.startsWith(pkg))
    ) {
      path.value.specifiers?.forEach((spec) => {
        if (spec.type === 'ImportSpecifier') {
          const importedName =
            typeof spec.imported.name === 'string'
              ? spec.imported.name
              : (spec.imported.name as any).name;

          // Filter by target component if specified, otherwise include all components in componentPropMap
          const shouldInclude = targetComponent
            ? importedName === targetComponent
            : Object.keys(componentPropMap).includes(importedName);

          if (shouldInclude) {
            importedComponents.add(importedName);
          }
        }
      });
    }
  });

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

      if (
        importedComponents.has(componentName) &&
        componentPropMap[componentName] &&
        isTargetComponent
      ) {
        const propConfig = componentPropMap[componentName];

        // Handle both simple array and nested array cases
        const propMappings = Array.isArray(propConfig[0])
          ? (propConfig as [string, string][])
          : ([[propConfig[0], propConfig[1]]] as [string, string][]);

        propMappings.forEach(([iconPropName, activePropName]) => {
          // Find the icon prop attribute
          const iconPropAttr = openingElement.attributes?.find(
            (attr) =>
              attr.type === 'JSXAttribute' &&
              attr.name.type === 'JSXIdentifier' &&
              attr.name.name === iconPropName,
          );

          if (iconPropAttr && iconPropAttr.type === 'JSXAttribute') {
            let iconName: string | undefined;
            let isStringLiteral = false;
            let isExpressionStringLiteral = false;

            // Handle string literal values
            if (iconPropAttr.value?.type === 'StringLiteral') {
              iconName = iconPropAttr.value.value;
              isStringLiteral = true;
            }
            // Handle JSX expressions with string literals
            else if (iconPropAttr.value?.type === 'JSXExpressionContainer') {
              const expression = iconPropAttr.value.expression;
              if (expression.type === 'StringLiteral') {
                iconName = expression.value;
                isExpressionStringLiteral = true;
              }
              // Handle conditional expressions (ternary operators)
              else if (expression.type === 'ConditionalExpression') {
                let conditionalModified = false;
                const iconNamesInTernary: string[] = [];

                // Check and update consequent (true branch)
                if (expression.consequent.type === 'StringLiteral') {
                  const consequentIconName = expression.consequent.value;
                  if (typeof consequentIconName === 'string') {
                    iconNamesInTernary.push(consequentIconName);
                    if (renamedIconMap[consequentIconName]) {
                      expression.consequent.value = renamedIconMap[consequentIconName];
                      conditionalModified = true;
                    }
                  }
                }

                // Check and update alternate (false branch)
                if (expression.alternate.type === 'StringLiteral') {
                  const alternateIconName = expression.alternate.value;
                  if (typeof alternateIconName === 'string') {
                    iconNamesInTernary.push(alternateIconName);
                    if (renamedIconMap[alternateIconName]) {
                      expression.alternate.value = renamedIconMap[alternateIconName];
                      conditionalModified = true;
                    }
                  }
                }

                // Check if any icon names in the ternary are in uiIconExceptions
                const iconsNeedingActive = iconNamesInTernary.filter((iconName) =>
                  uiIconExceptions.includes(iconName),
                );

                if (iconsNeedingActive.length > 0) {
                  // Log manual migration for ternary operators with uiIconExceptions
                  const expressionCode = j(expression).toSource();
                  logManualMigration(
                    file.path,
                    `<${componentName} ${iconPropName}={${expressionCode}} />`,
                    `Icon name in ternary operator contains icons that need active props: ${iconsNeedingActive.join(
                      ', ',
                    )}. Please manually add the '${activePropName}' prop and update the ternary logic to handle active states appropriately.`,
                  );
                }

                if (conditionalModified) {
                  modified = true;
                }

                // Skip the rest of the logic for conditional expressions since we handle them differently
                return;
              }
              // Handle variable identifiers (e.g., name={iconName})
              else if (expression.type === 'Identifier') {
                const variableName = expression.name;

                // Try to determine if this might be a prop-derived variable
                const isPotentialProp = isPotentiallyFromProps(variableName, path);

                if (!isPotentialProp) {
                  // Only log for local variables, skip props
                  logManualMigration(
                    file.path,
                    `<${componentName} ${iconPropName}={${variableName}} />`,
                    `Icon name is a local variable (${variableName}). Please manually check if this variable contains icon names that need renaming according to the renamedIconMap or icons that need active props from uiIconExceptions. Update the variable value and add '${activePropName}' prop as needed.`,
                  );
                }

                // Skip the rest of the logic since this needs manual handling
                return;
              }
              // Handle member expressions (e.g., props.iconName, this.props.iconName)
              else if (expression.type === 'MemberExpression') {
                const expressionCode = j(expression).toSource();

                // Check if this is direct prop access
                const isDirectPropAccess =
                  (expression.object.type === 'Identifier' && expression.object.name === 'props') ||
                  (expression.object.type === 'MemberExpression' &&
                    expression.object.object.type === 'ThisExpression' &&
                    expression.object.property.type === 'Identifier' &&
                    expression.object.property.name === 'props');

                if (!isDirectPropAccess) {
                  // Only log for non-prop member expressions
                  logManualMigration(
                    file.path,
                    `<${componentName} ${iconPropName}={${expressionCode}} />`,
                    `Icon name is a member expression (${expressionCode}). Please manually check if this expression resolves to icon names that need renaming according to the renamedIconMap or icons that need active props from uiIconExceptions.`,
                  );
                }

                return;
              }
              // Handle other complex expressions (function calls, logical expressions, etc.)
              else if (
                expression.type === 'CallExpression' ||
                expression.type === 'LogicalExpression' ||
                expression.type === 'BinaryExpression'
              ) {
                const expressionCode = j(expression).toSource();

                // Log for manual migration since we can't determine the value at compile time
                logManualMigration(
                  file.path,
                  `<${componentName} ${iconPropName}={${expressionCode}} />`,
                  `Icon name is a complex expression (${expressionCode}). Please manually check if this expression resolves to icon names that need renaming according to the renamedIconMap or icons that need active props from uiIconExceptions. Update the expression and add '${activePropName}' prop as needed.`,
                );

                // Skip the rest of the logic since this needs manual handling
                return;
              }
            }

            if (typeof iconName === 'string') {
              let shouldUpdate = false;
              let newIconName = iconName;
              let shouldAddActive = false;

              // Check if icon name should be renamed
              if (renamedIconMap[iconName]) {
                newIconName = renamedIconMap[iconName];
                shouldUpdate = true;
              }

              // Check if icon should be active by default
              if (uiIconExceptions.includes(iconName)) {
                shouldAddActive = true;
              }

              // Update icon name if needed
              if (shouldUpdate) {
                if (isStringLiteral && iconPropAttr.value?.type === 'StringLiteral') {
                  iconPropAttr.value.value = newIconName;
                  modified = true;
                } else if (
                  isExpressionStringLiteral &&
                  iconPropAttr.value?.type === 'JSXExpressionContainer' &&
                  iconPropAttr.value.expression.type === 'StringLiteral'
                ) {
                  iconPropAttr.value.expression.value = newIconName;
                  modified = true;
                }
              }

              // Add active prop if needed
              if (shouldAddActive) {
                // Check if active prop already exists
                const existingActiveProp = openingElement.attributes?.find(
                  (attr) =>
                    attr.type === 'JSXAttribute' &&
                    attr.name.type === 'JSXIdentifier' &&
                    attr.name.name === activePropName,
                );

                if (!existingActiveProp) {
                  // Add the active prop as a boolean attribute (shorthand for {true})
                  const activeProp = j.jsxAttribute(j.jsxIdentifier(activePropName));
                  openingElement.attributes = openingElement.attributes || [];
                  openingElement.attributes.push(activeProp);
                  modified = true;
                }
              }
            }
          }
        });
      }
    }
  });

  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
