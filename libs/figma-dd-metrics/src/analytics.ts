import * as fs from 'node:fs';
import * as path from 'node:path';
import { flushQueue, init, logMetric, MetricType, PlatformName } from '@cbhq/client-analytics';

/*
 * These preconfigured page key and project name pair must not be changed otherwise the metrics won't make it to Datadog.
 * The client-analytics service which we are using to forward events to Datadog, requires a page key and project name to be configued in the Analytics Events Catalog ahead of sending events.
 * The particular values being used here were set up for Stephanie's CDS component adoption dashboard but can be repurposed here nicely.
 * Analytics Events Catalog: https://datahub.cbhq.net/datacatalog/detail/datasource?doc_id=AEC
 */
export const PAGE_KEY = 'ui_systems_adoption';
export const PROJECT_NAME = 'adoption_tracker';

/**
 * Metric data structure that will be sent to Datadog
 */
export type MetricData = {
  metricName: string;
  metricType: MetricType;
  value: number;
  tags: Record<string, string>;
};

export function logAllCollectedMetrics(metrics: MetricData[]) {
  for (const metric of metrics) {
    logMetric({
      metricName: metric.metricName,
      metricType: metric.metricType,
      value: metric.value,
      tags: {
        page_key: PAGE_KEY,
        ...metric.tags,
      },
    });
  }
}

/**
 * Sleep utility for delays between batches
 * @param ms - Milliseconds to sleep
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Helper to split metrics into batches
 * @param metrics - Array of metrics to split
 * @param batchSize - Size of each batch
 * @returns Array of metric batches
 */
export function createMetricBatches(metrics: MetricData[], batchSize: number): MetricData[][] {
  const batches: MetricData[][] = [];
  for (let i = 0; i < metrics.length; i += batchSize) {
    batches.push(metrics.slice(i, i + batchSize));
  }
  return batches;
}

/**
 * Log metrics in batches to avoid overwhelming the analytics service
 * Sends metrics in batches of specified size, flushing after each batch
 * Waits 5 seconds between batches to further prevent network issues (rate limiting, etc.).
 *
 * note: Default batch size was determind through trial and error by running workflow from development branch in GH Actions dashboard.
 * @param metrics - Array of metrics to log
 * @param batchSize - Number of metrics to send in each batch (default: 250)
 */
export async function logMetricsInBatches(
  metrics: MetricData[],
  batchSize: number = 250,
): Promise<void> {
  const batches = createMetricBatches(metrics, batchSize);
  const totalBatches = batches.length;
  const delayBetweenBatches = 5000; // 5 seconds

  for (let i = 0; i < totalBatches; i++) {
    const batch = batches[i];
    const batchNumber = i + 1;

    console.log(`Sending batch ${batchNumber}/${totalBatches} (${batch.length} metrics)...`);

    // Log all metrics in this batch
    logAllCollectedMetrics(batch);

    // Flush the queue to ensure this batch is sent before moving to the next
    await flushQueue();

    console.log(`Batch ${batchNumber}/${totalBatches} sent successfully`);

    // Wait 5 seconds before sending the next batch (unless this is the last batch)
    if (batchNumber < totalBatches) {
      console.log(`Waiting 5 seconds before sending next batch...`);
      await sleep(delayBetweenBatches);
    }
  }
}

export async function logMetricsToCsv(
  metrics: MetricData[],
  outputDir: string,
  filename: string,
  batchSize: number = 250,
): Promise<void> {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const batches = createMetricBatches(metrics, batchSize);
  const totalBatches = batches.length;
  const outputPath = path.join(outputDir, filename);
  const headers = ['batchNumber', 'metricName', 'metricType', 'value', 'tags'];
  const csvRows: string[] = [];

  console.log(`Writing ${totalBatches} batches to ${filename}...`);

  for (let i = 0; i < totalBatches; i++) {
    const batch = batches[i];
    const batchNumber = i + 1;

    batch.forEach((m) => {
      // Format tags as a pipe-separated string for CSV readability
      const tagsStr = Object.entries(m.tags)
        .map(([k, v]) => `${k}:${v}`)
        .join('|');

      csvRows.push(
        [
          batchNumber,
          m.metricName,
          m.metricType,
          m.value,
          `"${tagsStr}"`, // Quote tags to handle potential special characters
        ].join(','),
      );
    });
  }

  // Write to file
  const csvContent = [headers.join(','), ...csvRows].join('\n');
  fs.writeFileSync(outputPath, csvContent, 'utf8');
}

/**
 * Setup error handling for analytics errors
 */
function setupBeforeExit() {
  const analyticsErrors: Array<{ error: Error; metadata?: Record<string, unknown> }> = [];
  process.on('beforeExit', () => {
    if (analyticsErrors.length) {
      console.error(`Analytics errors occurred during execution: ${analyticsErrors.length}`);
      console.error('Reporting most recent error:');
      console.error(analyticsErrors[analyticsErrors.length - 1].error, {
        metadata: analyticsErrors[analyticsErrors.length - 1].metadata,
      });
      // analyticsErrors.forEach(({ error, metadata }) => {
      //   console.error(error, { metadata });
      // });
      process.exit(1);
    }
  });
  return analyticsErrors;
}

/**
 * Initialize analytics client
 */
export function setupAnalytics() {
  const analyticsErrors = setupBeforeExit();
  init({
    batchMetricsThreshold: 1,
    headers: { Origin: 'https://www.coinbase.com' },
    isProd: true, // using non-prod API does not work in GHA runners
    platform: PlatformName.server,
    projectName: PROJECT_NAME,
    showDebugLogging: false,
    onError: (error, metadata) => {
      analyticsErrors.push({ error, metadata });
    },
    version: '1.0',
  });
}
