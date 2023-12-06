import { Tree } from '@nrwl/devkit';

import attributeValueToBooleanMigrations from './attributeValueToBooleanMigrations';
import catchAllPropMigrations from './catchAllPropMigrations';
import componentMigrations from './componentMigrations';
import pathMigrations from './pathMigrations';
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
  await attributeValueToBooleanMigrations(tree);
  await propToAttributeValueMigrations(tree);
  await pathMigrations(tree);
}
