import { output, Tree } from '@nrwl/devkit';

import {
  checkFileIncludesImport,
  createMigration,
  CreateMigrationParams,
  generateManualMigrationOutput,
  logDebug,
  logWarning,
} from '../../helpers';

import { removedFunctions } from './data/functionMigrations';

const callback = (args: CreateMigrationParams) => {
  const { path, sourceFile } = args;
  // Check if the file contains any of the import statements
  const declarations = sourceFile.getImportDeclarations();
  const deprecatedPaths = removedFunctions.map(({ path: deprecatedPath }) => deprecatedPath);

  if (!checkFileIncludesImport(sourceFile, deprecatedPaths)) return;

  declarations.forEach((declaration) => {
    const declarationPath = declaration.getModuleSpecifierValue();
    const migrationConfig = removedFunctions.find(({ path: deprecatedPath }) =>
      declarationPath.includes(deprecatedPath),
    );

    if (migrationConfig) {
      const { replacement, name, path: deprecatedPath } = migrationConfig;
      const title = `The ${name} function imported from ${deprecatedPath} has been removed from CDS libraries`;
      const bodyLines = `You will need to manually migrate to an alternative. ${replacement}`;
      const outputMessage =
        'All manual migrations are output to the root of the repo in a file called:';
      const outputPath = output.underline(`${args.tree.root}/cds-migrator-output.md`);
      logWarning('Manual migration required!', [
        title,
        bodyLines,
        `Located at: ${output.underline(path)}`,
        outputMessage,
        outputPath,
      ]);
      generateManualMigrationOutput(`## ${title}\n  - ${bodyLines} ${path}`);
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
