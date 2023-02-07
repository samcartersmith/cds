import { Tree } from '@nrwl/devkit';

import { migrations } from '../../migrations/migrations';

type Version = keyof typeof migrations;

export type MigrateOptions = {
  version: Version;
};

async function migrate(tree: Tree, { version }: MigrateOptions) {
  if (version in migrations) {
    const fns = migrations[version];
    await Promise.all(fns.map(async (fn) => fn(tree)));
  }
}

export default migrate;
