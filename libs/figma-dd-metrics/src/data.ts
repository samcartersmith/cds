import { getComponentActions, getComponentUsages } from '@cbhq/figma-api';

import { logger } from './logger';

// Infer types from the figma-api functions
type ComponentActionsParams = Parameters<typeof getComponentActions>[1];
type ComponentActionsResponse = Awaited<ReturnType<typeof getComponentActions>>;
type ComponentActionsRow = ComponentActionsResponse['rows'][number];

type ComponentUsagesParams = Parameters<typeof getComponentUsages>[1];
type ComponentUsagesResponse = Awaited<ReturnType<typeof getComponentUsages>>;
type ComponentUsagesRow = ComponentUsagesResponse['rows'][number];

// Re-export inferred types for use in other modules
export type {
  ComponentActionsParams,
  ComponentActionsRow,
  ComponentUsagesParams,
  ComponentUsagesRow,
};

/**
 * Fetch all component usages with automatic pagination
 *
 * @param libraryFileKey - The file key for the target library
 * @param config - Configuration for the API request
 * @returns Promise resolving to all component usage rows across all pages
 */
export async function fetchAllComponentUsages(
  libraryFileKey: string,
  config: ComponentUsagesParams,
): Promise<ComponentUsagesRow[]> {
  const allRows: ComponentUsagesRow[] = [];
  let currentCursor: string | undefined = config.cursor;
  let hasNextPage = true;

  logger.verbose(`Fetching component usages for library: ${libraryFileKey}`);
  logger.verbose(`Grouping by: ${config.group_by}`);

  while (hasNextPage) {
    const response = await getComponentUsages(libraryFileKey, {
      ...config,
      cursor: currentCursor,
    });

    allRows.push(...response.rows);

    hasNextPage = response.next_page;
    currentCursor = response.cursor;

    if (hasNextPage && !currentCursor) {
      logger.verbose('API indicated next_page but no cursor was provided');
      break;
    }
  }

  logger.verbose(`Completed fetching ${allRows.length} total component usage rows`);
  return allRows;
}

/**
 * Fetch all component actions with automatic pagination
 *
 * @param libraryFileKey - The file key for the target library
 * @param config - Configuration for the API request including optional start_date and end_date
 * @returns Promise resolving to all component action rows across all pages
 */
export async function fetchAllComponentActions(
  libraryFileKey: string,
  config: ComponentActionsParams,
): Promise<ComponentActionsRow[]> {
  const allRows: ComponentActionsRow[] = [];
  let currentCursor: string | undefined = config.cursor;
  let hasNextPage = true;

  logger.verbose(`Fetching component actions for library: ${libraryFileKey}`);
  logger.verbose(`Grouping by: ${config.group_by}`);
  if (config.start_date) {
    logger.verbose(`Start date: ${config.start_date}`);
  }
  if (config.end_date) {
    logger.verbose(`End date: ${config.end_date}`);
  }

  while (hasNextPage) {
    const response = await getComponentActions(libraryFileKey, {
      ...config,
      cursor: currentCursor,
    });

    allRows.push(...response.rows);

    hasNextPage = response.next_page;
    currentCursor = response.cursor;

    if (hasNextPage && !currentCursor) {
      logger.verbose('API indicated next_page but no cursor was provided');
      break;
    }
  }

  logger.verbose(`Completed fetching ${allRows.length} total component action rows`);
  return allRows;
}
