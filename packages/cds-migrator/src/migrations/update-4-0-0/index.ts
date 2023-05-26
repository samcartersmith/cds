import { Tree } from '@nrwl/devkit';

import renameIcons from './rename-icons';
import renameIllustrations from './rename-illustrations';
import updateIconFontCssImports from './update-icon-font-css-imports';
import updateReactNativeConfig from './update-react-native-config';
import upgradeCdsPackages from './upgrade-cds-packages';

export default async function main(tree: Tree) {
  await upgradeCdsPackages(tree);
  await updateReactNativeConfig(tree);
  await updateIconFontCssImports(tree);
  await renameIcons(tree);
  await renameIllustrations(tree);
}
