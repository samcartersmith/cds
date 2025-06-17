# CDS Component Tracker

A GitHub Action that analyzes and tracks the usage of CDS (Component Design System) components in TypeScript/React projects. This action helps teams monitor their adoption of design system components and maintain consistency across their codebase.

## Features

- Tracks usage of CDS components vs non-CDS components
- Calculates the percentage of CDS component adoption
- Provides detailed statistics for each component including:
  - Number of times used
  - Import paths
  - Component versions
- Sends analytics data to Datadog for monitoring and tracking trends
- Supports TypeScript and React projects

## Usage

Add the following GitHub Actions workflow to the application repo where we want to track CDS usage:

```yaml
name: CDS Github Actions

on:
  push:
    branches:
      - master
  workflow_dispatch:

jobs:
  test-local:
    runs-on: [small, default-config]
    steps:
      - uses: actions/checkout@v4

      - name: Analyze CDS Components
        uses: frontend/cds/cds-adoption-tracker@v1
        with:
          project-name: 'your-project-name'
          tsconfig-path: './tsconfig.json'
          package-json-path: './package.json' # optional - defaults to tsconfig-path
```

## Inputs

| Input               | Description                                | Required | Default         |
| ------------------- | ------------------------------------------ | -------- | --------------- |
| `project-name`      | Name of the project for analytics tracking | Yes      | N/A             |
| `tsconfig-path`     | Path to your project's tsconfig.json file  | Yes      | N/A             |
| `package-json-path` | Path to your project's package.json file   | No       | [tsconfig-path] |

## Output

The action provides console output with the following information:

- Total number of CDS components used
- Total number of non-CDS components used
- Percentage of CDS component adoption

Additionally, it sends detailed component usage metrics to Datadog for tracking and visualization.

## How it Works

1. The action analyzes your TypeScript/React project using the TypeScript Compiler API
2. It identifies and tracks:
   - CDS component imports and usage
   - Non-CDS presentational component imports and usage
3. For each component, it collects:
   - Component name
   - Import path
   - Version information
   - Usage count
4. The collected data is sent to Datadog for monitoring and analysis

## Notes

- The action will not fail your workflow if it encounters errors
- Index files (index.tsx) are excluded from the analysis
- The action requires access to your project's tsconfig.json and package.json files
- Analytics data is sent to Datadog with a 4-second delay to ensure all metrics are properly batched
