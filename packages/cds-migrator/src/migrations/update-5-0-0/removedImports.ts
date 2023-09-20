import { output, Tree } from '@nrwl/devkit';

import {
  checkFileIncludesImport,
  createMigration,
  CreateMigrationParams,
  generateManualMigrationOutput,
  logDebug,
  logWarning,
} from '../../helpers';

import { tokenMigrations } from './data/tokenMigrations';

const callback = (args: CreateMigrationParams) => {
  const { path, sourceFile } = args;
  // Check if the file contains any of the import statements
  const declarations = sourceFile.getImportDeclarations();
  const deprecatedPaths = tokenMigrations.map(({ path: deprecatedPath }) => deprecatedPath);

  if (!checkFileIncludesImport(sourceFile, deprecatedPaths)) return;

  declarations.forEach((declaration) => {
    const declarationPath = declaration.getModuleSpecifierValue();
    const migrationConfig = tokenMigrations.find(({ path: deprecatedPath }) =>
      declarationPath.includes(deprecatedPath),
    );

    if (migrationConfig) {
      const { warning, path: deprecatedPath } = migrationConfig;
      const title = `All exports from ${deprecatedPath} have been removed from CDS libraries`;
      const bodyLines = `You will need to manually migrate to an alternative. ${warning}`;
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
  logDebug('Migrating deprecated imported modules');
  await createMigration({
    tree,
    callback,
  });
}
