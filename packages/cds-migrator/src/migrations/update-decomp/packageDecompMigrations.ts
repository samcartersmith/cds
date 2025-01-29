import { Tree } from '@nx/devkit';
import fs from 'node:fs';

import {
  addDependenciesToPackageJson,
  checkFileIncludesImport,
  checkHasCdsDependency,
  checkHasDependency,
  createMigration,
  CreateMigrationParams,
  logDebug,
  logSuccess,
  PackageName,
  replaceImport,
  writeMigrationToFile,
} from '../../helpers';

import { migrationsWithNewPackages as migrations } from './data/packageDecompMigrations';

const oldDirectories = migrations.map(({ oldDir }) => oldDir);
const decompedExports = migrations.flatMap(({ exports }) => exports);

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
  const { sourceFile, tree, projectConfig: project } = args;
  const packagesToAdd: PackageName[] = [];

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
                const migConfig = migrations.find(
                  (mig) =>
                    mig.exports.includes(decompedExport) && declarationPath.startsWith(mig.oldDir),
                );
                if (migConfig) {
                  const { newDir, oldDir } = migConfig;
                  // we'll need to add the newly decomped package to the project's package.json
                  packagesToAdd.push(newDir);
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
  if (packagesToAdd.length) {
    // we're basically checking where CDS core dependencies are installed so we can add decomped packages to the same place
    const { peerDependencies, dependencies, devDependencies, packageJsonPath } =
      checkHasCdsDependency({ tree, project });

    packagesToAdd.forEach((packageName) => {
      if (dependencies) {
        // check if the decomped package is already installed
        const hasDecompedPackageDep = checkHasDependency({ packageName, tree, project });
        // if not, install it
        if (!hasDecompedPackageDep) {
          addDependenciesToPackageJson(tree, { [packageName]: 'latest' }, packageJsonPath);
          logSuccess(`Added ${packageName} to ${packageJsonPath}`);
        }
      }
      // rinse and repeat for peer and dev deps
      if (peerDependencies) {
        const hasDecompedPackageDep = checkHasDependency({
          packageName,
          tree,
          project,
          type: 'peerDependencies',
        });
        if (!hasDecompedPackageDep) {
          addDependenciesToPackageJson(
            tree,
            { [packageName]: 'latest' },
            packageJsonPath,
            'peerDependencies',
          );
          logSuccess(`Added ${packageName} to ${packageJsonPath}`);
        }
      }
      if (devDependencies) {
        const hasDecompedPackageDep = checkHasDependency({
          packageName,
          tree,
          project,
          type: 'devDependencies',
        });
        if (!hasDecompedPackageDep) {
          addDependenciesToPackageJson(
            tree,
            { [packageName]: 'latest' },
            packageJsonPath,
            'devDependencies',
          );
          logSuccess(`Added ${packageName} to ${packageJsonPath}`);
        }
      }
    });
  }
};

export default async function migration(tree: Tree) {
  await createMigration({
    tree,
    callback,
    filterSourceFiles,
  });
}
