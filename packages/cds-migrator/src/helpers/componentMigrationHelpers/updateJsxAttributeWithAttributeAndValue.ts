import { FindReplaceCallbackReturnType, JsxElementType, PropToAttributeValue } from '../types';

/**
 * Replaces a specified attribute with a new attribute and value
 * Make sure you call writeMigrationToFile to save changes to the file system
 * @param updateMap - Key value pairs of old and new values
 * @param oldAttribute - The attribute to update
 * @param newAttribute - Replaces oldAttribute
 * @param jsx - The JSX element to update
 */
export function updateJsxAttributeWithAttributeAndValue({
  oldAttribute,
  newAttribute,
  value,
  jsx,
}: { jsx: JsxElementType } & PropToAttributeValue): FindReplaceCallbackReturnType {
  // remove the boolean prop
  jsx.getAttribute(oldAttribute)?.remove();
  // add the new attribute value pair
  jsx.addAttribute({ name: newAttribute, initializer: value });

  return {
    oldValue: oldAttribute,
    newValue: `${newAttribute}=${value}`,
  };
}
