# @cbhq/illustration-tasks

A collection of Nx executors for Figma integrations.

## Installation

```shell
yarn add --dev @cbhq/illustration-tasks
```

## Usage

Tasks provided by this package are configured as targets within a project's `project.json`. For example, if we wanted to sync icons from Figma, we would use the `sync-icons` task.

```json
{
  // ...
  "targets": {
    // ...
    "build": {
      "executor": "@cbhq/illustration-tasks:sync-icons",
      "options": {
        "fileId": "[FIGMA FILE ID]"
      }
    }
  }
}
```

> View the `executors.json` file for a list of all supported tasks.
