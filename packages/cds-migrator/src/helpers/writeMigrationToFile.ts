import fs from 'node:fs';
import { SourceFile } from 'ts-morph';

import { logSuccess } from './loggingHelpers';
import { JsxElementType } from './types';

type WriteToFileType = {
  oldValue: string;
  newValue?: string;
  sourceFile: SourceFile;
  jsx?: JsxElementType;
};

/**
 * Save migrations to file system memory and log changes
 * @param oldValue - The old value you are migrating from
 * @param newValue - The new value you are migrating to
 * @param jsx - The JSX element that was migrated
 * @param sourceFile - The `sourceFile` contains the migration that needs to be saved
 */
export function writeMigrationToFile({ oldValue, newValue, jsx, sourceFile }: WriteToFileType) {
  const jsxContent = jsx?.print();
  const bodyLines = jsxContent ? [jsxContent] : undefined;
  const path = sourceFile.getFilePath();

  if (oldValue !== undefined) {
    sourceFile.saveSync();
    if (newValue !== undefined) {
      logSuccess(`Successful migration from: ${oldValue} --> ${newValue} in ${path}`, bodyLines);
    } else {
      logSuccess(`Successful migration of: ${oldValue} in ${path}`, bodyLines);
    }
  }

  // grab all the changes from ts-morph and write to the file system
  const updatedSourceFileContent = sourceFile.getFullText();
  fs.writeFileSync(path, updatedSourceFileContent, 'utf-8');
}
