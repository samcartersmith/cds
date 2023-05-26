import {
  AttributeValueRenameMapShape,
  PropToAttributeValueMigrationShape,
} from '../../../helpers/types';

// Migrations for both web and mobile packages
export const migrateBooleanPropToAttributeAndValueMigrations: PropToAttributeValueMigrationShape = {
  Group: {
    oldAttribute: 'horizontal',
    newAttribute: 'direction',
    value: 'horizontal',
  },
};

export const propValueMigrations: AttributeValueRenameMapShape = {
  SpotSquare: {
    attribute: 'dimension',
    valueMap: {
      '120x120': '96x96',
    },
  },
  Pictogram: {
    attribute: 'dimension',
    valueMap: {
      '96x96': '64x64',
    },
  },
};

type RemovedProp = {
  prop: string;
  replacement: string;
  /** component path */
  path: string | string[];
};

export const removedProps: Record<string, RemovedProp> = {
  Icon: {
    prop: 'badge',
    replacement: 'use DotCount, DotColor, DotSymbol instead',
    path: ['web/icons', 'mobile/icons'],
  },
  NavigationIcon: {
    prop: 'badge',
    replacement: 'use DotCount, DotColor, DotSymbol instead',
    path: ['mobile/icons', 'web/icons'],
  },
  TableCell: {
    prop: 'dangerouslySetHtmlWidth',
    replacement: 'use width instead',
    path: 'web/tables',
  },
};

// this is used in all Typography components so just going to look for files with CDS web/mobile imports and surface a warning if prop is present
export const removedPropsCatchAll = ['deprecatedLineHeight'];
