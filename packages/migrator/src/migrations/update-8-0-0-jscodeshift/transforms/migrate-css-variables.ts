/**
 * Codemod to migrate css variables.
 *
 * Example transformations:
 * Before:
 *   --foreground: rgb(var(--gray100));
 *   background-color: var(--foreground);
 *   padding: var(--spacing-0\.5) var(--spacing-2);
 *   border-radius: var(--border-radius-rounded-none)
 *   background-color: ${p =>
 *   p.dark ? 'var(--background-alternate)' : 'var(--background)';
 *   padding: var(--spacing-12, 96px);
 *   padding: var(--spacing-12, 96px) var(--spacing-8);
 *
 * After:
 *   --color-fg: rgb(var(--gray100));
 *   background-color: var(--color-fg);
 *   padding: var(--space-0_5) var(--space-2);
 *   border-radius: var(--borderRadius-0);
 *   background-color: ${p =>
 *   p.dark ? 'var(--color-bgAlternate)' : 'var(--color-bg)'};
 *   padding: var(--space-12, 96px);
 *   padding: var(--space-12, 96px) var(--space-8);
 *
 */
import { API, FileInfo, Options } from 'jscodeshift';

// Define the mapping from old paths to new paths
const borderRadius = {
  'var(--border-radius-rounded-none)': 'var(--borderRadius-0)',
  'var(--border-radius-rounded-small)': 'var(--borderRadius-100)',
  'var(--border-radius-rounded)': 'var(--borderRadius-200)',
  'var(--border-radius-rounded-medium)': 'var(--borderRadius-300)',
  'var(--border-radius-rounded-large)': 'var(--borderRadius-400)',
  'var(--border-radius-rounded-x-large)': 'var(--borderRadius-500)',
  'var(--border-radius-rounded-full)': 'var(--borderRadius-1000)',
} as const;
const borderWidth = {
  'var(--border-width-none)': 'var(--borderWidth-0)',
  'var(--border-width-button)': 'var(--borderWidth-100)',
  'var(--border-width-card)': 'var(--borderWidth-100)',
  'var(--border-width-checkbox)': 'var(--borderWidth-200)',
  'var(--border-width-radio)': 'var(--borderWidth-200)',
  'var(--border-width-sparkline)': 'var(--borderWidth-200)',
  'var(--border-width-focus-ring)': 'var(--borderWidth-200)',
  'var(--border-width-input)': 'var(--borderWidth-100)',
} as const;
const spacing = {
  'var(--spacing-0)': 'var(--space-0)',
  'var(--spacing-1)': 'var(--space-1)',
  'var(--spacing-2)': 'var(--space-2)',
  'var(--spacing-3)': 'var(--space-3)',
  'var(--spacing-4)': 'var(--space-4)',
  'var(--spacing-5)': 'var(--space-5)',
  'var(--spacing-6)': 'var(--space-6)',
  'var(--spacing-7)': 'var(--space-7)',
  'var(--spacing-8)': 'var(--space-8)',
  'var(--spacing-9)': 'var(--space-9)',
  'var(--spacing-10)': 'var(--space-10)',
  'var(--spacing-0\\.5)': 'var(--space-0_5)',
  'var(--spacing-1\\.5)': 'var(--space-1_5)',
} as const;
const palette = {
  'var(--foreground)': 'var(--color-fg)',
  'var(--foreground-muted)': 'var(--color-fgMuted)',
  'var(--background)': 'var(--color-bg)',
  'var(--background-alternate)': 'var(--color-bgAlternate)',
  'var(--background-inverse)': 'var(--color-bgInverse)',
  'var(--background-overlay)': 'var(--color-bgOverlay)',
  'var(--line)': 'var(--color-bgLine)',
  'var(--line-heavy)': 'var(--color-bgLineHeavy)',
  'var(--primary)': 'var(--color-bgPrimary)',
  'var(--primary-wash)': 'var(--color-bgPrimaryWash)',
  'var(--primary-foreground)': 'var(--color-fgInverse)',
  'var(--negative)': 'var(--color-bgNegative)',
  'var(--negative-foreground)': 'var(--color-fgInverse)',
  'var(--negative-wash)': 'var(--color-bgNegativeWash)',
  'var(--positive)': 'var(--color-bgPositive)',
  'var(--positive-foreground)': 'var(--color-fgInverse)',
  'var(--secondary)': 'var(--color-bgSecondary)',
  'var(--secondary-foreground)': 'var(--color-fg)',
  'var(--transparent)': 'var(--color-transparent)',
  'var(--warning)': 'var(--color-bgWarning)',
  'var(--warning-foreground)': 'var(--color-fgWarning)',
} as const;
const control = {
  'var(--checkbox-size)': 'var(--controlSize-checkboxSize)',
  'var(--radio-size)': 'var(--controlSize-radioSize)',
  'var(--switch-width)': 'var(--controlSize-switchWidth)',
  'var(--switch-height)': 'var(--controlSize-switchHeight)',
  'var(--switch-thumb-size)': 'var(--controlSize-switchThumbSize)',
} as const;
const fontFamily = {
  'var(--display1-font-family)': 'var(--fontFamily-display1)',
  'var(--display2-font-family)': 'var(--fontFamily-display2)',
  'var(--display3-font-family)': 'var(--fontFamily-display3)',
  'var(--title1-font-family)': 'var(--fontFamily-title1)',
  'var(--title2-font-family)': 'var(--fontFamily-title2)',
  'var(--title3-font-family)': 'var(--fontFamily-title3)',
  'var(--title4-font-family)': 'var(--fontFamily-title4)',
  'var(--headline-font-family)': 'var(--fontFamily-headline)',
  'var(--body-font-family)': 'var(--fontFamily-body)',
  'var(--label1-font-family)': 'var(--fontFamily-label1)',
  'var(--label2-font-family)': 'var(--fontFamily-label2)',
  'var(--caption-font-family)': 'var(--fontFamily-caption)',
  'var(--legal-font-family)': 'var(--fontFamily-legal)',
} as const;
const fontWeight = {
  'var(--display1-font-weight)': 'var(--fontWeight-display1)',
  'var(--display2-font-weight)': 'var(--fontWeight-display2)',
  'var(--display3-font-weight)': 'var(--fontWeight-display3)',
  'var(--title1-font-weight)': 'var(--fontWeight-title1)',
  'var(--title2-font-weight)': 'var(--fontWeight-title2)',
  'var(--title3-font-weight)': 'var(--fontWeight-title3)',
  'var(--title4-font-weight)': 'var(--fontWeight-title4)',
  'var(--headline-font-weight)': 'var(--fontWeight-headline)',
  'var(--body-font-weight)': 'var(--fontWeight-body)',
  'var(--label1-font-weight)': 'var(--fontWeight-label1)',
  'var(--label2-font-weight)': 'var(--fontWeight-label2)',
  'var(--caption-font-weight)': 'var(--fontWeight-caption)',
  'var(--legal-font-weight)': 'var(--fontWeight-legal)',
} as const;
const fontSize = {
  'var(--display1-font-size)': 'var(--fontSize-display1)',
  'var(--display2-font-size)': 'var(--fontSize-display2)',
  'var(--display3-font-size)': 'var(--fontSize-display3)',
  'var(--title1-font-size)': 'var(--fontSize-title1)',
  'var(--title2-font-size)': 'var(--fontSize-title2)',
  'var(--title3-font-size)': 'var(--fontSize-title3)',
  'var(--title4-font-size)': 'var(--fontSize-title4)',
  'var(--headline-font-size)': 'var(--fontSize-headline)',
  'var(--body-font-size)': 'var(--fontSize-body)',
  'var(--label1-font-size)': 'var(--fontSize-label1)',
  'var(--label2-font-size)': 'var(--fontSize-label2)',
  'var(--caption-font-size)': 'var(--fontSize-caption)',
  'var(--legal-font-size)': 'var(--fontSize-legal)',
} as const;
const lineHeight = {
  'var(--display1-line-height)': 'var(--lineHeight-display1)',
  'var(--display2-line-height)': 'var(--lineHeight-display2)',
  'var(--display3-line-height)': 'var(--lineHeight-display3)',
  'var(--title1-line-height)': 'var(--lineHeight-title1)',
  'var(--title2-line-height)': 'var(--lineHeight-title2)',
  'var(--title3-line-height)': 'var(--lineHeight-title3)',
  'var(--title4-line-height)': 'var(--lineHeight-title4)',
  'var(--headline-line-height)': 'var(--lineHeight-headline)',
  'var(--body-line-height)': 'var(--lineHeight-body)',
  'var(--label1-line-height)': 'var(--lineHeight-label1)',
  'var(--label2-line-height)': 'var(--lineHeight-label2)',
  'var(--caption-line-height)': 'var(--lineHeight-caption)',
  'var(--legal-line-height)': 'var(--lineHeight-legal)',
} as const;

// Combine all mappings
const cssVariableMap = {
  ...borderRadius,
  ...borderWidth,
  ...spacing,
  ...palette,
  ...control,
  ...fontFamily,
  ...fontWeight,
  ...fontSize,
  ...lineHeight,
} as const;

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let modified = false;

  // Function to replace CSS variables in a string using the direct mappings
  const replaceCssVariables = (str: string): string => {
    let result = str;
    let hasChanges = false;

    // Use the cssVariableMap directly for replacements
    Object.entries(cssVariableMap).forEach(([oldVar, newVar]) => {
      // Extract the variable name from the mapping (remove "var(" and ")")
      const oldVarName = oldVar.replace('var(', '').replace(')', '');
      const newVarName = newVar.replace('var(', '').replace(')', '');

      // Handle CSS variable definitions FIRST (e.g., "--foreground:" -> "--color-fg:")
      // Create pattern to match bare CSS variable names when being defined
      const definitionPattern = new RegExp(
        `(^|[^\\w-])${oldVarName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\s*:)`,
        'g',
      );

      if (definitionPattern.test(result)) {
        result = result.replace(definitionPattern, `$1${newVarName}$2`);
        hasChanges = true;
      }

      // Handle CSS variables with fallback values SECOND (e.g., "var(--spacing-12, 96px)")
      // Create pattern to match the variable with fallback: var(--old-var, fallback)
      const fallbackPattern = new RegExp(
        `var\\(${oldVarName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')},([^)]+)\\)`,
        'g',
      );

      if (fallbackPattern.test(result)) {
        result = result.replace(fallbackPattern, `var(${newVarName},$1)`);
        hasChanges = true;
      }

      // Handle exact matches THIRD (e.g., "var(--spacing-12)")
      if (result.includes(oldVar)) {
        result = result.replace(
          new RegExp(oldVar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
          newVar,
        );
        hasChanges = true;
      }
    });

    if (hasChanges) {
      modified = true;
    }
    return result;
  };

  // Transform string literals containing CSS variables
  root.find(j.Literal).forEach((path) => {
    if (typeof path.value.value === 'string') {
      const originalValue = path.value.value;
      const newValue = replaceCssVariables(originalValue);
      if (newValue !== originalValue) {
        path.value.value = newValue;
      }
    }
  });

  // Transform template literals containing CSS variables
  root.find(j.TemplateLiteral).forEach((path) => {
    path.value.quasis.forEach((quasi) => {
      const originalValue = quasi.value.raw;
      const newValue = replaceCssVariables(originalValue);
      if (newValue !== originalValue) {
        quasi.value.raw = newValue;
        quasi.value.cooked = newValue;
      }
    });
  });

  // Transform tagged template literals (styled-components, etc.)
  root.find(j.TaggedTemplateExpression).forEach((path) => {
    if (path.value.quasi) {
      path.value.quasi.quasis.forEach((quasi) => {
        const originalValue = quasi.value.raw;
        const newValue = replaceCssVariables(originalValue);
        if (newValue !== originalValue) {
          quasi.value.raw = newValue;
          quasi.value.cooked = newValue;
        }
      });
    }
  });

  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
