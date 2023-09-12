import { SyntaxKind } from 'ts-morph';

import { generateManualMigrationOutput } from './generateManualMigrationOutput';
import { logWarning } from './loggingHelpers';
import { FindReplaceCallbackParams, FindReplaceCallbackReturnType } from './types';

/**
 * Replaces a specified attribute's value with the new value
 * Make sure you call writeMigrationToFile to save changes to the file system
 * @param updateMap - Key value pairs of old and new values
 * @param attribute - The attribute to update
 * @param jsx - The JSX element to update
 * Works for ternary expressions, too!
 */
export function renameJsxAttributeValue({
  updateMap,
  attribute,
  jsx,
}: FindReplaceCallbackParams): FindReplaceCallbackReturnType {
  let oldValue: string | undefined;
  let newValue: string | undefined;

  /** The `name="cbOnePercentOff"` in <HeroSquare name="cbOnePercentOff" /> */
  const attributeToUpdate = jsx.getAttribute(attribute);
  /** The `cbOnePercentOff` in <HeroSquare name="cbOnePercentOff" /> or <HeroSquare name={isMobile ? "cbOnePercentOff" : "cbCard"} /> */
  const stringLiteral = attributeToUpdate?.getDescendantsOfKind(SyntaxKind.StringLiteral);
  let valueIsTernary = false;

  const jsxExpressionIdentifier = attributeToUpdate
    ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
    ?.getFirstDescendantByKind(SyntaxKind.Identifier);

  if (stringLiteral) {
    stringLiteral.forEach((node) => {
      const stringLiteralText = node?.getLiteralText();
      if (stringLiteralText && updateMap[stringLiteralText]) {
        valueIsTernary = true;
        oldValue = stringLiteralText;
        newValue = updateMap[oldValue];
        if (newValue !== undefined) {
          node.setLiteralValue(newValue);
        }
      }
    });
  }

  const jsxLocation = jsx.getStartLineNumber();
  const path = jsx.getSourceFile().getFilePath();
  const manualMigrationWarning = `- Manual migration required at line ${jsxLocation} in ${path}.`;
  const potentialTernaryWarning = `- The value for this prop is potentially a ternary and some values were migrated automatically, but requires a manual review.`;
  const warning = `## Warning: ${attribute} is using a dynamic prop value and cannot be automatically migrated. \n - Refer to the relevant migration guide at go/cds-migrations for guidance on how to manually migrate. \n ${
    valueIsTernary ? potentialTernaryWarning : manualMigrationWarning
  }`;

  if (jsxExpressionIdentifier) {
    generateManualMigrationOutput(warning);
    logWarning(warning);
    oldValue = undefined;
    newValue = undefined;
  }

  return {
    oldValue,
    newValue,
  };
}
