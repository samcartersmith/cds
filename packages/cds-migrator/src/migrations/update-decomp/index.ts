import { Tree } from '@nrwl/devkit';

import jestMockMigrations from './jestMockMigrations';
import packageDecompMigrations from './packageDecompMigrations';

export default async function main(tree: Tree) {
  await packageDecompMigrations(tree);
  await jestMockMigrations(tree);
}
