import type {
  API,
  ASTPath,
  CallExpression,
  FileInfo,
  Options,
  VariableDeclarator,
} from 'jscodeshift';

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let hasChanges = false;

  const UAF_MOBILE_IMPORT_SOURCE = '@cbhq/cds-mobile/color/useAccessibleForeground';
  const UAF_WEB_IMPORT_SOURCE = '@cbhq/cds-web/color/useAccessibleForeground';
  const GET_ACCESSIBLE_COLOR_SOURCE = '@cbhq/cds-common/utils/getAccessibleColor';
  const GET_ACCESSIBLE_COLOR_FN = 'getAccessibleColor';
  const USE_ACCESSIBLE_FOREGROUND_FN = 'useAccessibleForeground';

  // Find all local names of useAccessibleForeground from both mobile and web
  const imports: { localName: string; source: string }[] = [];
  let needsGetAccessibleColorImport = false;

  // Check mobile import
  root
    .find(j.ImportDeclaration, {
      source: { value: UAF_MOBILE_IMPORT_SOURCE },
    })
    .forEach((path) => {
      path.node.specifiers?.forEach((specifier) => {
        if (
          specifier.type === 'ImportSpecifier' &&
          specifier.imported.name === USE_ACCESSIBLE_FOREGROUND_FN
        ) {
          const localName =
            specifier.local && specifier.local.type === 'Identifier'
              ? specifier.local.name
              : USE_ACCESSIBLE_FOREGROUND_FN;
          imports.push({ localName, source: UAF_MOBILE_IMPORT_SOURCE });
        }
      });
    });

  // Check web import
  root
    .find(j.ImportDeclaration, {
      source: { value: UAF_WEB_IMPORT_SOURCE },
    })
    .forEach((path) => {
      path.node.specifiers?.forEach((specifier) => {
        if (
          specifier.type === 'ImportSpecifier' &&
          specifier.imported.name === USE_ACCESSIBLE_FOREGROUND_FN
        ) {
          const localName =
            specifier.local && specifier.local.type === 'Identifier'
              ? specifier.local.name
              : USE_ACCESSIBLE_FOREGROUND_FN;
          imports.push({ localName, source: UAF_WEB_IMPORT_SOURCE });
        }
      });
    });

  if (imports.length === 0) {
    return file.source;
  }

  // Process each import
  imports.forEach(({ localName, source }) => {
    // Case 1: Handle `const fn = useAccessibleForeground();` (function pattern)
    root
      .find(j.VariableDeclarator, {
        init: {
          type: 'CallExpression',
          callee: { name: localName },
          arguments: (args: any[]) => args.length === 0,
        },
      })
      .forEach((declaratorPath: ASTPath<VariableDeclarator>) => {
        const declaratorNode = declaratorPath.node;
        if (declaratorNode.id.type === 'Identifier') {
          const functionName = declaratorNode.id.name;

          // Find all calls to this function and process them
          root
            .find(j.CallExpression, {
              callee: { name: functionName },
            })
            .forEach((callPath) => {
              const arg = callPath.node.arguments[0];
              if (arg && arg.type === 'ObjectExpression') {
                processCall(callPath, arg);
              }
            });

          // Remove the original variable declarator
          j(declaratorPath).remove();
          hasChanges = true;
        }
      });

    // Case 2: Handle direct calls `useAccessibleForeground({...})`
    root
      .find(j.CallExpression, { callee: { name: localName } })
      .forEach((callPath: ASTPath<CallExpression>) => {
        const callNode = callPath.node;
        if (callNode.arguments.length === 1 && callNode.arguments[0].type === 'ObjectExpression') {
          const arg = callNode.arguments[0];
          processCall(callPath, arg);
          hasChanges = true;
        }
      });
  });

  // Helper function to process a single call
  function processCall(callPath: any, arg: any) {
    // Find the color property
    const colorProp = arg.properties.find(
      (prop: any) =>
        (prop.type === 'Property' || prop.type === 'ObjectProperty') &&
        prop.key.type === 'Identifier' &&
        prop.key.name === 'color',
    );

    if (!colorProp) {
      return; // No color property, leave unchanged
    }

    // Check if color is literally 'auto' (handle both Literal and StringLiteral for TS parser)
    if (
      (colorProp.value.type === 'Literal' || colorProp.value.type === 'StringLiteral') &&
      colorProp.value.value === 'auto'
    ) {
      // Transform to getAccessibleColor({ foreground: 'auto', ... })
      callPath.node.callee = j.identifier(GET_ACCESSIBLE_COLOR_FN);
      colorProp.key.name = 'foreground';
      needsGetAccessibleColorImport = true;
    } else {
      // Replace entire call with just the color value
      callPath.replace(colorProp.value);
    }
  }

  if (hasChanges) {
    // Remove old imports from all sources
    [UAF_MOBILE_IMPORT_SOURCE, UAF_WEB_IMPORT_SOURCE].forEach((source) => {
      root.find(j.ImportDeclaration, { source: { value: source } }).forEach((path) => {
        path.node.specifiers = path.node.specifiers?.filter((spec) => {
          if (
            spec.type === 'ImportSpecifier' &&
            spec.imported.name === USE_ACCESSIBLE_FOREGROUND_FN
          ) {
            return false;
          }
          return true;
        });
        if (path.node.specifiers?.length === 0) {
          j(path).remove();
        }
      });
    });

    // Add new import for getAccessibleColor if needed
    if (needsGetAccessibleColorImport) {
      const existingNewImport = root.find(j.ImportDeclaration, {
        source: { value: GET_ACCESSIBLE_COLOR_SOURCE },
      });

      if (existingNewImport.length === 0) {
        const newImport = j.importDeclaration(
          [j.importSpecifier(j.identifier(GET_ACCESSIBLE_COLOR_FN))],
          j.literal(GET_ACCESSIBLE_COLOR_SOURCE),
        );

        const lastImport = root.find(j.ImportDeclaration).at(-1);
        if (lastImport.length > 0) {
          lastImport.insertAfter(newImport);
        } else {
          const program = root.find(j.Program).at(0);
          if (program.length > 0 && program.get().node.body) {
            program.get().node.body.unshift(newImport);
          }
        }
      }
    }
  }

  return root.toSource();
}
