import { Tree } from '@nrwl/devkit';

import {
  commonPackage,
  iconsPackage,
  illustrationsPackage,
  mobilePackage,
  mobileVisualizationPackage,
  webOverlaysPackage,
  webPackage,
  webVisualizationPackage,
} from '../../helpers';
import { upgradeCdsPackages as upgrader } from '../../helpers/upgradeCDSPackages';

// decomped packages are added in separate script (packageDecompMigrations.ts) which fires right after this.
const depsToAddMap = {
  [mobilePackage]: '^6.0.0',
  [webPackage]: '^6.0.0',
  [commonPackage]: '^6.0.0',
  [webOverlaysPackage]: '^1.0.0',
  [webVisualizationPackage]: '^1.0.0',
  [mobileVisualizationPackage]: '^1.0.0',
  // latest of other packages as of 1/18/24
  [iconsPackage]: '^2.4.0',
  [illustrationsPackage]: '^2.7.0',
};

export default async function upgradeCdsPackages(tree: Tree) {
  await upgrader(tree, depsToAddMap);
}
