#!/usr/bin/env node

/**
 * Main execution script for Figma Analytics Export
 *
 * This script runs export jobs that fetch data from Figma's Library Analytics API
 * and generate CSV reports.
 *
 * Usage:
 *   tsx src/main.ts --job=<job-name> [--days=<number>]
 *
 * Available jobs:
 *   - illustration-usage: Export component usage and insertion counts for the Illustrations library
 *
 * Options:
 *   --days=<number>: Number of days to fetch insertion data for (default: 30)
 */

import { getAvailableJobs, runJob, type JobName } from './jobs';
import { logger } from './logger';

/**
 * Parse command line arguments to extract job name and options
 */
function parseArgs(): { jobName: JobName | undefined; days?: number } {
  const args = process.argv.slice(2);
  let jobName: JobName | undefined;
  let days: number | undefined;

  for (const arg of args) {
    if (arg.startsWith('--job=')) {
      jobName = arg.slice('--job='.length) as JobName;
    } else if (arg.startsWith('--days=')) {
      const daysValue = parseInt(arg.slice('--days='.length), 10);
      if (!isNaN(daysValue) && daysValue > 0) {
        days = daysValue;
      }
    }
  }

  return { jobName, days };
}

/**
 * Print usage information
 */
function printUsage(): void {
  const availableJobs = getAvailableJobs();

  logger.log('Usage: tsx src/main.ts --job=<job-name> [--days=<number>]');
  logger.log('');
  logger.log('Available jobs:');
  for (const job of availableJobs) {
    logger.log(`  - ${job}`);
  }
  logger.log('');
  logger.log('Options:');
  logger.log('  --days=<number>    - Optional. Number of days to fetch data for (default: 30)');
  logger.log('');
  logger.log('Environment variables:');
  logger.log('  FIGMA_ACCESS_TOKEN - Required. Figma API access token');
  logger.log('  VERBOSE_LOGS=1     - Optional. Enable verbose logging');
}

/**
 * Main execution function
 */
async function main(): Promise<void> {
  logger.log('=== Figma Analytics Export ===');
  logger.log(`Started at: ${new Date().toISOString()}\n`);

  try {
    const { jobName, days } = parseArgs();

    if (!jobName) {
      printUsage();
      logger.error('\nError: No job specified');
      process.exit(1);
    }

    const availableJobs = getAvailableJobs();
    if (!availableJobs.includes(jobName)) {
      logger.error(`Error: Unknown job "${jobName}"\n`);
      printUsage();
      process.exit(1);
    }

    await runJob(jobName, { days });
  } catch (error) {
    logger.error('\n=== Error Occurred ===');
    logger.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    if (error instanceof Error && error.stack) {
      logger.error(`Stack: ${error.stack}`);
    }

    logger.error('\n=== Script Failed ===');
    process.exit(1);
  }
}

// Execute if run directly
if (require.main === module) {
  main().catch((error: Error) => {
    logger.error(`Unhandled error: ${error.message}`);
    process.exit(1);
  });
}

export { main };
