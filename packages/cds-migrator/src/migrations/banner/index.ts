import { Tree } from '@nx/devkit';

import migrationsToDeepImports from './migrationsToDeepImports';
import pathMigrations from './pathMigrations';
import propValueMigrations from './propValueMigrations';

export default async function main(tree: Tree) {
  await propValueMigrations(tree);
  await pathMigrations(tree);
  await migrationsToDeepImports(tree);
}
