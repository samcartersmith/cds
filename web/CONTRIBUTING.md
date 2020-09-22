# Contribute to Coinbase Design System - Web

## Local Setup

For all make commands, make sure you are running them from this directory `eng/shared/design-system/web/`.

```bash
yarn
make codegen
```

To run storybook locally

```bash
make story
```

## Code Generation

Generated code:

- typography styles
- Text components

## Publishing

1. Bump version in basepackage.json (Automated script coming)
2. Update CHANGELOG.md with the new version and date.
3. Create a PR to make sure the changes look good.
4. Once the PR is merged, run the following to publish a new package to npm.

```bash
assume-role development eng-ops
bazel run //eng/shared/design-system/web:corporate
```

### Publishing to the development NPM registry

<!-- TODO: write script to move create package.json from scripts/package.json -->

To publish to the [development Coinbase NPM registry](https://registry-npm-dev.cbhq.net/-/web/detail/@cb/cds-web):

1. Add `@cb:registry=https://registry-npm-dev.cbhq.net` to [.npmrc](../../../../.npmrc)

2. Run

```bash
assume-role development eng-ops
bazel run //eng/shared/design-system/web:development
```
