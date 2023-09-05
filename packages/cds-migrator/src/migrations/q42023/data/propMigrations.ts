import {
  AttributeRenameMapShape,
  AttributeValueToBooleanType,
  objectKeys,
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
  CellMedia: {
    oldAttribute: 'shouldApplyDarkModeEnhacements',
    newAttribute: 'darkModeEnhancementsApplied',
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

// cell components use (inner|outer)Spacing with keys of offset*
const cellSpacingComponents = ['Cell', 'ContentCell', 'ListCell'];

type ManualPropMigrationType = Record<
  string,
  {
    // Component attribute
    props: string[];
    // Prop value as object, get the keys eg: <Cell innerSpacing={{ offsetTop: 10 }} /> => ['offsetTop']
    valueKeys: string[];
  }
>;

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
