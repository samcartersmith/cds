# @cbhq/cds-migrator

Codemod transformations to help upgrade your CDS codebase

## Getting started

1. Install

```shell
yarn add @cbhq/cds-migrator --dev
```

2. Run the generator and pass in the version you are trying to migrate to

```shell
yarn nx generate @cbhq/cds-migrator:migrate 4.0.0
```

## Inspiration

https://polaris.shopify.com/tools/polaris-migrator#usage

## Create Your Own Migrator Script

1. Create a directory under `src/migrations/update<YOUR_VERSION>` suffixed with the CDS version you're upgrading to.
2. Create your migrator functions in this directory. You can access the project tree (the NX project where you are running the script) by passing `tree` as an argument to the default export function in a migrator file.
3. Add a key for the version to the `migrations` obejct in `src/migrations/migrations.ts` and pass it your migrator functions as an array.
4. Add the same key to `properties.version.enum` in `src/generators/migrate/schema.json`
5. Clear your NX cache with `yarn nx reset`
6. Build and watch for changes in the migrator package by running `yarn nx run cds-migrator:build --skip-nx-cache && yarn nx run cds-migrator:watch`
7. Test your script by running `yarn nx generate @cbhq/cds-migrator:migrate <YOUR_VERSION>`
8. When your script is complete, run `yarn mono-pipeline` and complete the CLI steps to version the package. Run `yarn release` to verify that no other packages need to be bumped. After your PR merges, deploy the package via codeflow.

## Debugging

1. Before you run any scripts, make sure you build the migrator package by running `yarn nx run cds-migrator:build --skip-nx-cache`.
2. Then run `yarn nx run cds-migrator:watch` and it will rebuild the package as you make changes.
3. In a separate terminal, run your migrator script.

I recommend storing this as an alias:

```zsh
yarn nx run cds-migrator:build --skip-nx-cache && yarn nx run cds-migrator:watch
```

## Writing Your Own Migrator Script

There's quite a lot of boilerplate that goes into creating a generator. We've abstracted a lot of the `ts-morph` and NX generator logic into friendly helpers:

- `createJsxMigration`, that takes the `tree` of the NX project calls a callback for each JSX element within a `sourceFile` that meets a conditional passed to `filterSourceFiles`.
- `parseSourceFiles`, takes the `tree` calls a callback over every `sourceFile` that meets a conditional passed to `filterSourceFiles`.

### Terminology

#### tree

Every NX generator receives a `tree` argument. This allows a generator to have access to the file system of every project within an NX repo. The `tree` is actually a _copy_ of the file system, so any changes made to the `tree` will also need to be made to the file system using the `node:fs` method `fs.saveFileSync()`.

#### sourceFile

When you setup `ts-morph` you have to create a `Project` instance, which stores a copy of mutated files in temporary memory. As you make changes to a `sourceFile` these changes are saved to the `Project` instance, and once all mutations are complete we overwrite the actual disc's file system with the content of the mutated `sourceFile`.

### How Does createJsxMigration Work?

# 1. Gathers sourceFiles

`createJsxMigration` is a generator helper that traverses the NX `tree` and performs transformations in each project within an NX workspace. First we gather the `sourceFiles` of workspaces that have CDS packages as a dependency. We use the `parseSourceFiles` helper to parse each project and store copies of the `sourceFiles` in temporary memory (under the hood we use `ts-morph` to instantiate a temporary Project which contains copies of `sourceFiles` that we will modify).

# 2. Parses JSX Elements

It then uses the `parseJsxElements` helper to pull JSX elements out of a `sourceFile` and perform transformations over each element. The callback gets access to the JSX element itself, as well as some other crucial information you'll need to perform your `ts-morph` migrations.

```ts
type ParseJsxElementsCbParams = {
  jsx: JsxElementType;
  sourceFile: SourceFile;
  tree: Tree;
  path: string;
};
```

# 3. Ready, Set, Migrate!

You now have access to all the JSX elements in every `sourceFile`! Use the [helpers](./helpers) we've provided to traverse and manipulate the JSX to perform your migrations.

# 4. Save to the File System

When you're done making changes to a file, make sure you call `writeMigrationToFile`, which will sync your changes with the NX and `ts-morph` file system copies, as well as writing these changes back to the disc file system.
