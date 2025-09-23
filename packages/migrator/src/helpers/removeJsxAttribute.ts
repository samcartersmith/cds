import type { JsxOpeningElement, JsxSelfClosingElement } from 'ts-morph';

/**
 * Removes the specified JSX attribute from a given JSX element.
 *
 * @param attributeName - The name of the attribute to remove.
 * @param jsx - The JSX element (either an opening element or a self-closing element)
 *              from which the attribute should be removed.
 *
 * @example
 * // If the JSX is: <Component prop="value" />
 * removeJsxAttribute('prop', jsxElement);
 * // The JSX will become: <Component />
 */
export function removeJsxAttribute(
  attributeName: string,
  jsx: JsxOpeningElement | JsxSelfClosingElement,
) {
  const attribute = jsx.getAttribute(attributeName);
  if (attribute) {
    attribute.remove();
  }
}
