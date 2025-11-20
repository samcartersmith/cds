# @cbhq/figma-dd-metrics

Integration with Figma Library Analytics API for tracking design system usage metrics in Datadog.

## Features

- **Automated Data Collection**: Runs weekly on Saturdays at 9pm UTC via GitHub Actions (.workflows/figma-library-metrics.yml)
- **Multiple Library Support**: Track metrics from multiple Figma libraries simultaneously using parallel jobs
- **Comprehensive Data**: Tracks both component usage (current state) and component actions (weekly changes)
- **Draft File Filtering**: Automatically filters out draft entries to ensure clean data
- **Figma API Rate Limiting**: Respects Figma API rate limits with automatic delays and retries
- **Figma API Pagination Support**: Automatically handles paginated responses for large datasets

## Figma Personal Access Token

1. Log in to your Figma account
2. Navigate to Settings → Security
3. Under "Personal Access Tokens", click "Generate new token"
4. Set the expiration and ensure the `library_analytics:read` scope is selected
5. Copy the token securely

The Figma API access token is securely stored in the internal Config Service under the [infra-buildkite-prod-use1/actions-context/frontend/cds-production](https://config.cbhq.net/infra-buildkite-prod-use1/actions-context/frontend/cds-production) scope.

### Key Rotation

All Figma PATs expire after a set time. Prior to expiration, a new token will need to be generated and replaced in the Config Service entry, linked above.

Restoration of long-lived PATs for readonly resources is highly requested by the Figma community as it was supported at one point in the past. It's possible the ability returns after which we can end the key rotation process.

See community post: [Extended no expiration personal access tokens](https://forum.figma.com/suggest-a-feature-11/extended-no-expiration-personal-access-tokens-40595?postid=181507#post181507)

## Usage

The library runs automatically via GitHub Actions on a weekly schedule (Saturdays at 9pm UTC). No manual intervention is required once configured.

To add additional libraries to track, add a new job to `.github/workflows/figma-library-metrics.yml` following the existing job template and set the appropriate `FIGMA_LIBRARY_FILE_KEY` for each library.

## Metrics

The library reports metrics from two Figma API endpoints:

### Component Actions (Weekly Activity)

**API Endpoint**: `GET /analytics/libraries/{library_file_key}/component/actions`

These metrics track component insertion and detachment actions on a weekly basis. The Figma API automatically rounds the date back to the start of the week (Sunday) from the given start_data query parameter.

#### metric: `figma_lib.actions.team`

- **Type**: GAUGE
- **API Query**: `group_by=team`
- **Description**: Weekly component insertions and detachments grouped by team
- **Tags**:
  - `page_key`: `ui_systems_adoption` (required)
  - `figma_team`: Team name
  - `library_key`: Library file key
  - `library_name`: Library name
  - `week_sampled`: Unix timestamp (milliseconds) of the week
  - `action_type`: `insertion` or `detachment`
- **Note**: Draft entries (`<Drafts>` team) are automatically filtered out

#### metric: `figma_lib.actions.component`

- **Type**: GAUGE
- **API Query**: `group_by=component`
- **Description**: Weekly component insertions and detachments aggregated by component name (all variants summed together)
- **Tags**:
  - `page_key`: `ui_systems_adoption` (required)
  - `component_name`: Component name or component set name
  - `library_key`: Library file key
  - `library_name`: Library name
  - `action_type`: `insertion` or `detachment`
- **Note**: Metrics are aggregated across all variants of a component. Individual variant metrics are not collected for actions.

### Component Usage (Current State)

**API Endpoint**: `GET /analytics/libraries/{library_file_key}/component/usages`

These metrics provide a snapshot of current component usage across the organization. Updated daily by Figma at 00:00 UTC.

#### metric: `figma_lib.usage.component`

- **Type**: GAUGE
- **API Query**: `group_by=component`
- **Description**: Current usage statistics for components and their variants
- **Tags**:
  - `page_key`: `ui_systems_adoption` (required)
  - `component_name`: Component name or component set name
  - `library_key`: Library file key
  - `library_name`: Library name
  - `usage_type`: One of:
    - `total`: Total number of component instances (aggregated across all variants)
    - `variant_total`: Total instances for a specific variant (includes `component_key` and `component_variant` tags)
    - `variant_files`: Number of files using a specific variant (includes `component_key` and `component_variant` tags)
    - `variant_teams`: Number of teams using a specific variant (includes `component_key` and `component_variant` tags)
- **Additional Tags** (only for variant metrics):
  - `component_key`: Unique component identifier
  - `component_variant`: Component variant name with commas replaced by ampersands (e.g., `shape=circle&size=l`)

#### metric: `figma_lib.usage.file`

- **Type**: GAUGE
- **API Query**: `group_by=file`
- **Description**: Component usage by file and aggregated by team
- **Tags**:
  - `page_key`: `ui_systems_adoption` (required)
  - `figma_team`: Team name
  - `library_key`: Library file key
  - `library_name`: Library name
  - `usage_type`: One of:
    - `files`: Usage count for a specific file (includes `file_name` tag)
    - `teams`: Aggregated usage count for a team across all its files
- **Additional Tags** (only for file-level metrics):
  - `file_name`: Name of the Figma file
- **Note**: Draft entries (`<Drafts>` team) are automatically filtered out

## Architecture

The library is organized into several modules:

- **`main.ts`**: Main entry point that orchestrates the entire metrics collection process

  - Environment validation
  - Date utilities (Figma API automatically rounds to start of week)
  - Week timestamp conversion (ISO 8601 → Unix milliseconds)
  - Parallel data fetching coordination

- **`transformers.ts`**: Data transformation functions for converting Figma API responses into MetricData

  - Draft filtering logic
  - Component name normalization (handles component sets vs standalone components)
  - Metric creation for all data types

- **`figma-client.ts`**: HTTP client for Figma API with authentication, rate limiting, and error handling

  - Raw HTTPS requests (no external HTTP libraries)
  - Automatic pagination handling
  - Rate limiting with configurable delays
  - Retry logic for 429 (rate limit) and network errors
  - Support for both component usage and action endpoints

- **`analytics.ts`**: Integration with `@cbhq/client-analytics` for logging metrics to Datadog

  - Analytics client initialization
  - Batch metric submission (250 metrics per batch with 30-second delays)
  - Automatic `page_key` tag injection
  - Error handling for analytics failures

- **`logger.ts`**: Simple logging utility with verbose mode support
  - `logger.log()`: Always logs to console
  - `logger.verbose()`: Only logs when `VERBOSE_LOGS=1`

### Batching Strategy

When collecting metrics from large Figma libraries, thousands of individual metrics need to be sent to Datadog. Initial attempts to send all metrics at once resulted in network errors, even when using the `@cbhq/client-analytics` async flush method to empty the queue.

The issue was likely caused by rate limiting or connection constraints in the analytics service. To resolve this:

- **Metrics are batched**: Metrics are sent in groups of 250 rather than all at once
- **Delays between batches**: A 30-second delay is introduced between batches to prevent overwhelming the service
- **Flush per batch**: Each batch is flushed before proceeding to the next to ensure proper delivery

The batch size (250 metrics) and delay duration (30 seconds) were determined through trial and error by running the workflow from a test branch and monitoring for successful completion without network errors.

## References

- [Figma Library Analytics API Documentation](https://developers.figma.com/docs/rest-api/library-analytics-endpoints/)
  - [Component Usages Endpoint](https://developers.figma.com/docs/rest-api/library-analytics-endpoints/#get-component-usages-endpoint)
  - [Component Actions Endpoint](https://developers.figma.com/docs/rest-api/library-analytics-endpoints/#get-component-actions-endpoint)
- [Figma Authentication Documentation](https://developers.figma.com/docs/rest-api/authentication/)
- [@cbhq/client-analytics](../../packages/client-analytics/) - Internal analytics client for Datadog submission
