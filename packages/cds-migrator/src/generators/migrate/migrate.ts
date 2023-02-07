import { Tree } from '@nrwl/devkit';

import { migrations } from '../../migrations/migrations';

type Version = keyof typeof migrations;

export type MigrateOptions = {
  version: Version;
};

async function migrate(tree: Tree, { version }: MigrateOptions) {
  if (version in migrations) {
    const fns = migrations[version];
    for await (const fn of fns) {
      await fn(tree);
    }
  }
}

export default migrate;
