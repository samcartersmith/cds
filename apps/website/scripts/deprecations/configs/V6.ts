import { Component, Deprecation, Prop } from '../types';

const baseWebDeprecation: Partial<Component> = {
  package: 'web',
  type: ['path'],
};

const baseMobileDeprecation: Partial<Component> = {
  package: 'mobile',
  type: ['path'],
};

const overlayWebDeprecations = [
  { ...baseWebDeprecation, name: 'Dropdown', path: 'packages/web/dropdown/Dropdown.tsx' },
  {
    ...baseWebDeprecation,
    name: 'DropdownContent',
    path: 'packages/web/dropdown/DropdownContent.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'DropdownProps',
    path: 'packages/web/dropdown/DropdownProps.ts',
  },
  { ...baseWebDeprecation, name: 'MenuItem', path: 'packages/web/dropdown/MenuItem.tsx' },
  { ...baseWebDeprecation, name: 'index', path: 'packages/web/dropdown/index.ts' },
  { ...baseWebDeprecation, name: 'index', path: 'packages/web/index.ts' },
  {
    ...baseWebDeprecation,
    name: 'Popover',
    path: 'packages/web/overlays/popover/Popover.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'PopoverProps',
    path: 'packages/web/overlays/popover/PopoverProps.ts',
  },
  {
    ...baseWebDeprecation,
    name: 'usePopper',
    path: 'packages/web/overlays/popover/usePopper.ts',
  },
  { ...baseWebDeprecation, name: 'Select', path: 'packages/web/controls/Select.tsx' },
  {
    ...baseWebDeprecation,
    name: 'SelectOption',
    path: 'packages/web/controls/SelectOption.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'SidebarMoreMenu',
    path: 'packages/web/navigation/SidebarMoreMenu.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'Tooltip',
    path: 'packages/web/overlays/Tooltip/Tooltip.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'TooltipContent',
    path: 'packages/web/overlays/Tooltip/TooltipContent.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'TooltipProps',
    path: 'packages/web/overlays/Tooltip/TooltipProps.ts',
  },
  {
    ...baseWebDeprecation,
    name: 'useTooltipState',
    path: 'packages/web/overlays/Tooltip/useTooltipState.ts',
  },
];

const sparklineWebDeprecations = [
  {
    ...baseWebDeprecation,
    name: 'SparklineGradient',
    path: 'packages/web/visualizations/SparklineGradient.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'SparklineAreaPattern',
    path: 'packages/web/visualizations/SparklineAreaPattern.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'SparklineArea',
    path: 'packages/web/visualizations/SparklineArea.tsx',
  },
  { ...baseWebDeprecation, name: 'Sparkline', path: 'packages/web/visualizations/Sparkline.tsx' },
  { ...baseWebDeprecation, name: 'Counter', path: 'packages/web/visualizations/Counter.tsx' },
  {
    ...baseWebDeprecation,
    name: 'SparklinePath',
    path: 'packages/web/visualizations/SparklinePath.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'VisualizationContainer',
    path: 'packages/web/visualizations/VisualizationContainer.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'SparklineInteractiveHeader',
    path: 'packages/web/visualizations/sparkline-interactive-header/SparklineInteractiveHeader.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'InnerSparklineInteractiveProvider',
    path: 'packages/web/visualizations/sparkline-interactive/InnerSparklineInteractiveProvider.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'SparklineInteractive',
    path: 'packages/web/visualizations/sparkline-interactive/SparklineInteractive.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'SparklineInteractiveAnimatedPath',
    path: 'packages/web/visualizations/sparkline-interactive/SparklineInteractiveAnimatedPath.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'SparklineInteractiveHoverDate',
    path: 'packages/web/visualizations/sparkline-interactive/SparklineInteractiveHoverDate.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'SparklineInteractiveLineVertical',
    path: 'packages/web/visualizations/sparkline-interactive/SparklineInteractiveLineVertical.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'SparklineInteractiveMarkerDates',
    path: 'packages/web/visualizations/sparkline-interactive/SparklineInteractiveMarkerDates.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'SparklineInteractivePaths',
    path: 'packages/web/visualizations/sparkline-interactive/SparklineInteractivePaths.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'SparklineInteractivePeriodSelector',
    path: 'packages/web/visualizations/sparkline-interactive/SparklineInteractivePeriodSelector.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'SparklineInteractiveProvider',
    path: 'packages/web/visualizations/sparkline-interactive/SparklineInteractiveProvider.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'SparklineInteractiveScrubHandler',
    path: 'packages/web/visualizations/sparkline-interactive/SparklineInteractiveScrubHandler.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'SparklineInteractiveScrubProvider',
    path: 'packages/web/visualizations/sparkline-interactive/SparklineInteractiveScrubProvider.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'SparklineInteractiveTimeseriesPaths',
    path: 'packages/web/visualizations/sparkline-interactive/SparklineInteractiveTimeseriesPaths.tsx',
  },
  {
    ...baseWebDeprecation,
    name: 'useSparklineInteractiveConstants',
    path: 'packages/web/visualizations/sparkline-interactive/useSparklineInteractiveConstants.ts',
  },
];

const sparklineMobileDeprecations = [
  {
    ...baseMobileDeprecation,
    name: 'newRoutes',
    path: 'packages/mobile/examples/newRoutes.ts',
  },
  {
    ...baseMobileDeprecation,
    name: 'Sparkline',
    path: 'packages/mobile/visualizations/Sparkline.ts',
  },
  {
    ...baseMobileDeprecation,
    name: 'SparklineInteractive',
    path: 'packages/mobile/visualizations/SparklineInteractive.tsx',
  },
  {
    ...baseMobileDeprecation,
    name: 'SparklineInteractiveHeader',
    path: 'packages/mobile/visualizations/SparklineInteractiveHeader.tsx',
  },
  {
    ...baseMobileDeprecation,
    name: 'SparklineGradient',
    path: 'packages/mobile/visualizations/SparklineGradient.tsx',
  },
  {
    ...baseMobileDeprecation,
    name: 'SparklineInteractiveAnimatedPath',
    path: 'packages/mobile/visualizations/sparkline-interactive/SparklineInteractiveAnimatedPath.tsx',
  },
  {
    ...baseMobileDeprecation,
    name: 'SparklineInteractiveHoverDate',
    path: 'packages/mobile/visualizations/sparkline-interactive/SparklineInteractiveHoverDate.tsx',
  },
  {
    ...baseMobileDeprecation,
    name: 'SparklineInteractiveLineVertical',
    path: 'packages/mobile/visualizations/sparkline-interactive/SparklineInteractiveLineVertical.tsx',
  },
  {
    ...baseMobileDeprecation,
    name: 'SparklineInteractiveMarkerDates',
    path: 'packages/mobile/visualizations/sparkline-interactive/SparklineInteractiveMarkerDates.tsx',
  },
  {
    ...baseMobileDeprecation,
    name: 'SparklineInteractiveMinMax',
    path: 'packages/mobile/visualizations/sparkline-interactive/SparklineInteractiveMinMax.tsx',
  },
  {
    ...baseMobileDeprecation,
    name: 'SparklineInteractivePanGestureHandler',
    path: 'packages/mobile/visualizations/sparkline-interactive/SparklineInteractivePanGestureHandler.tsx',
  },
  {
    ...baseMobileDeprecation,
    name: 'SparklineInteractivePaths',
    path: 'packages/mobile/visualizations/sparkline-interactive/SparklineInteractivePaths.tsx',
  },
  {
    ...baseMobileDeprecation,
    name: 'SparklineInteractivePeriodSelector',
    path: 'packages/mobile/visualizations/sparkline-interactive/SparklineInteractivePeriodSelector.tsx',
  },
  {
    ...baseMobileDeprecation,
    name: 'SparklineInteractiveProvider',
    path: 'packages/mobile/visualizations/sparkline-interactive/SparklineInteractiveProvider.tsx',
  },
  {
    ...baseMobileDeprecation,
    name: 'SparklineInteractiveTimeseriesPaths',
    path: 'packages/mobile/visualizations/sparkline-interactive/SparklineInteractiveTimeseriesPaths.tsx',
  },
  {
    ...baseMobileDeprecation,
    name: 'useInterruptiblePathAnimation',
    path: 'packages/mobile/visualizations/sparkline-interactive/useInterruptiblePathAnimation.ts',
  },
  {
    ...baseMobileDeprecation,
    name: 'useMinMaxTransform',
    path: 'packages/mobile/visualizations/sparkline-interactive/useMinMaxTransform.ts',
  },
  {
    ...baseMobileDeprecation,
    name: 'useOpacityAnimation',
    path: 'packages/mobile/visualizations/sparkline-interactive/useOpacityAnimation.ts',
  },
  {
    ...baseMobileDeprecation,
    name: 'useSparklineInteractiveConstants',
    path: 'packages/mobile/visualizations/sparkline-interactive/useSparklineInteractiveConstants.ts',
  },
  {
    ...baseMobileDeprecation,
    name: 'useSparklineInteractiveLineStyles',
    path: 'packages/mobile/visualizations/sparkline-interactive/useSparklineInteractiveLineStyles.ts',
  },
];

const Q32023ComponentDeprecations = [
  ...overlayWebDeprecations,
  ...sparklineWebDeprecations,
  ...sparklineMobileDeprecations,
];

const Q42023ComponentsDeprecations: Partial<Component>[] = [
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
];

const Q3PropDeprecations: Prop[] = [
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
];

const Q4PropDeprecations: Prop[] = [
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
    name: 'offset',
    type: 'api',
    package: 'common',
    migrationMap: {
      api: { offset: 'margin' },
    },
    components: ['Box', 'HStack', 'VStack', 'Card', 'Group', 'ListCell', 'Grid'],
  },
  {
    name: 'offsetStart',
    type: 'api',
    package: 'common',
    migrationMap: {
      api: { offsetStart: 'marginLeft' },
    },
    components: ['Box', 'HStack', 'VStack', 'Card', 'Group', 'ListCell', 'Grid'],
  },
  {
    name: 'offsetTop',
    type: 'api',
    package: 'common',
    migrationMap: {
      api: { offsetTop: 'marginTop' },
    },
    components: ['Box', 'HStack', 'VStack', 'Card', 'Group', 'ListCell', 'Grid'],
  },
  {
    name: 'offsetEnd',
    type: 'api',
    package: 'common',
    migrationMap: {
      api: { offsetEnd: 'marginRight' },
    },
    components: ['Box', 'HStack', 'VStack', 'Card', 'Group', 'ListCell', 'Grid'],
  },
  {
    name: 'offsetBottom',
    type: 'api',
    package: 'common',
    migrationMap: {
      api: { offsetBottom: 'marginBottom' },
    },
    components: ['Box', 'HStack', 'VStack', 'Card', 'Group', 'ListCell', 'Grid'],
  },
  {
    name: 'offsetHorizontal',
    type: 'api',
    package: 'common',
    migrationMap: {
      api: { offsetHorizontal: 'marginHorizontal' },
    },
    components: ['Box', 'HStack', 'VStack', 'Card', 'Group', 'ListCell', 'Grid'],
  },
  {
    name: 'offsetVertical',
    type: 'api',
    package: 'common',
    migrationMap: {
      api: { offsetVertical: 'marginVertical' },
    },
    components: ['Box', 'HStack', 'VStack', 'Card', 'Group', 'ListCell', 'Grid'],
  },
  {
    name: 'spacing',
    type: 'api',
    package: 'common',
    migrationMap: {
      api: { spacing: 'padding' },
    },
    components: ['Box', 'HStack', 'VStack', 'Card', 'Group', 'ListCell', 'Grid'],
  },
  {
    name: 'spacingStart',
    type: 'api',
    package: 'common',
    migrationMap: {
      api: { spacingStart: 'paddingLeft' },
    },
    components: ['Box', 'HStack', 'VStack', 'Card', 'Group', 'ListCell', 'Grid'],
  },
  {
    name: 'spacingTop',
    type: 'api',
    package: 'common',
    migrationMap: {
      api: { spacingTop: 'paddingTop' },
    },
    components: ['Box', 'HStack', 'VStack', 'Card', 'Group', 'ListCell', 'Grid'],
  },
  {
    name: 'spacingEnd',
    type: 'api',
    package: 'common',
    migrationMap: {
      api: { spacingEnd: 'paddingRight' },
    },
    components: ['Box', 'HStack', 'VStack', 'Card', 'Group', 'ListCell', 'Grid'],
  },
  {
    name: 'spacingBottom',
    type: 'api',
    package: 'common',
    migrationMap: {
      api: { spacingBottom: 'paddingBottom' },
    },
    components: ['Box', 'HStack', 'VStack', 'Card', 'Group', 'ListCell', 'Grid'],
  },
  {
    name: 'spacingHorizontal',
    type: 'api',
    package: 'common',
    migrationMap: {
      api: { spacingHorizontal: 'paddingHorizontal' },
    },
    components: ['Box', 'HStack', 'VStack', 'Card', 'Group', 'ListCell', 'Grid'],
  },
  {
    name: 'spacingVertical',
    type: 'api',
    package: 'common',
    migrationMap: {
      api: { spacingVertical: 'paddingVertical' },
    },
    components: ['Box', 'HStack', 'VStack', 'Card', 'Group', 'ListCell', 'Grid'],
  },
  {
    name: 'vertical',
    components: ['ButtonGroup', 'ModalFooter'],
    package: 'common',
    type: 'api',
    migrationMap: {
      api: {
        horizontal: 'direction',
      },
    },
  },
  {
    name: 'innerSpacing',
    components: [
      'ListCell',
      'Cell',
      'ListCellFallback',
      'ContentCell',
      'TableCell',
      'TableCellFallback',
      'TableCaption',
      'TableRow',
    ],
    package: 'common',
    type: 'api',
    migrationMap: {
      api: { innerSpacing: 'innerPadding' },
    },
  },
  {
    name: 'outerSpacing',
    components: [
      'ListCell',
      'Cell',
      'ListCellFallback',
      'ContentCell',
      'TableCell',
      'TableCellFallback',
      'TableCaption',
      'TableRow',
    ],
    package: 'common',
    type: 'api',
    migrationMap: {
      api: { outerSpacing: 'outerPadding' },
    },
  },
];

export const V6: Deprecation = {
  endOfLife: 'V6',
  prevMajorVersion: 'v5.0.0',
  breakingRelease: 'v6.0.0',
  components: [...Q32023ComponentDeprecations, ...Q42023ComponentsDeprecations],
  props: [...Q3PropDeprecations, ...Q4PropDeprecations],
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
};
