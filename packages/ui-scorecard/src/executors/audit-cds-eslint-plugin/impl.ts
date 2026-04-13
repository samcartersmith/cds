import { flushQueue, init, logMetric, PlatformName } from '@cbhq/client-analytics';
import { color, createTask, logError } from '@cbhq/mono-tasks';

import { FLUSH_DELAY_MS } from './constants';
import { EslintOutputParser } from './EslintOutputParser';
import type { AggregatedMetric, AnalyticsPlatform, AuditCdsEslintPluginOptions } from './types';

const PLATFORM_NAME_MAP: Record<AnalyticsPlatform, PlatformName> = {
  web: PlatformName.web,
  ios: PlatformName.ios,
  android: PlatformName.android,
  server: PlatformName.server,
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function initializeAnalytics(options: AuditCdsEslintPluginOptions): void {
  const platform = PLATFORM_NAME_MAP[options.platform ?? 'server'];

  init({
    batchMetricsThreshold: 1,
    headers: { Origin: 'https://www.coinbase.com' },
    isProd: options.sendEventsToProd,
    platform,
    projectName: options.projectName,
    showDebugLogging: options.verbose,
    onError: (error) => logError(String(error)),
    version: '1.0',
  });
}

async function sendMetrics(metrics: AggregatedMetric[]): Promise<void> {
  console.log(`Sending ${metrics.length} metrics...`);

  for (const metric of metrics) {
    logMetric({
      metricName: metric.metricName,
      metricType: metric.metricType,
      value: metric.value,
      tags: {
        ...metric.tags,
      },
    });
  }

  await flushQueue();
  await sleep(FLUSH_DELAY_MS);

  console.log('Metric logging complete');
}

const auditCdsEslintPlugin = createTask<AuditCdsEslintPluginOptions>(
  'audit-cds-eslint-plugin',
  async (task, options) => {
    try {
      const { eslintOutputFile, repositoryName, verbose, sendEventsToProd, projectName } = options;

      if (!eslintOutputFile) {
        throw new Error('eslintOutputFile is required');
      }
      if (!repositoryName) {
        throw new Error('repositoryName is required');
      }

      console.log(color.project('=== ESLint CDS Metrics Collection ==='));
      console.log(`Repository: ${repositoryName}`);
      console.log(`Send to prod: ${sendEventsToProd ?? true}`);
      console.log(`Project name: ${projectName}`);

      const eslintResults = EslintOutputParser.parseEslintOutput(eslintOutputFile);
      if (eslintResults.length === 0) {
        console.log('No ESLint results found. Exiting.');
        return task.exec('echo', ['No ESLint results found']);
      }

      console.log(`Parsed ${eslintResults.length} file results from ESLint output`);

      const violations = EslintOutputParser.collectCdsViolations(eslintResults);
      console.log(`Found ${violations.length} CDS rule violations`);

      if (verbose) {
        for (const v of violations) {
          console.log(
            `  ${v.ruleId} (${EslintOutputParser.severityLabel(v.severity)}) at ${v.filePath}:${
              v.line
            }:${v.column}`,
          );
        }
      }

      const metrics = EslintOutputParser.aggregateMetrics(violations, repositoryName);
      console.log(`Aggregated into ${metrics.length} metrics`);

      if (verbose) {
        for (const m of metrics) {
          const tagStr = Object.entries(m.tags)
            .map(([k, v]) => `${k}:${v}`)
            .join(', ');
          console.log(`  ${m.metricName} = ${m.value} [${tagStr}]`);
        }
      }

      if (metrics.length === 0) {
        console.log('No CDS violations found. No metrics to send.');
        return task.exec('echo', ['No CDS violations found']);
      }

      initializeAnalytics(options);
      await sendMetrics(metrics);

      console.log(color.project('=== ESLint CDS Metrics Collection Complete ==='));
    } catch (error) {
      logError(color.failure(error));
    }

    return task.exec('echo', [`Finished collecting ESLint CDS metrics for ${task.projectName}`]);
  },
);

export default auditCdsEslintPlugin;
