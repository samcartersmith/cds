import type { JsxOpeningElement, JsxSelfClosingElement, SourceFile } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';

import type { CreateMigrationParams, JsxElementType } from './types';

export type ParseJsxElementsCbParams = {
  jsx: JsxElementType;
} & CreateMigrationParams;

type ParseJsxElementParams = {
  callback: (params: ParseJsxElementsCbParams) => void;
  checkSourceFile?: (sourceFile: SourceFile) => boolean;
  excludeOpeningElements?: boolean;
} & CreateMigrationParams;

/**
 * Parses `sourceFile` for JSX Elements (self enclosed components and opening elements) and passes each element to a callback function
 * @param path - Path to the `sourceFile` (must be absolute)
 * @param sourceFile - The ts-morph sourceFile instance
 * @param tree - The NX Tree instance
 * @param callback - The callback function to run on each JSX element. It will be passed the JSX element and the `sourceFile`
 * @param checkSourceFile - Checks `sourceFile` for condition and will gate callback to only fire if true
 * @param excludeOpeningElements - If true, will only parse self enclosed JSX elements
 */
export default function parseJsxElements({
  path,
  sourceFile,
  tree,
  callback,
  checkSourceFile,
  excludeOpeningElements = false,
  projectConfig,
}: ParseJsxElementParams) {
  const jsxElements: (JsxSelfClosingElement | JsxOpeningElement)[] = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ];

  if (!excludeOpeningElements) {
    jsxElements.push(...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement));
  }

  if (checkSourceFile) {
    if (checkSourceFile?.(sourceFile)) {
      jsxElements.forEach((jsx) => {
        callback({ jsx, sourceFile, tree, path, projectConfig });
      });
    }
  } else {
    jsxElements.forEach((jsx) => {
      callback({ jsx, sourceFile, tree, path, projectConfig });
    });
  }
}
