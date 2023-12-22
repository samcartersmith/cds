import { Tree } from '@nrwl/devkit';

import { upgradeCdsPackages as upgrader } from '../../helpers/upgradeCDSPackages';

const depsToAddMap = {
  mobile: {
    '@cbhq/cds-mobile': '^6.0.0',
  },
  web: {
    '@cbhq/cds-web': '^6.0.0',
  },
  common: {
    '@cbhq/cds-common': '^6.0.0',
  },
};

export default async function upgradeCdsPackages(tree: Tree) {
  await upgrader(tree, depsToAddMap);
}
