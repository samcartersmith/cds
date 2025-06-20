/**
 * Codemod to migrate paletteValueToCssVar.
 *
 * Example transformations:
 * Before:
 * import { paletteValueToCssVar } from '@cbhq/cds-web/utils/palette';
 *  background-color: ${paletteValueToCssVar('gray10')};
 *  <VStack dangerouslySetBackground={paletteValueToCssVar('blue5')} />
 *  const color = paletteValueToCssVar('gray10');
 *
 * After:
 *  background-color: var(--color-gray10);
 *  <VStack dangerouslySetBackground='var(--color-gray10)' />
 *  const color = 'var(--color-gray10)';
 */
import {
  API,
  ASTPath,
  FileInfo,
  ImportDeclaration,
  ImportSpecifier,
  Options,
  TemplateLiteral,
} from 'jscodeshift';

import { logManualMigration } from '../helpers/manual-migration-logger';

const PALETTE_VALUE_TO_CSS_VAR_FUNCTION = 'paletteValueToCssVar';
const CDS_WEB_PALETTE_IMPORT = '@cbhq/cds-web/utils/palette';

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let hasChanges = false;

  // Step 1: Find paletteValueToCssVar imports
  const paletteValueImports: Array<{
    localName: string;
    specifier: ImportSpecifier;
    importPath: ASTPath<ImportDeclaration>;
  }> = [];

  root
    .find(j.ImportDeclaration)
    .filter((path) => {
      const sourceValue = path.node.source.value;
      return typeof sourceValue === 'string' && sourceValue === CDS_WEB_PALETTE_IMPORT;
    })
    .forEach((importPath) => {
      importPath.node.specifiers?.forEach((specifier) => {
        if (
          specifier.type === 'ImportSpecifier' &&
          specifier.imported.type === 'Identifier' &&
          specifier.imported.name === PALETTE_VALUE_TO_CSS_VAR_FUNCTION
        ) {
          // Handle the local name properly to ensure it's a string
          let localName: string;
          if (specifier.local && specifier.local.type === 'Identifier') {
            localName = specifier.local.name;
          } else {
            localName = PALETTE_VALUE_TO_CSS_VAR_FUNCTION;
          }

          paletteValueImports.push({
            localName,
            specifier,
            importPath,
          });
        }
      });
    });

  if (paletteValueImports.length === 0) {
    return file.source;
  }

  // Step 2: Transform paletteValueToCssVar function calls in template literals
  const problematicUsages: string[] = [];
  const localNames = paletteValueImports.map(({ localName }) => localName);

  // Handle template literals first
  root.find(j.TemplateLiteral).forEach((path: ASTPath<TemplateLiteral>) => {
    const templateLiteral = path.value;
    let templateModified = false;

    // Process each expression in the template literal (in reverse order to avoid index issues)
    for (let index = templateLiteral.expressions.length - 1; index >= 0; index--) {
      const expression = templateLiteral.expressions[index];

      if (expression.type === 'CallExpression') {
        const { callee, arguments: args } = expression;

        // Check if this is a call to our function
        if (callee.type === 'Identifier' && localNames.includes(callee.name) && args.length === 1) {
          const firstArg = args[0];

          // Handle string literal arguments (e.g., paletteValueToCssVar('gray10'))
          if (firstArg.type === 'StringLiteral' || firstArg.type === 'Literal') {
            const colorValue = typeof firstArg.value === 'string' ? firstArg.value : '';
            if (colorValue) {
              const cssVariable = `var(--color-${colorValue})`;

              // Check if this is a simple template literal with just one expression
              if (templateLiteral.expressions.length === 1 && templateLiteral.quasis.length === 2) {
                const firstQuasi = templateLiteral.quasis[0];
                const lastQuasi = templateLiteral.quasis[1];

                // If the template literal is just `${expression}` (empty strings before and after)
                if (firstQuasi.value.raw === '' && lastQuasi.value.raw === '') {
                  // Replace the entire template literal with just the CSS variable string
                  path.replace(j.stringLiteral(cssVariable));
                  hasChanges = true;
                  templateModified = true;
                  return;
                }
              }

              // For complex template literals, manually merge the CSS variable into the quasi parts
              const currentQuasi = templateLiteral.quasis[index];
              const nextQuasi = templateLiteral.quasis[index + 1];

              if (currentQuasi && nextQuasi) {
                // Merge the CSS variable between the current and next quasi
                const newQuasiValue = currentQuasi.value.raw + cssVariable + nextQuasi.value.raw;
                const newQuasiCooked =
                  (currentQuasi.value.cooked || currentQuasi.value.raw) +
                  cssVariable +
                  (nextQuasi.value.cooked || nextQuasi.value.raw);

                // Replace the current quasi with the merged content
                templateLiteral.quasis[index] = j.templateElement(
                  { raw: newQuasiValue, cooked: newQuasiCooked },
                  nextQuasi.tail,
                );

                // Remove the expression and the next quasi
                templateLiteral.expressions.splice(index, 1);
                templateLiteral.quasis.splice(index + 1, 1);
                templateModified = true;
                hasChanges = true;
              }
            } else {
              problematicUsages.push(
                `paletteValueToCssVar with non-string argument: ${j(firstArg).toSource()}`,
              );
            }
          }
          // Handle template literal arguments or other complex cases
          else if (
            firstArg.type === 'TemplateLiteral' ||
            firstArg.type === 'Identifier' ||
            firstArg.type === 'MemberExpression'
          ) {
            problematicUsages.push(
              `paletteValueToCssVar with dynamic argument: ${j(firstArg).toSource()}`,
            );
          }
          // Handle other argument types
          else {
            problematicUsages.push(
              `paletteValueToCssVar with complex argument: ${j(firstArg).toSource()}`,
            );
          }
        }
      }
    }
  });

  // Step 3: Transform paletteValueToCssVar function calls outside template literals
  paletteValueImports.forEach(({ localName }) => {
    // Find all function calls to paletteValueToCssVar that are NOT in template literals
    root.find(j.CallExpression).forEach((path) => {
      const { callee, arguments: args } = path.node;

      // Skip if this call expression is inside a template literal (already handled above)
      let isInTemplateLiteral = false;
      let currentPath = path.parent;
      while (currentPath) {
        if (currentPath.value?.type === 'TemplateLiteral') {
          isInTemplateLiteral = true;
          break;
        }
        currentPath = currentPath.parent;
      }

      if (isInTemplateLiteral) {
        return;
      }

      // Check if this is a call to our function
      if (callee.type === 'Identifier' && callee.name === localName && args.length === 1) {
        const firstArg = args[0];

        // Handle string literal arguments (e.g., paletteValueToCssVar('gray10'))
        if (firstArg.type === 'StringLiteral' || firstArg.type === 'Literal') {
          const colorValue = typeof firstArg.value === 'string' ? firstArg.value : '';
          if (colorValue) {
            const cssVar = `var(--color-${colorValue})`;

            // Replace the entire function call with a string literal containing the CSS variable
            j(path).replaceWith(j.stringLiteral(cssVar));
            hasChanges = true;
          } else {
            problematicUsages.push(
              `paletteValueToCssVar with non-string argument: ${j(firstArg).toSource()}`,
            );
          }
        }
        // Handle template literal arguments or other complex cases
        else if (
          firstArg.type === 'TemplateLiteral' ||
          firstArg.type === 'Identifier' ||
          firstArg.type === 'MemberExpression'
        ) {
          problematicUsages.push(
            `paletteValueToCssVar with dynamic argument: ${j(firstArg).toSource()}`,
          );
        }
        // Handle other argument types
        else {
          problematicUsages.push(
            `paletteValueToCssVar with complex argument: ${j(firstArg).toSource()}`,
          );
        }
      }
    });
  });

  if (!hasChanges && problematicUsages.length === 0) {
    return file.source;
  }

  // Step 4: Clean up imports if no remaining usage
  paletteValueImports.forEach(({ localName, specifier, importPath }) => {
    // Check for any remaining function calls
    const remainingCalls = root.find(j.CallExpression).filter((path) => {
      const { callee } = path.node;
      return callee.type === 'Identifier' && callee.name === localName;
    });

    // Check for any other identifier usage (like passing the function as a reference)
    const remainingIdentifierUsages = root
      .find(j.Identifier, { name: localName })
      .filter((idPath) => {
        const parent = idPath.parentPath?.node;
        // Exclude the import statement itself
        if (parent?.type === 'ImportSpecifier') return false;
        // Exclude function calls (we already checked those above)
        if (parent?.type === 'CallExpression' && idPath.name === 'callee') return false;
        // Count everything else as usage
        return true;
      });

    // Only remove the import if there are NO remaining usages
    if (remainingCalls.length === 0 && remainingIdentifierUsages.length === 0) {
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
    }
  });

  // Step 5: Log problematic usages for manual review
  if (problematicUsages.length > 0) {
    const usagesList = problematicUsages.join(', ');
    logManualMigration(
      file.path,
      usagesList,
      'paletteValueToCssVar calls with dynamic or complex arguments found. These need to be manually converted to CSS variables (var(--color-{value})).',
    );
  }

  return root.toSource();
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
