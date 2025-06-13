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
import {
  API,
  ASTPath,
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
      return typeof source === 'string' && source === '@cbhq/cds-web/tokens';
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
      return typeof source === 'string' && source === '@cbhq/cds-web/tokens';
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

  // Find and transform template literals
  root.find(j.TemplateLiteral).forEach((path: ASTPath<TemplateLiteral>) => {
    const templateLiteral = path.value;
    let templateModified = false;

    // Process each expression in the template literal (in reverse order to avoid index issues)
    for (let index = templateLiteral.expressions.length - 1; index >= 0; index--) {
      const expression = templateLiteral.expressions[index];

      if (expression.type === 'MemberExpression') {
        const memberExpr = expression as MemberExpression;

        // Check if it's accessing an imported token object
        if (memberExpr.object.type === 'Identifier' && importedTokens.has(memberExpr.object.name)) {
          const tokenName = memberExpr.object.name as keyof typeof tokenMappings;
          let propertyName: string | undefined;

          // Handle both computed and non-computed member expressions
          if (memberExpr.property.type === 'Identifier' && !memberExpr.computed) {
            // Non-computed: spacing.1, palette.primary
            propertyName = memberExpr.property.name;
          } else if (
            memberExpr.computed &&
            (memberExpr.property.type === 'Literal' ||
              memberExpr.property.type === 'NumericLiteral' ||
              memberExpr.property.type === 'StringLiteral')
          ) {
            // Computed: spacing[1], spacing['1']
            propertyName = String((memberExpr.property as any).value);
          }

          if (propertyName) {
            // Get the mapping for this token
            const mapping = tokenMappings[tokenName];
            if (mapping && propertyName in mapping) {
              const cssVariable = mapping[propertyName as keyof typeof mapping];

              // Check if this is a simple template literal with just one expression
              if (templateLiteral.expressions.length === 1 && templateLiteral.quasis.length === 2) {
                const firstQuasi = templateLiteral.quasis[0];
                const lastQuasi = templateLiteral.quasis[1];

                // If the template literal is just `${expression}` (empty strings before and after)
                if (firstQuasi.value.raw === '' && lastQuasi.value.raw === '') {
                  // Replace the entire template literal with just the CSS variable string
                  path.replace(j.literal(cssVariable));
                  modified = true;
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
              }
            }
          }
        }
      }
    }

    if (templateModified) {
      modified = true;
    }
  });

  // Find and transform member expressions outside of template literals
  root.find(j.MemberExpression).forEach((path: ASTPath<MemberExpression>) => {
    const memberExpr = path.value;

    // Skip if this member expression is inside a template literal (already handled above)
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

    // Check if it's accessing an imported token object
    if (memberExpr.object.type === 'Identifier' && importedTokens.has(memberExpr.object.name)) {
      const tokenName = memberExpr.object.name as keyof typeof tokenMappings;
      let propertyName: string | undefined;

      // Handle both computed and non-computed member expressions
      if (memberExpr.property.type === 'Identifier' && !memberExpr.computed) {
        // Non-computed: spacing.1, palette.primary
        propertyName = memberExpr.property.name;
      } else if (
        memberExpr.computed &&
        (memberExpr.property.type === 'Literal' ||
          memberExpr.property.type === 'NumericLiteral' ||
          memberExpr.property.type === 'StringLiteral')
      ) {
        // Computed: spacing[1], spacing['1']
        propertyName = String((memberExpr.property as any).value);
      }

      if (propertyName) {
        // Get the mapping for this token
        const mapping = tokenMappings[tokenName];
        if (mapping && propertyName in mapping) {
          const cssVariable = mapping[propertyName as keyof typeof mapping];

          // Replace the member expression with a string literal containing the CSS variable
          path.replace(j.literal(cssVariable));
          modified = true;
        }
      }
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
      return typeof source === 'string' && source === '@cbhq/cds-web/tokens';
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
