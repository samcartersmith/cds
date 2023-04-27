import { Tree } from '@nrwl/devkit';
import fs from 'node:fs';
import { Project, SourceFile, SyntaxKind } from 'ts-morph';

import { JsxElementType } from './types';

export type ParseJsxElementsCbParams = {
  jsx: JsxElementType;
  sourceFile: SourceFile;
  tree: Tree;
  path: string;
};

/**
 * Parses `sourceFiles` for JSX Elements (self enclosed components and opening elements) and passes each element to a callback function
 * @param path - Path to the `sourceFile` (must be absolute)
 * @param project - The ts-morph project instance
 * @param tree - The NX Tree instance
 * @param callback - The callback function to run on each JSX element. It will be passed the JSX element and the `sourceFile`
 */
export function parseJsxElements({
  path,
  project,
  tree,
  callback,
}: {
  path: string;
  project: Project;
  tree: Tree;
  callback: (params: ParseJsxElementsCbParams) => void;
}) {
  const sourceContent = fs.readFileSync(path, 'utf-8');
  // we want to always overwrite this to ensure if there are multiple scripts updating a single file the subsequent scripts will have the latest changes
  const sourceFile = project.createSourceFile(path, sourceContent, {
    overwrite: true,
  });
  const jsxElements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
  ];

  jsxElements.forEach((jsx) => {
    callback({ jsx, sourceFile, tree, path });
  });
}
