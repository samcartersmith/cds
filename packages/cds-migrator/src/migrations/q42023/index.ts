import { Tree } from '@nrwl/devkit';

import attributeValueToBooleanMigrations from './attributeValueToBooleanMigrations';
import catchAllPropMigrations from './catchAllPropMigrations';
import componentMigrations from './componentMigrations';
import manualPropMigrations from './manualPropMigrations';
import propMigrations from './propMigrations';

export default async function main(tree: Tree) {
  await componentMigrations(tree);
  await catchAllPropMigrations(tree);
  await propMigrations(tree);
  await manualPropMigrations(tree);
  await attributeValueToBooleanMigrations(tree);
}
