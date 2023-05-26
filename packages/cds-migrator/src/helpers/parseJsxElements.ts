import { Tree } from '@nrwl/devkit';
import { SourceFile, SyntaxKind } from 'ts-morph';

import { JsxElementType } from './types';

export type ParseJsxElementsCbParams = {
  jsx: JsxElementType;
  sourceFile: SourceFile;
  tree: Tree;
  path: string;
};

/**
 * Parses `sourceFile` for JSX Elements (self enclosed components and opening elements) and passes each element to a callback function
 * @param path - Path to the `sourceFile` (must be absolute)
 * @param sourceFile - The ts-morph sourceFile instance
 * @param tree - The NX Tree instance
 * @param callback - The callback function to run on each JSX element. It will be passed the JSX element and the `sourceFile`
 * @param checkSourceFile - Checks `sourceFile` for condition and will gate callback to only fire if true
 */
export function parseJsxElements({
  path,
  sourceFile,
  tree,
  callback,
  checkSourceFile,
}: {
  path: string;
  sourceFile: SourceFile;
  tree: Tree;
  callback: (params: ParseJsxElementsCbParams) => void;
  checkSourceFile?: (sourceFile: SourceFile) => boolean;
}) {
  const jsxElements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
  ];
  if (!checkSourceFile || checkSourceFile?.(sourceFile)) {
    jsxElements.forEach((jsx) => {
      callback({ jsx, sourceFile, tree, path });
    });
  }
}
