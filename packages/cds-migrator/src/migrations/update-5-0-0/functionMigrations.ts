import { Tree } from '@nrwl/devkit';

import {
  checkFileIncludesImport,
  createMigration,
  CreateMigrationParams,
  logDebug,
  logWarning,
  renameFunction,
  replaceImportedModule,
  replaceImportPath,
  writeMigrationToFile,
} from '../../helpers';

import { functionMigrations } from './data/functionMigrations';

const callback = (args: CreateMigrationParams) => {
  const { sourceFile } = args;
  const oldPaths = functionMigrations.map(({ path }) => Object.keys(path)[0]);
  const deprecatedPathsInFile: string[] = [];

  oldPaths.forEach((oldPath) => {
    if (checkFileIncludesImport(sourceFile, oldPath)) {
      deprecatedPathsInFile.push(oldPath);
    }
  });

  deprecatedPathsInFile?.forEach((oldPath) => {
    const migrationConfig = functionMigrations.find(({ path }) => Object.keys(path)[0] === oldPath);
    if (migrationConfig) {
      const { name, path, replacement } = migrationConfig;
      const newPath = Object.values(path)[0];
      replaceImportedModule({
        sourceFile,
        oldValue: name,
        newValue: replacement,
        path: oldPath,
      });
      replaceImportPath({ sourceFile, oldPath, newPath });
      renameFunction({
        name,
        sourceFile,
        replacement,
      });
      writeMigrationToFile({ sourceFile, oldValue: name, newValue: replacement });
      logWarning(
        'Manually review all function migrations. Destructured variables or function calls may need to be updated.',
      );
    }
  });
};

export default async function migration(tree: Tree) {
  logDebug('Migrating deprecated functions');
  await createMigration({
    tree,
    callback,
  });
}
