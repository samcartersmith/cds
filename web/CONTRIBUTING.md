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

## Package

To enable using CDS-web outside mono/repo, an npm package is available through the Coinbase internal npm registry. The package contains both a commonjs bundle created by rollup at `dist/` and babel transpiled ES modules at `lib/`. The typescript declarations are at `typings`. To split up the CSS code, we wrote a custom babel plugin to take linaria transpiled styles and put them into `.css` files corresponding to the `.js` files.

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

## Storybook

### Deploy Master Design System

[Master Design System Hosted Link](https://cds-web-storybook.cbhq.net/master/index.html)

```bash
bazel run //eng/shared/design-system/web/cloud:storybook
```

The command builds a production bundle of the storybook, zips it, and uploads the zipped file to S3 through [syn](https://confluence.coinbase-corp.com/display/INFRA/Syn) deploy.

### Deploy Feature Branch

[https://cds-web-storybook.cbhq.net/feature/YOUR_FEATURE_BRANCH_NAME/index.html](https://cds-web-storybook.cbhq.net/feature/YOUR_FEATURE_BRANCH_NAME/index.html)

Configure the url of the hosted feature branch by changing the path for the S3 zip in this file [eng/prime/frontend/cloud/BUILD.bazel](../cloud/BUILD.bazel)

_Don't use any `/` slashes in the feature branch name as it will confuse the HTML path_

```bazel
pkg_zip(
  name = "bundled_storybook_feature",
  srcs = [
      "//eng/shared/design-system/web:storybook",
  ],
  remap_paths = {"{gendir}/eng/shared/design-system/web/storybook": "feature/YOUR_FEATURE_BRANCH_NAME"},
  visibility = ["//visibility:public"],
)
```

```bash
bazel run //eng/shared/design-system/web/cloud:storybook_feature
```
