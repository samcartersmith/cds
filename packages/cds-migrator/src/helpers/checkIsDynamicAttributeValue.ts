import { JsxAttribute, SyntaxKind } from 'ts-morph';

import { generateManualMigrationOutput } from './generateManualMigrationOutput';
import { logWarning } from './loggingHelpers';
import { JsxElementType } from './types';

/** checks if an attribute's value includes a variable */
export const checkIsDynamicAttributeValue = (attribute: string, jsx: JsxElementType): boolean => {
  const initializer = (jsx.getAttribute(attribute) as JsxAttribute)?.getInitializer();
  if (!initializer) return false;

  // Check if the initializer is a JSX expression
  if (initializer.getKind() === SyntaxKind.JsxExpression) {
    // Check if the expression contains an identifier. will also be true for ternaries that return strings
    const valueContainsIdentifier = initializer.getDescendantsOfKind(SyntaxKind.Identifier);

    if (valueContainsIdentifier.length) {
      const jsxLocation = jsx.getStartLineNumber();
      const path = jsx.getSourceFile().getFilePath();
      const location = `Manual migration required at line ${jsxLocation} in ${path}.`;
      const warning = `## Warning: The ${attribute} attribute is using a variable as a value and will have to migrated manually. \n - Refer to the relevant migration guide at go/cds-migrations for guidance on how to manually migrate. \n - ${jsx.getText()} \n - ${location}`;
      logWarning(warning);
      generateManualMigrationOutput(warning);
      return true;
    }
  }

  return false;
};
