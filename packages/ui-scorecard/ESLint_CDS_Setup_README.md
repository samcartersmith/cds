# ESLint CDS Quick Start

## Getting Started

### Installation and Configuration

For full documentation, see [ESLint_CDS_Executor_README](./ESLint_CDS_Executor_README.md#installation).

### Prerequisites: Generating the ESLint Output File

This executor **requires a pre-generated ESLint JSON output file**. Run ESLint with the built-in `json` formatter and save the results to a file before running the executor:

```sh
yarn eslint . --format json --output-file lint-results.json
```

The output file must be a JSON array following ESLint's standard output format. Without this file, the executor has no data to process and will exit immediately.

### Configuration

Add the following target to your `project.json`:

- **eslintOutputFile** [required]: path to the ESLint JSON output file
- **projectName** [required]: snake-cased project name for `@cbhq/client-analytics`
- **repositoryName** [required]: repository name used as a metric tag
- **platform** [optional]: analytics platform (`web`, `ios`, `android`, `server`; defaults to `server`)
- **sendEventsToProd** [optional]: send to production Snowflake table (defaults to `true`)
- **verbose** [optional]: enable detailed logging of individual violations (defaults to `false`)

```json
{
  "targets": {
    "audit-cds-eslint-plugin": {
      "executor": "@cbhq/ui-scorecard:audit-cds-eslint-plugin",
      "options": {
        "eslintOutputFile": "lint-results.json",
        "projectName": "my_project",
        "repositoryName": "my-org/my-repo",
        "platform": "web"
      }
    }
  }
}
```

### Running Locally

First, generate the ESLint output:

```sh
yarn eslint . --format json --output-file lint-results.json
```

Then run the executor:

```sh
yarn nx run <project>:audit-cds-eslint-plugin
```

To test without sending to production:

```sh
yarn nx run <project>:audit-cds-eslint-plugin --sendEventsToProd=false --verbose
```

### Getting Results

When run locally, the executor prints a summary to the console including:

- Number of ESLint file results parsed
- Number of CDS rule violations found
- Number of aggregated metrics sent

With `--verbose` enabled, individual violations and their metric tags are also printed.
