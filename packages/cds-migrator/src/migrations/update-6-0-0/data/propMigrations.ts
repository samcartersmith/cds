import {
  AttributeRenameMapShape,
  AttributeValueToBooleanType,
  deepMerge,
  mobilePackage,
  PropToAttributeValueMigrationShape,
  RemovedProp,
  webPackage,
} from '../../../helpers';

const classNameConfig = {
  oldAttribute: 'dangerouslySetClassName',
  newAttribute: 'className',
};
const styleConfig = {
  oldAttribute: 'dangerouslySetStyle',
  newAttribute: 'style',
};

const textComponents = [
  'TextDisplay1',
  'TextDisplay2',
  'TextDisplay3',
  'TextTitle1',
  'TextTitle2',
  'TextTitle3',
  'TextTitle4',
  'TextHeadline',
  'TextBody',
  'TextLabel1',
  'TextLabel2',
  'TextCaption',
  'TextLegal',
];

const commonComponents = [
  'Box',
  'VStack',
  'HStack',
  'Group',
  'Card',
  'Banner',
  'RemoteImage',
  'Avatar',
  'Grid',
  'GridColumn',
  'Divider',
];

const classNameComponents = [
  ...textComponents,
  ...commonComponents,
  'NavLink',
  'CellAccessory',
  'Cell',
  'InputLabel',
  'Modal',
  'ModalWrapper',
  'Table',
  'TableCell',
  'TableSection',
  'Link',
];

const styleComponents = [
  ...textComponents,
  ...commonComponents,
  'Icon',
  'TextIcon',
  'ProgressIndicator',
  'CarouselControlsWrapper',
  'Collapsible',
  'OverflowGradient',
  'AnimatedCaret',
  'Tag',
];

const classNameConfigs: AttributeRenameMapShape = classNameComponents.reduce((acc, component) => {
  acc[component] = classNameConfig;
  return acc;
}, {} as AttributeRenameMapShape);
const styleConfigs: AttributeRenameMapShape = styleComponents.reduce((acc, component) => {
  acc[component] = styleConfig;

  return acc;
}, {} as AttributeRenameMapShape);

const renamedPropConfigs: AttributeRenameMapShape = {
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
    corePackageDependency: mobilePackage,
  },
  Pictogram: {
    oldAttribute: 'alt',
    newAttribute: 'accessibilityLabel',
    corePackageDependency: mobilePackage,
  },
  SpotSquare: {
    oldAttribute: 'alt',
    newAttribute: 'accessibilityLabel',
    corePackageDependency: mobilePackage,
  },
  SpotRectangle: {
    oldAttribute: 'alt',
    newAttribute: 'accessibilityLabel',
    corePackageDependency: mobilePackage,
  },
  DotSymbol: {
    oldAttribute: 'shouldApplyDarkModeEnhacements',
    newAttribute: 'darkModeEnhancementsApplied',
  },
  RemoteImage: {
    oldAttribute: 'shouldApplyDarkModeEnhacements',
    newAttribute: 'darkModeEnhancementsApplied',
  },
  RadioGroup: [
    {
      oldAttribute: 'selectedValue',
      newAttribute: 'value',
    },
    {
      oldAttribute: 'aria-labelledby',
      newAttribute: 'accessibilityLabelledBy',
      corePackageDependency: webPackage,
    },
  ],
  Accordion: [
    {
      oldAttribute: 'onItemPress',
      newAttribute: 'onChange',
    },
  ],
  Tag: [
    {
      oldAttribute: 'dangerouslySetColor',
      newAttribute: 'color',
    },
    {
      oldAttribute: 'dangerouslySetBackground',
      newAttribute: 'background',
    },
  ],
  Modal: {
    oldAttribute: 'dangerouslySetWidth',
    newAttribute: 'width',
  },
  Alert: {
    oldAttribute: 'dangerouslySetWidth',
    newAttribute: 'width',
  },
  Toast: {
    oldAttribute: 'dangerouslySetDuration',
    newAttribute: 'duration',
  },
  Interactable: {
    oldAttribute: 'backgroundColor',
    newAttribute: 'background',
  },
  Pressable: {
    oldAttribute: 'backgroundColor',
    newAttribute: 'background',
  },
  Control: {
    oldAttribute: 'backgroundColor',
    newAttribute: 'background',
    corePackageDependency: webPackage,
  },
};

// merging in case of duplicate keys
export const renamedProps = deepMerge(renamedPropConfigs, classNameConfigs, styleConfigs);

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
      'All frontier styles have been enabled by default within CDS libraries. Manually QA affected surfaces. See go/cds6-breaking-changes for details.',
    path: ['web/system', 'mobile/system', 'common/system'],
  },
};

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
    paths: ['@cbhq/cds-mobile/overlays'],
  },
};
