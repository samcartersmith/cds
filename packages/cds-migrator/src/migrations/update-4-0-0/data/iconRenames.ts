import { AttributeValueRenameMapShape } from '../../../helpers/types';

export const iconRenames: AttributeValueRenameMapShape = {
  Icon: {
    attribute: 'name',
    valueMap: {
      breifcase: 'briefcase',
      checkbox: 'checkboxChecked',
      pencilAlt: 'pencil',
    },
  },
  NavigationIcon: {
    attribute: 'name',
    valueMap: {
      activityNav: 'activity',
      commentNav: 'comment',
      copyNav: 'copy',
      ghostNav: 'ghost',
      hammerNav: 'hammer',
      heartNav: 'heart',
      royaltyNav: 'royalty',
    },
  },
};
