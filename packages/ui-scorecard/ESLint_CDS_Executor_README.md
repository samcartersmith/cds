# ESLint CDS Executor

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Generating the ESLint Output File](#generating-the-eslint-output-file)
  - [Configuration](#configuration)
    - [Sending Metrics to Snowflake](#sending-metrics-to-snowflake)
  - [Executing Locally](#executing-locally)
  - [Executing on CI](#executing-on-ci)
- [Understanding the Metrics](#understanding-the-metrics)
- [Contributions](#contributions)

## Overview

The ESLint CDS Executor is an automated solution for collecting and reporting CDS ESLint rule violations across Coinbase repositories. It parses ESLint JSON output, extracts violations of `@coinbase/cds/` and `@cbhq/cds/` rules, aggregates them into metrics, and sends those metrics to Snowflake via `@cbhq/client-analytics`.

The executor is one of several executors included in the `@cbhq/ui-scorecard` package.

## Prerequisites

This executor requires an **ESLint JSON output file** to function. You must run ESLint with a JSON formatter and write the results to a file _before_ running this executor. See [Generating the ESLint Output File](#generating-the-eslint-output-file) for details.

## Getting Started

Having some context around [Nx task executors](https://nx.dev/plugin-features/use-task-executors) will make the following setup easier to understand.

### Installation

```sh
yarn add --dev @cbhq/ui-scorecard
```

Install this package as a dev dependency as it's not required to run your app.

### Generating the ESLint Output File

The executor reads from a pre-generated ESLint JSON output file. Run ESLint with the `json` formatter and direct the output to a file:

```sh
yarn eslint . --format json --output-file lint-results.json
```

The resulting file must be a JSON array of objects, where each object represents a file and contains a `messages` array of lint violations. This is the default structure produced by ESLint's built-in `json` formatter.

Example structure:

```json
[
  {
    "filePath": "/absolute/path/to/file.tsx",
    "messages": [
      {
        "ruleId": "@coinbase/cds/no-deprecated-components",
        "severity": 2,
        "message": "Button is deprecated. Use the CDS Button instead.",
        "line": 10,
        "column": 5
      }
    ]
  }
]
```

### Configuration

Add the task to the list of targets in your `project.json` file. The `eslintOutputFile`, `projectName`, and `repositoryName` options are **required**:

```json
{
  "targets": {
    "audit-cds-eslint-plugin": {
      "executor": "@cbhq/ui-scorecard:audit-cds-eslint-plugin",
      "options": {
        "eslintOutputFile": "lint-results.json",
        "projectName": "my_project",
        "repositoryName": "my-org/my-repo"
      }
    }
  }
}
```

All available options are defined in the `properties` of [schema.json](./src/executors/audit-cds-eslint-plugin/schema.json):

| Option             | Type    | Required | Default    | Description                                                                |
| ------------------ | ------- | -------- | ---------- | -------------------------------------------------------------------------- |
| `eslintOutputFile` | string  | Yes      | —          | Path to the ESLint JSON output file.                                       |
| `projectName`      | string  | Yes      | —          | Snake-cased project name passed to `@cbhq/client-analytics` `init()`.      |
| `repositoryName`   | string  | Yes      | —          | Consumer repository name used as a metric tag.                             |
| `platform`         | string  | No       | `"server"` | Analytics platform identifier (`web`, `ios`, `android`, or `server`).      |
| `sendEventsToProd` | boolean | No       | `true`     | Send metrics to the production analytics endpoint.                         |
| `verbose`          | boolean | No       | `false`    | Enable verbose/debug logging to see individual violations and tag details. |

### Executing Locally

First, generate the ESLint output file:

```sh
yarn eslint . --format json --output-file lint-results.json
```

Then run the executor:

```sh
yarn nx run <project>:audit-cds-eslint-plugin
```

You can pass any schema property as a CLI flag to override `project.json` defaults:

```sh
yarn nx run <project>:audit-cds-eslint-plugin --sendEventsToProd=false --verbose
```

### Executing on CI

Add a step to your CI pipeline that first runs ESLint to produce the JSON output file, then runs the executor:

```yml
steps:
  - label: Collect CDS ESLint Metrics
    commands:
      - yarn eslint . --format json --output-file lint-results.json
      - yarn nx run <project>:audit-cds-eslint-plugin
```

## Understanding the Metrics

The executor produces three categories of aggregated metrics from CDS rule violations:

| Metric Name                          | Description                                                | Tags                                  |
| ------------------------------------ | ---------------------------------------------------------- | ------------------------------------- |
| `eslint_cds.total_violations`        | Total violation count by severity                          | `repository`, `severity`              |
| `eslint_cds.violations_by_rule`      | Violation count per CDS rule                               | `repository`, `rule`, `severity`      |
| `eslint_cds.violations_by_component` | Violation count per CDS component mentioned in the message | `repository`, `component`, `severity` |

Only rules prefixed with `@coinbase/cds/` or `@cbhq/cds/` are counted. All other ESLint violations are ignored.

### Architecture

The [impl.ts](./src/executors/audit-cds-eslint-plugin/impl.ts) file serves as the entry point for this executor and runs when you execute `yarn nx run <project>:audit-cds-eslint-plugin`. The entry point is determined by the `implementation` field in the [executors.json](./executors.json) file.

Key source files:

- **impl.ts** — Executor entry point; initializes analytics, orchestrates parsing and metric sending.
- **EslintOutputParser.ts** — Parses the ESLint JSON output, filters for CDS rule violations, and aggregates metrics.
- **constants.ts** — CDS rule prefixes, known component names, and shared constants.
- **types.ts** — TypeScript types for executor options, ESLint results, violations, and aggregated metrics.
- **schema.json** — Nx executor schema defining available options.
