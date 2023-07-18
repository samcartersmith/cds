import { addDependenciesToPackageJson, joinPathFragments, Tree } from '@nrwl/devkit';
import fs from 'node:fs';

import {
  checkFileIncludesImport,
  createMigration,
  CreateMigrationParams,
  logDebug,
  logSuccess,
  writeMigrationToFile,
} from '../../helpers';
import { checkHasDependency } from '../../helpers/checkHasDependency';

import { migrations } from './data/packageDecompMigrations';

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
  const { sourceFile, tree, projectConfig } = args;
  const packagesToAdd: string[] = [];

  oldDirectories.forEach((oldDirectory) => {
    const migrationConfig = migrations.find((mig) => mig.oldDir === oldDirectory);
    if (migrationConfig) {
      const { newDir } = migrationConfig;
      if (checkFileIncludesImport(sourceFile, oldDirectory)) {
        const declarationFromOldPath = sourceFile
          .getImportDeclarations()
          .find((imp) => imp.getModuleSpecifierValue().includes(oldDirectory));
        if (declarationFromOldPath) {
          // check that the declaration includes a named import that has been decomped
          // eg: import { Button } from '@cbhq/cds-web/button';
          declarationFromOldPath.getNamedImports().forEach((namedImp) => {
            const decompedExport = namedImp.getText();
            const checkHasDecompedModule = decompedExports?.some((exp) => exp === decompedExport);
            if (checkHasDecompedModule) {
              packagesToAdd.push(oldDirectory);

              // if there's only one module exported and it's the one being decomped, delete the whole import
              // eg: import { Button } from '@cbhq/cds-web/button'; would get deleted
              if (declarationFromOldPath.getNamedImports().length === 1) {
                declarationFromOldPath.remove();
              } else {
                // otherwise, just delete the named import that's being decomped
                // eg: import { Button, Link } from '@cbhq/cds-web/pressables'; Button would get deleted
                namedImp.remove();
              }
              // check if file already has the decomped package imported
              if (checkFileIncludesImport(sourceFile, newDir)) {
                // if it does, add the named import to the existing import statement
                const existingImport = sourceFile
                  .getImportDeclarations()
                  .find((imp) => imp.getModuleSpecifierValue().includes(newDir));
                existingImport?.addNamedImport(decompedExport);
              } else {
                // add a new import statement for the decomped package with the imported module
                sourceFile.addImportDeclaration({
                  moduleSpecifier: newDir,
                  namedImports: [decompedExport],
                });
              }
            }
          });
        }
      }
    }
  });
  if (packagesToAdd.length) {
    packagesToAdd.forEach((pkg) => {
      const migrationConfig = migrations.find((mig) => mig.oldDir === pkg);

      // after all file changes are made, write the migration file
      writeMigrationToFile({
        sourceFile,
        oldValue: pkg,
        newValue: migrationConfig?.newDir,
      });
      logDebug('Make sure you run lint --fix to sort imports in affected files. ');

      // update project dependencies to include decomped package
      // check package.json for the decomped package and add it if it doesn't exist
      const hasDecompedPackageDep = checkHasDependency(pkg, tree, projectConfig);
      if (!hasDecompedPackageDep && migrationConfig) {
        const packageJsonPath = joinPathFragments(projectConfig.root, 'package.json');
        addDependenciesToPackageJson(tree, { [pkg]: migrationConfig.version }, {}, packageJsonPath);
        logSuccess(`Added ${pkg} to ${projectConfig.root}/package.json`);
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
