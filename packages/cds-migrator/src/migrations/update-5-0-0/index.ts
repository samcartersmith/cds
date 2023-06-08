import { Tree } from '@nrwl/devkit';

import componentMigrations from './componentMigrations';
import flagPotentialA11yStyleChange from './flag-potential-style-change';
import functionMigrations from './functionMigrations';
import packageDecompMigrations from './packageDecompMigrations';
import propToAttributeAndValueMigrations from './propToAttributeAndValueMigrations';
import propValueMigrations from './propValueMigrations';
import removedComponents from './removedComponents';
import removedFunctions from './removedFunctions';
import removedImports from './removedImports';
import removedParams from './removedParams';
import removedPropCatchallMigrations from './removedPropCatchallMigrations';
import removedPropMigrations from './removedPropMigrations';
import replacedPathMigrations from './replacedPathMigrations';
import upgradeCdsPackageTo5 from './upgrade-cds-packages-5-0-0';

export default async function main(tree: Tree) {
  await removedImports(tree);
  await replacedPathMigrations(tree);
  await removedParams(tree);
  await removedFunctions(tree);
  await functionMigrations(tree);
  await propToAttributeAndValueMigrations(tree);
  await propValueMigrations(tree);
  await removedPropMigrations(tree);
  await removedPropCatchallMigrations(tree);
  await removedComponents(tree);
  await componentMigrations(tree);
  await packageDecompMigrations(tree);
  await flagPotentialA11yStyleChange(tree);
  await upgradeCdsPackageTo5(tree);
}
