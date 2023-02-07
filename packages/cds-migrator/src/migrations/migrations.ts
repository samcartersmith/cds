import addIconPackage from './update-4-0-0/add-icons-package';
import addIllustrationPackage from './update-4-0-0/add-illustrations-package';
import renameIcons from './update-4-0-0/rename-icons';
import renameIllustrations from './update-4-0-0/rename-illustrations';
import updateReactNativeConfig from './update-4-0-0/update-react-native-config';

export const migrations = {
  '4.0.0': [
    addIconPackage,
    addIllustrationPackage,
    updateReactNativeConfig,
    renameIcons,
    renameIllustrations,
  ],
};
