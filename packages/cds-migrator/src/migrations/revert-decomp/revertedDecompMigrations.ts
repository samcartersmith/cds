import { Tree } from '@nrwl/devkit';
import fs from 'node:fs';

import {
  checkFileIncludesImport,
  createMigration,
  CreateMigrationParams,
  logDebug,
  replaceImport,
  writeMigrationToFile,
} from '../../helpers';

import { revertedMigrations } from './data/migrations';

const oldDirectories = revertedMigrations.map(({ oldDir }) => oldDir);
const decompedExports = revertedMigrations.flatMap(({ exports }) => exports);

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
  const packagesToRemove: string[] = [];

  oldDirectories.forEach((oldDirectory) => {
    if (checkFileIncludesImport(sourceFile, oldDirectory)) {
      const declarationsFromOldPath = sourceFile
        .getImportDeclarations()
        .filter((imp) => imp.getModuleSpecifierValue().startsWith(oldDirectory));
      if (declarationsFromOldPath) {
        // check that the declaration includes a named import that has been decomped
        // eg: import { Button } from '@cbhq/cds-web/button';
        declarationsFromOldPath.forEach((declaration) => {
          const declarationPath = declaration.getModuleSpecifierValue();
          declaration.getNamedImports().forEach((namedImp) => {
            const impName = namedImp.getText();
            // we're filtering because a single shallow path could have multiple decomped exports and we need to migrate each one
            const decompedModules = decompedExports?.filter((exp) => exp === impName);
            if (decompedModules) {
              decompedModules.forEach((decompedExport) => {
                // get the migration config for the found export
                const migConfig = revertedMigrations.find(
                  (mig) =>
                    mig.exports.includes(decompedExport) && declarationPath.startsWith(mig.oldDir),
                );
                if (migConfig) {
                  const { newDir, oldDir } = migConfig;
                  if (!packagesToRemove.includes(oldDir)) {
                    packagesToRemove.push(oldDir);
                  }
                  replaceImport({
                    sourceFile,
                    oldPath: oldDir,
                    newPath: newDir,
                    namedImport: decompedExport,
                  });
                  // after all file changes are made, write the migration file
                  writeMigrationToFile({
                    sourceFile,
                    oldValue: oldDir,
                    newValue: newDir,
                    jsx: decompedExport,
                  });
                  logDebug('Make sure you run lint --fix to sort imports in affected files. ');
                }
              });
            }
          });
        });
      }
    }
  });
};

export default async function migration(tree: Tree) {
  await createMigration({
    tree,
    callback,
    filterSourceFiles,
    packageNames: ['@cbhq/cds-web-overlays'],
  });
}
