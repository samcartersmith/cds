import { Tree } from '@nrwl/devkit';

import { upgradeCdsPackages as upgrader } from '../../helpers/upgradeCDSPackages';

const depsToAddMap = {
  mobile: {
    '@cbhq/cds-mobile': '^4.0.0',
    '@cbhq/cds-icons': '^1.0.0',
    '@cbhq/cds-illustrations': '^1.0.0',
  },
  web: {
    '@cbhq/cds-web': '^4.0.0',
    '@cbhq/cds-icons': '^1.0.0',
    '@cbhq/cds-illustrations': '^1.0.0',
  },
  common: {
    '@cbhq/cds-common': '^4.0.0',
  },
  'lottie-files': {
    '@cbhq/cds-lottie-files': '^1.0.1',
  },
};

export default async function upgradeCDSPackages(tree: Tree) {
  await upgrader(tree, depsToAddMap);
}
