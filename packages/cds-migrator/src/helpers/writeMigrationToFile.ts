import { Tree } from '@nrwl/devkit';
import fs from 'node:fs';
import { SourceFile } from 'ts-morph';

import { logSuccess } from './loggingHelpers';
import { JsxElementType } from './types';

type WriteToFileType = {
  oldValue: string;
  newValue: string;
  sourceFile: SourceFile;
  jsx: JsxElementType;
  tree: Tree;
};

/**
 * Save migrations to file system memory and log changes
 * @param oldValue - The old value you are migrating from
 * @param newValue - The new value you are migrating to
 * @param jsx - The JSX element that was migrated
 * @param sourceFile - The `sourceFile` contains the migration that needs to be saved
 * @param tree - the NX Tree
 */
export function writeMigrationToFile({
  oldValue,
  newValue,
  jsx,
  sourceFile,
  tree,
}: WriteToFileType) {
  const jsxContent = jsx.print();
  const bodyLines = [jsxContent];
  const path = sourceFile.getFilePath();

  if (oldValue !== undefined && newValue !== undefined) {
    logSuccess(`Renaming ${oldValue} -> ${newValue}`, bodyLines);
    sourceFile.saveSync();
  }

  // grab all the changes from ts-morph and write to the file system
  const updatedSourceFileContent = sourceFile.getFullText();
  const relativeFilePath = path.replace(`${tree.root}/`, '');
  // this actually writes the changes we made to the NX tree
  tree.write(relativeFilePath, updatedSourceFileContent);
  fs.writeFileSync(path, updatedSourceFileContent, 'utf-8');
}
