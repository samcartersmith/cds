import { JsxAttribute } from 'ts-morph';

import { JsxElementType } from './types';

/**
 * Gets the value of the specified attribute from a JSX element.
 * @param attributeName - The name of the attribute to get the value from.
 * @param jsx - The JSX element from which to get the attribute value.
 * @returns The value (initializer) of the attribute, or undefined if not found.
 */
export function getAttributeValue(attributeName: string, jsx: JsxElementType): string | undefined {
  const attribute = jsx.getAttribute(attributeName) as JsxAttribute;
  if (attribute) {
    return attribute.getInitializer()?.getText();
  }
  return undefined;
}
