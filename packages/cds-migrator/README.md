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
6. Build the migrator package by running `yarn nx run cds-migrator:build`
7. Test your script by running `yarn nx generate @cbhq/cds-migrator:migrate <YOUR_VERSION>`
8. If you want to make changes to your migrator script while you test, run `yarn nx run cds-migrator:watch` in a separate terminal, and it will rebuild the package as you make changes.
9. When your script is complete, increment the `cds-migrator` package version, cut a PR, and deploy via codeflow.

## Debugging

1. Before you run any scripts, make sure you build the migrator package by running `yarn nx run cds-migrator:build`.
2. Then run `yarn nx run cds-migrator:watch` and it will rebuild the package as you make changes.
3. In a separate terminal, run your migrator script.
