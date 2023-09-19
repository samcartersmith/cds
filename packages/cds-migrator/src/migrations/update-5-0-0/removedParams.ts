import { output, Tree } from '@nrwl/devkit';

import { checkFileIncludesImport } from '../../helpers/checkFileIncludesImport';
import { createMigration, CreateMigrationParams } from '../../helpers/createMigration';
import { generateManualMigrationOutput } from '../../helpers/generateManualMigrationOutput';
import { logDebug, logWarning } from '../../helpers/loggingHelpers';

import { removedParamMigrations } from './data/paramMigrations';

const callback = (args: CreateMigrationParams) => {
  const { path, sourceFile } = args;

  const paths = removedParamMigrations.map(({ path: importPath }) => importPath);
  if (!checkFileIncludesImport(sourceFile, paths)) return;

  removedParamMigrations.forEach(({ params, name }) => {
    sourceFile.forEachDescendant((node) => {
      if (node.getKindName() === 'CallExpression' && node.getText().includes(name)) {
        params.forEach((param) => {
          const hasRemovedParam = node.getText().includes(param);
          if (hasRemovedParam) {
            const title = `The ${param} parameter has been removed from the ${name} function`;
            const bodyLines = `You will need to manually migrate to an alternative.`;
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
      }
    });
  });
};

export default async function migration(tree: Tree) {
  logDebug('Migrating deprecated params');
  await createMigration({
    tree,
    callback,
  });
}
