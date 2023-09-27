import { Deprecation } from '../types';

export const Q42023: Deprecation = {
  endOfLife: 'Q42023',
  prevMajorVersion: 'v6.0.0',
  components: [
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
  ],
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
  props: [
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
  ],
};
