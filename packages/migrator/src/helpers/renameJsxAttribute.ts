import { JsxAttribute } from 'ts-morph';

import { JsxElementType } from './types';

/**
 * Replaces a specified attribute with the new value
 * Make sure you call writeMigrationToFile to save changes to the file system
 * @param oldAttribute - The attribute to update
 * @param newAttribute - The name of the new attribute
 * @param jsx - The JSX element to update
 * @param boolean - When true will replace attribute with no value initializer, eg: <HeroSquare active="false" /> -> <HeroSquare disabled />
 */
export function renameJsxAttribute({
  oldAttribute,
  newAttribute,
  jsx,
  boolean,
}: {
  oldAttribute: string;
  newAttribute: string;
  jsx: JsxElementType;
  boolean?: boolean;
}) {
  // have to cast because JSXLike is what it comes out to
  const attribute = jsx.getAttribute(oldAttribute) as JsxAttribute;

  if (attribute) {
    const attributeValue = attribute.getInitializer()?.getText();
    if (boolean) {
      attribute.replaceWithText(newAttribute);
    } else {
      attribute.replaceWithText(`${newAttribute}=${attributeValue}`);
    }
  }
}
