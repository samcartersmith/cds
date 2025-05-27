import { Tree } from '@nx/devkit';

import revertedDecompMigrations from './revertedDecompMigrations';

export default async function main(tree: Tree) {
  await revertedDecompMigrations(tree);
}
