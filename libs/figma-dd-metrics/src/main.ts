#!/usr/bin/env node

/**
 * Main execution script for Figma Library Analytics metrics collection
 * This script fetches data from Figma's Library Analytics API and transforms it
 * into structured metrics for submission to Datadog.
 */

import { logMetricsInBatches, logMetricsToCsv, type MetricData, setupAnalytics } from './analytics';
import {
  type ComponentActionsRow,
  type ComponentUsagesRow,
  fetchAllComponentActions,
  fetchAllComponentUsages,
} from './data';
import { logger } from './logger';
import {
  transformActionsComponentData,
  transformActionsTeamData,
  transformUsageComponentData,
  transformUsageFileData,
} from './transformers';

/**
 * Environment validation
 */
function validateEnvironment(): {
  accessToken: string;
  libraryFileKey: string;
  libraryName: string;
} {
  const accessToken = process.env.FIGMA_ANALYTICS_ACCESS_TOKEN;
  const libraryFileKey = process.env.FIGMA_LIBRARY_FILE_KEY;
  const libraryName = process.env.FIGMA_LIBRARY_NAME;

  if (!accessToken) {
    throw new Error('FIGMA_ANALYTICS_ACCESS_TOKEN environment variable is required');
  }

  if (!libraryFileKey) {
    throw new Error('FIGMA_LIBRARY_FILE_KEY environment variable is required');
  }

  if (!libraryName) {
    throw new Error('FIGMA_LIBRARY_NAME environment variable is required');
  }

  logger.log('Environment validation passed');
  logger.log(`Library File Key: ${libraryFileKey}`);
  logger.log(`Library Name: ${libraryName}`);

  return { accessToken, libraryFileKey, libraryName };
}

/**
 * Get current date string for Figma API
 * The Figma API automatically rounds the date back to the start of the week (Sunday)
 * @returns Date string that Figma API will use to determine the week
 */
function getCurrentDateString(): string {
  return new Date().toDateString();
}

/**
 * Fetch all Figma data and transform into metrics
 * @param libraryFileKey - The Figma library file key
 * @param libraryName - The library name for tagging metrics
 * @returns Promise resolving to array of formatted metrics ready for submission
 */
async function fetchAndFormatMetrics(
  libraryFileKey: string,
  libraryName: string,
): Promise<MetricData[]> {
  // Get current date string to use with Figma Component Actions API (i.e. start_date query parameter)
  // This will have the effect of only getting a snapshot of the component actions performed this week to date
  // Figma API will automatically round down to the previous Sunday from the given start_date.
  const startDate = getCurrentDateString();

  logger.verbose(`\nDate Information:`);
  logger.verbose(`  Start Date: ${startDate} (Figma API will round to start of week)`);

  logger.log('Starting parallel data fetching from Figma API...\n');

  // Narrowed types using Extract for proper union discrimination
  type ActionsByTeamRow = Extract<ComponentActionsRow, { team_name: string }>;
  type ActionsByComponentRow = Extract<ComponentActionsRow, { component_key: string }>;
  type UsagesByComponentRow = Extract<ComponentUsagesRow, { component_key: string }>;
  type UsagesByFileRow = Extract<ComponentUsagesRow, { file_name: string }>;

  // Type guards for narrowing row types
  const isActionsByTeam = (row: ComponentActionsRow): row is ActionsByTeamRow => 'team_name' in row;
  const isActionsByComponent = (row: ComponentActionsRow): row is ActionsByComponentRow =>
    'component_key' in row;
  const isUsagesByComponent = (row: ComponentUsagesRow): row is UsagesByComponentRow =>
    'component_key' in row;
  const isUsagesByFile = (row: ComponentUsagesRow): row is UsagesByFileRow =>
    'file_name' in row && !('component_key' in row);

  // Fetch all data in parallel
  const [actionsTeamRows, actionsComponentRows, usageComponentRows, usageFileRows] =
    await Promise.all([
      // Fetch component actions grouped by team
      fetchAllComponentActions(libraryFileKey, {
        group_by: 'team',
        start_date: startDate,
      }).then((rows) => {
        logger.verbose(`✓ Fetched ${rows.length} component actions rows (grouped by team)`);
        return rows.filter(isActionsByTeam);
      }),

      // Fetch component actions grouped by component
      fetchAllComponentActions(libraryFileKey, {
        group_by: 'component',
        start_date: startDate,
      }).then((rows) => {
        logger.verbose(`✓ Fetched ${rows.length} component actions rows (grouped by component)`);
        return rows.filter(isActionsByComponent);
      }),

      // Fetch component usages grouped by component
      fetchAllComponentUsages(libraryFileKey, {
        group_by: 'component',
      }).then((rows) => {
        logger.verbose(`✓ Fetched ${rows.length} component usage rows (grouped by component)`);
        return rows.filter(isUsagesByComponent);
      }),

      // Fetch component usages grouped by file
      fetchAllComponentUsages(libraryFileKey, {
        group_by: 'file',
      }).then((rows) => {
        logger.verbose(`✓ Fetched ${rows.length} component usage rows (grouped by file)`);
        return rows.filter(isUsagesByFile);
      }),
    ]);

  logger.log('\n=== Figma Data Fetching Complete ===\n');

  // Transform data into metrics
  const actionsTeamResult = transformActionsTeamData(actionsTeamRows, libraryFileKey, libraryName);
  const actionsComponentMetrics = transformActionsComponentData(
    actionsComponentRows,
    libraryFileKey,
    libraryName,
  );
  const usageComponentMetrics = transformUsageComponentData(
    usageComponentRows,
    libraryFileKey,
    libraryName,
  );
  const usageFileResult = transformUsageFileData(usageFileRows, libraryFileKey, libraryName);

  // Log draft filtering results
  if (actionsTeamResult.draftsOmitted > 0) {
    logger.verbose(
      `  Omitted ${actionsTeamResult.draftsOmitted} draft team action rows from metrics`,
    );
  }
  if (usageFileResult.draftsOmitted > 0) {
    logger.verbose(`  Omitted ${usageFileResult.draftsOmitted} draft file usage rows from metrics`);
  }

  // Combine all metrics
  const allMetrics = [
    ...actionsTeamResult.metrics,
    ...actionsComponentMetrics,
    ...usageComponentMetrics,
    ...usageFileResult.metrics,
  ];

  logger.log(`Total metrics to be submitted: ${allMetrics.length}\n`);

  // Display summary statistics
  logger.log('Summary by Metric Type:');
  logger.log(`  figma_lib.actions.team: ${actionsTeamResult.metrics.length} metrics`);
  logger.log(`  figma_lib.actions.component: ${actionsComponentMetrics.length} metrics`);
  logger.log(`  figma_lib.usage.component: ${usageComponentMetrics.length} metrics`);
  logger.log(`  figma_lib.usage.file: ${usageFileResult.metrics.length} metrics`);

  // Display sample metrics for verification
  logger.verbose('\n=== Sample Metrics (first 3 from each type) ===\n');

  logger.verbose('Sample Team Actions:');
  actionsTeamResult.metrics.slice(0, 3).forEach((metric, index) => {
    logger.verbose(`  ${index + 1}. ${JSON.stringify(metric, null, 2)}`);
  });

  logger.verbose('\nSample Component Actions:');
  actionsComponentMetrics.slice(0, 3).forEach((metric, index) => {
    logger.verbose(`  ${index + 1}. ${JSON.stringify(metric, null, 2)}`);
  });

  logger.verbose('\nSample Component Usage:');
  usageComponentMetrics.slice(0, 3).forEach((metric, index) => {
    logger.verbose(`  ${index + 1}. ${JSON.stringify(metric, null, 2)}`);
  });

  logger.verbose('\nSample File Usage:');
  usageFileResult.metrics.slice(0, 3).forEach((metric, index) => {
    logger.verbose(`  ${index + 1}. ${JSON.stringify(metric, null, 2)}`);
  });

  return allMetrics;
}

/**
 * Main execution function
 */
async function main(): Promise<void> {
  logger.log('=== Figma Library Analytics Metrics Collection ===');
  logger.log(`Started at: ${new Date().toISOString()}\n`);

  try {
    // Check if CSV mode is enabled
    const isCsvMode = process.argv.includes('--csv');

    if (!isCsvMode) {
      setupAnalytics();
    }

    // Validate environment
    const { libraryFileKey, libraryName } = validateEnvironment();

    // Fetch and format all metrics
    const allMetrics = await fetchAndFormatMetrics(libraryFileKey, libraryName);

    if (isCsvMode) {
      logger.log('\n=== Running in DEV TEST Mode (CSV Output) ===');
      const outputDir = 'output';
      const filename = `metrics-${new Date().toISOString().split('T')[0]}.csv`;
      await logMetricsToCsv(allMetrics, outputDir, filename);
      logger.log(`Metrics exported to ${outputDir}/${filename}`);
    } else {
      // Send metrics to Datadog in batches to avoid overwhelming the service
      logger.log(`\n=== Sending Metrics to Datadog ===`);
      logger.log(`Total metrics to submit: ${allMetrics.length}`);
      await logMetricsInBatches(allMetrics);
      logger.log('All metrics sent successfully');
    }

    logger.log(`\n=== Script Completed Successfully ===`);
    logger.log(`Finished at: ${new Date().toISOString()}`);

    // TODO: Next step - Submit metrics to Datadog using @cbhq/client-analytics
  } catch (error) {
    console.error('\n=== Error Occurred ===');
    console.error('Error:', error instanceof Error ? error.message : String(error));
    console.error('Stack:', error instanceof Error ? error.stack : undefined);

    console.error('\n=== Script Failed ===');
    process.exit(1);
  }
}

// Execute if run directly
if (require.main === module) {
  main().catch((error: Error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}

export { main };
