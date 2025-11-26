/**
 * Codemod to transform Icon and icon related components
 *
 * Example transformations:
 * Before:
 * Case 1:
 * import { Icon } from '@cbhq/cds-web/icons/Icon'
 * <Icon name="bellActive" />
 * <Icon name="heartInactive" />
 * <Button startIcon="bellActive" endIcon="heartInactive" />
 *
 * Case 2:
 * import { NavigationIconButton } from '@cbhq/cds-web/buttons';
 * <NavigationIconButton />
 *
 * Case 3:
 * import { NavigationIcon, NavigationIconProps } from '@cbhq/cds-mobile/icons/NavigationIcon';
 * const CustomComponent1 = props: NavigationIconProps => (
 *   <NavigationIcon
 *     active={active}
 *     name={name}
 *     size={size}
 *     paddingY={paddingY}
 *   />
 * )
 * const CustomComponent2 = props: NavigationIconProps => (
 *   <NavigationIcon
 *     active={active}
 *     name={name}
 *     size={size}
 *     paddingY={paddingY}
 *     color={color}
 *   />
 * )
 *
 * const CustomComponent3 = props: NavigationIconProps => (
 *   <NavigationIcon
 *     name={name}
 *     size={size}
 *     paddingY={paddingY}
 *   />
 * )
 *
 * const CustomComponent4 = props: NavigationIconProps => (
 *   <NavigationIcon
 *     name={name}
 *     size={size}
 *     paddingY={paddingY}
 *     color={color}
 *   />
 * )
 *
 * const CustomComponent5 = props: NavigationIconProps => (
 *   <NavigationIcon
 *     active
 *     name={name}
 *     size={size}
 *     paddingY={paddingY}
 *   />
 * )
 *
 * const CustomComponent6 = props: NavigationIconProps => (
 *   <NavigationIcon
 *     active={false}
 *     name={name}
 *     size={size}
 *     paddingY={paddingY}
 *   />
 * )
 *
 * const CustomComponent7 = props: NavigationIconProps => (
 *   <NavigationIcon
 *     active
 *     name={name}
 *     size={size}
 *     paddingY={paddingY}
 *     color={color}
 *   />
 * )
 *
 * const CustomComponent8 = props: NavigationIconProps => (
 *   <NavigationIcon
 *     active={false}
 *     name={name}
 *     size={size}
 *     paddingY={paddingY}
 *     color={color}
 *   />
 * )
 *
 * After:
 * Case 1:
 * import { Icon } from '@cbhq/cds-web/icons/Icon'
 * <Icon name="bell" active />
 * <Icon name="heart" />
 * <Button startIcon="bell" startIconActive endIcon="heart" />
 *
 * Case 2:
 * import { IconButton } from '@cbhq/cds-web/buttons';
 * <IconButton />
 *
 * Case 3:
 * import { Icon, IconProps } from '@cbhq/cds-mobile/icons/Icon';
 * const CustomComponent1 = props: IconProps => (
 *   <Icon
 *     active={active}
 *     name={name}
 *     size={size}
 *     paddingY={paddingY}
 *     color={active ? undefined : 'fg'}
 *   />
 * )
 * const CustomComponent2 = props: IconProps => (
 *   <Icon
 *     active={active}
 *     name={name}
 *     size={size}
 *     paddingY={paddingY}
 *     color={color ?? (active ? undefined : 'fg')}
 *   />
 * )
 * const CustomComponent3 = props: IconProps => (
 *   <Icon
 *     name={name}
 *     size={size}
 *     paddingY={paddingY}
 *     color="fg"
 *   />
 * )
 * const CustomComponent4 = props: IconProps => (
 *   <Icon
 *     name={name}
 *     size={size}
 *     paddingY={paddingY}
 *     color={color ?? 'fg'}
 *   />
 * )
 *
 * const CustomComponent5 = props: IconProps => (
 *   <Icon
 *     active
 *     name={name}
 *     size={size}
 *     paddingY={paddingY}
 *   />
 * )
 *
 * const CustomComponent6 = props: IconProps => (
 *   <Icon
 *     active={false}
 *     name={name}
 *     size={size}
 *     paddingY={paddingY}
 *     color="fg"
 *   />
 * )
 *
 * const CustomComponent7 = props: IconProps => (
 *   <Icon
 *     active
 *     name={name}
 *     size={size}
 *     paddingY={paddingY}
 *     color={color}
 *   />
 * )
 *
 * const CustomComponent8 = props: IconProps => (
 *   <Icon
 *     active={false}
 *     name={name}
 *     size={size}
 *     paddingY={paddingY}
 *     color={color ?? 'fg'}
 *   />
 * )
 *
 */
import type {
  API,
  ASTPath,
  FileInfo,
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  JSXAttribute,
  Options,
} from 'jscodeshift';

import { getCustomPackages } from '../helpers/get-custom-packages';
import { logManualMigration } from '../helpers/manual-migration-logger';

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

// Helper function to remove Active/Inactive suffix from icon names
function removeIconSuffix(iconName: string): string {
  if (iconName.endsWith('Active') || iconName.endsWith('Inactive')) {
    return iconName.replace(/(Active|Inactive)$/, '');
  }
  return iconName;
}

// Helper function to check if icon name has Active suffix
function hasActiveSuffix(iconName: string): boolean {
  return iconName.endsWith('Active');
}

// Helper function to check if icon name has Active or Inactive suffix
function hasSuffix(iconName: string): boolean {
  return iconName.endsWith('Active') || iconName.endsWith('Inactive');
}

const CDS_PACKAGES = ['@cbhq/cds-web', '@cbhq/cds-mobile'];
const CDS_COMMON_PACKAGE = '@cbhq/cds-common';
const CDS_ICONS_PACKAGE = '@cbhq/cds-icons';

// Component name mappings for Case 2 and Case 3
const COMPONENT_NAME_MAPPINGS: Record<string, string> = {
  NavigationIconButton: 'IconButton',
  NavigationIcon: 'Icon',
  NavigationIconProps: 'IconProps',
};

// Import path mappings for Case 2 and Case 3
const COMPONENT_IMPORT_MAPPINGS: Record<string, { web: string; mobile: string }> = {
  NavigationIconButton: {
    web: '@cbhq/cds-web/buttons',
    mobile: '@cbhq/cds-mobile/buttons', // fallback, though NavigationIconButton is web-only
  },
  NavigationIcon: {
    web: '@cbhq/cds-web/icons/Icon',
    mobile: '@cbhq/cds-mobile/icons/Icon',
  },
  NavigationIconProps: {
    web: '@cbhq/cds-web/icons/Icon',
    mobile: '@cbhq/cds-mobile/icons/Icon',
  },
};

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let modified = false;

  const customPackages = getCustomPackages(options);
  const PACKAGE_PATHS = [...CDS_PACKAGES, ...customPackages];

  // Step 1: Check if the file has CDS imports or icon-related content
  const hasCDSImport = root.find(j.ImportDeclaration).some((path: ASTPath<ImportDeclaration>) => {
    const sourceValue = path.value.source.value;
    return (
      typeof sourceValue === 'string' &&
      (PACKAGE_PATHS.some((pkg) => sourceValue.startsWith(pkg)) ||
        sourceValue.includes(CDS_ICONS_PACKAGE) ||
        sourceValue.startsWith(CDS_COMMON_PACKAGE))
    );
  });

  const hasIconUsage = root.find(j.JSXElement).some((path) => {
    const openingElement = path.value.openingElement;
    return openingElement.name.type === 'JSXIdentifier' && openingElement.name.name === 'Icon';
  });

  if (!hasCDSImport && !hasIconUsage) {
    // If no relevant imports or usage, return unchanged
    return file.source;
  }

  // Get platform and component from options
  const platform = options.platform as string | undefined;
  const targetComponent = options.component as string | undefined;
  const isWebPlatform = platform === 'web';
  const isMobilePlatform = platform === 'mobile';

  // Validate target component if specified
  if (targetComponent && !Object.keys(componentPropMap).includes(targetComponent)) {
    // If component is specified but not in componentPropMap, skip transformation
    return file.source;
  }

  // Create filtered component name mappings based on target component
  const getFilteredComponentMappings = (): Record<string, string> => {
    if (!targetComponent) {
      // If no target component specified, use full mapping
      return COMPONENT_NAME_MAPPINGS;
    }

    const filteredMappings: Record<string, string> = {};

    if (targetComponent === 'NavigationIconButton') {
      // Only include NavigationIconButton transformation
      filteredMappings.NavigationIconButton = 'IconButton';
    } else if (targetComponent === 'NavigationIcon') {
      // Include both NavigationIcon and NavigationIconProps transformations
      filteredMappings.NavigationIcon = 'Icon';
      filteredMappings.NavigationIconProps = 'IconProps';
    }

    return filteredMappings;
  };

  const filteredComponentMappings = getFilteredComponentMappings();

  // Check which targeted components are imported from the target package
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

  // If target component is specified and no targeted components are imported, skip transformation
  if (targetComponent && importedComponents.size === 0) {
    return file.source;
  }

  // Step 2: Handle Case 2 and Case 3 - Transform NavigationIconButton and NavigationIcon imports and components
  const componentImportsToProcess = new Set<string>();
  const newImportsNeeded: Array<{ specifier: string; path: string; alias?: string }> = [];
  const aliasToOriginalMapping = new Map<string, string>(); // Maps alias names to original component names

  // Find and process component imports
  root.find(j.ImportDeclaration).forEach((path: ASTPath<ImportDeclaration>) => {
    const sourceValue = path.value.source.value;

    if (typeof sourceValue === 'string') {
      const specifiersToKeep: ImportSpecifier[] = [];
      let importModified = false;

      path.value.specifiers?.forEach((spec) => {
        if (spec.type === 'ImportSpecifier') {
          const importedName =
            typeof spec.imported.name === 'string'
              ? spec.imported.name
              : (spec.imported.name as any).name;

          if (Object.keys(filteredComponentMappings).includes(importedName)) {
            // Track that we found a component import to transform
            componentImportsToProcess.add(importedName);

            // Determine the correct import path based on platform
            let newImportPath = '';
            const mapping = COMPONENT_IMPORT_MAPPINGS[importedName];

            if (isWebPlatform && mapping.web) {
              newImportPath = mapping.web;
            } else if (isMobilePlatform && mapping.mobile) {
              newImportPath = mapping.mobile;
            } else {
              // Default to web if platform not specified or invalid
              newImportPath = mapping.web;
            }

            const newSpecifierName = filteredComponentMappings[importedName];

            // Check if there's an alias
            const localName = spec.local
              ? typeof spec.local.name === 'string'
                ? spec.local.name
                : (spec.local.name as any).name || spec.local.name
              : '';
            const hasAlias = localName && localName !== importedName;
            const aliasName = hasAlias ? String(localName) : undefined;

            newImportsNeeded.push({
              specifier: newSpecifierName,
              path: newImportPath,
              alias: aliasName,
            });

            // Track alias mapping for JSX transformation
            if (aliasName) {
              aliasToOriginalMapping.set(aliasName, importedName);
            }

            importModified = true;
            modified = true;
          } else {
            // Keep other imports
            specifiersToKeep.push(spec);
          }
        } else {
          // Keep non-ImportSpecifier imports
          specifiersToKeep.push(spec as any);
        }
      });

      // Update the import declaration
      if (importModified) {
        if (specifiersToKeep.length > 0) {
          path.value.specifiers = specifiersToKeep;
        } else {
          // Remove the entire import if no specifiers left
          j(path).remove();
        }
      }
    }
  });

  // Add new imports for transformed components
  newImportsNeeded.forEach(({ specifier, path: importPath, alias }) => {
    // Check if import already exists from the same package
    const existingImport = root.find(j.ImportDeclaration, {
      source: { value: importPath },
    });

    if (existingImport.length > 0) {
      // Add to existing import if specifier doesn't already exist
      existingImport.forEach((existingPath) => {
        const existingSpecifiers = existingPath.value.specifiers || [];
        const alreadyPresent = existingSpecifiers.some(
          (s) =>
            s.type === 'ImportSpecifier' &&
            (typeof s.imported.name === 'string'
              ? s.imported.name
              : (s.imported.name as any).name) === specifier,
        );

        if (!alreadyPresent) {
          const importSpec = alias
            ? j.importSpecifier(j.identifier(specifier), j.identifier(alias))
            : j.importSpecifier(j.identifier(specifier));

          existingPath.value.specifiers = [...existingSpecifiers, importSpec];
        }
      });
    } else {
      // Before creating new import, check if the specifier already exists in any import from the same package
      const packageName = importPath.split('/').slice(0, 2).join('/'); // Get @cbhq/cds-web or @cbhq/cds-mobile
      let specifierAlreadyExists = false;

      root.find(j.ImportDeclaration).forEach((path: ASTPath<ImportDeclaration>) => {
        const sourceValue = path.value.source.value as string;
        if (sourceValue && sourceValue.startsWith(packageName)) {
          const existingSpecifiers = path.value.specifiers || [];
          const hasSpecifier = existingSpecifiers.some(
            (s: ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier) =>
              s.type === 'ImportSpecifier' &&
              (typeof (s as ImportSpecifier).imported.name === 'string'
                ? (s as ImportSpecifier).imported.name
                : ((s as ImportSpecifier).imported.name as any).name) === specifier,
          );
          if (hasSpecifier) {
            specifierAlreadyExists = true;
          }
        }
      });

      if (!specifierAlreadyExists) {
        // Create new import only if specifier doesn't exist anywhere in the same package
        const importSpec = alias
          ? j.importSpecifier(j.identifier(specifier), j.identifier(alias))
          : j.importSpecifier(j.identifier(specifier));

        const newImport = j.importDeclaration([importSpec], j.literal(importPath));

        // Find the last import to insert after
        const lastImport = root.find(j.ImportDeclaration).at(-1);
        if (lastImport.length > 0) {
          lastImport.insertAfter(newImport);
        } else {
          // If no imports, add at the beginning
          root.get().node.program.body.unshift(newImport);
        }
      }
    }
  });

  // Step 3: Transform component references in JSX and TypeScript
  if (componentImportsToProcess.size > 0) {
    // Transform JSX component names
    root.find(j.JSXElement).forEach((path) => {
      const openingElement = path.value.openingElement;
      const closingElement = path.value.closingElement;

      if (openingElement.name.type === 'JSXIdentifier') {
        const componentName = openingElement.name.name;

        // Check if this is a direct component name or an alias
        const originalComponentName = aliasToOriginalMapping.get(componentName) || componentName;

        if (Object.keys(filteredComponentMappings).includes(originalComponentName)) {
          // If this is an alias, keep the alias name; otherwise use the new component name
          const newComponentName = aliasToOriginalMapping.has(componentName)
            ? componentName // Keep alias as-is
            : filteredComponentMappings[originalComponentName];
          openingElement.name.name = newComponentName;

          // Update closing element if it exists
          if (closingElement && closingElement.name.type === 'JSXIdentifier') {
            closingElement.name.name = newComponentName;
          }

          // Special handling for Case 3: NavigationIcon with active prop and color logic
          if (originalComponentName === 'NavigationIcon') {
            let hasActiveProp = false;
            let hasColorProp = false;
            let colorPropAttr: JSXAttribute | undefined;
            let activePropIsFalse = false;
            let activePropIsTrue = false;
            let activePropIsVariable = false;

            // Check existing props
            openingElement.attributes?.forEach((attr) => {
              if (attr.type === 'JSXAttribute' && attr.name.type === 'JSXIdentifier') {
                if (attr.name.name === 'active') {
                  hasActiveProp = true;

                  // Check the type of active prop value
                  if (!attr.value) {
                    // <NavigationIcon active /> - shorthand for active={true}
                    activePropIsTrue = true;
                  } else if (attr.value.type === 'JSXExpressionContainer') {
                    const expression = attr.value.expression;
                    if (expression.type === 'BooleanLiteral') {
                      if (expression.value === true) {
                        activePropIsTrue = true;
                      } else {
                        activePropIsFalse = true;
                      }
                    } else {
                      // active={variable} or other expression
                      activePropIsVariable = true;
                    }
                  }
                } else if (attr.name.name === 'color') {
                  hasColorProp = true;
                  colorPropAttr = attr;
                }
              }
            });

            // Handle different active prop scenarios
            if (activePropIsTrue) {
              // Case: active={true} or active
              // If active is true, don't add color prop if it doesn't exist
              // If color prop exists, leave it unchanged (no fallback needed)
              // Do nothing - just transform the component name
            } else if (activePropIsFalse) {
              // Case: active={false}
              // Add color='fg' if no color prop, or fallback to 'fg' if color prop exists
              if (!hasColorProp) {
                const colorProp = j.jsxAttribute(j.jsxIdentifier('color'), j.stringLiteral('fg'));
                openingElement.attributes = openingElement.attributes || [];
                openingElement.attributes.push(colorProp);
                modified = true;
              } else if (colorPropAttr && colorPropAttr.value?.type === 'JSXExpressionContainer') {
                const expression = colorPropAttr.value.expression;
                if (expression.type === 'Identifier') {
                  const variableName = expression.name;
                  // Update to fallback logic: color ?? 'fg'
                  colorPropAttr.value.expression = j.logicalExpression(
                    '??',
                    j.identifier(variableName),
                    j.stringLiteral('fg'),
                  );
                  modified = true;
                }
              }
            } else if (activePropIsVariable) {
              // Case: active={variable}
              // Add conditional color logic: active ? undefined : 'fg'
              if (!hasColorProp) {
                const colorProp = j.jsxAttribute(
                  j.jsxIdentifier('color'),
                  j.jsxExpressionContainer(
                    j.conditionalExpression(
                      j.identifier('active'),
                      j.identifier('undefined'),
                      j.stringLiteral('fg'),
                    ),
                  ),
                );
                openingElement.attributes = openingElement.attributes || [];
                openingElement.attributes.push(colorProp);
                modified = true;
              } else if (colorPropAttr && colorPropAttr.value?.type === 'JSXExpressionContainer') {
                const expression = colorPropAttr.value.expression;
                if (expression.type === 'Identifier') {
                  const variableName = expression.name;
                  // Update to fallback logic: color ?? (active ? undefined : 'fg')
                  colorPropAttr.value.expression = j.logicalExpression(
                    '??',
                    j.identifier(variableName),
                    j.conditionalExpression(
                      j.identifier('active'),
                      j.identifier('undefined'),
                      j.stringLiteral('fg'),
                    ),
                  );
                  modified = true;
                }
              }
            } else if (!hasActiveProp) {
              // Case: No active prop
              // Add color='fg' if no color prop, or fallback to 'fg' if color prop exists
              if (!hasColorProp) {
                const colorProp = j.jsxAttribute(j.jsxIdentifier('color'), j.stringLiteral('fg'));
                openingElement.attributes = openingElement.attributes || [];
                openingElement.attributes.push(colorProp);
                modified = true;
              } else if (colorPropAttr && colorPropAttr.value?.type === 'JSXExpressionContainer') {
                const expression = colorPropAttr.value.expression;
                if (expression.type === 'Identifier') {
                  const variableName = expression.name;
                  // Update to fallback logic: color ?? 'fg'
                  colorPropAttr.value.expression = j.logicalExpression(
                    '??',
                    j.identifier(variableName),
                    j.stringLiteral('fg'),
                  );
                  modified = true;
                }
              }
            }
          }

          modified = true;
        }
      }
    });

    // Transform TypeScript type references
    root.find(j.TSTypeReference).forEach((path) => {
      if (path.value.typeName.type === 'Identifier') {
        const typeName = path.value.typeName.name;
        const originalTypeName = aliasToOriginalMapping.get(typeName) || typeName;

        if (Object.keys(filteredComponentMappings).includes(originalTypeName)) {
          // If this is an alias, keep the alias name; otherwise use the new type name
          const newTypeName = aliasToOriginalMapping.has(typeName)
            ? typeName // Keep alias as-is
            : filteredComponentMappings[originalTypeName];
          path.value.typeName.name = newTypeName;
          modified = true;
        }
      }
    });

    // Transform other identifier references in type contexts
    root.find(j.Identifier).forEach((path) => {
      const identifierName = path.value.name;
      const originalIdentifierName = aliasToOriginalMapping.get(identifierName) || identifierName;

      if (Object.keys(filteredComponentMappings).includes(originalIdentifierName)) {
        const parent = path.parentPath.node;

        // Only replace in type contexts
        if (
          parent.type === 'TSTypeAnnotation' ||
          parent.type === 'TSTypeAliasDeclaration' ||
          parent.type === 'TSInterfaceDeclaration' ||
          parent.type === 'TSPropertySignature' ||
          parent.type === 'TSMethodSignature' ||
          parent.type === 'TSFunctionType'
        ) {
          // If this is an alias, keep the alias name; otherwise use the new identifier name
          const newIdentifierName = aliasToOriginalMapping.has(identifierName)
            ? identifierName // Keep alias as-is
            : filteredComponentMappings[originalIdentifierName];
          path.value.name = newIdentifierName;
          modified = true;
        }
      }
    });
  }

  // Step 4: Transform component props based on componentPropMap (Case 1 logic)
  root.find(j.JSXElement).forEach((path) => {
    const openingElement = path.value.openingElement;

    // Check if this is a component we care about
    if (openingElement.name.type === 'JSXIdentifier') {
      const componentName = openingElement.name.name;

      // Check if this component is in our target list and was imported (or skip import check if no targetComponent specified)
      // Also check if it matches the target component filter (if specified)
      const isTargetComponent = targetComponent ? componentName === targetComponent : true;
      const isImported = targetComponent ? importedComponents.has(componentName) : true;

      if (componentPropMap[componentName] && isTargetComponent && isImported) {
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
          ) as JSXAttribute | undefined;

          if (iconPropAttr && iconPropAttr.value?.type === 'StringLiteral') {
            const iconName = iconPropAttr.value.value;

            if (typeof iconName === 'string' && hasSuffix(iconName)) {
              // Remove the suffix from the icon name
              iconPropAttr.value.value = removeIconSuffix(iconName);
              modified = true;

              // Add active prop if it was an Active suffix
              if (hasActiveSuffix(iconName)) {
                // Check if active prop already exists
                const existingActiveProp = openingElement.attributes?.find(
                  (attr) =>
                    attr.type === 'JSXAttribute' &&
                    attr.name.type === 'JSXIdentifier' &&
                    attr.name.name === activePropName,
                );

                if (!existingActiveProp) {
                  // Add the active prop
                  const activeProp = j.jsxAttribute(j.jsxIdentifier(activePropName));
                  openingElement.attributes = openingElement.attributes || [];
                  openingElement.attributes.push(activeProp);
                }
              }
            }
          }

          // Handle JSX expressions with string literals (e.g., name={"iconName"})
          const iconPropExprAttr = openingElement.attributes?.find(
            (attr) =>
              attr.type === 'JSXAttribute' &&
              attr.name.type === 'JSXIdentifier' &&
              attr.name.name === iconPropName &&
              attr.value?.type === 'JSXExpressionContainer',
          ) as JSXAttribute | undefined;

          if (iconPropExprAttr && iconPropExprAttr.value?.type === 'JSXExpressionContainer') {
            const expression = iconPropExprAttr.value.expression;

            // Handle string literals in expressions
            if (expression.type === 'StringLiteral') {
              const iconName = expression.value;

              if (typeof iconName === 'string' && hasSuffix(iconName)) {
                // Remove the suffix from the icon name
                expression.value = removeIconSuffix(iconName);
                modified = true;

                // Add active prop if it was an Active suffix
                if (hasActiveSuffix(iconName)) {
                  // Check if active prop already exists
                  const existingActiveProp = openingElement.attributes?.find(
                    (attr) =>
                      attr.type === 'JSXAttribute' &&
                      attr.name.type === 'JSXIdentifier' &&
                      attr.name.name === activePropName,
                  );

                  if (!existingActiveProp) {
                    // Add the active prop
                    const activeProp = j.jsxAttribute(j.jsxIdentifier(activePropName));
                    openingElement.attributes = openingElement.attributes || [];
                    openingElement.attributes.push(activeProp);
                  }
                }
              }
            }
            // Handle other complex expressions (member expressions, function calls, etc.)
            else if (
              expression.type === 'MemberExpression' ||
              expression.type === 'CallExpression' ||
              expression.type === 'ConditionalExpression'
            ) {
              // Log for manual migration since we can't determine the value at compile time
              const expressionCode = j(expression).toSource();
              logManualMigration(
                file.path,
                `<${componentName} ${iconPropName}={${expressionCode}} />`,
                `Icon name is a complex expression (${expressionCode}). Please manually check if this expression resolves to icon names with 'Active' or 'Inactive' suffixes and update accordingly. If the expression resolves to names ending with 'Active', remove the suffix and add the '${activePropName}' prop. If ending with 'Inactive', just remove the suffix.`,
              );
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
