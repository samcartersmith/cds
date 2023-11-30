import { Tree } from '@nrwl/devkit';

import attributeValueToBooleanMigrations from './attributeValueToBooleanMigrations';
import catchAllPropMigrations from './catchAllPropMigrations';
import componentMigrations from './componentMigrations';
import manualPropMigrations from './manualPropMigrations';
import propMigrations from './propMigrations';
import propToAttributeValueMigrations from './propToAttributeValueMigrations';
import removedComponents from './removedComponents';
import removedPropMigrations from './removedPropMigrations';

export default async function main(tree: Tree) {
  await componentMigrations(tree);
  await removedComponents(tree);
  await catchAllPropMigrations(tree);
  await propMigrations(tree);
  await removedPropMigrations(tree);
  await manualPropMigrations(tree);
  await attributeValueToBooleanMigrations(tree);
  await propToAttributeValueMigrations(tree);
}
