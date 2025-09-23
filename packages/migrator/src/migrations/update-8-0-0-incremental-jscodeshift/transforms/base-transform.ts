import type { API, FileInfo, Options } from 'jscodeshift';

const cdsPackages = [
  '@cbhq/cds-common',
  '@cbhq/cds-icons',
  '@cbhq/cds-illustrations',
  '@cbhq/cds-mobile-visualization',
  '@cbhq/cds-mobile',
  '@cbhq/cds-web-visualization',
  '@cbhq/cds-web',
  '@cbhq/cds-lottie-files',
  '@cbhq/ui-mobile-playground',
  '@cbhq/cds-utils',
];

/**
 * Helper function to check if a module specifier should be transformed
 */
function shouldTransformModule(moduleSpecifier: string): string | null {
  // Skip if already transformed (contains /v7)
  if (moduleSpecifier.includes('/v7')) {
    return null;
  }

  // Remove trailing slash for matching, but keep it for the transformation
  const normalizedSpecifier = moduleSpecifier.replace(/\/$/, '');
  const matchingPkg = cdsPackages.find((pkg) => normalizedSpecifier.startsWith(pkg));

  return matchingPkg || null;
}

/**
 * Helper function to transform a module specifier
 */
function transformModuleSpecifier(moduleSpecifier: string, matchingPkg: string): string {
  // Handle trailing slash case - remove trailing slash after transformation
  if (moduleSpecifier.endsWith('/')) {
    // For exact package match with trailing slash: @cbhq/cds-icons/ -> @cbhq/cds-icons/v7
    if (moduleSpecifier === matchingPkg + '/') {
      return `${matchingPkg}/v7`;
    }
    // For subpaths with trailing slash: @cbhq/cds-web/layout/ -> @cbhq/cds-web/v7/layout/
    return moduleSpecifier.replace(matchingPkg + '/', `${matchingPkg}/v7/`);
  }

  return moduleSpecifier.replace(matchingPkg, `${matchingPkg}/v7`);
}

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let modified = false;
  const originalSource = file.source as string;
  const replacements: Array<{ start: number; end: number; newText: string }> = [];

  function scheduleLiteralReplacement(literalNode: any, newValue: string) {
    // Babel parser provides start/end offsets for literals
    if (
      literalNode &&
      typeof literalNode.start === 'number' &&
      typeof literalNode.end === 'number'
    ) {
      const start: number = literalNode.start;
      const end: number = literalNode.end;
      const quote = originalSource[start]; // preserve original quote style
      const newText = `${quote}${newValue}${quote}`;
      replacements.push({ start, end, newText });
      modified = true;
    } else {
      // Fallback to AST mutation if positions are unavailable (rare)
      literalNode.value = newValue;
      modified = true;
    }
  }

  // Transform import declarations
  root
    .find(j.ImportDeclaration)
    .filter((path) => {
      if (!path.value.source || typeof path.value.source.value !== 'string') {
        return false;
      }
      const moduleSpecifier = path.value.source.value as string;
      return !!shouldTransformModule(moduleSpecifier);
    })
    .forEach((path) => {
      const currentSpecifier = path.value.source.value as string;
      const matchingPkg = shouldTransformModule(currentSpecifier);
      if (matchingPkg) {
        const newSpecifier = transformModuleSpecifier(currentSpecifier, matchingPkg);
        console.log(`import: ${currentSpecifier} -> ${newSpecifier}`);
        scheduleLiteralReplacement(path.value.source, newSpecifier);
      }
    });

  // Transform re-export declarations (export { ... } from '...' and export * from '...')
  root
    .find(j.ExportNamedDeclaration)
    .filter((path) => {
      // Only handle re-exports that have a source
      if (!path.value.source || typeof path.value.source.value !== 'string') {
        return false;
      }
      const moduleSpecifier = path.value.source.value as string;
      return !!shouldTransformModule(moduleSpecifier);
    })
    .forEach((path) => {
      if (path.value.source) {
        const currentSpecifier = path.value.source.value as string;
        const matchingPkg = shouldTransformModule(currentSpecifier);
        if (matchingPkg) {
          const newSpecifier = transformModuleSpecifier(currentSpecifier, matchingPkg);
          console.log(`named re-export: ${currentSpecifier} -> ${newSpecifier}`);
          scheduleLiteralReplacement(path.value.source, newSpecifier);
        }
      }
    });

  // Transform export-all declarations (export * from '...')
  root
    .find(j.ExportAllDeclaration)
    .filter((path) => {
      if (!path.value.source || typeof path.value.source.value !== 'string') {
        return false;
      }
      const moduleSpecifier = path.value.source.value as string;
      return !!shouldTransformModule(moduleSpecifier);
    })
    .forEach((path) => {
      const currentSpecifier = path.value.source.value as string;
      const matchingPkg = shouldTransformModule(currentSpecifier);
      if (matchingPkg) {
        const newSpecifier = transformModuleSpecifier(currentSpecifier, matchingPkg);
        console.log(`export-all: ${currentSpecifier} -> ${newSpecifier}`);
        scheduleLiteralReplacement(path.value.source, newSpecifier);
      }
    });

  // Transform Jest method calls: jest.mock(), jest.requireActual(), jest.requireMock()
  const jestMethods = ['mock', 'requireActual', 'requireMock'];

  // Transform all require() calls (including those inside jest.mocked())
  root
    .find(j.CallExpression)
    .filter((path) => {
      // Check if this is a require() call
      return path.value.callee.type === 'Identifier' && path.value.callee.name === 'require';
    })
    .forEach((path) => {
      const firstArg = path.value.arguments[0];
      if (
        firstArg &&
        (firstArg.type === 'Literal' || firstArg.type === 'StringLiteral') &&
        typeof firstArg.value === 'string'
      ) {
        const moduleSpecifier = firstArg.value;
        const matchingPkg = shouldTransformModule(moduleSpecifier);
        if (matchingPkg) {
          const newSpecifier = transformModuleSpecifier(moduleSpecifier, matchingPkg);
          console.log(`require(): ${moduleSpecifier} -> ${newSpecifier}`);
          scheduleLiteralReplacement(firstArg, newSpecifier);
        }
      }
    });

  jestMethods.forEach((methodName) => {
    root
      .find(j.CallExpression)
      .filter((path) => {
        // Check if this is a jest.{methodName}() call
        const { callee } = path.value;
        if (
          callee.type === 'MemberExpression' &&
          callee.object.type === 'Identifier' &&
          callee.object.name === 'jest' &&
          callee.property.type === 'Identifier' &&
          callee.property.name === methodName
        ) {
          // Check if the first argument is a string literal with a CDS package
          const firstArg = path.value.arguments[0];
          if (
            firstArg &&
            (firstArg.type === 'Literal' || firstArg.type === 'StringLiteral') &&
            typeof firstArg.value === 'string'
          ) {
            const moduleSpecifier = firstArg.value;
            return !!shouldTransformModule(moduleSpecifier);
          }
        }
        return false;
      })
      .forEach((path) => {
        const firstArg = path.value.arguments[0];
        if (
          firstArg &&
          (firstArg.type === 'Literal' || firstArg.type === 'StringLiteral') &&
          typeof firstArg.value === 'string'
        ) {
          const currentSpecifier = firstArg.value;
          const matchingPkg = shouldTransformModule(currentSpecifier);

          if (matchingPkg) {
            const newSpecifier = transformModuleSpecifier(currentSpecifier, matchingPkg);
            console.log(`jest.${methodName}: ${currentSpecifier} -> ${newSpecifier}`);
            scheduleLiteralReplacement(firstArg, newSpecifier);
          }
        }
      });
  });

  // Transform TypeScript import() types: import('...').Foo and typeof import('...')
  // Example to catch: rootBoxProps?: import ("@cbhq/cds-mobile/layout").BoxProps
  // This targets TSImportType nodes and rewrites their string argument
  // to include the /v7 segment when referencing CDS packages.
  if ((j as any).TSImportType) {
    root
      .find((j as any).TSImportType)
      .filter((path: any) => {
        const arg = path.value.argument;
        return (
          arg &&
          (arg.type === 'Literal' || arg.type === 'StringLiteral') &&
          typeof arg.value === 'string' &&
          !!shouldTransformModule(arg.value)
        );
      })
      .forEach((path: any) => {
        const arg = path.value.argument;
        const currentSpecifier = arg.value as string;
        const matchingPkg = shouldTransformModule(currentSpecifier);
        if (matchingPkg) {
          const newSpecifier = transformModuleSpecifier(currentSpecifier, matchingPkg);
          console.log(`ts import(): ${currentSpecifier} -> ${newSpecifier}`);
          scheduleLiteralReplacement(arg, newSpecifier);
        }
      });
  }

  if (!modified) {
    return file.source;
  }

  // Apply replacements from end to start to avoid offset shifts
  let result = originalSource;
  replacements
    .sort((a, b) => b.start - a.start)
    .forEach(({ start, end, newText }) => {
      result = result.slice(0, start) + newText + result.slice(end);
    });
  return result;
}
