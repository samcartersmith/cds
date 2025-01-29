import { Tree } from '@nx/devkit';

import cardMigrations from './cards';

export default async function main(tree: Tree) {
  await cardMigrations(tree);
}
