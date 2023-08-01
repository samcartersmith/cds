import { Tree } from '@nrwl/devkit';

import componentMigrations from './componentMigrations';

export default async function main(tree: Tree) {
  await componentMigrations(tree);
}
