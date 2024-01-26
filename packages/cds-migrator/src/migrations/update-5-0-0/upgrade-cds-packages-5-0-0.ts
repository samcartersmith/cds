import { Tree } from '@nrwl/devkit';

import {
  commonPackage,
  iconsPackage,
  illustrationsPackage,
  lottieFilesPackage,
  mobilePackage,
  webPackage,
} from '../../helpers';
import { upgradeCdsPackages as upgrader } from '../../helpers/upgradeCDSPackages';

const depsToAddMap = {
  [iconsPackage]: '^2.1.0',
  [lottieFilesPackage]: '^1.0.2',
  // this includes the spoticon break
  [illustrationsPackage]: '^2.1.0',
  // this includes the spoticon break
  [webPackage]: '^5.10.0',
  [commonPackage]: '^5.10.0',
  [mobilePackage]: '^5.10.0',
};

export default async function upgradeCdsPackages(tree: Tree) {
  await upgrader(tree, depsToAddMap);
}
