import { init, logMetric, MetricType, PlatformName } from '@cbhq/client-analytics';

import { getVersion, log } from './utils.js';

function initAnalytics() {
  init({
    batchMetricsThreshold: 1,
    batchEventsThreshold: 1,
    isProd: true,
    platform: PlatformName.macos,
    headers: {
      Origin: 'https://www.coinbase.com',
    },
    projectName: 'cds_mcp',
    version: getVersion(),
    showDebugLogging: false,
    onError: (error) => {
      log(`Error in analytics: ${error}`);
    },
  });
}

async function logEvent(event: string, path?: string) {
  logMetric({ metricType: MetricType.count, metricName: event, value: 1, apiPath: path });
  // force a delay to let the metric be sent
  return new Promise((resolve) => setTimeout(resolve, 100));
}

export { initAnalytics, logEvent };
