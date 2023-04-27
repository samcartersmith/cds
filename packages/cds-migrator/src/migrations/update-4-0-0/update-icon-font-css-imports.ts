import { Tree } from '@nrwl/devkit';
import fs from 'node:fs';

import { findReplaceInFile } from '../../helpers/findReplaceInFile';
import { logNote } from '../../helpers/loggingHelpers';
import parseSourceFiles, { TransformFnType } from '../../helpers/parseSourceFiles';
import { RenameMap } from '../../helpers/types';

const oldPath = '@cbhq/cds-web/styles/icon-font.css';
const renameMap: RenameMap = {
  [oldPath]: '@cbhq/cds-icons/fonts/web/icon-font.css',
};

const filterSourceFiles = (path: string) => {
  const sourceContent = fs.readFileSync(path, 'utf-8');
  if (sourceContent.includes(oldPath)) {
    return true;
  }
  return false;
};

function updateIconImportPaths({ path }: TransformFnType) {
  findReplaceInFile({ renameMap, path });
}

export default async function updateIconImports(tree: Tree) {
  logNote('Updating icon-font.css usages');

  await parseSourceFiles(tree, updateIconImportPaths, filterSourceFiles);
}
