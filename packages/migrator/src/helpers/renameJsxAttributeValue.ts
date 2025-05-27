import { JsxAttribute, SyntaxKind } from 'ts-morph';

import { checkIsDynamicAttributeValue } from './checkIsDynamicAttributeValue';
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
  const attributeToUpdate = jsx.getAttribute(attribute) as JsxAttribute;
  /** The `cbOnePercentOff` in <HeroSquare name="cbOnePercentOff" /> or <HeroSquare name={isMobile ? "cbOnePercentOff" : "cbCard"} /> */
  const stringLiteral = attributeToUpdate?.getDescendantsOfKind(SyntaxKind.StringLiteral);
  const hasDynamicValue = checkIsDynamicAttributeValue(attribute, jsx);

  if (stringLiteral) {
    stringLiteral.forEach((node) => {
      const stringLiteralText = node?.getLiteralText();
      if (stringLiteralText && updateMap[stringLiteralText]) {
        oldValue = stringLiteralText;
        newValue = updateMap[oldValue];
        if (newValue !== undefined) {
          node.setLiteralValue(newValue);
        }
      }
    });
  }

  if (hasDynamicValue) {
    oldValue = undefined;
    newValue = undefined;
  }

  return {
    oldValue,
    newValue,
  };
}
