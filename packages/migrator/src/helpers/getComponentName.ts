import type { JsxElementType } from './types';

/**
 * Get the name of a Component from a JSXElement
 * Even works for components that use import aliases!
 * @param jsx - The JSX element to get the name of
 * @returns the display name of the component
 */
export function getComponentName(jsx: JsxElementType) {
  // Component display name
  return jsx.getTagNameNode().getText();
}
