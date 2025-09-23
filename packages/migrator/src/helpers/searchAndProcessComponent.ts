import { SyntaxKind } from 'ts-morph';

import type { JsxElementType } from './types';

type SearchProcessComponent = {
  jsx: JsxElementType;
  componentName: string;
  callback: (propName: string, propValue: unknown) => void;
};

/**
 * Searches for a component and processes its props and prop values
 * @param jsx JsxElement to be evaluated
 * @param componentName Name of the component that you're searching for, i.e. "VStack"
 * @param callback Function that will process the component prop values. callback(propName, propValue) => void
 */
export function searchAndProcessComponent({
  jsx,
  componentName,
  callback,
}: SearchProcessComponent) {
  // Searches all elements for component
  if (jsx.getTagNameNode().getText() === componentName) {
    // Checks each prop passed to the component
    jsx.getAttributes().forEach((attribute) => {
      if (attribute.getKind() === SyntaxKind.JsxAttribute) {
        const propName = attribute.getSymbol()?.getName();
        const propValue = attribute
          .getFirstChildByKind(SyntaxKind.StringLiteral)
          ?.getText()
          ?.replace(/['"]+/g, '');

        if (propName) {
          callback(propName, propValue);
        }
      }
    });
  }
}
