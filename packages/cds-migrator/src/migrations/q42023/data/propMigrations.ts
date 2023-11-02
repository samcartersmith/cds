import {
  AttributeRenameMapShape,
  AttributeValueToBooleanType,
  ManualPropMigrationType,
  objectKeys,
  PropToAttributeValueMigrationShape,
  RenameAttributeMapShape,
} from '../../../helpers';

const spacingComponents = ['Box', 'HStack', 'VStack', 'Card', 'Group', 'ListCell', 'Grid'];
export const offsetRenameMap = {
  offsetTop: 'marginTop',
  offsetStart: 'marginLeft',
  offsetBottom: 'marginBottom',
  offsetEnd: 'marginRight',
  offsetHorizontal: 'marginHorizontal',
  offsetVertical: 'marginVertical',
  offset: 'margin',
};
export const spacingRenameMap = {
  spacingTop: 'paddingTop',
  spacingStart: 'paddingLeft',
  spacingBottom: 'paddingBottom',
  spacingEnd: 'paddingRight',
  spacingHorizontal: 'paddingHorizontal',
  spacingVertical: 'paddingVertical',
  spacing: 'padding',
};

const offsetConfigs: AttributeRenameMapShape = spacingComponents.reduce((acc, component) => {
  acc[component] = objectKeys(offsetRenameMap).map((oldAttribute) => ({
    oldAttribute,
    newAttribute: offsetRenameMap[oldAttribute],
  }));
  return acc;
}, {} as AttributeRenameMapShape);

const spacingConfigs: AttributeRenameMapShape = spacingComponents.reduce((acc, component) => {
  acc[component] = objectKeys(spacingRenameMap).map((oldAttribute) => ({
    oldAttribute,
    newAttribute: spacingRenameMap[oldAttribute],
  }));
  return acc;
}, {} as AttributeRenameMapShape);

export const renamedProps: AttributeRenameMapShape = {
  CellMedia: [
    {
      oldAttribute: 'shouldApplyDarkModeEnhacements',
      newAttribute: 'darkModeEnhancementsApplied',
    },
    {
      oldAttribute: 'title',
      newAttribute: 'accessibilityLabel',
    },
  ],
  HeroSquare: {
    oldAttribute: 'alt',
    newAttribute: 'accessibilityLabel',
    corePackageDependency: ['@cbhq/cds-mobile'],
  },
  Pictogram: {
    oldAttribute: 'alt',
    newAttribute: 'accessibilityLabel',
    corePackageDependency: ['@cbhq/cds-mobile'],
  },
  SpotSquare: {
    oldAttribute: 'alt',
    newAttribute: 'accessibilityLabel',
    corePackageDependency: ['@cbhq/cds-mobile'],
  },
  SpotRectangle: {
    oldAttribute: 'alt',
    newAttribute: 'accessibilityLabel',
    corePackageDependency: ['@cbhq/cds-mobile'],
  },
  DotSymbol: {
    oldAttribute: 'shouldApplyDarkModeEnhacements',
    newAttribute: 'darkModeEnhancementsApplied',
  },
  RemoteImage: {
    oldAttribute: 'shouldApplyDarkModeEnhacements',
    newAttribute: 'darkModeEnhancementsApplied',
  },
  RadioGroup: {
    oldAttribute: 'selectedValue',
    newAttribute: 'value',
  },
  Avatar: {
    oldAttribute: 'src',
    newAttribute: 'source',
  },
  TabIndicator: {
    oldAttribute: 'x',
    newAttribute: 'xPosition',
  },
  Accordion: [
    {
      oldAttribute: 'onItemPress',
      newAttribute: 'onChange',
    },
    {
      oldAttribute: 'defaultActiveKey',
      newAttribute: 'value',
    },
  ],
  ...offsetConfigs,
  ...spacingConfigs,
};

export const catchAllPropMigrations: RenameAttributeMapShape[] = [
  {
    oldAttribute: 'dangerouslySetClassName',
    newAttribute: 'className',
  },
  {
    oldAttribute: 'dangerouslySetStyle',
    newAttribute: 'style',
  },
  {
    oldAttribute: 'dangerouslySetColor',
    newAttribute: 'color',
  },
  {
    oldAttribute: 'dangerouslySetBackground',
    newAttribute: 'background',
  },
  {
    oldAttribute: 'dangerouslySetDuration',
    newAttribute: 'duration',
  },
  {
    oldAttribute: 'dangerouslySetSize',
    newAttribute: 'size',
  },
  {
    oldAttribute: 'dangerouslySetWidth',
    newAttribute: 'width',
  },
];

type RemovedProp = {
  props: string | string[];
  replacement: string;
  /** component path */
  path: string | string[];
};

export const removedProps: Record<string, RemovedProp> = {
  FeatureFlagProvider: {
    props: [
      'frontier',
      'frontierTypography',
      'frontierColors',
      'frontierCard',
      'frontierButton',
      'frontierSparkline',
    ],
    replacement:
      'All frontier styles have been adopted with CDS components. Please delete the usage of this flag & resolve and visual regressions',
    path: ['web/system', 'mobile/system'],
  },
};

// cell components use (inner|outer)Spacing with keys of offset*
const cellSpacingComponents = ['Cell', 'ContentCell', 'ListCell'];

export const manualPropMigrations = cellSpacingComponents.reduce((acc, component) => {
  acc[component] = {
    props: ['innerSpacing', 'outerSpacing'],
    valueKeys: [...Object.keys(offsetRenameMap)],
  };
  return acc;
}, {} as ManualPropMigrationType);

export const attributeValueToBooleanMigrations: AttributeValueToBooleanType = {
  LinearGradient: {
    oldAttribute: 'isBelowChildren', // defaults to true, so usage would be <LinearGradient isBelowChildren="false" />
    newAttribute: 'elevated', // defaults to false replace with <LinearGradient elevated />
    path: '@cbhq/cds-mobile/gradients',
  },
};

export const booleanToAttributeValueMigrations: PropToAttributeValueMigrationShape = {
  ButtonGroup: {
    oldAttribute: 'vertical',
    newAttribute: 'direction',
    value: 'vertical',
    paths: ['@cbhq/cds-web/buttons', '@cbhq/cds-mobile/buttons'],
  },
  ModalFooter: {
    oldAttribute: 'vertical',
    newAttribute: 'direction',
    value: 'vertical',
    paths: ['@cbhq/cds-web/overlays', '@cbhq/cds-mobile/overlays'],
  },
};
