import renameIcons from './update-4-0-0/rename-icons';
import renameIllustrations from './update-4-0-0/rename-illustrations';
import updateIconFontCssImports from './update-4-0-0/update-icon-font-css-imports';
import updateReactNativeConfig from './update-4-0-0/update-react-native-config';
import upgradeCdsPackages from './update-4-0-0/upgrade-cds-packages';

export const migrations = {
  '4.0.0': [
    upgradeCdsPackages,
    updateReactNativeConfig,
    updateIconFontCssImports,
    renameIcons,
    renameIllustrations,
  ],
};
