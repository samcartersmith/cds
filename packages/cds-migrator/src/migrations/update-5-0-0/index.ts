import { Tree } from '@nrwl/devkit';

import componentMigrations from './componentMigrations';
import functionMigrations from './functionMigrations';
import manualPropMigrations from './manualPropMigrations';
import propToAttributeAndValueMigrations from './propToAttributeAndValueMigrations';
import propValueCatchAllMigrations from './propValueCatchAllMigrations';
import propValueMigrations from './propValueMigrations';
import removedComponents from './removedComponents';
import removedFunctions from './removedFunctions';
import removedImports from './removedImports';
import removedParams from './removedParams';
import removedPropCatchallMigrations from './removedPropCatchallMigrations';
import removedPropMigrations from './removedPropMigrations';
import replacedPathMigrations from './replacedPathMigrations';
import upgradePackages from './upgrade-cds-packages-5-0-0';

export default async function main(tree: Tree) {
  await propValueCatchAllMigrations(tree);
  await upgradePackages(tree);
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
  await manualPropMigrations(tree);
}
