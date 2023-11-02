import { Tree } from '@nrwl/devkit';

import {
  checkFileIncludesImport,
  createMigration,
  CreateMigrationParams,
  logDebug,
  replaceImportPath,
  writeMigrationToFile,
} from '../../helpers';

import { pathMigrations } from './data/pathMigrations';

const callback = (args: CreateMigrationParams) => {
  const { sourceFile } = args;
  const oldPaths = Object.keys(pathMigrations);
  const deprecatedPathsInFile: string[] = [];

  oldPaths.forEach((oldPath) => {
    if (checkFileIncludesImport(sourceFile, oldPath)) {
      deprecatedPathsInFile.push(oldPath);
    }
  });

  if (deprecatedPathsInFile.length) {
    deprecatedPathsInFile.forEach((oldPath) => {
      const newPath = pathMigrations[oldPath];
      replaceImportPath({ sourceFile, oldPath, newPath });
      writeMigrationToFile({ sourceFile, oldValue: oldPath, newValue: newPath });
    });
  }
};

export default async function migration(tree: Tree) {
  logDebug('Migrating deprecated paths');
  await createMigration({
    tree,
    callback,
  });
}
