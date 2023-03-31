import fs from 'node:fs';
import { Project, SyntaxKind } from 'ts-morph';

import { JsxElementType } from './types';

/** Parses source files for JSX Elements (self enclosed components and opening elements) and passes each element to a callback function */
export default function parseJsxElements({
  path,
  project,
  callback,
}: {
  path: string;
  project: Project;
  callback: (jsx: JsxElementType) => void;
}) {
  const sourceContent = fs.readFileSync(path, 'utf-8');
  const sourceFile = project.createSourceFile(path, sourceContent);
  const jsxElements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
  ];

  jsxElements.forEach((jsx) => {
    callback(jsx);
  });
}
