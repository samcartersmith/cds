import type {
  GetLibraryAnalyticsComponentActionsQueryParams,
  GetLibraryAnalyticsComponentActionsResponse,
  GetLibraryAnalyticsComponentUsagesQueryParams,
  GetLibraryAnalyticsComponentUsagesResponse,
  LibraryAnalyticsComponentActionsByAsset,
  LibraryAnalyticsComponentActionsByTeam,
  LibraryAnalyticsComponentUsagesByAsset,
  LibraryAnalyticsComponentUsagesByFile,
} from '@figma/rest-api-spec';
import * as https from 'node:https';
import { URL } from 'node:url';

import { logger } from './logger';

// TODO: Migrate to use the @cbhq/figma-api package
/**
 * Base URL for Figma API
 */
const FIGMA_API_BASE_URL = 'https://api.figma.com/v1';

/**
 * Rate limiting configuration
 * Figma API has rate limits, so we implement delays between requests
 */
const RATE_LIMIT_DELAY_MS = 100; // 100ms delay between requests

/**
 * Retry configuration for transient failures
 */
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

/**
 * Sleep utility for rate limiting and retries
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Get Figma access token from environment
 */
function getFigmaAccessToken(): string {
  const token = process.env.FIGMA_ANALYTICS_ACCESS_TOKEN;
  if (!token) {
    throw new Error('FIGMA_ANALYTICS_ACCESS_TOKEN environment variable is not set');
  }
  return token;
}

/**
 * Parse Figma API error response and create appropriate error type
 */
function parseFigmaError(statusCode: number, responseBody: string, url: string): Error {
  let errorData: { err?: string; status?: number };
  try {
    errorData = JSON.parse(responseBody);
  } catch {
    errorData = {};
  }

  const message = errorData.err || `HTTP ${statusCode} error from ${url}`;

  switch (statusCode) {
    case 401:
    case 403:
      return new Error(
        `${
          statusCode === 401 ? 'Authentication error: ${message}' : 'Permission denied: ${message}'
        }`,
      );
    case 404:
      return new Error(`Not found: ${message}`);
    case 429:
      return new Error(`Rate limited: ${message}`);
    default:
      return new Error(`Unknown error: ${message}`);
  }
}

/**
 * Make HTTP request to Figma API with retries
 */
async function makeRequest<T>(
  path: string,
  queryParams: Record<string, string> = {},
  retryCount = 0,
): Promise<T> {
  const figmaUrl = new URL(`${FIGMA_API_BASE_URL}/${path}`);

  // Add query parameters
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      figmaUrl.searchParams.set(key, value);
    }
  });

  return new Promise<T>((resolve, reject) => {
    let responseBody = '';

    const req = https.request(
      {
        hostname: figmaUrl.hostname,
        path: `${figmaUrl.pathname}?${figmaUrl.searchParams.toString()}`,
        method: 'GET',
        headers: {
          'X-Figma-Token': getFigmaAccessToken(),
        },
      },
      (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk: string) => {
          responseBody += chunk;
        });
        res.on('end', async () => {
          const statusCode = res.statusCode || 0;

          // Handle rate limiting with retry
          if (statusCode === 429 && retryCount < MAX_RETRIES) {
            logger.verbose(
              `Rate limited, retrying in ${RETRY_DELAY_MS}ms... (attempt ${
                retryCount + 1
              }/${MAX_RETRIES})`,
            );
            await sleep(RETRY_DELAY_MS);
            try {
              const result = await makeRequest<T>(path, queryParams, retryCount + 1);
              resolve(result);
            } catch (error) {
              reject(error);
            }
            return;
          }

          // Handle error status codes
          if (statusCode < 200 || statusCode >= 300) {
            reject(parseFigmaError(statusCode, responseBody, figmaUrl.toString()));
            return;
          }

          // Parse and validate response
          try {
            const data = JSON.parse(responseBody) as T;
            resolve(data);
          } catch (error) {
            reject(new Error(`Failed to parse response from ${figmaUrl.toString()}`));
          }
        });
      },
    );

    req.on('error', (error) => {
      // Retry on network errors
      if (retryCount < MAX_RETRIES) {
        logger.verbose(
          `Network error, retrying in ${RETRY_DELAY_MS}ms... (attempt ${
            retryCount + 1
          }/${MAX_RETRIES})`,
        );
        sleep(RETRY_DELAY_MS)
          .then(() => makeRequest<T>(path, queryParams, retryCount + 1))
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error(`Network error: ${error.message}`));
      }
    });

    req.end();
  });
}

/**
 * Fetch component usages from Figma Library Analytics API
 *
 * @param config - Configuration for the API request
 * @returns Promise resolving to component usages response
 *
 * @see https://developers.figma.com/docs/rest-api/library-analytics-endpoints/
 */
export async function fetchComponentUsages(
  libraryFileKey: string,
  config: GetLibraryAnalyticsComponentUsagesQueryParams,
): Promise<GetLibraryAnalyticsComponentUsagesResponse> {
  const path = `analytics/libraries/${libraryFileKey}/component/usages`;

  const queryParams: Record<string, string> = {
    group_by: config.group_by,
  };

  if (config.cursor) {
    queryParams.cursor = config.cursor;
  }

  // Apply rate limiting delay before making request
  await sleep(RATE_LIMIT_DELAY_MS);

  return makeRequest<GetLibraryAnalyticsComponentUsagesResponse>(path, queryParams);
}

/**
 * Fetch all component usages with automatic pagination
 *
 * @param config - Configuration for the API request
 * @returns Promise resolving to all component usage rows across all pages
 */
export async function fetchAllComponentUsages(
  libraryFileKey: string,
  config: GetLibraryAnalyticsComponentUsagesQueryParams,
): Promise<(LibraryAnalyticsComponentUsagesByAsset | LibraryAnalyticsComponentUsagesByFile)[]> {
  const allRows: (
    | LibraryAnalyticsComponentUsagesByAsset
    | LibraryAnalyticsComponentUsagesByFile
  )[] = [];
  let currentCursor: string | undefined = config.cursor;
  let hasNextPage = true;

  logger.verbose(`Fetching component usages for library: ${libraryFileKey}`);
  logger.verbose(`Grouping by: ${config.group_by}`);

  while (hasNextPage) {
    const response = await fetchComponentUsages(libraryFileKey, {
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
 * Fetch component actions from Figma Library Analytics API
 *
 * @param libraryFileKey - The file key for the target library
 * @param config - Configuration for the API request including optional start_date and end_date
 * @returns Promise resolving to component actions response
 *
 * @see https://developers.figma.com/docs/rest-api/library-analytics-endpoints/#get-component-actions-endpoint
 */
export async function fetchComponentActions(
  libraryFileKey: string,
  config: GetLibraryAnalyticsComponentActionsQueryParams,
): Promise<GetLibraryAnalyticsComponentActionsResponse> {
  const path = `analytics/libraries/${libraryFileKey}/component/actions`;

  const queryParams: Record<string, string> = {
    group_by: config.group_by,
  };

  if (config.cursor) {
    queryParams.cursor = config.cursor;
  }

  if (config.start_date) {
    queryParams.start_date = config.start_date;
  }

  if (config.end_date) {
    queryParams.end_date = config.end_date;
  }

  // Apply rate limiting delay before making request
  await sleep(RATE_LIMIT_DELAY_MS);

  return makeRequest<GetLibraryAnalyticsComponentActionsResponse>(path, queryParams);
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
  config: GetLibraryAnalyticsComponentActionsQueryParams,
): Promise<(LibraryAnalyticsComponentActionsByAsset | LibraryAnalyticsComponentActionsByTeam)[]> {
  const allRows: (
    | LibraryAnalyticsComponentActionsByAsset
    | LibraryAnalyticsComponentActionsByTeam
  )[] = [];
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
    const response = await fetchComponentActions(libraryFileKey, {
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
