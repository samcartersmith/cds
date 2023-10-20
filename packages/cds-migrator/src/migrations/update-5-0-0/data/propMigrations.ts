import {
  AttributeValueRenameMapShape,
  PropToAttributeValue,
  PropToAttributeValueMigrationShape,
  RenameValueMapShape,
} from '../../../helpers';

// Migrations for both web and mobile packages
export const migrateBooleanPropToAttributeAndValueMigrations: PropToAttributeValueMigrationShape = {
  Group: {
    oldAttribute: 'horizontal',
    newAttribute: 'direction',
    value: 'horizontal',
    paths: ['@cbhq/cds-web/layout', '@cbhq/cds-mobile/layout'],
  },
};

export const manualPropMigrations: Record<string, PropToAttributeValue[]> = {
  Cell: [
    {
      oldAttribute: 'reduceHorizontalSpacing',
      newAttribute: 'innerSpacing',
      value: '{ spacingHorizontal: 1 }',
      paths: ['@cbhq/cds-web/cells', '@cbhq/cds-mobile/cells'],
    },
    {
      oldAttribute: 'offsetHorizontal',
      newAttribute: 'outerSpacing',
      value: '{ offsetHorizontal: 2 }',
      paths: ['@cbhq/cds-web/cells', '@cbhq/cds-mobile/cells'],
    },
  ],
  ContentCell: [
    {
      oldAttribute: 'reduceHorizontalSpacing',
      newAttribute: 'innerSpacing',
      value: '{ spacingHorizontal: 1 }',
      paths: ['@cbhq/cds-web/cells', '@cbhq/cds-mobile/cells'],
    },
    {
      oldAttribute: 'offsetHorizontal',
      newAttribute: 'outerSpacing',
      value: '{ offsetHorizontal: 2 }',
      paths: ['@cbhq/cds-web/cells', '@cbhq/cds-mobile/cells'],
    },
  ],
  ListCell: [
    {
      oldAttribute: 'reduceHorizontalSpacing',
      newAttribute: 'innerSpacing',
      value: '{ spacingHorizontal: 1 }',
      paths: ['@cbhq/cds-web/cells', '@cbhq/cds-mobile/cells'],
    },
    {
      oldAttribute: 'offsetHorizontal',
      newAttribute: 'outerSpacing',
      value: '{ offsetHorizontal: 2 }',
      paths: ['@cbhq/cds-web/cells', '@cbhq/cds-mobile/cells'],
    },
  ],
};

export const propValueMigrations: AttributeValueRenameMapShape = {
  SpotSquare: {
    attribute: 'dimension',
    valueMap: {
      '120x120': '96x96',
    },
    paths: ['@cbhq/cds-web/illustrations', '@cbhq/cds-mobile/illustrations'],
  },
  Pictogram: {
    attribute: 'dimension',
    valueMap: {
      '96x96': '64x64',
    },
    paths: ['@cbhq/cds-web/illustrations', '@cbhq/cds-mobile/illustrations'],
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

export const catchAllPropValueMigrations: Omit<RenameValueMapShape, 'paths'>[] = [
  {
    attribute: 'borderRadius',
    valueMap: {
      none: 'roundedNone',
      compact: 'roundedSmall',
      tooltipV2: 'rounded',
      standard: 'rounded',
      badge: 'rounded',
      tooltip: 'roundedLarge',
      pill: 'roundedLarge',
      round: 'roundedFull',
      input: 'rounded',
      search: 'roundedFull',
      popover: 'roundedLarge',
    },
  },
];
