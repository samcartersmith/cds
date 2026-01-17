import { getComponentActions, getComponentUsages } from '@cbhq/figma-api';

import { getDistOutputDir, writeCsv } from '../../csv';
import { logger } from '../../logger';
import type { JobOptions } from '../index';

/**
 * The file key for the Illustrations library
 * Extracted from: https://www.figma.com/design/LmkJatvMRVzNgfiIkJDb99
 */
const ILLUSTRATIONS_LIBRARY_FILE_KEY = 'LmkJatvMRVzNgfiIkJDb99';

const DEFAULT_DAYS = 30;

/**
 * Calculate the date N days ago from today
 * @param days - Number of days to go back (default: 30)
 * @returns ISO 8601 date string (YYYY-MM-DD)
 */
function getDaysAgoDate(days: number = DEFAULT_DAYS): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

/**
 * Type for tracking aggregated component data
 */
type ComponentData = {
  componentKey: string;
  componentName: string;
  totalInsertions: number;
  totalUsages: number;
};

/**
 * Fetch all component actions (insertions) with automatic pagination
 * @param libraryFileKey - The file key for the target library
 * @param startDate - Start date for the analytics query
 * @returns Promise resolving to a map of component keys to insertion counts
 */
async function fetchComponentInsertions(
  libraryFileKey: string,
  startDate: string,
): Promise<Map<string, { name: string; insertions: number }>> {
  const componentMap = new Map<string, { name: string; insertions: number }>();
  let cursor: string | undefined;
  let hasNextPage = true;
  let pageCount = 0;

  logger.verbose(`Fetching component actions (insertions) for library: ${libraryFileKey}`);
  logger.verbose(`Start date: ${startDate}`);

  while (hasNextPage) {
    pageCount++;
    logger.verbose(`Fetching insertions page ${pageCount}...`);

    const response = await getComponentActions(libraryFileKey, {
      group_by: 'component',
      start_date: startDate,
      cursor,
    });

    for (const row of response.rows) {
      // Type guard: ensure we have the component-grouped row type
      if (!('component_key' in row) || !('component_name' in row) || !('insertions' in row)) {
        continue;
      }

      const { component_key, component_name, insertions } = row;

      // Aggregate insertions by component
      const existing = componentMap.get(component_key);
      if (existing) {
        existing.insertions += insertions;
      } else {
        componentMap.set(component_key, {
          name: component_name,
          insertions,
        });
      }
    }

    hasNextPage = response.next_page;
    cursor = response.cursor;

    if (hasNextPage && !cursor) {
      logger.verbose('API indicated next_page but no cursor was provided');
      break;
    }
  }

  logger.verbose(`Completed fetching ${pageCount} pages of insertions`);
  return componentMap;
}

/**
 * Fetch all component usages with automatic pagination
 * @param libraryFileKey - The file key for the target library
 * @returns Promise resolving to a map of component keys to usage counts
 */
async function fetchComponentUsages(
  libraryFileKey: string,
): Promise<Map<string, { name: string; usages: number }>> {
  const componentMap = new Map<string, { name: string; usages: number }>();
  let cursor: string | undefined;
  let hasNextPage = true;
  let pageCount = 0;

  logger.verbose(`Fetching component usages for library: ${libraryFileKey}`);

  while (hasNextPage) {
    pageCount++;
    logger.verbose(`Fetching usages page ${pageCount}...`);

    const response = await getComponentUsages(libraryFileKey, {
      group_by: 'component',
      cursor,
    });

    for (const row of response.rows) {
      // Type guard: ensure we have the component-grouped row type
      if (!('component_key' in row) || !('component_name' in row) || !('usages' in row)) {
        continue;
      }

      const { component_key, component_name, usages } = row;

      // Aggregate usages by component
      const existing = componentMap.get(component_key);
      if (existing) {
        existing.usages += usages;
      } else {
        componentMap.set(component_key, {
          name: component_name,
          usages,
        });
      }
    }

    hasNextPage = response.next_page;
    cursor = response.cursor;

    if (hasNextPage && !cursor) {
      logger.verbose('API indicated next_page but no cursor was provided');
      break;
    }
  }

  logger.verbose(`Completed fetching ${pageCount} pages of usages`);
  return componentMap;
}

/**
 * Job: illustration-usage
 *
 * Fetches component actions and usages for the Illustrations library and generates
 * a CSV file with the total number of insertions and usages for each target component
 * over the past N days (default: 30) for insertions and current usages.
 *
 * @param options - Job options including optional days parameter
 */
export async function illustrationUsageJob(options: JobOptions = {}): Promise<void> {
  logger.log('=== Illustration Usage Job ===');
  logger.log(`Started at: ${new Date().toISOString()}`);

  // Check for Figma access token
  const accessToken = process.env.FIGMA_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('FIGMA_ACCESS_TOKEN environment variable is required');
  }

  const days = options.days ?? DEFAULT_DAYS;
  const startDate = getDaysAgoDate(days);
  logger.log(`Fetching insertion data from past ${days} days`);
  logger.log(`Start date: ${startDate}`);
  logger.log(`Fetching current usage data (all time)`);
  logger.log(`Library file key: ${ILLUSTRATIONS_LIBRARY_FILE_KEY}`);

  // Fetch insertions and usages in parallel
  logger.log('\nFetching data...');
  const [insertionsMap, usagesMap] = await Promise.all([
    fetchComponentInsertions(ILLUSTRATIONS_LIBRARY_FILE_KEY, startDate),
    fetchComponentUsages(ILLUSTRATIONS_LIBRARY_FILE_KEY),
  ]);

  // Combine the data
  const allComponentKeys = new Set([...insertionsMap.keys(), ...usagesMap.keys()]);
  const componentData: ComponentData[] = [];

  for (const componentKey of allComponentKeys) {
    const insertionData = insertionsMap.get(componentKey);
    const usageData = usagesMap.get(componentKey);
    const componentName = insertionData?.name || usageData?.name || 'Unknown';

    componentData.push({
      componentKey,
      componentName,
      totalInsertions: insertionData?.insertions || 0,
      totalUsages: usageData?.usages || 0,
    });
  }

  logger.log(`Found ${componentData.length} components`);

  // Sort by total usages (descending), then by total insertions
  componentData.sort((a, b) => {
    if (b.totalUsages !== a.totalUsages) {
      return b.totalUsages - a.totalUsages;
    }
    return b.totalInsertions - a.totalInsertions;
  });

  // Generate CSV
  const headers = ['Component Name', 'Component Key', 'Total Usages', 'Total Insertions'];
  const rows = componentData.map((component) => [
    component.componentName,
    component.componentKey,
    component.totalUsages,
    component.totalInsertions,
  ]);

  const outputDir = getDistOutputDir();
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `illustration-usage-${timestamp}.csv`;

  writeCsv(headers, rows, outputDir, filename);

  logger.log(`\n=== Job Completed Successfully ===`);
  logger.log(`Finished at: ${new Date().toISOString()}`);
}
