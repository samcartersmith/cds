## Overview

This repository contains internal tooling and projects that support the public Coinbase Design System (CDS). The main public CDS repository is at [github.com/coinbase/cds](https://github.com/coinbase/cds). This repo includes development tools, migration scripts, build utilities, and internal applications used to maintain and evolve the design system products.

Primary language: Typescript
Package manager: yarn
Task runner & monorepo tooling: Nx
Runtime: NodeJS (see .nvmrc for version)

## Agent Guidelines

- NEVER make commits without being instructed to do so directly
- IMPORTANT: After you are done writing code, ALWAYS perform these tasks:
  1. run the unit for the **specific file(s)** you modified
  2. run typecheck on the **specific package(s)** you modified
  3. run the formatter
- For complex tasks, ask clarifying questions to the user before executing
- ALWAYS look for relevant skills and rules you can apply before beginning your work

## Core Commands

- `yarn install` - Install dependencies
- `yarn clean` - Removes all build artifacts, deletes .nx folder and resets the Nx daemon
- `yarn nx reset` - Reset Nx daemon cache

## Nx Commands

**ALWAYS** run Nx commands using the formats demonstrated by the commands below.

- `yarn nx show projects` - Show all projects in the workspace (project names differ from package names)
- `yarn nx affected --target=test` - Run tests only for affected projects
- `yarn nx run <project>:test` - Run tests for a specific project
- `yarn nx run <project>:test --testNamePattern=<pattern>` - Run tests matching pattern
- `yarn nx format:write` - Formats all files in the workspace with Prettier
- `yarn nx run <project>:lint` - Lint a specific project
- `yarn nx run <project>:typecheck` - Check for type errors in a specific project
- `yarn nx run-many --target=<target1>,<target2>` - Run targets for all projects
- `yarn nx run-many --target=<target1>,<target2> --projects=<project1>,<project2>` - Run targets for specific projects

## Key Packages and Tools

### Internal CDS Packages (Coinbase-Specific)

**⚠️ Note**: Code in these packages is bespoke to Coinbase and not meant to be shipped with public, open-source CDS. Publishing code here should be an exception to the norm.

- **@cbhq/cds-web-internal** (`packages/web-internal/`) - Coinbase-specific web components not suitable for public CDS
- **@cbhq/cds-mobile-internal** (`packages/mobile-internal/`) - Coinbase-specific React Native components not suitable for public CDS
- **@cbhq/cds-common-internal** (`packages/common-internal/`) - Shared utilities and types specific to Coinbase internal use

### Tooling and Utilities

- **Migrator** (`packages/migrator/`) - Migration tools for CDS version upgrades
- **VS Code Plugin** (`packages/vscode-plugin/`) - VS Code extension for CDS development
- **Codegen** (`libs/codegen/`) - Code generation utilities
- **Figma API** (`libs/figma-api/`) - Figma integration tools
- **Icon Tasks** (`libs/icon-tasks/`) - Icon asset management
- **Illustration Tasks** (`libs/illustration-tasks/`) - Illustration asset management
- Additional packages in `packages/`, `libs/`, and `actions/` directories

## Standards & Best Practices

### General

- We prefer quality over quantity for unit tests: focus on high-quality tests that provide outsized value before writing exhaustive test cases for coverage.
- Prefer constants over magic numbers: replace hard-coded values with descriptively named constants in camelCase
- Use meaningful names: variables and functions should reveal their purpose
- Code is self-documenting: code shouldn't need comments unless it is unusually complex in which case add brief comments where appropriate
