import { Component, Deprecation, FunctionDeprecation, Param, Prop } from '../types';

const alphaComponents = [
  { name: 'AnnouncementCard', newPath: 'cards' },
  { name: 'FeatureEntryCard', newPath: 'cards' },
  { name: 'Button', newPath: 'buttons' },
  { name: 'IconButton', newPath: 'buttons' },
  { name: 'CardGroup', newPath: 'cards' },
  { name: 'CardMedia', newPath: 'cards' },
  { name: 'FeedCard', newPath: 'cards' },
  { name: 'CardFooter', newPath: 'cards' },
  { name: 'CardBody', newPath: 'cards' },
  { name: 'DataCard', newPath: 'cards' },
];

const alphaComponentWebMigrations: Partial<Component>[] = alphaComponents.map(
  ({ name, newPath }) => ({
    name,
    package: 'web',
    type: ['alpha', 'path'],
    path: `packages/web/alpha/${name}.tsx`,
    migrationMap: {
      path: `packages/web/${newPath}/${name}.tsx`,
    },
  }),
);
const alphaComponentMobileMigrations: Partial<Component>[] = alphaComponents.map(
  ({ name, newPath }) => ({
    name,
    package: 'web',
    type: ['alpha', 'path'],
    path: `packages/web/alpha/${name}.tsx`,
    migrationMap: {
      path: `packages/web/${newPath}/${name}.tsx`,
    },
  }),
);

const componentDeprecations: Partial<Component>[] = [
  ...alphaComponentWebMigrations,
  ...alphaComponentMobileMigrations,
  {
    package: 'mobile',
    name: 'FiatIcon',
    type: ['replaced'],
    path: 'packages/mobile/icons/FiatIcon.tsx',
    scope: {
      exportNames: ['FiatIcon'],
    },
    migrationMap: {
      replaced: 'Icon',
    },
  },
  {
    package: 'web',
    name: 'Illustration',
    type: ['replaced'],
    path: 'packages/web/illustrations/Illustration.tsx',
    scope: {
      exportNames: ['Illustration'],
    },
    migrationMap: {
      replaced: ['Pictogram', 'HeroSquare', 'SpotSquare', 'SpotRectangle'],
    },
  },
  {
    package: 'mobile',
    name: 'Illustration',
    type: ['replaced'],
    path: 'packages/mobile/illustrations/Illustration.tsx',
    scope: {
      exportNames: ['Illustration'],
    },
    migrationMap: {
      replaced: ['Pictogram', 'HeroSquare', 'SpotSquare', 'SpotRectangle'],
    },
  },
  {
    name: 'FeatureEntryCard',
    package: 'mobile',
    type: 'replaced',
    path: 'packages/mobile/cards/FeatureEntryCard.tsx',
    migrationMap: {
      replaced: ['NudgeCard', 'UpsellCard'],
    },
  },
  {
    name: 'AnnouncementCard',
    package: 'mobile',
    path: 'packages/mobile/cards/FeatureEntryCard.tsx',
    type: 'replaced',
    migrationMap: {
      replaced: ['NudgeCard', 'UpsellCard'],
    },
  },
  {
    name: 'FeatureEntryCard',
    package: 'web',
    type: 'replaced',
    path: 'packages/web/cards/FeatureEntryCard.tsx',
    migrationMap: {
      replaced: ['NudgeCard', 'UpsellCard'],
    },
  },
  {
    name: 'AnnouncementCard',
    package: 'web',
    path: 'packages/web/cards/FeatureEntryCard.tsx',
    type: 'replaced',
    migrationMap: {
      replaced: ['NudgeCard', 'UpsellCard'],
    },
  },
  {
    name: 'FeatureEntryCard',
    package: 'mobile',
    type: ['alpha', 'replaced'],
    path: 'packages/mobile/alpha/FeatureEntryCard.tsx',
    migrationMap: {
      replaced: ['NudgeCard', 'UpsellCard'],
    },
  },
  {
    name: 'AnnouncementCard',
    package: 'mobile',
    path: 'packages/mobile/alpha/FeatureEntryCard.tsx',
    type: ['alpha', 'replaced'],
    migrationMap: {
      replaced: ['NudgeCard', 'UpsellCard'],
    },
  },
  {
    name: 'FeatureEntryCard',
    package: 'web',
    type: ['alpha', 'replaced'],
    path: 'packages/web/alpha/FeatureEntryCard.tsx',
    migrationMap: {
      replaced: ['NudgeCard', 'UpsellCard'],
    },
  },
  {
    name: 'AnnouncementCard',
    package: 'web',
    path: 'packages/web/alpha/FeatureEntryCard.tsx',
    type: ['alpha', 'replaced'],
    migrationMap: {
      replaced: ['NudgeCard', 'UpsellCard'],
    },
  },
  {
    package: 'web',
    name: 'CardSpotRectangle',
    type: ['replaced'],
    path: 'packages/web/cards/CardMedia.tsx',
    scope: {
      exportNames: ['CardSpotRectangle'],
    },
    migrationMap: {
      replaced: ['CardMedia'],
    },
  },
  {
    package: 'web',
    name: 'CardSpotSquare',
    type: ['replaced'],
    path: 'packages/web/cards/CardMedia.tsx',
    scope: {
      exportNames: ['CardSpotSquare'],
    },
    migrationMap: {
      replaced: ['CardMedia'],
    },
  },
  {
    package: 'web',
    name: 'CardPictogram',
    type: ['replaced'],
    path: 'packages/web/cards/CardMedia.tsx',
    scope: {
      exportNames: ['CardPictogram'],
    },
    migrationMap: {
      replaced: ['CardMedia'],
    },
  },
  {
    package: 'mobile',
    name: 'CardSpotRectangle',
    type: ['replaced'],
    path: 'packages/mobile/cards/CardMedia.tsx',
    scope: {
      exportNames: ['CardSpotRectangle'],
    },
    migrationMap: {
      replaced: ['CardMedia'],
    },
  },
  {
    package: 'mobile',
    name: 'CardSpotSquare',
    type: ['replaced'],
    path: 'packages/mobile/cards/CardMedia.tsx',
    scope: {
      exportNames: ['CardSpotSquare'],
    },
    migrationMap: {
      replaced: ['CardMedia'],
    },
  },
  {
    package: 'mobile',
    name: 'CardPictogram',
    type: ['replaced'],
    path: 'packages/mobile/cards/CardMedia.tsx',
    scope: {
      exportNames: ['CardPictogram'],
    },
    migrationMap: {
      replaced: ['CardMedia'],
    },
  },
  {
    package: 'mobile',
    name: 'Collapsible',
    type: ['alpha', 'path'],
    path: 'packages/mobile/alpha/Collapsible.tsx',
    migrationMap: {
      path: 'packages/mobile/collapsible',
    },
  },
  {
    package: 'web',
    name: 'VStack',
    type: ['alpha', 'path'],
    path: 'packages/web/alpha/VStack.tsx',
    migrationMap: {
      path: 'packages/web/layout',
    },
  },
  {
    package: 'web',
    name: 'HStack',
    type: ['alpha', 'path'],
    path: 'packages/web/alpha/HStack.tsx',
    migrationMap: {
      path: 'packages/web/layout',
    },
  },
];

const propDeprecations: Prop[] = [
  {
    name: 'frontier',
    components: ['FeatureFlagProvider', 'Card', 'Button', 'Sparkline', 'Typography'],
    type: 'removed',
    package: 'common',
  },
  {
    name: 'frontierTypography',
    components: ['FeatureFlagProvider', 'Card', 'Button', 'Sparkline', 'Typography'],
    type: 'removed',
    package: 'common',
  },
  {
    name: 'frontierButton',
    components: ['FeatureFlagProvider', 'Card', 'Button', 'Sparkline', 'Typography'],
    type: 'removed',
    package: 'common',
  },
  {
    name: 'frontierColor',
    components: ['FeatureFlagProvider', 'Card', 'Button', 'Sparkline', 'Typography'],
    type: 'removed',
    package: 'common',
  },
  {
    name: 'frontierCard',
    components: ['FeatureFlagProvider', 'Card', 'Button', 'Sparkline', 'Typography'],
    type: 'removed',
    package: 'common',
  },
  {
    name: 'frontierSparkline',
    components: ['FeatureFlagProvider', 'Card', 'Button', 'Sparkline', 'Typography'],
    type: 'removed',
    package: 'common',
  },
  {
    name: 'title',
    components: ['CellMedia'],
    package: 'web',
    type: 'api',
    migrationMap: {
      api: {
        title: 'accessibilityLabel',
      },
    },
  },
  {
    name: 'title',
    components: ['CellMedia'],
    package: 'mobile',
    type: 'api',
    migrationMap: {
      api: {
        title: 'accessibilityLabel and accessibilityHint',
      },
    },
  },
  {
    name: 'alt',
    components: ['HeroSquare', 'Pictogram', 'SpotSquare', 'SpotRectangle'],
    package: 'mobile',
    type: 'api',
    migrationMap: {
      api: {
        alt: 'accessibilityLabel and accessibilityHint',
      },
    },
  },

  {
    name: 'shouldApplyDarkModeEnhacements',
    components: ['CellMedia', 'DotSymbol', 'RemoteImage'],
    type: 'api',
    migrationMap: {
      api: { shouldApplyDarkModeEnhacements: 'darkModeEnhancementsApplied' },
    },
    package: 'mobile',
  },
  {
    name: 'selectedValue',
    components: ['RadioGroup'],
    type: 'api',
    migrationMap: {
      api: { selectedValue: 'value' },
    },
    package: 'common',
  },
  {
    name: 'x',
    components: ['TabIndicator'],
    type: 'api',
    migrationMap: {
      api: { x: 'xPosition' },
    },
    package: 'common',
  },
  {
    name: 'onItemPress',
    components: ['Accordion'],
    type: 'api',
    migrationMap: {
      api: { onItemPress: 'onChange' },
    },
    package: 'common',
  },
  {
    name: 'defaultActiveKey',
    components: ['Accordion'],
    type: 'api',
    migrationMap: {
      api: { defaultActiveKey: 'value' },
    },
    package: 'common',
  },
  {
    name: 'isBelowChildren',
    components: ['LinearGradient'],
    type: 'api',
    migrationMap: {
      api: { isBelowChildren: 'elevated' },
    },
    package: 'mobile',
  },
  {
    name: 'dangerouslySetClassName',
    type: 'api',
    package: 'web',
    migrationMap: {
      api: { dangerouslySetClassName: 'className' },
    },
  },
  {
    name: 'dangerouslySetStyle',
    type: 'api',
    package: 'mobile',
    migrationMap: {
      api: { dangerouslySetStyle: 'style' },
    },
  },
  {
    name: 'dangerouslySetColor',
    type: 'api',
    package: 'common',
    migrationMap: {
      api: { dangerouslySetColor: 'color' },
    },
    components: ['Tag', 'Text', 'Icon'],
  },
  {
    name: 'dangerouslySetDuration',
    type: 'api',
    package: 'common',
    migrationMap: {
      api: { dangerouslySetDuration: 'duration' },
    },
    components: ['Toast'],
  },
  {
    name: 'dangerouslySetBackground',
    type: 'api',
    package: 'common',
    migrationMap: {
      api: { dangerouslySetBackground: 'background' },
    },
    components: ['Tag', 'Box', 'HStack', 'VStack', 'ProgressBar', 'Avatar', 'Popover'],
  },
  {
    name: 'dangerouslySetSize',
    type: 'api',
    package: 'common',
    migrationMap: {
      api: { dangerouslySetSize: 'size' },
    },
    components: ['AvatarButton', 'Avatar'],
  },
  {
    name: 'dangerouslySetWidth',
    type: 'api',
    package: 'common',
    migrationMap: {
      api: { dangerouslySetWidth: 'width' },
    },
    components: ['Alert', 'Modal'],
  },
  {
    name: 'aria-labelledby',
    type: 'api',
    package: 'web',
    migrationMap: {
      api: { 'aria-labelledby': 'accessibilityLabelledBy' },
    },
    components: ['RadioGroup'],
  },
  {
    name: 'backgroundColor',
    type: 'api',
    package: 'web',
    migrationMap: {
      api: { backgroundColor: 'background' },
    },
    components: ['Interactable', 'Pressable', 'Control'],
  },
  {
    name: 'horizontal',
    components: ['ButtonGroup', 'ModalFooter'],
    package: 'common',
    type: 'api',
    migrationMap: {
      api: {
        horizontal: 'direction',
      },
    },
  },
];

const functionDeprecations: FunctionDeprecation[] = [
  {
    name: 'selectContext',
    path: 'packages/web/controls/selectContext.ts',
    package: 'web',
    type: ['replaced', 'path'],
    migrationMap: {
      path: 'packages/web-overlays/select/selectContext.ts',
    },
    exportNames: ['selectContext', 'SelectContextType', 'SelectContext', 'SelectProvider'],
  },
  {
    name: 'createAnnouncementCard',
    path: 'packages/common/cards/createAnnouncementCard.tsx',
    package: 'common',
    type: 'replaced',
    migrationMap: {
      replaced: ['NudgeCard', 'UpsellCard'],
    },
    exportNames: ['createAnnouncementCard'],
  },
  {
    name: 'createAnnouncementCardDeprecated',
    path: 'packages/common/cards/createAnnouncementCardDeprecated.tsx',
    package: 'common',
    type: 'replaced',
    migrationMap: {
      replaced: ['NudgeCard', 'UpsellCard'],
    },
    exportNames: ['createAnnouncementCardDeprecated'],
  },
  {
    name: 'createFeatureEntryCard',
    path: 'packages/common/cards/createFeatureEntryCard.tsx',
    package: 'common',
    type: 'replaced',
    migrationMap: {
      replaced: ['NudgeCard', 'UpsellCard'],
    },
    exportNames: ['createFeatureEntryCard', 'FeatureEntryCardProps'],
  },
  {
    name: 'AnnouncementCard',
    path: 'packages/mobile/alpha/AnnouncementCard.tsx',
    package: 'mobile',
    type: ['alpha', 'replaced'],
    migrationMap: {
      replaced: ['NudgeCard', 'UpsellCard'],
    },
    exportNames: ['AnnouncementCard', 'AnnouncementCardProps'],
  },
  {
    name: 'AnnouncementCard',
    path: 'packages/web/alpha/AnnouncementCard.tsx',
    package: 'web',
    type: ['alpha', 'replaced'],
    migrationMap: {
      replaced: ['NudgeCard', 'UpsellCard'],
    },
    exportNames: ['AnnouncementCard', 'AnnouncementCardProps'],
  },
  {
    name: 'AnnouncementCard',
    path: 'packages/mobile/cards/AnnouncementCard.tsx',
    package: 'mobile',
    type: 'replaced',
    migrationMap: {
      replaced: ['NudgeCard', 'UpsellCard'],
    },
    exportNames: ['AnnouncementCard'],
  },
  {
    name: 'AnnouncementCard',
    path: 'packages/web/cards/AnnouncementCard.tsx',
    package: 'web',
    type: 'replaced',
    migrationMap: {
      replaced: ['NudgeCard', 'UpsellCard'],
    },
    exportNames: ['AnnouncementCard'],
  },
  {
    name: 'FeatureEntryCard',
    path: 'packages/mobile/alpha/FeatureEntryCard.tsx',
    package: 'mobile',
    type: ['alpha', 'replaced'],
    migrationMap: {
      replaced: ['NudgeCard', 'UpsellCard'],
    },
    exportNames: ['FeatureEntryCard', 'FeatureEntryCardProps'],
  },
  {
    name: 'FeatureEntryCard',
    path: 'packages/web/alpha/FeatureEntryCard.tsx',
    package: 'web',
    type: ['alpha', 'replaced'],
    migrationMap: {
      replaced: ['NudgeCard', 'UpsellCard'],
    },
    exportNames: ['FeatureEntryCard', 'FeatureEntryCardProps'],
  },
  {
    name: 'FeatureEntryCard',
    path: 'packages/mobile/cards/FeatureEntryCard.tsx',
    package: 'mobile',
    type: 'replaced',
    migrationMap: {
      replaced: ['NudgeCard', 'UpsellCard'],
    },
    exportNames: ['FeatureEntryCard'],
  },
  {
    name: 'FeatureEntryCard',
    path: 'packages/web/cards/FeatureEntryCard.tsx',
    package: 'web',
    type: 'replaced',
    migrationMap: {
      replaced: ['NudgeCard', 'UpsellCard'],
    },
    exportNames: ['FeatureEntryCard'],
  },
];

export const parameterMigrations: Param[] = [
  {
    function: 'useToast',
    param: ['dangerouslySetDuration'],
    replacement: 'duration',
    package: 'common',
    path: 'packages/common/overlays',
    type: 'replaced',
  },
  {
    function: 'useToast',
    param: ['dangerouslySetDuration'],
    replacement: 'duration',
    package: 'mobile',
    path: 'packages/mobile/overlays',
    type: 'replaced',
  },
  {
    function: 'useToast',
    param: ['dangerouslySetDuration'],
    replacement: 'duration',
    package: 'web',
    path: 'packages/web/overlays',
    type: 'replaced',
  },
  {
    function: 'paletteConfigToRgbaStrings',
    param: ['hasFrontier'],
    package: 'common',
    path: 'packages/common/palette',
    type: 'removed',
  },
  {
    function: 'paletteConfigToRgbaStrings',
    param: ['hasFrontier'],
    package: 'mobile',
    path: 'packages/mobile/utils/palette',
    type: 'removed',
  },
  {
    function: 'paletteValueToHex',
    param: ['hasFrontier'],
    package: 'common',
    path: 'packages/common/palette',
    type: 'removed',
  },
  {
    function: 'paletteValueToHex',
    param: ['hasFrontier'],
    package: 'mobile',
    path: 'packages/mobile/utils/palette',
    type: 'removed',
  },
  {
    function: 'paletteValueToRgbaArray',
    param: ['hasFrontier'],
    package: 'common',
    path: 'packages/common/palette',
    type: 'removed',
  },
  {
    function: 'paletteValueToRgbaArray',
    param: ['hasFrontier'],
    package: 'mobile',
    path: 'packages/mobile/utils/palette',
    type: 'removed',
  },
  {
    function: 'paletteValueToRgbaString',
    param: ['hasFrontier'],
    package: 'common',
    path: 'packages/common/palette',
    type: 'removed',
  },
  {
    function: 'paletteValueToRgbaString',
    param: ['hasFrontier'],
    package: 'mobile',
    path: 'packages/mobile/utils/palette',
    type: 'removed',
  },
  {
    function: 'paletteAliasToRgbaString',
    param: ['hasFrontier'],
    package: 'common',
    path: 'packages/common/palette',
    type: 'removed',
  },
  {
    function: 'paletteAliasToRgbaString',
    param: ['hasFrontier'],
    package: 'mobile',
    path: 'packages/mobile/utils/palette',
    type: 'removed',
  },
];

export const V6: Deprecation = {
  prevMajorVersion: 'v5.0.0',
  breakingRelease: 'v6.0.0',
  intro: `The Sparkline components have moved to the <code>@cbhq/cds-web-visualization</code> and <code>@cbhq/cds-mobile-visualization</code> packages. \n\nThe <code>@cbhq/cds-web-overlay</code> package is deprecated and all components should be imported from <code>@cbhq/cds-web</code> instead.`,
  migrationGuideLink: '/guides/migration/web-and-mobile/6-0-0/',
  components: componentDeprecations,
  props: propDeprecations,
  tokens: [
    {
      path: 'packages/web/illustrations/Illustration.tsx',
      name: 'versionMaps',
      package: 'web',
      exportNames: ['versionMaps'],
      type: 'removed',
      migrationMap: {
        replaced: '@cbhq/cds-illustrations/generated/**illustration type**/data/versionMap',
      },
    },
  ],
  functions: functionDeprecations,
  params: parameterMigrations,
  types: [
    {
      name: 'common/types/alpha',
      package: 'common',
      path: 'packages/common/types/alpha',
      type: ['alpha', 'path'],
      migrationMap: {
        path: 'packages/common/types',
      },
    },
  ],
};
