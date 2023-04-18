import { SyntaxKind } from 'ts-morph';

import { JsxElementType } from './types';

type SearchProcessComponent = {
  jsx: JsxElementType;
  componentName: string;
  callback: (propName: string, propValue: unknown) => void;
};

/**
 *
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
        const propValue = attribute.getFirstChildByKind(SyntaxKind.StringLiteral)?.getText();

        if (propName && propValue) {
          callback(propName, propValue);
        }
      }
    });
  }
}
