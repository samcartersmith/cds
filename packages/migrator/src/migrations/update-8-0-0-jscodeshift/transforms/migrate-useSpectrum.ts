/**
 * Codemod to transform useSpectrum hook to useTheme with activeColorScheme destructuring.
 *
 * Example transformations:
 * Before:
 * ```
 * Case 1:
 * import { useSpectrum } from '@cbhq/cds-common';
 * const spectrum = useSpectrum();
 *
 * Case 2:
 * import { useSpectrum } from '@cbhq/cds-common';
 * export default function useIsDarkMode() {
 *   return useSpectrum() === 'dark';
 * }
 *
 * Case 3:
 * import { useSpectrum } from '@cbhq/cds-common';
 * const Component = () => {
 *   const isDarkMode = useSpectrum() === 'dark';
 *   return <div>{isDarkMode ? 'Dark' : 'Light'}</div>;
 * }
 * ```
 *
 * After:
 * ```
 * Case 1:
 * import { useTheme } from '@cbhq/cds-web/hooks/useTheme';
 * const { activeColorScheme: spectrum } = useTheme();
 * ```
 *
 * Case 2:
 * import { useTheme } from '@cbhq/cds-web/hooks/useTheme';
 * export default function useIsDarkMode() {
 *   const { activeColorScheme } = useTheme();
 *   return activeColorScheme === 'dark';
 * }
 *
 * Case 3:
 * import { useTheme } from '@cbhq/cds-web/hooks/useTheme';
 * const Component = () => {
 *   const { activeColorScheme } = useTheme();
 *   const isDarkMode = activeColorScheme === 'dark';
 *   return <div>{isDarkMode ? 'Dark' : 'Light'}</div>;
 * }
 * ```
 *
 */

import type {
  API,
  ASTPath,
  FileInfo,
  ImportDeclaration,
  ImportSpecifier,
  Options,
  VariableDeclarator,
} from 'jscodeshift';

const CDS_PACKAGES = ['@cbhq/cds-common', '@cbhq/cds-mobile', '@cbhq/cds-web'];
const USE_SPECTRUM_FUNCTION = 'useSpectrum';
const USE_THEME_FUNCTION = 'useTheme';

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let hasChanges = false;

  // Step 1: Check if the file has a CDS import
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
    return file.source;
  }

  // Step 2: Find useSpectrum imports
  const useSpectrumImports: Array<{
    localName: string;
    specifier: ImportSpecifier;
    importPath: ASTPath<ImportDeclaration>;
  }> = [];

  root
    .find(j.ImportDeclaration)
    .filter((path) => {
      const sourceValue = path.node.source.value;
      return (
        typeof sourceValue === 'string' && CDS_PACKAGES.some((pkg) => sourceValue.startsWith(pkg))
      );
    })
    .forEach((importPath) => {
      importPath.node.specifiers?.forEach((specifier) => {
        if (
          specifier.type === 'ImportSpecifier' &&
          specifier.imported.type === 'Identifier' &&
          specifier.imported.name === USE_SPECTRUM_FUNCTION
        ) {
          // Handle the local name properly to ensure it's a string
          let localName: string;
          if (specifier.local && specifier.local.type === 'Identifier') {
            localName = specifier.local.name;
          } else {
            localName = USE_SPECTRUM_FUNCTION;
          }

          useSpectrumImports.push({
            localName,
            specifier,
            importPath,
          });
        }
      });
    });

  if (useSpectrumImports.length === 0) {
    return file.source;
  }

  // Step 3: Find and transform useSpectrum variable declarations
  const transformedVariableNames: string[] = [];

  useSpectrumImports.forEach(({ localName }) => {
    // Find variable declarations that use useSpectrum
    root.find(j.VariableDeclarator).forEach((path: ASTPath<VariableDeclarator>) => {
      const { id, init } = path.node;

      // Check if the initializer is a call to useSpectrum
      if (
        init &&
        init.type === 'CallExpression' &&
        init.callee.type === 'Identifier' &&
        init.callee.name === localName &&
        init.arguments.length === 0
      ) {
        // Get the variable name being assigned
        if (id.type === 'Identifier') {
          const variableName = id.name;

          // Check if we're inside a function/component (React hooks can only be called inside components)
          let isInsideFunction = false;
          let checkPath = path.parent;

          while (checkPath) {
            const checkValue = checkPath.value;

            if (
              checkValue.type === 'FunctionDeclaration' ||
              checkValue.type === 'FunctionExpression' ||
              checkValue.type === 'ArrowFunctionExpression'
            ) {
              isInsideFunction = true;
              break;
            } else if (checkValue.type === 'Program') {
              // We've reached the top level without finding a function
              break;
            }

            checkPath = checkPath.parent;
          }

          // Skip if we're at module level (useTheme can't be called outside components)
          if (!isInsideFunction) {
            return;
          }

          transformedVariableNames.push(variableName);

          // Transform: const spectrum = useSpectrum();
          // To: const { activeColorScheme: spectrum } = useTheme();
          const newId = j.objectPattern([
            j.property('init', j.identifier('activeColorScheme'), j.identifier(variableName)),
          ]);
          newId.typeAnnotation = id.typeAnnotation; // Preserve type annotation if present

          const newInit = j.callExpression(j.identifier(USE_THEME_FUNCTION), []);

          path.node.id = newId;
          path.node.init = newInit;
          hasChanges = true;
        }
      }
    });
  });

  // Step 3.1: Handle Case 3 - useSpectrum() within expressions (e.g., const isDarkMode = useSpectrum() === 'dark';)
  useSpectrumImports.forEach(({ localName }) => {
    root.find(j.VariableDeclarator).forEach((path: ASTPath<VariableDeclarator>) => {
      const { id, init } = path.node;

      // Skip if this is a direct useSpectrum() call (handled in Step 3)
      if (
        init &&
        init.type === 'CallExpression' &&
        init.callee.type === 'Identifier' &&
        init.callee.name === localName
      ) {
        return;
      }

      // Check if the initializer contains a useSpectrum() call
      let containsUseSpectrum = false;
      if (init) {
        j(init)
          .find(j.CallExpression)
          .forEach((callPath) => {
            const { callee, arguments: args } = callPath.value;
            if (callee.type === 'Identifier' && callee.name === localName && args.length === 0) {
              containsUseSpectrum = true;
            }
          });
      }

      if (containsUseSpectrum) {
        // Find the variable declaration that contains this declarator
        let currentPath = path;
        while (currentPath.parent && currentPath.parent.value.type !== 'VariableDeclaration') {
          currentPath = currentPath.parent;
        }

        if (!currentPath.parent) {
          return;
        }

        const varDeclarationPath = currentPath.parent;

        // Check if we're inside a function/component (React hooks can only be called inside components)
        let isInsideFunction = false;
        let checkPath = varDeclarationPath.parent;

        while (checkPath) {
          const checkValue = checkPath.value;

          if (
            checkValue.type === 'FunctionDeclaration' ||
            checkValue.type === 'FunctionExpression' ||
            checkValue.type === 'ArrowFunctionExpression'
          ) {
            isInsideFunction = true;
            break;
          } else if (checkValue.type === 'Program') {
            // We've reached the top level without finding a function
            break;
          }

          checkPath = checkPath.parent;
        }

        // Skip if we're at module level (useTheme can't be called outside components)
        if (!isInsideFunction) {
          return;
        }

        // Create the useTheme statement
        const useThemeStatement = j.variableDeclaration('const', [
          j.variableDeclarator(
            j.objectPattern([
              j.property.from({
                kind: 'init',
                key: j.identifier('activeColorScheme'),
                value: j.identifier('activeColorScheme'),
                shorthand: true,
              }),
            ]),
            j.callExpression(j.identifier(USE_THEME_FUNCTION), []),
          ),
        ]);

        // Insert the useTheme statement before the current variable declaration
        j(varDeclarationPath).insertBefore(useThemeStatement);

        // Replace all useSpectrum() calls in the init expression with activeColorScheme
        if (init) {
          j(init)
            .find(j.CallExpression)
            .forEach((callPath) => {
              const { callee, arguments: args } = callPath.value;
              if (callee.type === 'Identifier' && callee.name === localName && args.length === 0) {
                j(callPath).replaceWith(j.identifier('activeColorScheme'));
              }
            });
        }

        hasChanges = true;
      }
    });
  });

  // Step 3.5: Handle direct useSpectrum() calls in function bodies (Case 2)
  useSpectrumImports.forEach(({ localName }) => {
    // Find all useSpectrum() calls that are NOT in variable declarations
    root.find(j.CallExpression).forEach((callPath) => {
      const { callee, arguments: args } = callPath.value;

      if (callee.type === 'Identifier' && callee.name === localName && args.length === 0) {
        // Skip if this is part of a variable declaration (already handled in Step 3)
        let isInVariableDeclaration = false;
        let parent = callPath.parent;

        while (parent) {
          if (parent.value?.type === 'VariableDeclarator') {
            isInVariableDeclaration = true;
            break;
          }
          parent = parent.parent;
        }

        if (isInVariableDeclaration) {
          return; // Skip, already handled
        }

        // Find the containing function
        let functionPath = null;
        parent = callPath.parent;

        while (parent) {
          if (parent.value?.type === 'FunctionDeclaration') {
            functionPath = parent;
            break;
          } else if (
            parent.value?.type === 'ExportDefaultDeclaration' &&
            parent.value.declaration?.type === 'FunctionDeclaration'
          ) {
            functionPath = parent;
            break;
          }
          parent = parent.parent;
        }

        if (!functionPath) {
          return; // Skip if not in a function
        }

        // Get the function node
        let functionNode = functionPath.value;
        if (functionNode.type === 'ExportDefaultDeclaration') {
          functionNode = functionNode.declaration;
        }

        // Skip if function doesn't have a proper body
        if (!functionNode.body || functionNode.body.type !== 'BlockStatement') {
          return;
        }

        // Check if useTheme destructuring already exists in this function
        let hasUseTheme = false;
        j(functionPath)
          .find(j.VariableDeclarator)
          .forEach((declaratorPath) => {
            const { id, init } = declaratorPath.value;
            if (
              id?.type === 'ObjectPattern' &&
              init?.type === 'CallExpression' &&
              init?.callee?.type === 'Identifier' &&
              init?.callee?.name === USE_THEME_FUNCTION
            ) {
              id.properties?.forEach((prop: any) => {
                if (prop?.key?.name === 'activeColorScheme') {
                  hasUseTheme = true;
                }
              });
            }
          });

        // Add useTheme destructuring if needed
        if (!hasUseTheme) {
          const useThemeStatement = j.variableDeclaration('const', [
            j.variableDeclarator(
              j.objectPattern([
                j.property.from({
                  kind: 'init',
                  key: j.identifier('activeColorScheme'),
                  value: j.identifier('activeColorScheme'),
                  shorthand: true,
                }),
              ]),
              j.callExpression(j.identifier(USE_THEME_FUNCTION), []),
            ),
          ]);

          // Insert at the beginning of the function body
          if (functionNode.body.body.length > 0) {
            functionNode.body.body.unshift(useThemeStatement);
          } else {
            functionNode.body.body.push(useThemeStatement);
          }
        }

        // Replace the useSpectrum() call with activeColorScheme
        j(callPath).replaceWith(j.identifier('activeColorScheme'));
        hasChanges = true;
      }
    });
  });

  if (!hasChanges) {
    return file.source;
  }

  // Step 4: Remove useSpectrum imports and add useTheme import
  const platform = options.platform || 'web'; // Default to 'web' if platform not specified
  const useThemeImportPath = `@cbhq/cds-${platform}/hooks/useTheme`;

  // Check if useTheme is already imported
  let hasUseThemeImport = false;
  root
    .find(j.ImportDeclaration)
    .filter((path) => {
      const sourceValue = path.node.source.value;
      return typeof sourceValue === 'string' && sourceValue === useThemeImportPath;
    })
    .forEach((importPath) => {
      importPath.node.specifiers?.forEach((specifier) => {
        if (
          specifier.type === 'ImportSpecifier' &&
          specifier.imported.type === 'Identifier' &&
          specifier.imported.name === USE_THEME_FUNCTION
        ) {
          hasUseThemeImport = true;
        }
      });
    });

  // Remove useSpectrum imports
  useSpectrumImports.forEach(({ specifier, importPath }) => {
    const specifiers = importPath.node.specifiers;
    if (specifiers) {
      const index = specifiers.indexOf(specifier);
      if (index > -1) {
        specifiers.splice(index, 1);
      }
      // Remove entire import if no specifiers left
      if (specifiers.length === 0) {
        j(importPath).remove();
      }
    }
  });

  // Add useTheme import if it doesn't exist
  if (!hasUseThemeImport) {
    const useThemeImport = j.importDeclaration(
      [j.importSpecifier(j.identifier(USE_THEME_FUNCTION))],
      j.literal(useThemeImportPath),
    );

    // Find the first import declaration to insert the new import after it
    const firstImport = root.find(j.ImportDeclaration).at(0);
    if (firstImport.length > 0) {
      firstImport.insertAfter(useThemeImport);
    } else {
      // If no imports exist, try to add it at the top of the file safely
      const rootNode = root.get().node;
      if (rootNode && rootNode.body && Array.isArray(rootNode.body)) {
        rootNode.body.unshift(useThemeImport);
      } else {
        // Fallback: insert at the beginning of the program
        const firstStatement = root.find(j.Statement).at(0);
        if (firstStatement.length > 0) {
          firstStatement.insertBefore(useThemeImport);
        }
      }
    }
  }

  return root.toSource();
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
