import { getComponentUsages } from '@cbhq/figma-api';
import { promises as fs } from 'fs';
import { join } from 'path';

import { getDistOutputDir } from '../../csv';
import { logger } from '../../logger';
import type { JobOptions } from '../index';

/**
 * The file key for the Illustrations library
 * Extracted from: https://www.figma.com/design/LmkJatvMRVzNgfiIkJDb99
 */
const ILLUSTRATIONS_LIBRARY_FILE_KEY = 'LmkJatvMRVzNgfiIkJDb99';

/**
 * Fetch all component names from usages with automatic pagination
 * @param libraryFileKey - The file key for the target library
 * @returns Promise resolving to a set of all component names
 */
async function fetchAllComponentNames(libraryFileKey: string): Promise<Set<string>> {
  const componentNames = new Set<string>();
  let cursor: string | undefined;
  let hasNextPage = true;
  let pageCount = 0;

  logger.log(`Fetching all component names for library: ${libraryFileKey}`);

  while (hasNextPage) {
    pageCount++;
    logger.log(`Fetching page ${pageCount}...`);

    const response = await getComponentUsages(libraryFileKey, {
      group_by: 'component',
      cursor,
    });

    logger.verbose(`Page ${pageCount}: ${response.rows.length} rows`);

    for (const row of response.rows) {
      // Type guard: ensure we have the component-grouped row type
      if (!('component_name' in row)) {
        continue;
      }

      componentNames.add(row.component_name);
    }

    hasNextPage = response.next_page;
    cursor = response.cursor;

    if (hasNextPage && !cursor) {
      logger.verbose('API indicated next_page but no cursor was provided');
      break;
    }
  }

  logger.log(`Completed fetching ${pageCount} pages`);
  logger.log(`Found ${componentNames.size} unique component names`);

  return componentNames;
}

/**
 * Job: list-all-illustrations
 *
 * Fetches all illustration component names from the Illustrations library and saves them to a file.
 * This is useful for discovering what illustration components exist in the library.
 *
 * @param options - Job options (unused for this job)
 */
export async function listAllIllustrationsJob(options: JobOptions = {}): Promise<void> {
  logger.log('=== List All Illustrations Job ===');
  logger.log(`Started at: ${new Date().toISOString()}`);

  // Check for Figma access token
  const accessToken = process.env.FIGMA_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('FIGMA_ACCESS_TOKEN environment variable is required');
  }

  logger.log(`Library file key: ${ILLUSTRATIONS_LIBRARY_FILE_KEY}`);

  // Fetch all component names
  logger.log('\nFetching illustration component names...');
  const componentNames = await fetchAllComponentNames(ILLUSTRATIONS_LIBRARY_FILE_KEY);

  // Sort alphabetically for easier reading
  const sortedNames = Array.from(componentNames).sort();

  // Write to file
  const outputDir = getDistOutputDir();
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `all-illustration-names-${timestamp}.txt`;
  const filepath = join(outputDir, filename);

  await fs.writeFile(filepath, sortedNames.join('\n'), 'utf-8');

  logger.log(`\nSaved ${sortedNames.length} illustration component names to: ${filepath}`);
  logger.log(`\n=== Job Completed Successfully ===`);
  logger.log(`Finished at: ${new Date().toISOString()}`);
}
