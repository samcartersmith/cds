# Figma Analytics Export

A library for exporting Figma Library Analytics data to CSV files.

## Overview

This tool fetches data from Figma's Library Analytics API and generates CSV reports for various metrics. It supports multiple jobs that can be run independently, each with configurable options.

## Quick Start

```bash
# List all available jobs
yarn nx run figma-analytics-export:run

# Run a specific job with default settings (30 days for insertions)
yarn nx run figma-analytics-export:illustration-usage

# Run with custom days parameter
cd libs/figma-analytics-export
tsx src/main.ts --job=illustration-usage --days=90
```

## Environment Variables

- `FIGMA_ACCESS_TOKEN` - **Required**. Your Figma API access token
- `VERBOSE_LOGS=1` - **Optional**. Enable verbose logging for debugging

## Available Jobs

### illustration-usage

Fetches component usage and insertion data for the Illustrations library and exports them to a CSV file.

**Description:**
Analyzes both current usage (total instances across all files) and recent insertions (new additions over a time period) for all components in the Illustrations library. The report includes component names, keys, total usages, and total insertions, sorted by usage popularity. This provides a comprehensive view of both overall adoption and recent activity.

**Key Metrics:**

- **Total Usages**: The total number of instances of each component currently used across all files in the organization (all-time count)
- **Total Insertions**: The number of times each component was newly inserted into designs over the specified time period (recent activity)

**Arguments:**

- `--days=<number>` - Number of days to fetch insertion data for (default: `30`)
  - Examples: `--days=7`, `--days=90`, `--days=180`
  - Must be a positive integer
  - Note: Usage data is always fetched for all time (current total usage count)

**Usage:**

```bash
# Using nx (runs with default 30 days for insertions)
yarn nx run figma-analytics-export:illustration-usage

# Using tsx with default 30 days for insertions
cd libs/figma-analytics-export
tsx src/main.ts --job=illustration-usage

# Fetch insertion data for the past 90 days
tsx src/main.ts --job=illustration-usage --days=90

# Fetch insertion data for the past week
tsx src/main.ts --job=illustration-usage --days=7
```

**Output:**
`dist/illustration-usage-YYYY-MM-DD.csv`

**Output Format:**
| Column Name | Description |
|-------------|-------------|
| Component Name | The name of the illustration component |
| Component Key | The unique Figma key for the component |
| Total Usages | Total number of instances currently used across all files (all-time) |
| Total Insertions | Number of times the component was inserted during the specified time period |

**Library:**
[Illustrations Library](https://www.figma.com/design/LmkJatvMRVzNgfiIkJDb99)

---

### list-all-illustrations

Lists all component names from the Illustrations library and saves them to a text file.

**Description:**
Fetches all component names from the Illustrations library (without filtering) and saves them to a text file, sorted alphabetically. This is useful for discovering what components exist in the library and verifying component names.

**Arguments:**
None

**Usage:**

```bash
# Using nx
yarn nx run figma-analytics-export:list-all-illustrations

# Using tsx
cd libs/figma-analytics-export
tsx src/main.ts --job=list-all-illustrations
```

**Output:**
`dist/all-illustration-names-YYYY-MM-DD.txt`

**Output Format:**
A plain text file with one component name per line, sorted alphabetically.

**Library:**
[Illustrations Library](https://www.figma.com/design/LmkJatvMRVzNgfiIkJDb99)

## Adding New Jobs

1. Create a new directory under `src/jobs/<job-name>/`
2. Implement the job function in `src/jobs/<job-name>/index.ts`
3. Register the job in `src/jobs/index.ts`
