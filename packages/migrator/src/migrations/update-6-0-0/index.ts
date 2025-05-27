import { Tree } from '@nx/devkit';

import revertDecomp from '../revert-decomp';
import packageDecompMigrations from '../update-decomp';

import addDependencies from './addDependencies';
import renamedAttributeAndValueMigrations from './attributeAndValueMigrations';
import attributeValueToBooleanMigrations from './attributeValueToBooleanMigrations';
import cardBodyMigration from './cardBodyMigration';
import componentMigrations from './componentMigrations';
import hasFrontierMigrations from './hasFrontierMigrations';
import pathMigrations from './pathMigrations';
import propMigrations from './propMigrations';
import propToAttributeValueMigrations from './propToAttributeValueMigrations';
import removedComponents from './removedComponents';
import removedPropMigrations from './removedPropMigrations';
import updateCDSPackagesToV6 from './updateCDSPackagesToV6';

export default async function main(tree: Tree) {
  await cardBodyMigration(tree);
  await componentMigrations(tree);
  await removedComponents(tree);
  await propMigrations(tree);
  await removedPropMigrations(tree);
  await attributeValueToBooleanMigrations(tree);
  await propToAttributeValueMigrations(tree);
  await hasFrontierMigrations(tree);
  await pathMigrations(tree);
  await renamedAttributeAndValueMigrations(tree);
  // decomp needs to happen first so the new dependencies are added
  await packageDecompMigrations(tree);
  // then decomped packages can be upgraded to v1 (if they're not already)
  await updateCDSPackagesToV6(tree);
  // migrates usages of decomped components back to web package
  await revertDecomp(tree);
  await addDependencies(tree);
}
