import { Tree } from '@nrwl/devkit';

import { checkFileIncludesImport } from '../../helpers/checkFileIncludesImport';
import { createMigration, CreateMigrationParams } from '../../helpers/createMigration';
import { logDebug, logWarning } from '../../helpers/loggingHelpers';
import { renameFunction } from '../../helpers/renameFunction';
import { replaceImportedModule } from '../../helpers/replaceImportedModule';
import { replaceImportPath } from '../../helpers/replaceImportPath';
import { writeMigrationToFile } from '../../helpers/writeMigrationToFile';

import { functionMigrations } from './data/functionMigrations';

const callback = (args: CreateMigrationParams) => {
  const { sourceFile, tree } = args;
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
      logDebug('Make sure you run lint --fix to sort imports in affected files.');
      renameFunction({
        name,
        sourceFile,
        replacement,
      });
      writeMigrationToFile({ sourceFile, tree, oldValue: name, newValue: replacement });
      logWarning(
        'Manually review all function migrations. Destructured variables or function calls may need to be updated.',
      );
    }
  });
};

export default async function migration(tree: Tree) {
  await createMigration({
    tree,
    callback,
  });
}
