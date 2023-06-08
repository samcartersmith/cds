import { output, Tree } from '@nrwl/devkit';

import { checkFileIncludesImport } from '../../helpers/checkFileIncludesImport';
import { createMigration, CreateMigrationParams } from '../../helpers/createMigration';
import { generateManualMigrationOutput } from '../../helpers/generateManualMigrationOutput';
import { logDebug, logWarning } from '../../helpers/loggingHelpers';

import { removedComponents } from './data/componentMigrations';

const callback = (args: CreateMigrationParams) => {
  const { path, sourceFile } = args;
  // Check if the file contains any of the import statements
  const declarations = sourceFile.getImportDeclarations();
  const deprecatedPaths = removedComponents.map(({ path: depPath }) => depPath);

  if (!checkFileIncludesImport(sourceFile, deprecatedPaths)) return;

  declarations.forEach((declaration) => {
    const declarationPath = declaration.getModuleSpecifierValue();
    const migrationConfig = removedComponents.find(({ path: depPath }) =>
      declarationPath.includes(depPath),
    );

    if (migrationConfig) {
      const { replacement, name, path: deprecatedPath } = migrationConfig;
      const hasRemovedComponentImport = declaration
        .getNamedImports()
        .find((namedImport) => namedImport.getText() === name);

      if (hasRemovedComponentImport) {
        const title = `The ${name} component imported from ${deprecatedPath} has been removed from CDS libraries`;
        const bodyLines = `You will need to manually migrate to an alternative. ${replacement}`;
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
    }
  });
};

export default async function migration(tree: Tree) {
  logDebug('Migrating deprecated components');
  await createMigration({
    tree,
    callback,
  });
}
