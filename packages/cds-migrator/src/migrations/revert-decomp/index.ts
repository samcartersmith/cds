import { Tree } from '@nrwl/devkit';

import revertedDecompMigrations from './revertedDecompMigrations';

export default async function main(tree: Tree) {
  await revertedDecompMigrations(tree);
}
