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
 *  background-color: rgb(var(--gray10));
 *  <VStack dangerouslySetBackground='rgb(var(--gray10))' />
 *  const color = 'rgb(var(--gray10))';
 */
import type {
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
const CDS_WEB_PALETTE_IMPORT = '@cbhq/cds-web/v7/utils/palette';

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let hasChanges = false;

  // Check if file has any @cbhq/cds-web imports
  const hasWebImports = root.find(j.ImportDeclaration).some((path) => {
    const sourceValue = path.node.source.value;
    return typeof sourceValue === 'string' && sourceValue.includes('@cbhq/cds-web');
  });

  if (!hasWebImports) {
    return file.source; // Skip file if no web imports found
  }

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

  const problematicUsages: string[] = [];
  const localNames = paletteValueImports.map(({ localName }) => localName);

  // --- Pass 1: Replace ALL paletteValueToCssVar calls with string literals ---
  root.find(j.CallExpression).forEach((path) => {
    const { callee, arguments: args } = path.node;

    if (callee.type === 'Identifier' && localNames.includes(callee.name) && args.length === 1) {
      const firstArg = args[0];

      if (firstArg.type === 'StringLiteral' || firstArg.type === 'Literal') {
        const colorValue = typeof firstArg.value === 'string' ? firstArg.value : '';
        if (colorValue) {
          const cssVar = `rgb(var(--${colorValue}))`;
          j(path).replaceWith(j.stringLiteral(cssVar));
          hasChanges = true;
        } else {
          problematicUsages.push(
            `paletteValueToCssVar with non-string argument: ${j(firstArg).toSource()}`,
          );
        }
      } else if (
        firstArg.type === 'TemplateLiteral' ||
        firstArg.type === 'Identifier' ||
        firstArg.type === 'MemberExpression'
      ) {
        problematicUsages.push(
          `paletteValueToCssVar with dynamic argument: ${j(firstArg).toSource()}`,
        );
      } else {
        problematicUsages.push(
          `paletteValueToCssVar with complex argument: ${j(firstArg).toSource()}`,
        );
      }
    }
  });

  // --- Pass 2: Clean up template literals that now contain string literals ---
  root.find(j.TemplateLiteral).forEach((path: ASTPath<TemplateLiteral>) => {
    const { quasis, expressions } = path.node;

    const hasStringLiteralExpr = expressions.some(
      (e) => e.type === 'Literal' || e.type === 'StringLiteral',
    );
    if (!hasStringLiteralExpr) {
      return;
    }

    let templateModified = false;
    const newQuasis = [];
    const newExpressions: (typeof expressions)[0][] = [];
    let currentQuasi = {
      raw: quasis[0].value.raw,
      cooked: quasis[0].value.cooked || quasis[0].value.raw,
    };

    expressions.forEach((expr, i) => {
      const nextQuasi = quasis[i + 1];
      if (
        (expr.type === 'Literal' || expr.type === 'StringLiteral') &&
        typeof (expr as any).value === 'string'
      ) {
        currentQuasi.raw += (expr as any).value;
        currentQuasi.cooked += (expr as any).value;
        currentQuasi.raw += nextQuasi.value.raw;
        currentQuasi.cooked += nextQuasi.value.cooked || nextQuasi.value.raw;
        templateModified = true;
      } else {
        newQuasis.push(j.templateElement(currentQuasi, false));
        newExpressions.push(expr);
        currentQuasi = {
          raw: nextQuasi.value.raw,
          cooked: nextQuasi.value.cooked || nextQuasi.value.raw,
        };
      }
    });

    newQuasis.push(j.templateElement(currentQuasi, true));

    if (templateModified) {
      const newTemplateLiteral = j.templateLiteral(newQuasis, newExpressions as typeof expressions);
      path.replace(newTemplateLiteral);
      hasChanges = true;
    }
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
      'paletteValueToCssVar calls with dynamic or complex arguments found. These need to be manually converted to CSS variables (rgb(var(--{value}))).',
    );
  }

  return root.toSource();
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
