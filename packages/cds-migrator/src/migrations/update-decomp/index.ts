import { Tree } from '@nrwl/devkit';

import packageDecompMigrations from './packageDecompMigrations';

export default async function main(tree: Tree) {
  await packageDecompMigrations(tree);
}
