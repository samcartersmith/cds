import {
  DecompedMigration,
  mobileVisualizationPackage,
  webVisualizationPackage,
} from '../../../helpers';

const exportedModules = [
  'Sparkline',
  'SparklineArea',
  'SparklineGradient',
  'SparklineInteractive',
  'SparklineInteractiveHeader',
  'SparklineInteractiveHeaderRef',
  'SparklineInteractiveSubHead',
  'useSparklineInteractiveHeaderStyles',
  'ChartScrubParams',
  'ChartData',
  'SparklineInteractivePeriodSelector',
  'SparklineInteractiveAnimatedPath',
  'SparklineInteractiveHoverDate',
  'SparklineInteractiveMarkerDates',
  'SparklineInteractiveMinMax',
  'SparklineInteractivePanGestureHandler',
  'SparklineInteractivePaths',
  'SparklineInteractiveTimeseriesPaths',
  'useInterruptiblePathAnimation',
  'useMinMaxTransform',
  'useOpacityAnimation',
  'useSparklineInteractiveConstants',
  'useSparklineInteractiveLineStyles',
  'InnerSparklineInteractiveProvider',
  'SparklineInteractiveScrubHandler',
  'SparklineInteractiveScrubProvider',
];

export const migrationsWithNewPackages: DecompedMigration[] = [
  {
    exports: exportedModules,
    oldDir: '@cbhq/cds-web/visualizations',
    newDir: webVisualizationPackage,
  },
  {
    exports: exportedModules,
    oldDir: '@cbhq/cds-mobile/visualizations',
    newDir: mobileVisualizationPackage,
  },
];
