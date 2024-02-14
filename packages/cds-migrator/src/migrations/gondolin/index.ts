import { Tree } from '@nrwl/devkit';

import cardMigrations from './cards';

export default async function main(tree: Tree) {
  await cardMigrations(tree);
}
