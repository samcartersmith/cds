import { Tree } from '@nx/devkit';
import fs from 'node:fs';

import {
  createMigration,
  CreateMigrationParams,
  generateManualMigrationOutput,
  logDebug,
  logWarning,
} from '../../helpers';

import { removedPropsCatchAll } from './data/propMigrations';

const callback = (args: CreateMigrationParams) => {
  const { path } = args;
  const sourceFile = fs.readFileSync(path, 'utf-8');

  removedPropsCatchAll.forEach((prop) => {
    if (sourceFile.includes(prop)) {
      const title = `The ${prop} prop has been deprecated and removed from the CDS library. Please remove usage of this prop.`;
      const bodyLines = `Located at: ${path}`;
      const outputMessage =
        'All manual migrations are output to the root of the repo in a file called cds-migrator-output.md';
      logWarning('Manual migration required!', [title, bodyLines, outputMessage]);
      generateManualMigrationOutput(`## ${title}\n  - ${bodyLines}`);
    }
  });
};

export default async function migration(tree: Tree) {
  logDebug('Migrating deprecated props');
  await createMigration({
    tree,
    callback,
  });
}
