import { init, logMetric, MetricType, PlatformName } from '@cbhq/client-analytics';

import { type ComponentStats, type IllustrationStats } from '../types';
const METRIC_NAME = 'cds_adoption.distribution';
const ILLUSTRATION_METRIC_NAME = 'cds_adoption.illustration_usage';

export function logCount(
  count: number,
  component: string,
  isCDS: boolean,
  importPath: string,
  version: string,
  repo: string,
) {
  logMetric({
    metricName: METRIC_NAME,
    metricType: MetricType.distribution,
    tags: {
      component,
      page_key: 'ui_systems_adoption',
      isCDS,
      import_path: importPath,
      version,
      repo,
    },
    value: count,
  });
}

export function logAllComponentStats(
  cdsComponentStats: ComponentStats[],
  nonCdsComponentStats: ComponentStats[],
  repo: string,
) {
  for (const component of cdsComponentStats) {
    logCount(
      component.timesUsed,
      component.name,
      true,
      component.importPath,
      component.version,
      repo,
    );
  }
  for (const component of nonCdsComponentStats) {
    logCount(
      component.timesUsed,
      component.name,
      false,
      component.importPath,
      component.version,
      repo,
    );
  }
}

export function logIllustrationStats(illustrationStats: IllustrationStats[], repo: string) {
  for (const stat of illustrationStats) {
    logMetric({
      metricName: ILLUSTRATION_METRIC_NAME,
      metricType: MetricType.distribution,
      tags: {
        component_type: stat.componentType,
        illustration_name: stat.illustrationName,
        page_key: 'ui_systems_adoption',
        import_path: stat.importPath,
        version: stat.version,
        repo,
      },
      value: stat.timesUsed,
    });
  }
}

function setupBeforeExit() {
  const analyticsErrors: Array<{ error: Error; metadata?: Record<string, unknown> }> = [];
  process.on('beforeExit', () => {
    if (analyticsErrors.length) {
      console.error('Analytics errors occurred during execution:');
      analyticsErrors.forEach(({ error, metadata }) => {
        console.error(error, { metadata });
      });
    }
  });
  return analyticsErrors;
}

export function setupAnalytics() {
  const analyticsErrors = setupBeforeExit();
  init({
    batchMetricsThreshold: 30,
    headers: { Origin: 'https://www.coinbase.com' },
    isProd: true, // using non-prod API does not work in GHA runners
    platform: PlatformName.server,
    projectName: 'adoption_tracker',
    showDebugLogging: false,
    onError: (error, metadata) => {
      analyticsErrors.push({ error, metadata });
    },
    version: '1.0',
  });
}
