import { output, Tree } from '@nrwl/devkit';

import { checkFileIncludesImport } from '../../helpers/checkFileIncludesImport';
import { createMigration, CreateMigrationParams } from '../../helpers/createMigration';
import { generateManualMigrationOutput } from '../../helpers/generateManualMigrationOutput';
import { logWarning } from '../../helpers/loggingHelpers';

import { tokenMigrations } from './data/tokenMigrations';

const callback = (args: CreateMigrationParams) => {
  const { path, sourceFile } = args;
  // Check if the file contains any of the import statements
  const declarations = sourceFile.getImportDeclarations();
  const deprecatedPaths = tokenMigrations.map(({ path: depPath }) => depPath);

  if (!checkFileIncludesImport(sourceFile, deprecatedPaths)) return;

  declarations.forEach((declaration) => {
    const declarationPath = declaration.getModuleSpecifierValue();
    const migrationConfig = tokenMigrations.find(({ path: depPath }) =>
      declarationPath.includes(depPath),
    );

    if (migrationConfig) {
      const { warning, path: deprecatedPath } = migrationConfig;
      const title = `All exports from ${deprecatedPath} have been removed from CDS libraries`;
      const bodyLines = `You will need to manually migrate to an alternative. ${warning}`;
      const outputMessage = `All manual migrations are output to the root of the repo in a file called:`;
      const outputPath = `${output.underline(`${args.tree.root}/cds-migrator-output.md`)}`;
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
  await createMigration({
    tree,
    callback,
  });
}
