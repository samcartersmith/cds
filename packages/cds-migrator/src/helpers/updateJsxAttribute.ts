import { SyntaxKind } from 'ts-morph';

import { FindReplaceCallbackParams, FindReplaceCallbackReturnType } from './findReplaceInComponent';

export function updateJsxAttribute({
  updateMap,
  attribute,
  jsx,
}: FindReplaceCallbackParams): FindReplaceCallbackReturnType {
  let oldValue: string | undefined;
  let newValue: string | undefined;

  /** The `name="cbOnePercentOff"` in <HeroSquare name="cbOnePercentOff" /> */
  const attributeToUpdate = jsx.getAttribute(attribute);

  /** The `name` in <HeroSquare name="cbOnePercentOff" */
  const jsxExpressionIdentifier = attributeToUpdate
    ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
    ?.getFirstDescendantByKind(SyntaxKind.Identifier);

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
      jsxExpressionIdentifier: jsxExpressionIdentifier?.print(),
    },
  };
}
