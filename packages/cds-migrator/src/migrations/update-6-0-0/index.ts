import { Tree } from '@nrwl/devkit';

import revertDecomp from '../revert-decomp';
import packageDecompMigrations from '../update-decomp';

import attributeValueToBooleanMigrations from './attributeValueToBooleanMigrations';
import componentMigrations from './componentMigrations';
import hasFrontierMigrations from './hasFrontierMigrations';
import propMigrations from './propMigrations';
import propToAttributeValueMigrations from './propToAttributeValueMigrations';
import removedComponents from './removedComponents';
import removedPropMigrations from './removedPropMigrations';
import updateCDSPackagesToV6 from './updateCDSPackagesToV6';

export default async function main(tree: Tree) {
  await componentMigrations(tree);
  await removedComponents(tree);
  await propMigrations(tree);
  await removedPropMigrations(tree);
  await attributeValueToBooleanMigrations(tree);
  await propToAttributeValueMigrations(tree);
  await hasFrontierMigrations(tree);
  // decomp needs to happen first so the new dependencies are added
  await packageDecompMigrations(tree);
  // then decomped packages can be upgraded to v1 (if they're not already)
  await updateCDSPackagesToV6(tree);
  // migrates usages of decomped components back to web package
  await revertDecomp(tree);
}
