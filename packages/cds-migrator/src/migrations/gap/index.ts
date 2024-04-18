import { Tree } from '@nrwl/devkit';

import gapMigrations from './gapMigrations';

export default async function main(tree: Tree) {
  await gapMigrations(tree);
}
