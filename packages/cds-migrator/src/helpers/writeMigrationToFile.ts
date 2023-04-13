import { output } from '@nrwl/devkit';
import { SourceFile } from 'ts-morph';

import { JsxElementType } from './types';

type WriteToFileType = {
  oldValue: string;
  newValue: string;
  sourceFile: SourceFile;
  jsx: JsxElementType;
};

/** Find/Replace values within a source file and save to file system memory */
export function writeMigrationToFile({ oldValue, newValue, jsx, sourceFile }: WriteToFileType) {
  let newContent;
  const jsxContent = jsx.print();
  const bodyLines = [jsxContent];

  if (oldValue !== undefined && newValue !== undefined) {
    output.success({
      title: `Renaming ${oldValue} -> ${newValue}`,
      bodyLines,
    });
    sourceFile.saveSync();
    newContent = sourceFile.getFullText();
  }

  return newContent;
}
