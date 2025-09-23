/**
 * Codemod to migrate web import paths that have changed in v8.
 *
 * Example transformations:
 * Before:
 * import { useLineHeightMap } from '@cbhq/cds-mobile/typography';
 * const lineHeightMap = useLineHeightMap();
 * const lineHeightBody = lineHeightMap.body;
 * const { headline } = useLineHeightMap();
 *
 * After:
 * import { useTheme } from '@cbhq/cds-mobile/hooks/useTheme';
 * const theme = useTheme();
 * const lineHeightBody = theme.lineHeight.body;
 * const headline = theme.lineHeight.headline;
 */
import type { API, ASTPath, FileInfo, ImportDeclaration, Options } from 'jscodeshift';

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let modified = false;

  // Check if there's an import for useLineHeightMap from @cbhq/cds-mobile
  const useLineHeightMapImport = root
    .find(j.ImportDeclaration)
    .filter((path: ASTPath<ImportDeclaration>) => {
      const source = path.value.source.value;
      return typeof source === 'string' && source.startsWith('@cbhq/cds-mobile');
    })
    .find(j.ImportSpecifier)
    .filter((path) => {
      return (
        path.value.imported.type === 'Identifier' && path.value.imported.name === 'useLineHeightMap'
      );
    });

  if (useLineHeightMapImport.length === 0) {
    // If no useLineHeightMap import is found, return the original source unchanged
    return file.source;
  }

  // Check if useTheme is already imported from any @cbhq/cds-mobile path
  const existingUseThemeImport = root
    .find(j.ImportDeclaration)
    .filter((path: ASTPath<ImportDeclaration>) => {
      const source = path.value.source.value;
      return (
        typeof source === 'string' &&
        (source.startsWith('@cbhq/cds-mobile') || source === '@cbhq/cds-mobile/hooks/useTheme')
      );
    })
    .find(j.ImportSpecifier)
    .filter((path) => {
      return path.value.imported.type === 'Identifier' && path.value.imported.name === 'useTheme';
    });

  // Also check for default imports or namespace imports that might include useTheme
  const hasUseThemeImport = existingUseThemeImport.length > 0;

  // 1. Handle import transformations
  if (hasUseThemeImport) {
    // useTheme already exists, just remove useLineHeightMap
    useLineHeightMapImport.remove();
    modified = true;
  } else {
    // Check if there's an existing import from @cbhq/cds-mobile/hooks/useTheme
    const existingHooksImport = root
      .find(j.ImportDeclaration)
      .filter((path: ASTPath<ImportDeclaration>) => {
        const source = path.value.source.value;
        return typeof source === 'string' && source === '@cbhq/cds-mobile/hooks/useTheme';
      });

    if (existingHooksImport.length > 0) {
      // There's already an import from the hooks path, add useTheme to it
      existingHooksImport.forEach((path) => {
        const specifiers = path.value.specifiers || [];
        const hasUseTheme = specifiers.some(
          (spec) =>
            spec.type === 'ImportSpecifier' &&
            spec.imported.type === 'Identifier' &&
            spec.imported.name === 'useTheme',
        );

        if (!hasUseTheme) {
          specifiers.push(j.importSpecifier(j.identifier('useTheme')));
          path.value.specifiers = specifiers;
          modified = true;
        }
      });

      // Remove the useLineHeightMap import
      useLineHeightMapImport.remove();
      modified = true;
    } else {
      // No existing hooks import, need to handle the import transformation properly
      useLineHeightMapImport.forEach((path) => {
        // Find the ImportDeclaration that contains this ImportSpecifier
        let importDeclaration: ImportDeclaration | null = null;
        let currentPath = path;

        // Navigate up the AST to find the ImportDeclaration
        while (currentPath && currentPath.parent) {
          if (currentPath.parent.value && currentPath.parent.value.type === 'ImportDeclaration') {
            importDeclaration = currentPath.parent.value as ImportDeclaration;
            break;
          }
          currentPath = currentPath.parent;
        }

        if (!importDeclaration) {
          console.warn('Could not find ImportDeclaration for useLineHeightMap');
          return;
        }

        const specifiers = importDeclaration.specifiers || [];

        // If this is the only import in the declaration, replace the whole import
        if (specifiers.length === 1) {
          // Update the import specifier
          if (path.value.imported && path.value.imported.type === 'Identifier') {
            path.value.imported.name = 'useTheme';
          }
          if (path.value.local && path.value.local.type === 'Identifier') {
            path.value.local.name = 'useTheme';
          }

          // Update the import path
          if (importDeclaration.source) {
            importDeclaration.source.value = '@cbhq/cds-mobile/hooks/useTheme';
          }
        } else {
          // Multiple imports - remove useLineHeightMap and add separate useTheme import

          // Remove useLineHeightMap from the current import
          const filteredSpecifiers = specifiers.filter((spec) => {
            return !(
              spec.type === 'ImportSpecifier' &&
              spec.imported.type === 'Identifier' &&
              spec.imported.name === 'useLineHeightMap'
            );
          });
          importDeclaration.specifiers = filteredSpecifiers;

          // Add new import for useTheme
          const newUseThemeImport = j.importDeclaration(
            [j.importSpecifier(j.identifier('useTheme'))],
            j.literal('@cbhq/cds-mobile/hooks/useTheme'),
          );

          // Insert the new import after the current import declaration
          root.find(j.ImportDeclaration).forEach((importPath) => {
            if (importPath.value === importDeclaration) {
              j(importPath).insertAfter(newUseThemeImport);
            }
          });
        }

        modified = true;
      });
    }
  }

  // 2. Find and replace useLineHeightMap() calls
  root.find(j.CallExpression).forEach((path) => {
    if (path.value.callee.type === 'Identifier' && path.value.callee.name === 'useLineHeightMap') {
      path.value.callee.name = 'useTheme';
      modified = true;
    }
  });

  // 3. Handle variable declarations and destructuring
  root.find(j.VariableDeclarator).forEach((path) => {
    if (
      path.value.init &&
      path.value.init.type === 'CallExpression' &&
      path.value.init.callee &&
      path.value.init.callee.type === 'Identifier' &&
      path.value.init.callee.name === 'useTheme'
    ) {
      // Handle destructuring: const { headline } = useLineHeightMap(); -> const headline = theme.lineHeight.headline;
      if (path.value.id && path.value.id.type === 'ObjectPattern') {
        const properties = path.value.id.properties;

        if (properties && Array.isArray(properties)) {
          properties.forEach((prop) => {
            if (
              prop.type === 'ObjectProperty' &&
              prop.key.type === 'Identifier' &&
              prop.value.type === 'Identifier'
            ) {
              // Create new variable declaration for each destructured property
              const newDeclaration = j.variableDeclaration('const', [
                j.variableDeclarator(
                  j.identifier(prop.value.name),
                  j.memberExpression(
                    j.memberExpression(j.identifier('theme'), j.identifier('lineHeight')),
                    j.identifier(prop.key.name),
                  ),
                ),
              ]);

              // Insert the new declaration after the theme declaration
              let parent = path.parent;
              while (parent && parent.value && parent.value.type !== 'VariableDeclaration') {
                parent = parent.parent;
              }
              if (parent && parent.value && parent.value.type === 'VariableDeclaration') {
                j(parent).insertAfter(newDeclaration);
              }
            }
          });
        }

        // Change the original declaration to: const theme = useTheme();
        path.value.id = j.identifier('theme');
        modified = true;
      }
      // Handle simple assignment: const lineHeightMap = useLineHeightMap(); -> const theme = useTheme();
      else if (
        path.value.id &&
        path.value.id.type === 'Identifier' &&
        path.value.id.name !== 'theme'
      ) {
        const oldVariableName = path.value.id.name;
        path.value.id.name = 'theme';

        // Update all member expressions that use the old variable name
        root.find(j.MemberExpression).forEach((memberPath) => {
          if (
            memberPath.value.object.type === 'Identifier' &&
            memberPath.value.object.name === oldVariableName
          ) {
            // Change lineHeightMap.property to theme.lineHeight.property
            if (memberPath.value.property.type === 'Identifier') {
              const propertyName = memberPath.value.property.name;

              // Replace the entire member expression with theme.lineHeight.property
              const newMemberExpression = j.memberExpression(
                j.memberExpression(j.identifier('theme'), j.identifier('lineHeight')),
                j.identifier(propertyName),
              );

              // Replace the current member expression
              j(memberPath).replaceWith(newMemberExpression);
            }
          }
        });

        modified = true;
      }
    }
  });

  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
