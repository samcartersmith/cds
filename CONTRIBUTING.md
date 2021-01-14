# Contribute to Coinbase Design System - Web

## Code Generation

Please run codegen before running anything else to create necessary code including icons.

```
make codegen
```

## Create A New Package

1. Run `make new.package --name=<package>`.
2. Edit [BUILD.bazel](./BUILD.bazel) `packages` to include the new package.
3. Check out `<package>/basepackage.json` and `<package>/BUILD.bazel` and make necessary updates.
4. Update `<package>/CHANGELOG.md`.

## Web

In `eng/shared/design-system/web` directory, run storybook locally

```bash
make story
```

Build storybook locally and serve. This is useful when debugging issues with deployed storybook. For example, sometimes the component API types don't show up in the production build version.

```bash
make story.serve
```

## Package

To use CDS packages outside of mono/repo, NPM packages are available through the Coinbase's internal NPM registry. Each package includes source TypeScript files for all typings information, and Babel transpiled ES modules at `lib/`. To split up the CSS code, we wrote a custom Babel plugin to take Linaria transpiled styles and put them into `.css` files corresponding to the `.js` files.

## Publishing

1. Bump version in `basepackage.json`. _(Automated script coming)_
2. Update `CHANGELOG.md` with the new version and date.
3. Create a PR to make sure the changes look good.
4. Once the PR is merged, run the following to publish a new package to npm.

```bash
assume-role development eng-ops
bazel run //eng/shared/design-system/<package>:publish
```

### Publishing to the development NPM registry

<!-- TODO: write script to move create package.json from scripts/package.json -->

To publish to the [development Coinbase NPM registry](https://registry-npm-dev.cbhq.net/-/web/detail/@cb/cds-web):

1. Add `@cb:registry=https://registry-npm-dev.cbhq.net` to [.npmrc](../../../../.npmrc)

2. Run

```bash
assume-role development eng-ops
bazel run //eng/shared/design-system/<package>:publish_dev
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


## CDS Website

Our website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

### Local Development

```console
make start.website
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

### Build

```console
make build.website
```

### Serve

```console
make serve.website
```

### Deploy

```console
make deploy.website
```

