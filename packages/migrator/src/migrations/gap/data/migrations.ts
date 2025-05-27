import { AttributeRenameMapShape, webPackage } from '../../../helpers';

export const gapMigrations: AttributeRenameMapShape = {
  HStack: {
    oldAttribute: 'gap',
    newAttribute: 'spacerGap',
    corePackageDependency: webPackage,
  },
  VStack: {
    oldAttribute: 'gap',
    newAttribute: 'spacerGap',
    corePackageDependency: webPackage,
  },
};
