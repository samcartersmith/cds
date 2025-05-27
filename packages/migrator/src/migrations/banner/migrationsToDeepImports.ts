import { Tree } from '@nx/devkit';
import fs from 'node:fs';

import {
  checkFileIncludesImport,
  createMigration,
  CreateMigrationParams,
  logDebug,
  replaceImport,
  writeMigrationToFile,
} from '../../helpers';

import { migrationsToDeepImports } from './data/migrations';

const oldDirectories = migrationsToDeepImports.map(({ oldPath }) => oldPath);
const decompedExports = migrationsToDeepImports.flatMap(({ exports }) => exports);

const filterSourceFiles = (path: string) => {
  const sourceContent = fs.readFileSync(path, 'utf-8');
  const hasImportFromOldDirectory = oldDirectories.some((oldDirectory) =>
    sourceContent.includes(oldDirectory),
  );
  const hasModuleFromOldDirectory = decompedExports.some((decompedExport) =>
    sourceContent.includes(decompedExport),
  );
  return hasModuleFromOldDirectory && hasImportFromOldDirectory;
};

const callback = (args: CreateMigrationParams) => {
  const { sourceFile } = args;

  oldDirectories.forEach((oldDirectory) => {
    if (!checkFileIncludesImport(sourceFile, oldDirectory)) return;

    const declarationsFromOldPath = sourceFile
      .getImportDeclarations()
      .filter((imp) => imp.getModuleSpecifierValue().startsWith(oldDirectory));

    if (!declarationsFromOldPath) return;

    // check that the declaration includes a named import that has been decomped
    // eg: import { Button } from '@cbhq/cds-web/button';
    declarationsFromOldPath.forEach((declaration) => {
      const declarationPath = declaration.getModuleSpecifierValue();
      declaration.getNamedImports().forEach((namedImport) => {
        const importName = namedImport.getText();
        // we're filtering because a single shallow path could have multiple decomped exports and we need to migrate each one
        const decompedModules = decompedExports?.filter((exp) => exp === importName);

        if (!decompedModules) return;

        decompedModules.forEach((decompedExport) => {
          // get the migration config for the found export
          const migrationConfig = migrationsToDeepImports.find(
            (migration) =>
              migration.exports.includes(decompedExport) &&
              declarationPath.startsWith(migration.oldPath),
          );
          if (!migrationConfig) return;

          const { newPath, oldPath } = migrationConfig;
          replaceImport({
            sourceFile,
            oldPath,
            newPath,
            namedImport: decompedExport,
          });
          // after all file changes are made, write the migration file
          writeMigrationToFile({
            sourceFile,
            oldValue: oldPath,
            newValue: newPath,
            jsx: decompedExport,
          });
          logDebug('Make sure you run lint --fix to sort imports in affected files. ');
        });
      });
    });
  });
};

export default async function migration(tree: Tree) {
  await createMigration({
    tree,
    callback,
    filterSourceFiles,
  });
}
