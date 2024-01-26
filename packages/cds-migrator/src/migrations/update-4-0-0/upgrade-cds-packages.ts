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
  [mobilePackage]: '^4.0.0',
  [iconsPackage]: '^1.0.0',
  [illustrationsPackage]: '^1.0.0',
  [webPackage]: '^4.0.0',
  [commonPackage]: '^4.0.0',
  [lottieFilesPackage]: '^1.0.1',
};

export default async function upgradeCDSPackages(tree: Tree) {
  await upgrader(tree, depsToAddMap);
}
