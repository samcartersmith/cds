import { Tree } from '@nrwl/devkit';

import { checkFileIncludesImport } from '../../helpers/checkFileIncludesImport';
import { createMigration, CreateMigrationParams } from '../../helpers/createMigration';
import { logDebug } from '../../helpers/loggingHelpers';
import { replaceImportPath } from '../../helpers/replaceImportPath';
import { writeMigrationToFile } from '../../helpers/writeMigrationToFile';

import { pathMigrations } from './data/pathMigrations';

const callback = (args: CreateMigrationParams) => {
  const { sourceFile, tree } = args;
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
      writeMigrationToFile({ sourceFile, tree, oldValue: oldPath, newValue: newPath });
      logDebug('Make sure you run lint --fix to sort imports in affected files. ');
    });
  }
};

export default async function migration(tree: Tree) {
  await createMigration({
    tree,
    callback,
  });
}
