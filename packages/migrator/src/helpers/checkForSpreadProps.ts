import { SyntaxKind } from 'ts-morph';

import { generateManualMigrationOutput } from './generateManualMigrationOutput';
import { logWarning } from './loggingHelpers';
import { JsxElementType } from './types';

export const checkForSpreadProps = (jsx: JsxElementType): boolean => {
  const spreadProps = jsx
    .getAttributes()
    .some((attr) => attr.getKind() === SyntaxKind.JsxSpreadAttribute);
  if (spreadProps) {
    const warning = `## Warning: The ${jsx
      .getTagNameNode()
      .getText()} component has spread props and will have to migrated manually. \n - Refer to the relevant migration guide at go/cds-migrations for guidance on how to manually migrate. \n - ${jsx.getText()}`;
    generateManualMigrationOutput(warning);
    logWarning(warning);
    return true;
  }

  return false;
};
