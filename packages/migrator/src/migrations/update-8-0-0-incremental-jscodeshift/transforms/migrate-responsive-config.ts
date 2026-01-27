/**
 * Codemod to migrate responsiveConfig props to the new format. This migration should follow up with the migrations of prop name and value changes.
 *
 * Example transformations:
 * Before:
 * ```
 * const exampleResponsiveConfig = {
 *   desktop: { spacing: 2, gap: 2 },
 *   tablet: { spacing: 3, gap: 3 },
 *   phone: { spacing: 4, gap: 4 },
 * }
 * <Box responsiveConfig={exampleResponsiveConfig}>Content</Box>
 * <TabelCell responsiveConfig={{
 *   desktop: { innerSpacing: { spacingHorizontal: 2 } },
 *   tablet: { innerSpacing: { spacingHorizontal: 3 } },
 *   phone: { innerSpacing: { spacingHorizontal: 4 } },
 * }}>Content</TabelCell>
 * <Box responsiveConfig={{
 *   desktop: { spacing: 2, gap: 2 },
 *   tablet: { spacing: 3, gap: 3 },
 *   phone: { spacing: 4, gap: 4 },
 * }}>Content</Box>
 * <Box gap={1} responsiveConfig={{
 *   phone: { spacing: 1, gap: 4 },
 * }}>Content</Box>
 * ```
 *
 * After:
 * ```
 * <Box spacing={{
 *   desktop: 2,
 *   tablet: 3,
 *   phone: 4,
 * }} gap={{
 *   desktop: 2,
 *   tablet: 3,
 *   phone: 4,
 * }}>Content</Box>
 * <TabelCell innerSpacing={{
 *   paddingX:{
 *     desktop: 2,
 *     tablet: 3,
 *     phone: 4,
 *   }
 * }}>Content</TabelCell>
 * <Box spacing={{
 *   desktop: 2,
 *   tablet: 3,
 *   phone: 4,
 * }} gap={{
 *   desktop: 2,
 *   tablet: 3,
 *   phone: 4,
 * }}>Content</Box>
 * <Box spacing={{ phone: 1 }} gap={{
 *   base: 1,
 *   phone: 4,
 * }}>Content</Box>
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

import { DEFAULT_PRINT_OPTIONS } from '../constants';
import { getCustomPackages } from '../helpers/get-custom-packages';
import { logManualMigration } from '../helpers/manual-migration-logger';

const CDS_PACKAGES = ['@cbhq/cds-web', '@cbhq/cds-mobile'];

const innerSpacingPropMapping = {
  spacing: 'padding',
  spacingStart: 'paddingStart',
  spacingEnd: 'paddingEnd',
  spacingTop: 'paddingTop',
  spacingBottom: 'paddingBottom',
  spacingHorizontal: 'paddingX',
  spacingVertical: 'paddingY',
  offset: 'margin',
  offsetTop: 'marginTop',
  offsetBottom: 'marginBottom',
  offsetStart: 'marginStart',
  offsetEnd: 'marginEnd',
  offsetHorizontal: 'marginX',
  offsetVertical: 'marginY',
} as const;

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const printOptions = options.printOptions || DEFAULT_PRINT_OPTIONS;
  const root = j(file.source);

  // Get target component from options
  const targetComponent = options.component as string | undefined;

  const customPackages = getCustomPackages(options);
  const PACKAGE_PATHS = [...CDS_PACKAGES, ...customPackages];

  const hasCDSImport = root
    .find(j.ImportDeclaration)
    .some(
      (path: ASTPath<ImportDeclaration>) =>
        path.value.source &&
        typeof path.value.source.value === 'string' &&
        PACKAGE_PATHS.some((pkg) => (path.value.source.value as string).startsWith(pkg)),
    );

  if (!hasCDSImport) {
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
          const localName = spec.local ? spec.local.name : (spec.imported as any).name;

          // Filter by target component if specified, otherwise include all components
          const shouldInclude = targetComponent ? localName === targetComponent : true;

          if (shouldInclude) {
            importedComponentNames.add(localName);
          }
        } else if (spec.type === 'ImportDefaultSpecifier' && spec.local) {
          const localName = (spec.local as any).name;

          // Filter by target component if specified, otherwise include all components
          const shouldInclude = targetComponent ? localName === targetComponent : true;

          if (shouldInclude) {
            importedComponentNames.add(localName);
          }
        } else if (spec.type === 'ImportNamespaceSpecifier' && spec.local) {
          // Namespace imports: e.g. import * as CDS from ...
          componentNamespaceNames.add((spec.local as any).name);
        }
      });
    });

  // If target component is specified but not found in imports, skip transformation
  if (targetComponent && importedComponentNames.size === 0) {
    return file.source;
  }

  // 2. Find variables assigned to imported CDS components
  const variableComponentNames = new Set<string>();
  const variableDeclarations = new Map<string, any>();

  // Find all variable declarations that might contain responsive config objects
  root.find(j.VariableDeclarator).forEach((path: ASTPath<VariableDeclarator>) => {
    const varName = path.node.id.type === 'Identifier' ? path.node.id.name : null;
    if (varName && path.node.init) {
      // Check for CDS component assignments
      let isRelevantComponent = false;
      const init = path.node.init;

      // Check direct assignment: const Title = TextTitle2;
      if (init.type === 'Identifier' && importedComponentNames.has(init.name)) {
        isRelevantComponent = true;
      }
      // Check ternary assignment: const Title = cond ? TextTitle2 : TextDisplay1;
      else if (init.type === 'ConditionalExpression') {
        const { consequent, alternate } = init;
        if (
          (consequent.type === 'Identifier' && importedComponentNames.has(consequent.name)) ||
          (alternate.type === 'Identifier' && importedComponentNames.has(alternate.name))
        ) {
          isRelevantComponent = true;
        }
      }

      if (isRelevantComponent) {
        variableComponentNames.add(varName);
      }

      // Check for responsive config objects and functions
      if (path.node.init.type === 'ObjectExpression') {
        variableDeclarations.set(varName, path.node.init);
      } else if (
        path.node.init.type === 'FunctionExpression' ||
        path.node.init.type === 'ArrowFunctionExpression'
      ) {
        // Function expressions and arrow functions need manual migration
        variableDeclarations.set(varName, path.node.init);
      } else if (path.node.init.type === 'CallExpression') {
        // Store ALL CallExpressions - we'll check if they're functions later
        variableDeclarations.set(varName, path.node.init);
      }
    }
  });

  // Combine imported names, namespace names, and variable names into relevant tag names
  const relevantTagNames = new Set([...importedComponentNames, ...variableComponentNames]);

  // Find all JSX elements with responsiveConfig props, whose tag matches a relevant name or namespace
  const elements = root.find(j.JSXElement).filter((path: ASTPath<JSXElement>) => {
    const openingElement = path.node.openingElement;
    let isRelevantComponent = false;
    let currentComponentName: string | undefined;

    if (openingElement.name.type === 'JSXIdentifier') {
      currentComponentName = openingElement.name.name;
      // <Box ...> or <Title ...>
      isRelevantComponent = relevantTagNames.has(currentComponentName);
    } else if (openingElement.name.type === 'JSXMemberExpression') {
      // <CDS.Box ...>
      const object = openingElement.name.object;
      if (object.type === 'JSXIdentifier') {
        isRelevantComponent = componentNamespaceNames.has(object.name);
      }
    }

    // If a target component is specified, only transform that component
    if (targetComponent) {
      if (!currentComponentName || currentComponentName !== targetComponent) {
        return false;
      }
      // If we have a target component, we consider it relevant regardless of import status
      isRelevantComponent = true;
    }

    // Check if this element has responsiveConfig prop
    const attributes = openingElement.attributes || [];
    const hasResponsiveConfig = attributes.some((attr: any) => {
      if (attr.type !== 'JSXAttribute' || attr.name.type !== 'JSXIdentifier') {
        return false;
      }
      return attr.name.name === 'responsiveConfig';
    });

    // Include elements that are CDS components AND have responsiveConfig prop
    return isRelevantComponent && hasResponsiveConfig;
  });

  if (elements.length === 0) {
    return file.source;
  }

  // Track variables that are referenced by responsiveConfig
  const responsiveConfigVariables = new Set<string>();

  elements.forEach((path) => {
    const attributes = path.node.openingElement.attributes || [];

    attributes.forEach((attr: any) => {
      if (attr.type !== 'JSXAttribute' || attr.name.type !== 'JSXIdentifier') {
        return;
      }

      // Handle responsiveConfig prop transformations
      if (attr.name.name === 'responsiveConfig') {
        let expression: any = null;
        let variableName: string | null = null;

        if (attr.value.type === 'JSXExpressionContainer') {
          if (attr.value.expression.type === 'ObjectExpression') {
            // Direct object: responsiveConfig={{...}}
            expression = attr.value.expression;
          } else if (attr.value.expression.type === 'Identifier') {
            // Variable reference: responsiveConfig={exampleResponsiveConfig}
            variableName = attr.value.expression.name;
            if (variableName) {
              const variableInit = variableDeclarations.get(variableName);

              if (variableInit) {
                // Check if it's a function that needs manual migration
                if (
                  variableInit.type === 'FunctionExpression' ||
                  variableInit.type === 'ArrowFunctionExpression' ||
                  variableInit.type === 'CallExpression'
                ) {
                  // For CallExpression, get more specific information about the function
                  let functionInfo = variableName;
                  if (
                    variableInit.type === 'CallExpression' &&
                    variableInit.callee.type === 'Identifier'
                  ) {
                    functionInfo = `${variableName} (${variableInit.callee.name} call)`;
                  }

                  logManualMigration(
                    file.path,
                    functionInfo,
                    `responsiveConfig variable '${variableName}' contains a function and cannot be automatically migrated`,
                  );
                  return; // Skip transformation for this attribute
                }

                responsiveConfigVariables.add(variableName);
                expression = variableInit;
              }
            }
          }
        }

        if (expression && expression.type === 'ObjectExpression') {
          // Extract properties from responsiveConfig
          const extractedProps = new Map<string, any>();

          expression.properties.forEach((prop: any) => {
            if (prop.type === 'ObjectProperty' && prop.key.type === 'Identifier') {
              const breakpoint = prop.key.name; // desktop, tablet, phone

              if (prop.value.type === 'ObjectExpression') {
                prop.value.properties.forEach((innerProp: any) => {
                  if (innerProp.type === 'ObjectProperty' && innerProp.key.type === 'Identifier') {
                    const propName = innerProp.key.name; // spacing, gap, innerSpacing

                    if (!extractedProps.has(propName)) {
                      extractedProps.set(propName, {});
                    }

                    const propValue = extractedProps.get(propName);

                    // Handle nested properties like innerSpacing: { spacingHorizontal: 2 }
                    if (innerProp.value.type === 'ObjectExpression') {
                      innerProp.value.properties.forEach((nestedProp: any) => {
                        if (
                          nestedProp.type === 'ObjectProperty' &&
                          nestedProp.key.type === 'Identifier'
                        ) {
                          const nestedPropName = nestedProp.key.name;

                          // Map innerSpacing property names to new names
                          const mappedNestedPropName =
                            propName === 'innerSpacing'
                              ? innerSpacingPropMapping[
                                  nestedPropName as keyof typeof innerSpacingPropMapping
                                ] || nestedPropName
                              : nestedPropName;

                          if (!propValue[mappedNestedPropName]) {
                            propValue[mappedNestedPropName] = {};
                          }

                          propValue[mappedNestedPropName][breakpoint] = nestedProp.value;
                        }
                      });
                    } else {
                      // Direct value like spacing: 2
                      propValue[breakpoint] = innerProp.value;
                    }
                  }
                });
              }
            }
          });

          // Check for existing attributes that match extracted property names
          const existingAttributes = new Map<string, any>();
          const attributesToRemove: any[] = [];

          attributes.forEach((existingAttr: any) => {
            if (
              existingAttr.type === 'JSXAttribute' &&
              existingAttr.name.type === 'JSXIdentifier'
            ) {
              const attrName = existingAttr.name.name;
              if (extractedProps.has(attrName)) {
                // Store the existing value to use as base
                if (existingAttr.value.type === 'JSXExpressionContainer') {
                  existingAttributes.set(attrName, existingAttr.value.expression);
                } else if (existingAttr.value.type === 'StringLiteral') {
                  existingAttributes.set(attrName, existingAttr.value);
                }
                attributesToRemove.push(existingAttr);
              }
            }
          });

          // Create new JSX attributes for each extracted property
          const newAttributes: any[] = [];

          extractedProps.forEach((propValue, propName) => {
            if (Object.keys(propValue).length > 0) {
              // Check if this is a nested property (like innerSpacing)
              const hasNestedProps = Object.values(propValue).some(
                (val) => typeof val === 'object' && val !== null && !(val as any).type,
              );

              let objectExpression;
              if (hasNestedProps) {
                // Create nested object structure
                const nestedProperties: any[] = [];
                Object.entries(propValue).forEach(
                  ([nestedKey, breakpointValues]: [string, any]) => {
                    const breakpointProperties: any[] = [];

                    // Add base value if it exists
                    if (existingAttributes.has(propName)) {
                      const baseValue = existingAttributes.get(propName);
                      if (baseValue.type === 'ObjectExpression') {
                        // Find matching nested property in base value
                        const matchingBaseProp = baseValue.properties.find(
                          (prop: any) =>
                            prop.type === 'ObjectProperty' &&
                            prop.key.type === 'Identifier' &&
                            prop.key.name === nestedKey,
                        );
                        if (matchingBaseProp) {
                          breakpointProperties.push(
                            j.property('init', j.identifier('base'), matchingBaseProp.value),
                          );
                        }
                      }
                    }

                    Object.entries(breakpointValues).forEach(
                      ([breakpoint, value]: [string, any]) => {
                        breakpointProperties.push(
                          j.property('init', j.identifier(breakpoint), value),
                        );
                      },
                    );
                    nestedProperties.push(
                      j.property(
                        'init',
                        j.identifier(nestedKey),
                        j.objectExpression(breakpointProperties),
                      ),
                    );
                  },
                );
                objectExpression = j.objectExpression(nestedProperties);
              } else {
                // Create flat object structure
                const properties: any[] = [];

                // Add base value if it exists
                if (existingAttributes.has(propName)) {
                  const baseValue = existingAttributes.get(propName);
                  properties.push(j.property('init', j.identifier('base'), baseValue));
                }

                Object.entries(propValue).forEach(([breakpoint, value]: [string, any]) => {
                  properties.push(j.property('init', j.identifier(breakpoint), value));
                });
                objectExpression = j.objectExpression(properties);
              }

              const newAttr = j.jsxAttribute(
                j.jsxIdentifier(propName),
                j.jsxExpressionContainer(objectExpression),
              );
              newAttributes.push(newAttr);
            }
          });

          // Remove existing attributes that are being replaced
          attributesToRemove.forEach((attrToRemove) => {
            const removeIndex = attributes.indexOf(attrToRemove);
            if (removeIndex !== -1) {
              attributes.splice(removeIndex, 1);
            }
          });

          // Remove the responsiveConfig attribute and add new attributes
          const attrIndex = attributes.indexOf(attr);
          if (attrIndex !== -1) {
            attributes.splice(attrIndex, 1, ...newAttributes);
          }
        }
      }
    });
  });

  // Remove unused responsiveConfig variables
  let removedAnyVariables = false;

  responsiveConfigVariables.forEach((varName) => {
    // Check if the variable is referenced anywhere else in the file
    const otherReferences = root.find(j.Identifier, { name: varName }).filter((path) => {
      // Exclude the variable declaration itself
      return !(
        path.parent.value.type === 'VariableDeclarator' && path.parent.value.id === path.value
      );
    });

    // If no other references exist, remove the variable declaration
    if (otherReferences.length === 0) {
      root.find(j.VariableDeclarator).forEach((path) => {
        if (path.node.id.type === 'Identifier' && path.node.id.name === varName) {
          // Remove the entire variable declaration statement
          const parent = path.parent;
          if (
            parent.value.type === 'VariableDeclaration' &&
            parent.value.declarations.length === 1
          ) {
            j(parent).remove();
            removedAnyVariables = true;
          } else if (
            parent.value.type === 'VariableDeclaration' &&
            parent.value.declarations.length > 1
          ) {
            // Remove just this declarator from a multi-declaration statement
            const index = parent.value.declarations.indexOf(path.node);
            if (index !== -1) {
              parent.value.declarations.splice(index, 1);
              removedAnyVariables = true;
            }
          }
        }
      });
    }
  });

  // Remove unused imports only if we removed variables
  if (removedAnyVariables) {
    const usedImports = new Set<string>();

    // Collect all identifiers that are actually used in the code
    root.find(j.Identifier).forEach((path) => {
      // Skip import declarations themselves
      if (
        path.parent.value.type !== 'ImportSpecifier' &&
        path.parent.value.type !== 'ImportDefaultSpecifier' &&
        path.parent.value.type !== 'ImportNamespaceSpecifier'
      ) {
        usedImports.add(path.value.name);
      }
    });

    // Remove unused import specifiers
    root.find(j.ImportDeclaration).forEach((path) => {
      if (!path.node.specifiers) return;

      const unusedSpecifiers: any[] = [];

      path.node.specifiers.forEach((spec) => {
        let importName: string | null = null;

        if (spec.type === 'ImportSpecifier' && spec.local) {
          importName = (spec.local as any).name;
        } else if (spec.type === 'ImportDefaultSpecifier' && spec.local) {
          importName = (spec.local as any).name;
        } else if (spec.type === 'ImportNamespaceSpecifier' && spec.local) {
          importName = (spec.local as any).name;
        }

        if (importName && !usedImports.has(importName)) {
          unusedSpecifiers.push(spec);
        }
      });

      // Remove unused specifiers
      unusedSpecifiers.forEach((unusedSpec) => {
        const index = path.node.specifiers!.indexOf(unusedSpec);
        if (index !== -1) {
          path.node.specifiers!.splice(index, 1);
        }
      });

      // If no specifiers remain, remove the entire import statement
      if (path.node.specifiers.length === 0) {
        j(path).remove();
      }
    });
  }

  return root.toSource(printOptions);
}
