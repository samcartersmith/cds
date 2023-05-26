import { SyntaxKind } from 'ts-morph';

import { FindReplaceCallbackParams, FindReplaceCallbackReturnType } from './types';

/**
 * Replaces a specified attribute's value with the new value
 * Make sure you call writeMigrationToFile to save changes to the file system
 * @param updateMap - Key value pairs of old and new values
 * @param attribute - The attribute to update
 * @param jsx - The JSX element to update
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
  /** The `cbOnePercentOff` in <HeroSquare name="cbOnePercentOff" */
  const stringLiteral = attributeToUpdate?.getFirstDescendantByKind(SyntaxKind.StringLiteral);

  const jsxExpressionIdentifier = attributeToUpdate
    ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
    ?.getFirstDescendantByKind(SyntaxKind.Identifier);

  if (stringLiteral) {
    const stringLiteralText = stringLiteral?.getLiteralText();
    oldValue = stringLiteralText;
    newValue = updateMap[oldValue];
    if (newValue !== undefined) {
      stringLiteral.setLiteralValue(newValue);
    }
  }

  // TODO: figure out what this does
  if (jsxExpressionIdentifier) {
    const literalValue = jsxExpressionIdentifier.getType().getLiteralValue();

    oldValue = literalValue && typeof literalValue === 'string' ? literalValue : undefined;
    newValue = oldValue ? updateMap[oldValue] : undefined;
    if (newValue !== undefined) {
      jsxExpressionIdentifier.rename(newValue);
    }
  }

  // @ts-expect-error TODO: fix this
  return {
    oldValue,
    newValue,
    details: {
      attributeToUpdate: attributeToUpdate?.print(),
      stringLiteral: stringLiteral?.print(),
      jsxExpressionIdentifier: jsxExpressionIdentifier?.print(),
    },
  };
}
