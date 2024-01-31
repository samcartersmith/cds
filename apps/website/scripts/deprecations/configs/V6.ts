import { Component, Deprecation, Prop } from '../types';

const baseWebOverlaysDeprecation: Partial<Component> = {
  package: 'web-overlays',
  type: ['path'],
};
const baseWebVisualizationDeprecation: Partial<Component> = {
  package: 'web-visualization',
  type: ['path'],
};

const baseMobileVisualizationDeprecation: Partial<Component> = {
  package: 'mobile-visualization',
  type: ['path'],
};

const overlayWebDeprecations = [
  { ...baseWebOverlaysDeprecation, name: 'Dropdown', path: 'packages/web-overlays/src/dropdown' },
  {
    ...baseWebOverlaysDeprecation,
    name: 'DropdownContent',
    path: 'packages/web-overlays/src/dropdown',
  },
  {
    ...baseWebOverlaysDeprecation,
    name: 'DropdownProps',
    path: 'packages/web-overlays/src/dropdown',
  },
  { ...baseWebOverlaysDeprecation, name: 'MenuItem', path: 'packages/web-overlays/src/dropdown' },
  {
    ...baseWebOverlaysDeprecation,
    name: 'Popover',
    path: 'packages/web-overlays/src/popover',
  },
  {
    ...baseWebOverlaysDeprecation,
    name: 'PopoverProps',
    path: 'packages/web-overlays/src/popover',
  },
  {
    ...baseWebOverlaysDeprecation,
    name: 'usePopper',
    path: 'packages/web-overlays/src/popover',
  },
  { ...baseWebOverlaysDeprecation, name: 'Select', path: 'packages/web-overlays/src/select' },
  {
    ...baseWebOverlaysDeprecation,
    name: 'SelectOption',
    path: 'packages/web-overlays/src/select',
  },
  {
    ...baseWebOverlaysDeprecation,
    name: 'SidebarMoreMenu',
    path: 'packages/web-overlays/src/sidebarMoreMenu',
  },
  {
    ...baseWebOverlaysDeprecation,
    name: 'Tooltip',
    path: 'packages/web-overlays/src/tooltip',
  },
  {
    ...baseWebOverlaysDeprecation,
    name: 'TooltipContent',
    path: 'packages/web-overlays/src/tooltip',
  },
  {
    ...baseWebOverlaysDeprecation,
    name: 'TooltipProps',
    path: 'packages/web-overlays/src/tooltip',
  },
  {
    ...baseWebOverlaysDeprecation,
    name: 'useTooltipState',
    path: 'packages/web-overlays/src/tooltip',
  },
  {
    ...baseWebOverlaysDeprecation,
    name: 'SelectChip',
    path: 'packages/web-overlays/src/selectchip',
  },
  {
    ...baseWebOverlaysDeprecation,
    name: 'SelectChip',
    path: 'packages/web-overlays/src/selectchip',
  },
];

const sparklineWebDeprecations = [
  {
    ...baseWebVisualizationDeprecation,
    name: 'SparklineGradient',
    path: 'packages/web/visualizations/SparklineGradient.tsx',
  },
  {
    ...baseWebVisualizationDeprecation,
    name: 'SparklineAreaPattern',
    path: 'packages/web/visualizations/SparklineAreaPattern.tsx',
  },
  {
    ...baseWebVisualizationDeprecation,
    name: 'SparklineArea',
    path: 'packages/web/visualizations/SparklineArea.tsx',
  },
  {
    ...baseWebVisualizationDeprecation,
    name: 'Sparkline',
    path: 'packages/web/visualizations/Sparkline.tsx',
  },
  {
    ...baseWebVisualizationDeprecation,
    name: 'Counter',
    path: 'packages/web/visualizations/Counter.tsx',
  },
  {
    ...baseWebVisualizationDeprecation,
    name: 'SparklinePath',
    path: 'packages/web/visualizations/SparklinePath.tsx',
  },
  {
    ...baseWebVisualizationDeprecation,
    name: 'SparklineInteractiveHeader',
    path: 'packages/web/visualizations/sparkline-interactive-header/SparklineInteractiveHeader.tsx',
  },
  {
    ...baseWebVisualizationDeprecation,
    name: 'InnerSparklineInteractiveProvider',
    path: 'packages/web/visualizations/sparkline-interactive/InnerSparklineInteractiveProvider.tsx',
  },
  {
    ...baseWebVisualizationDeprecation,
    name: 'SparklineInteractive',
    path: 'packages/web/visualizations/sparkline-interactive/SparklineInteractive.tsx',
  },
  {
    ...baseWebVisualizationDeprecation,
    name: 'SparklineInteractiveAnimatedPath',
    path: 'packages/web/visualizations/sparkline-interactive/SparklineInteractiveAnimatedPath.tsx',
  },
  {
    ...baseWebVisualizationDeprecation,
    name: 'SparklineInteractiveHoverDate',
    path: 'packages/web/visualizations/sparkline-interactive/SparklineInteractiveHoverDate.tsx',
  },
  {
    ...baseWebVisualizationDeprecation,
    name: 'SparklineInteractiveLineVertical',
    path: 'packages/web/visualizations/sparkline-interactive/SparklineInteractiveLineVertical.tsx',
  },
  {
    ...baseWebVisualizationDeprecation,
    name: 'SparklineInteractiveMarkerDates',
    path: 'packages/web/visualizations/sparkline-interactive/SparklineInteractiveMarkerDates.tsx',
  },
  {
    ...baseWebVisualizationDeprecation,
    name: 'SparklineInteractivePaths',
    path: 'packages/web/visualizations/sparkline-interactive/SparklineInteractivePaths.tsx',
  },
  {
    ...baseWebVisualizationDeprecation,
    name: 'SparklineInteractivePeriodSelector',
    path: 'packages/web/visualizations/sparkline-interactive/SparklineInteractivePeriodSelector.tsx',
  },
  {
    ...baseWebVisualizationDeprecation,
    name: 'SparklineInteractiveProvider',
    path: 'packages/web/visualizations/sparkline-interactive/SparklineInteractiveProvider.tsx',
  },
  {
    ...baseWebVisualizationDeprecation,
    name: 'SparklineInteractiveScrubHandler',
    path: 'packages/web/visualizations/sparkline-interactive/SparklineInteractiveScrubHandler.tsx',
  },
  {
    ...baseWebVisualizationDeprecation,
    name: 'SparklineInteractiveScrubProvider',
    path: 'packages/web/visualizations/sparkline-interactive/SparklineInteractiveScrubProvider.tsx',
  },
  {
    ...baseWebVisualizationDeprecation,
    name: 'SparklineInteractiveTimeseriesPaths',
    path: 'packages/web/visualizations/sparkline-interactive/SparklineInteractiveTimeseriesPaths.tsx',
  },
  {
    ...baseWebVisualizationDeprecation,
    name: 'useSparklineInteractiveConstants',
    path: 'packages/web/visualizations/sparkline-interactive/useSparklineInteractiveConstants.ts',
  },
];

const sparklineMobileDeprecations = [
  {
    ...baseMobileVisualizationDeprecation,
    name: 'newRoutes',
    path: 'packages/mobile/examples/newRoutes.ts',
  },
  {
    ...baseMobileVisualizationDeprecation,
    name: 'Sparkline',
    path: 'packages/mobile/visualizations/Sparkline.ts',
  },
  {
    ...baseMobileVisualizationDeprecation,
    name: 'SparklineInteractive',
    path: 'packages/mobile/visualizations/SparklineInteractive.tsx',
  },
  {
    ...baseMobileVisualizationDeprecation,
    name: 'SparklineInteractiveHeader',
    path: 'packages/mobile/visualizations/SparklineInteractiveHeader.tsx',
  },
  {
    ...baseMobileVisualizationDeprecation,
    name: 'SparklineGradient',
    path: 'packages/mobile/visualizations/SparklineGradient.tsx',
  },
  {
    ...baseMobileVisualizationDeprecation,
    name: 'SparklineInteractiveAnimatedPath',
    path: 'packages/mobile/visualizations/sparkline-interactive/SparklineInteractiveAnimatedPath.tsx',
  },
  {
    ...baseMobileVisualizationDeprecation,
    name: 'SparklineInteractiveHoverDate',
    path: 'packages/mobile/visualizations/sparkline-interactive/SparklineInteractiveHoverDate.tsx',
  },
  {
    ...baseMobileVisualizationDeprecation,
    name: 'SparklineInteractiveLineVertical',
    path: 'packages/mobile/visualizations/sparkline-interactive/SparklineInteractiveLineVertical.tsx',
  },
  {
    ...baseMobileVisualizationDeprecation,
    name: 'SparklineInteractiveMarkerDates',
    path: 'packages/mobile/visualizations/sparkline-interactive/SparklineInteractiveMarkerDates.tsx',
  },
  {
    ...baseMobileVisualizationDeprecation,
    name: 'SparklineInteractiveMinMax',
    path: 'packages/mobile/visualizations/sparkline-interactive/SparklineInteractiveMinMax.tsx',
  },
  {
    ...baseMobileVisualizationDeprecation,
    name: 'SparklineInteractivePanGestureHandler',
    path: 'packages/mobile/visualizations/sparkline-interactive/SparklineInteractivePanGestureHandler.tsx',
  },
  {
    ...baseMobileVisualizationDeprecation,
    name: 'SparklineInteractivePaths',
    path: 'packages/mobile/visualizations/sparkline-interactive/SparklineInteractivePaths.tsx',
  },
  {
    ...baseMobileVisualizationDeprecation,
    name: 'SparklineInteractivePeriodSelector',
    path: 'packages/mobile/visualizations/sparkline-interactive/SparklineInteractivePeriodSelector.tsx',
  },
  {
    ...baseMobileVisualizationDeprecation,
    name: 'SparklineInteractiveProvider',
    path: 'packages/mobile/visualizations/sparkline-interactive/SparklineInteractiveProvider.tsx',
  },
  {
    ...baseMobileVisualizationDeprecation,
    name: 'SparklineInteractiveTimeseriesPaths',
    path: 'packages/mobile/visualizations/sparkline-interactive/SparklineInteractiveTimeseriesPaths.tsx',
  },
  {
    ...baseMobileVisualizationDeprecation,
    name: 'useInterruptiblePathAnimation',
    path: 'packages/mobile/visualizations/sparkline-interactive/useInterruptiblePathAnimation.ts',
  },
  {
    ...baseMobileVisualizationDeprecation,
    name: 'useMinMaxTransform',
    path: 'packages/mobile/visualizations/sparkline-interactive/useMinMaxTransform.ts',
  },
  {
    ...baseMobileVisualizationDeprecation,
    name: 'useOpacityAnimation',
    path: 'packages/mobile/visualizations/sparkline-interactive/useOpacityAnimation.ts',
  },
  {
    ...baseMobileVisualizationDeprecation,
    name: 'useSparklineInteractiveConstants',
    path: 'packages/mobile/visualizations/sparkline-interactive/useSparklineInteractiveConstants.ts',
  },
  {
    ...baseMobileVisualizationDeprecation,
    name: 'useSparklineInteractiveLineStyles',
    path: 'packages/mobile/visualizations/sparkline-interactive/useSparklineInteractiveLineStyles.ts',
  },
];

const componentDeprecations: Partial<Component>[] = [
  ...overlayWebDeprecations,
  ...sparklineWebDeprecations,
  ...sparklineMobileDeprecations,
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
    type: 'replaced',
    path: 'packages/mobile/alpha/FeatureEntryCard.tsx',
    migrationMap: {
      replaced: ['NudgeCard', 'UpsellCard'],
    },
  },
  {
    name: 'AnnouncementCard',
    package: 'mobile',
    path: 'packages/mobile/alpha/FeatureEntryCard.tsx',
    type: 'replaced',
    migrationMap: {
      replaced: ['NudgeCard', 'UpsellCard'],
    },
  },
  {
    name: 'FeatureEntryCard',
    package: 'web',
    type: 'replaced',
    path: 'packages/web/alpha/FeatureEntryCard.tsx',
    migrationMap: {
      replaced: ['NudgeCard', 'UpsellCard'],
    },
  },
  {
    name: 'AnnouncementCard',
    package: 'web',
    path: 'packages/web/alpha/FeatureEntryCard.tsx',
    type: 'replaced',
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
];

const propDeprecations: Prop[] = [
  {
    name: 'title',
    components: ['CellMedia'],
    package: 'web',
    type: 'replaced',
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
    type: 'replaced',
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
    type: 'replaced',
    migrationMap: {
      api: {
        alt: 'accessibilityLabel and accessibilityHint',
      },
    },
  },
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
    package: 'common',
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

export const V6: Deprecation = {
  prevMajorVersion: 'v5.0.0',
  breakingRelease: 'v6.0.0',
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
  functions: [
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
      type: 'replaced',
      migrationMap: {
        replaced: ['NudgeCard', 'UpsellCard'],
      },
      exportNames: ['AnnouncementCard', 'AnnouncementCardProps'],
    },
    {
      name: 'AnnouncementCard',
      path: 'packages/web/alpha/AnnouncementCard.tsx',
      package: 'web',
      type: 'replaced',
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
      type: 'replaced',
      migrationMap: {
        replaced: ['NudgeCard', 'UpsellCard'],
      },
      exportNames: ['FeatureEntryCard', 'FeatureEntryCardProps'],
    },
    {
      name: 'FeatureEntryCard',
      path: 'packages/web/alpha/FeatureEntryCard.tsx',
      package: 'web',
      type: 'replaced',
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
  ],
};
