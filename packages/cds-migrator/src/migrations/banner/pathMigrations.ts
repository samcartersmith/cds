import { Tree } from '@nrwl/devkit';

import {
  checkFileIncludesImport,
  createMigration,
  CreateMigrationParams,
  logDebug,
  replaceImport,
  writeMigrationToFile,
} from '../../helpers';

import { pathMigrations } from './data/migrations';

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
      replaceImport({ sourceFile, oldPath, newPath });
      writeMigrationToFile({ sourceFile, oldValue: oldPath, newValue: newPath });
    });
  }
};

export default async function migration(tree: Tree) {
  logDebug('Migrating alpha banner paths');
  await createMigration({
    tree,
    callback,
  });
}
