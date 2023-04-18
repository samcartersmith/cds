import { Component, Deprecation } from '../types';

const baseWebDeprecation: Partial<Component> = {
  package: 'web',
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
    name: 'SidebarItem',
    path: 'packages/web/navigation/SidebarItem.tsx',
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

export const Q22023: Deprecation = {
  endOfLife: 'Q22023',
  prevMajorVersion: 'v4.1.3',
  components: [...overlayWebDeprecations, ...sparklineWebDeprecations],
};
