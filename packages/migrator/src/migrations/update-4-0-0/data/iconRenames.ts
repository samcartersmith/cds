import { AttributeValueRenameMapShape } from '../../../helpers/types';

export const iconRenames: AttributeValueRenameMapShape = {
  Icon: {
    attribute: 'name',
    valueMap: {
      breifcase: 'briefcase',
      checkbox: 'checkboxChecked',
      pencilAlt: 'pencil',
    },
    paths: ['@cbhq/cds-web/icons', '@cbhq/cds-mobile/icons'],
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
    paths: ['@cbhq/cds-web/icons', '@cbhq/cds-mobile/icons'],
  },
};
