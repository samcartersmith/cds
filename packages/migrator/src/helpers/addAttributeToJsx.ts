import type { JsxElementType } from './types';
/**
 * Adds a new attribute with the specified value to a JSX element.
 * @param attributeName - The name of the new attribute to add.
 * @param value - The value (initializer) for the new attribute.
 * @param jsx - The JSX element to which to add the new attribute.
 */
export function addAttributeToJsx(attributeName: string, value: string, jsx: JsxElementType): void {
  jsx.addAttribute({
    name: attributeName,
    initializer: value,
  });
}
