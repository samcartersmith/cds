import { Tree } from '@nrwl/devkit';
import fs from 'node:fs';

import {
  createMigration,
  CreateMigrationParams,
  logDebug,
  replaceImportPath,
  writeMigrationToFile,
} from '../../helpers';

const oldPath = '@cbhq/cds-web/styles/icon-font.css';
const newPath = '@cbhq/cds-icons/fonts/web/icon-font.css';

const filterSourceFiles = (path: string) => {
  const sourceContent = fs.readFileSync(path, 'utf-8');
  if (sourceContent.includes(oldPath)) {
    return true;
  }
  return false;
};

function updateIconImportPaths({ sourceFile }: CreateMigrationParams) {
  replaceImportPath({ sourceFile, oldPath, newPath });
  writeMigrationToFile({
    oldValue: oldPath,
    newValue: newPath,
    sourceFile,
  });
}

export default async function updateIconImports(tree: Tree) {
  logDebug('Updating icon-font.css usages');

  await createMigration({ tree, callback: updateIconImportPaths, filterSourceFiles });
}
