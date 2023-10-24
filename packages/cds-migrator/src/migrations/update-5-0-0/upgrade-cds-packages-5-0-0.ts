import { Tree } from '@nrwl/devkit';

import { upgradeCdsPackages as upgrader } from '../../helpers/upgradeCDSPackages';

const depsToAddMap = {
  mobile: {
    '@cbhq/cds-mobile': '^5.0.0',
    '@cbhq/cds-icons': '^1.3.0',
    '@cbhq/cds-illustrations': '^2.1.0',
  },
  web: {
    '@cbhq/cds-web': '^5.0.0',
    '@cbhq/cds-icons': '^1.3.0',
    '@cbhq/cds-illustrations': '^2.1.0',
  },
  common: {
    '@cbhq/cds-common': '^5.0.0',
  },
  'lottie-files': {
    '@cbhq/cds-lottie-files': '^1.0.2',
  },
};

export default async function upgradeCdsPackages(tree: Tree) {
  await upgrader(tree, depsToAddMap);
}
