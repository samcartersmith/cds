# @cbhq/cds-migrator

Codemod transformations to help upgrade your Coinbase Design System (CDS) codebase.

## Migration Types

### Version >= 8.0.0 (JSCodeshift)

- Uses jscodeshift for transformations
- Focuses on TypeScript/TSX files

### Previous Versions (ts-morph)

- Uses ts-morph for transformations
- Only works in Nx monorepo projects
- Requires Nx workspace setup

## Installation

1.  **Install Migrator:**
    Add the migrator package as a dev dependency in your project:

    ```sh
    yarn add @cbhq/cds-migrator --dev
    # or
    npm install @cbhq/cds-migrator --save-dev
    ```

2.  **Install jscodeshift (Required for v8+ Migrations):**
    If running migrations for CDS v8.0.0 or later (like `update-8-0-0`), `jscodeshift` is required in your project:
    ```sh
    yarn add jscodeshift --dev
    # or
    npm install jscodeshift --save-dev
    ```

## Usage: v8+ Migrations (jscodeshift)

For migrating to CDS v8.0.0 and later, use the included CLI wrapper.

### Interactive Incremental Migration (Recommended)

For a guided experience, use the interactive migration script. It will prompt you for the necessary information, making the migration process straightforward.

Some CDS components are interdependent and must be migrated as a group when using the incremental migration approach. See: [Incremental Migration: Component Groups](./docs/incremental-migration-groups.md)

**Run the Interactive Script**

Pass the directory you want to transform as an argument to the script.

```sh
# Run interactive component/hook/etc. migrations
yarn cds-migrator-interactive <path-to-your-source-code>

# Example
yarn cds-migrator-interactive src
```

**Running the Base Transform**

Before running incremental migrations on components, you must run the base transform first. Use the `--base` flag to do this. You only need to run this once per directory.

```sh
# Run the base transform
yarn cds-migrator-interactive <path-to-your-source-code> --base-transform

# Example
yarn cds-migrator-interactive src --base-transform
```

**Follow the Prompts**

The script will guide you through the following questions:

- **(When using `--base-transform`) "Enter a glob pattern to ignore..."**: Optionally provide a pattern to ignore files (e.g., `**/node_modules/**`). This prompt only appears when running the base transform.
- **"What platform do you want to run the transform on?"**: Choose `web` or `mobile`. You can also specify the platform as a command-line argument, e.g. `yarn cds-migrator-interactive src --mobile`.
- **"What do you want to transform?"**:
  - **A specific component**: Choose a single component to migrate from a list.
  - **Hooks**: Runs only hook-related transforms (e.g., `useSpectrum`).
  - **Imports**: Runs only import path migrations. When selected, you can choose to run a specific import path migration or all of them.
  - **Types**: Runs only type-related transforms. When selected, you can choose to migrate a specific type or all of them.
  - **Miscellaneous**: Runs miscellaneous transforms (e.g., palette values).
  - **Everything applicable**: This is the most powerful option. It runs all component migrations and finalizes the import paths in a single pass.

### Manual Migration (Advanced)

You can also run the transformations manually by passing flags directly. This is useful for scripting or CI environments. The main script is `update-8-0-0-incremental`, which requires the `--platform` option (`web` or `mobile`).

All incremental transforms are now controlled via the `--transform-type` flag.

#### Step 1: Base Transform

Run this command **first**. This is a required foundational step to allow v7 and v8 components to coexist.

**With `yarn`:**

```sh
yarn cds-migrator-codemod update-8-0-0-incremental src -- --platform=web --transform-type=base
```

#### Step 2: Granular Transforms

After running the base transform, you can migrate different parts of your codebase.

- **To migrate a specific component:** Use the `--component` flag.
  ```sh
  # Example: Run all migrations for the Box component for web
  yarn cds-migrator-codemod update-8-0-0-incremental src -- --platform=web --component=Box
  ```
- **To migrate only hooks:**
  ```sh
  yarn cds-migrator-codemod update-8-0-0-incremental src -- --platform=web --transform-type=hooks
  ```
- **To migrate only imports:**

  ```sh
  yarn cds-migrator-codemod update-8-0-0-incremental src -- --platform=web --transform-type=imports
  ```

  - **To migrate a specific import path:** You can also use the `--importTransform` and `--importPath` flags to target a specific import path.
    ```sh
    # Example: Migrate only the specified icon import path
    yarn cds-migrator-codemod update-8-0-0-incremental src -- --platform=web --transform-type=imports --importTransform=iconImportPaths --importPath='@cbhq/cds-icons/v7/__generated__/nav/types/NavIconName'
    ```

- **To migrate only types:**
  Note: you must transform imports before types

  ```sh
  yarn cds-migrator-codemod update-8-0-0-incremental src -- --platform=web --transform-type=types
  ```

  - **To migrate a specific type:** You can also use the `--typeTransform` and `--typeName` flags to target a specific type.
    ```sh
    # Example: Migrate only the PaletteAlias type
    yarn cds-migrator-codemod update-8-0-0-incremental src -- --platform=web --transform-type=types --typeTransform=paletteTypes --typeName=PaletteAlias
    ```

- **To migrate miscellaneous items:**
  ```sh
  yarn cds-migrator-codemod update-8-0-0-incremental src -- --platform=web --transform-type=misc
  ```
- **To migrate everything at once:** This runs all component transforms and promotes imports.

  ```sh
  # With the flag
  yarn cds-migrator-codemod update-8-0-0-incremental src -- --platform=web --transform-type=everything

  # Or without a flag, which defaults to 'everything'
  yarn cds-migrator-codemod update-8-0-0-incremental src -- --platform=web
  ```

### Full v8 Migration

Alternatively, after the base transform, you can run the main v8 migration. The `update-8-0-0` transform **requires** the `--platform` option.

**With `npx`:**

```sh
# Example: Run the main v8 migration for the 'web' platform on the 'src' directory
npx @cbhq/cds-migrator update-8-0-0 src -- -- --platform=web
```

**With `yarn`:**

```sh
# Example: Run the main v8 migration for the 'web' platform on the 'src' directory
yarn cds-migrator-codemod update-8-0-0 src -- --platform=web
```

#### Passing Additional Options to jscodeshift

You can pass any other standard `jscodeshift` options after the `--`. This applies to both the incremental and full migration commands.

**With yarn:**

```sh
# Dry run for web
yarn cds-migrator-codemod update-8-0-0 src -- --platform=web --dry

# Verbose output for mobile (level 2)
yarn cds-migrator-codemod update-8-0-0 src -- --platform=mobile -v=2

# Print transformed files to stdout for web
yarn cds-migrator-codemod update-8-0-0 src -- --platform=web --print

# Combine options for web
yarn cds-migrator-codemod update-8-0-0 src test -- --platform=web --dry -v=2
```

**With npx:**

```sh
# Dry run for web
npx @cbhq/cds-migrator update-8-0-0 src -- --platform=web --dry

# Verbose output for mobile (level 2)
npx @cbhq/cds-migrator update-8-0-0 src -- --platform=mobile -v=2

# Print transformed files to stdout for web
npx @cbhq/cds-migrator update-8-0-0 src -- --platform=web --print

# Combine optons for web
npx @cbhq/cds-migrator update-8-0-0 src test -- --platform=web --dry -v=2
```

##### Ignoring Directories (e.g., node_modules)

By default, `jscodeshift` (and thus the codemod CLI) does not ignore `node_modules`. If you run the command on broad paths like `.` (current directory), you should explicitly ignore `node_modules` and potentially other build artifact directories.

**With yarn:**

```sh
# Run on current directory, ignoring node_modules
yarn cds-migrator-codemod update-8-0-0 . -- --platform=mobile --ignore-pattern=node_modules

# Ignore multiple patterns
yarn cds-migrator-codemod update-8-0-0 . -- --platform=web --ignore-pattern='**/node_modules/**' --ignore-pattern='**/dist/**'
```

**With npx:**

```sh
# Run on current directory, ignoring node_modules
npx @cbhq/cds-migrator update-8-0-0 . -- --platform=mobile --ignore-pattern=node_modules

# Ignore multiple patterns
npx @cbhq/cds-migrator update-8-0-0 . -- --platform=web --ignore-pattern='**/node_modules/**' --ignore-pattern='**/dist/**'
```

Refer to the [jscodeshift documentation](https://github.com/facebook/jscodeshift#usage-cli) for all available options.

#### Logging Output to a File

```sh
# Capture stdout and stderr to migration.log for web platform
yarn cds-migrator-codemod update-8-0-0 src -- --platform=web -v=2 > migration.log 2>&1
```

### Advanced: Using `jscodeshift` Directly

You can run specific v8+ transforms directly using `jscodeshift`. Remember to include the `--platform` option and potentially `--ignore-pattern`.

```sh
# Example for mobile (path may vary depending on the specific transform)
npx jscodeshift \
  -t ./node_modules/@cbhq/cds-migrator/cjs/migrations/update-8-0-0-jscodeshift/retail-transforms/migrate-mobile-spacing-margin.js \
  --parser=tsx \
  --platform=mobile \
  --ignore-pattern=node_modules \
  src/**/*.{ts,tsx}
```

### Post-Migration Formatting & Linting (Recommended)

Codemods, especially those using `jscodeshift` and `recast` for parsing and printing code, can sometimes introduce minor formatting inconsistencies (like extra parentheses or slightly different spacing) or code patterns that violate linting rules, even when only necessary changes are made.

**It is highly recommended to run your project's standard code formatter (e.g., Prettier) and linter (e.g., ESLint) over the modified files after running the codemod.** This will ensure the code adheres to your project's style guide and catches potential issues.

```sh
# Example using Prettier & ESLint
prettier --write "src/**/*.ts" "src/**/*.tsx"
eslint --fix "src/**/*.ts" "src/**/*.tsx"
# or your project's formatting/linting commands
```

## Usage: Legacy Migrations (< v8, ts-morph, Nx Required)

Migrations for versions prior to 8.0.0 were built using `ts-morph` and rely on the Nx monorepo tooling. These do not use the `--platform` option in the same way.

### Running Legacy Migrations

These migrations are typically run using an Nx generator within the CDS monorepo.

```sh
# Example for migrating to v4.0.0 (within the CDS Nx workspace)
yarn nx generate @cbhq/cds-migrator:migrate 4.0.0
```

### Getting started (< v8)

---

1. Install

```shell
yarn add @cbhq/cds-migrator --dev
```

2. Setup handy aliases in your `.alias.zsh`

```shell
# Running generator
alias mig="yarn nx generate @cbhq/cds-migrator:migrate"

# Wipe nx cache and build package for CDS migrator
alias bumi="yarn nx run migrator:build --skip-nx-cache"
```

1. Wipe nx cache and build the package. Open new terminal and run:

```shell
# With alias
bumi

# Without alias
yarn nx run migrator:build --skip-nx-cache
```

4. Run the generator and pass in the version you are trying to migrate to

```shell
# With alias
 mig <version>

# Example
mig 4.0.0

# Without alias
yarn nx generate @cbhq/cds-migrator:migrate <version>

# Example
yarn nx generate @cbhq/cds-migrator:migrate 4.0.0
```

5. Clear NX cache when needed

```shell
yarn nx reset
```

### Example setup:

![Alt text](image.png)

### Inspiration

https://polaris.shopify.com/tools/polaris-migrator#usage

### Create Your Own Migrator Script

1. Create a directory under `src/migrations/update<YOUR_VERSION>` suffixed with the CDS version you're upgrading to.
2. Create your migrator functions in this directory. You can access the project tree (the NX project where you are running the script) by passing `tree` as an argument to the default export function in a migrator file. Check out the "Writing Your Own Migrator Script" section for guidance on how to write these functions.
3. Add a case for the version you are adding to the switch case statement in `packages/migrator/src/generators/migrate/migrate.ts` and pass it your migrator functions and the tree as an argument.
4. Add the same key to `properties.version.enum` in `src/generators/migrate/schema.json`
5. Clear your NX cache with `yarn nx reset`
6. Build the changes in the migrator package by running `yarn nx run migrator:build --skip-nx-cache`
7. Test your script by running `yarn nx generate @cbhq/cds-migrator:migrate <YOUR_VERSION>`
8. When your script is complete, run `yarn mono-pipeline` and complete the CLI steps to version the package. Run `yarn release` to verify that no other packages need to be bumped. After your PR merges, deploy the package via codeflow.

### How It Works

There's quite a lot of boilerplate that goes into creating a generator. We've abstracted a lot of the `ts-morph` and NX generator logic into friendly helpers called `createMigration` and `createJsxMigration`. Both functions need to be passed the NX `tree` instance in order to have read/write access to all the projects in an NX workspace.

### Terminology

#### tree

Every NX generator receives a `tree` argument. This allows a generator to have access to the file system of every project within an NX repo. The `tree` is actually a _copy_ of the file system, so any changes made to the `tree` will also need to be made to the file system using the `node:fs` method `fs.saveFileSync()`.

#### sourceFile

When we're performing our migrations we don't want to parse every file in an NX workspace, so we use a temporary `ts-morph` file system that only contains files that are pertinent to migrations. This file system is called a `Project` instance, and as you make changes to a `sourceFile` these changes are saved to the `Project` instance. It's important to note that if you want the actual disc's file system to reflect your changes you'll need to use a helper like `writeMigrationToFile` to copy these changes over to the file system.

### How Do createJsxMigration and createMigration Work?

#### 1. Gathers sourceFiles

First we need to create a temporary file system that only contains files with migratable instances. Both helpers use `parseSourceFiles` under the hood to traverse the NX `tree` and gather the `sourceFiles` of workspaces that have CDS packages as a dependency.

You can customize this script to only add `sourceFiles` that meet a given conditional; like `filterSourceFiles` checks if a file contains a migratable instace, or `checkSourceFile` makes it easy to parse the actual JSX elements in a file that meets a condition (the latter is more accurate as it checks the actual JSX and not the file content as a string). These helpers gate your migration scripts from being run over irrelevant files that don't contain migrations.

#### 2. Parses JSX Elements

`createJsxMigration` then uses the `parseJsxElements` helper to pull JSX elements out of a `sourceFile` and perform transformations over each element. The callback gets access to the JSX element itself, as well as some other crucial information you'll need to perform your `ts-morph` migrations.

Note: If you don't need access to the JSX in a file, use `createMigration` instead. It's much faster because it only parses the content of a file as a string, as opposed to looping over every JSX element in a `sourceFile`.

#### 3. Ready, Set, Migrate!

Use the [helpers](./helpers) we've provided to traverse and manipulate file contents and JSX to perform your migrations.

#### 4. Save to the File System

Whenever you modify a file, make sure you write the changes to the disc file system with `writeMigrationToFile` otherwise your changes will only be reflected in the `ts-morph` project instance (a copy of the file system).

## Troubleshooting (General)

- **404 Not Found Error when using `npx` commands (`@cbhq/cds-migrator@* is not in this registry`):**
  (Applies to v8+ migrations) This package is private and requires access to Coinbase's internal npm registry. Ensure:
  - You have access to Coinbase's private npm registry
  - Your `.npmrc` is configured with the correct registry URL and authentication
  - Contact your team lead or IT support for registry access if needed
- **Permission Denied Error (`sh: .../.bin/jscodeshift: Permission denied`):**
  (Applies to v8+ migrations) The `jscodeshift` executable needs execute permissions.
  ```sh
  chmod +x ./node_modules/.bin/jscodeshift
  ```
- **Command Not Found (`command not found: cds-migrator-codemod`):**
  (Applies to v8+ migrations) Ensure `@cbhq/cds-migrator` is installed correctly.
- **Line Ending Errors (`env: node\r: No such file or directory`):**
  (Applies to v8+ CLI script) Indicates incorrect line endings. Reinstall the package or perform a clean install.
- **Nx Command Errors:**
  (Applies to < v8 migrations) Ensure you are within a correctly configured Nx workspace (typically the CDS monorepo).

## Testing in Consumer Repos

1. Add the `@cbhq/cds-migrator` package as a dependency in the consuming repo
2. You'll need to have the `frontend/cds` repo cloned locally. Resolve the `cds-migrator` dependency to the absolute path of your local instances, eg: `"@cbhq/cds-migrator": "file:/Users/blairmckee/code/cds/packages/migrator"`
3. Run the debug script in `frontend/cds`: `yarn nx run migrator:build --skip-nx-cache`
4. Run `yarn` in the consuming repo
5. Every time you make a change in `frontend/cds` you'll need to rerun `yarn` in the consuming repo, because the `migrator` package needs to be rebuilt and reinstalled in the consumer.
6. Rinse and repeat steps 4 & 5 whenever you make a change in `frontend/cds`.
