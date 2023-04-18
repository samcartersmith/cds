import renameIcons from './update-4-0-0/rename-icons';
import renameIllustrations from './update-4-0-0/rename-illustrations';
import updateIconFontCssImports from './update-4-0-0/update-icon-font-css-imports';
import updateReactNativeConfig from './update-4-0-0/update-react-native-config';
import upgradeCdsPackages from './update-4-0-0/upgrade-cds-packages';
import flagPotentialA11yStyleChange from './update-5-0-0/flag-potential-style-change';
import upgradeCdsPackageTo5 from './update-5-0-0/upgrade-cds-packages-5-0-0';

export const migrations = {
  '4.0.0': [
    upgradeCdsPackages,
    updateReactNativeConfig,
    updateIconFontCssImports,
    renameIcons,
    renameIllustrations,
  ],
  '5.0.0': [upgradeCdsPackageTo5, flagPotentialA11yStyleChange],
};
