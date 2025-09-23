/**
 * Codemod to migrate web tokens.
 *
 * Example transformations:
 * Before:
 * import { borderRadius, borderWidth, spacing, palette, control, fontFamily } from '@cbhq/cds-web/tokens';
 *   background-color: ${palette.line};
 *   padding: ${spacing[1]} ${spacing[2]};
 *   border-radius: ${borderRadius.roundedFull};
 *   background-color: ${p =>
 *   p.dark ? palette.backgroundAlternate : palette.background};
 *
 * const gutter = spacing[4];
 *
 * After:
 *   background-color: var(--color-bgLine);
 *   padding: var(--space-1) var(--space-2);
 *   border-radius: var(--borderRadius-1000);
 *   background-color: ${p =>
 *   p.dark ? 'var(--color-bgAlternate)' : 'var(--color-bg)'};
 *
 * const gutter = 'var(--space-4)';
 */
import type {
  API,
  ASTPath,
  Expression,
  FileInfo,
  ImportDeclaration,
  MemberExpression,
  Options,
  TemplateLiteral,
} from 'jscodeshift';

import { logManualMigration } from '../helpers/manual-migration-logger';

// Define the mapping from old paths to new paths
const borderRadius = {
  roundedNone: 'var(--borderRadius-0)',
  roundedSmall: 'var(--borderRadius-100)',
  rounded: 'var(--borderRadius-200)',
  roundedMedium: 'var(--borderRadius-300)',
  roundedLarge: 'var(--borderRadius-400)',
  roundedXLarge: 'var(--borderRadius-500)',
  roundedFull: 'var(--borderRadius-1000)',
} as const;

const borderWidth = {
  none: 'var(--borderWidth-0)',
  button: 'var(--borderWidth-100)',
  card: 'var(--borderWidth-100)',
  checkbox: 'var(--borderWidth-200)',
  radio: 'var(--borderWidth-200)',
  sparkline: 'var(--borderWidth-200)',
  focusRing: 'var(--borderWidth-200)',
  input: 'var(--borderWidth-100)',
} as const;

const spacing = {
  '0': 'var(--space-0)',
  '1': 'var(--space-1)',
  '2': 'var(--space-2)',
  '3': 'var(--space-3)',
  '4': 'var(--space-4)',
  '5': 'var(--space-5)',
  '6': 'var(--space-6)',
  '7': 'var(--space-7)',
  '8': 'var(--space-8)',
  '9': 'var(--space-9)',
  '10': 'var(--space-10)',
  '0.5': 'var(--space-0_5)',
  '1.5': 'var(--space-1_5)',
} as const;

const palette = {
  foreground: 'var(--color-fg)',
  foregroundMuted: 'var(--color-fgMuted)',
  background: 'var(--color-bg)',
  backgroundAlternate: 'var(--color-bgAlternate)',
  backgroundInverse: 'var(--color-bgInverse)',
  backgroundOverlay: 'var(--color-bgOverlay)',
  line: 'var(--color-bgLine)',
  lineHeavy: 'var(--color-bgLineHeavy)',
  primary: 'var(--color-bgPrimary)',
  primaryWash: 'var(--color-bgPrimaryWash)',
  primaryForeground: 'var(--color-fgInverse)',
  negative: 'var(--color-bgNegative)',
  negativeForeground: 'var(--color-fgInverse)',
  negativeWash: 'var(--color-bgNegativeWash)',
  positive: 'var(--color-bgPositive)',
  positiveForeground: 'var(--color-fgInverse)',
  secondary: 'var(--color-bgSecondary)',
  secondaryForeground: 'var(--color-fg)',
  transparent: 'var(--color-transparent)',
  warning: 'var(--color-bgWarning)',
  warningForeground: 'var(--color-fgWarning)',
} as const;

const control = {
  checkboxSize: 'var(--controlSize-checkboxSize)',
  radioSize: 'var(--controlSize-radioSize)',
  switchWidth: 'var(--controlSize-switchWidth)',
  switchHeight: 'var(--controlSize-switchHeight)',
  switchThumbSize: 'var(--controlSize-switchThumbSize)',
} as const;

const fontFamily = {
  display: 'var(--cds-font-display)',
  sans: 'var(--cds-font-sans)',
  text: 'var(--cds-font-text)',
  mono: 'var(--cds-font-mono)',
} as const;

// Combine all mappings
const tokenMappings = {
  borderRadius,
  borderWidth,
  spacing,
  palette,
  control,
  fontFamily,
} as const;

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Check if the file has imports from @cbhq/cds-web/tokens
  const hasTokenImports = root
    .find(j.ImportDeclaration)
    .some((path: ASTPath<ImportDeclaration>) => {
      const source = path.value.source.value;
      return typeof source === 'string' && source === '@cbhq/cds-web/v7/tokens';
    });

  if (!hasTokenImports) {
    return file.source;
  }

  // Find all imported token names
  const importedTokens = new Set<string>();
  root
    .find(j.ImportDeclaration)
    .filter((path: ASTPath<ImportDeclaration>) => {
      const source = path.value.source.value;
      return typeof source === 'string' && source === '@cbhq/cds-web/v7/tokens';
    })
    .forEach((path: ASTPath<ImportDeclaration>) => {
      if (path.value.specifiers) {
        path.value.specifiers.forEach((spec) => {
          if (spec.type === 'ImportSpecifier' && spec.imported.type === 'Identifier') {
            importedTokens.add(spec.imported.name);
          }
        });
      }
    });

  let modified = false;

  // --- Pass 1: Replace ALL token member expressions with string literals ---
  root.find(j.MemberExpression).forEach((path: ASTPath<MemberExpression>) => {
    const memberExpr = path.value;
    if (memberExpr.object.type === 'Identifier' && importedTokens.has(memberExpr.object.name)) {
      const tokenName = memberExpr.object.name as keyof typeof tokenMappings;
      let propertyName: string | undefined;

      if (memberExpr.property.type === 'Identifier' && !memberExpr.computed) {
        propertyName = memberExpr.property.name;
      } else if (
        memberExpr.computed &&
        (memberExpr.property.type === 'Literal' ||
          memberExpr.property.type === 'NumericLiteral' ||
          memberExpr.property.type === 'StringLiteral')
      ) {
        propertyName = String((memberExpr.property as any).value);
      }

      if (propertyName) {
        const mapping = tokenMappings[tokenName];
        if (mapping && propertyName in mapping) {
          const cssVariable = mapping[propertyName as keyof typeof mapping];
          path.replace(j.literal(cssVariable));
          modified = true;
        }
      }
    }
  });

  // --- Pass 2: Clean up template literals that now contain string literals ---
  root.find(j.TemplateLiteral).forEach((path: ASTPath<TemplateLiteral>) => {
    const { quasis, expressions } = path.node;

    // Check if there are any string literals to unwrap, if not, skip
    const hasStringLiteralExpr = expressions.some(
      (e) => e.type === 'Literal' || e.type === 'StringLiteral',
    );
    if (!hasStringLiteralExpr) {
      return;
    }

    let templateModified = false;
    const newQuasis = [];
    const newExpressions: Expression[] = [];
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
        // It's a string literal, so merge its value into the current quasi text
        currentQuasi.raw += (expr as any).value;
        currentQuasi.cooked += (expr as any).value;
        // And also append the text from the *next* quasi
        currentQuasi.raw += nextQuasi.value.raw;
        currentQuasi.cooked += nextQuasi.value.cooked || nextQuasi.value.raw;
        templateModified = true;
      } else {
        // It's a different type of expression, so finalize the current quasi and push the expression
        newQuasis.push(j.templateElement(currentQuasi, false));
        newExpressions.push(expr);
        // Start the next quasi
        currentQuasi = {
          raw: nextQuasi.value.raw,
          cooked: nextQuasi.value.cooked || nextQuasi.value.raw,
        };
      }
    });

    // Add the final quasi part
    newQuasis.push(j.templateElement(currentQuasi, true));

    if (templateModified) {
      const newTemplateLiteral = j.templateLiteral(newQuasis, newExpressions as typeof expressions);
      path.replace(newTemplateLiteral);
      modified = true;
    }
  });

  // Check for remaining usage of imported tokens after transformation
  const remainingTokenUsage = new Set<string>();

  // Find all member expressions that reference imported tokens
  root.find(j.MemberExpression).forEach((path: ASTPath<MemberExpression>) => {
    const memberExpr = path.value;
    if (memberExpr.object.type === 'Identifier' && importedTokens.has(memberExpr.object.name)) {
      remainingTokenUsage.add(memberExpr.object.name);
    }
  });

  // Find all identifiers that reference imported tokens (direct usage)
  root.find(j.Identifier).forEach((path: ASTPath<any>) => {
    // Skip if this identifier is part of an import declaration
    if (path.parent?.value?.type === 'ImportSpecifier') {
      return;
    }

    // Skip if this identifier is the object part of a member expression (already handled above)
    if (
      path.parent?.value?.type === 'MemberExpression' &&
      path.parent.value.object === path.value
    ) {
      return;
    }

    // Skip if this identifier is a JSX attribute name (prop name)
    if (path.parent?.value?.type === 'JSXAttribute' && path.parent.value.name === path.value) {
      return;
    }

    // Skip if this identifier is an object property key
    if (path.parent?.value?.type === 'Property' && path.parent.value.key === path.value) {
      return;
    }

    // Skip if this identifier is an object property key (ObjectProperty type)
    if (path.parent?.value?.type === 'ObjectProperty' && path.parent.value.key === path.value) {
      return;
    }

    if (importedTokens.has(path.value.name)) {
      remainingTokenUsage.add(path.value.name);
    }
  });

  // Handle import cleanup - remove unused imports and log remaining ones
  root
    .find(j.ImportDeclaration)
    .filter((path: ASTPath<ImportDeclaration>) => {
      const source = path.value.source.value;
      return typeof source === 'string' && source === '@cbhq/cds-web/v7/tokens';
    })
    .forEach((path: ASTPath<ImportDeclaration>) => {
      if (path.value.specifiers) {
        // Filter out unused imports
        const usedSpecifiers = path.value.specifiers.filter((spec) => {
          if (spec.type === 'ImportSpecifier' && spec.imported.type === 'Identifier') {
            return remainingTokenUsage.has(spec.imported.name);
          }
          return true; // Keep non-ImportSpecifier types
        });

        if (usedSpecifiers.length === 0) {
          // Remove entire import if no specifiers are used
          path.prune();
          modified = true;
        } else if (usedSpecifiers.length < path.value.specifiers.length) {
          // Update import with only used specifiers
          path.value.specifiers = usedSpecifiers;
          modified = true;
        }

        // Log remaining imports for manual migration
        if (usedSpecifiers.length > 0) {
          const remainingImports = usedSpecifiers
            .filter(
              (spec) => spec.type === 'ImportSpecifier' && spec.imported.type === 'Identifier',
            )
            .map((spec) => (spec as any).imported.name)
            .join(', ');

          if (remainingImports) {
            logManualMigration(
              file.path,
              'undefined',
              `Remaining token imports found: ${remainingImports}. These tokens need to be manually migrated to CSS variables.`,
            );
          }
        }
      }
    });
  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
