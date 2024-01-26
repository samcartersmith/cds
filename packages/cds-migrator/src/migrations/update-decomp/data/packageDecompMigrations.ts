import {
  DecompedMigration,
  mobileVisualizationPackage,
  webVisualizationPackage,
} from '../../../helpers';

export const migrationsWithNewPackages: DecompedMigration[] = [
  {
    exports: [
      'Sparkline',
      'SparklineArea',
      'SparklineGradient',
      'SparklineInteractiveHeader',
      'SparklineInteractive',
      'SparklineInteractiveHeaderRef',
    ],
    oldDir: '@cbhq/cds-web/overlays',
    newDir: webVisualizationPackage,
  },
  {
    exports: [
      'Sparkline',
      'SparklineArea',
      'SparklineGradient',
      'SparklineInteractive',
      'SparklineInteractiveHeader',
      'SparklineInteractiveHeaderRef',
      'SparklineInteractiveSubHead',
      'ChartScrubParams',
      'ChartData',
    ],
    oldDir: '@cbhq/cds-web/visualizations',
    newDir: webVisualizationPackage,
  },
  {
    exports: [
      'Sparkline',
      'SparklineArea',
      'SparklineGradient',
      'SparklineInteractiveHeader',
      'SparklineInteractive',
      'SparklineInteractiveHeaderRef',
      'SparklineInteractivePeriodSelector',
      'ChartScrubParams',
    ],
    oldDir: '@cbhq/cds-mobile/visualizations',
    newDir: mobileVisualizationPackage,
  },
];
