# Coinbase Design System - Web

[Master Design System Hosted Link](https://cds-web-storybook.cbhq.net/master/index.html)

## Get Started

CDS has two integration paths depending on whether your client is in this `mono/repo`.

### Inside mono/repo

Import the code directly using the path alias `@cb/design-system-web` defined in the root `tsconfig.json`.

```tsx
import { TextDisplay1 } from '@cb/design-system-web';
```

### 🚧 Outside mono/repo (WIP)

Make sure `@coinbase:registry=https://registry-npm.cbhq.net` is in your `.npmrc`.

```
yarn add @cb/design-system-web
```

You can start using CDS-web like so.

```tsx
import { TextDisplay1 } from '@cb/design-system-web';
```

If your project supports using es modules, then the package should tree shake properly by default.

## Deploy Master Design System

[Master Design System Hosted Link](https://cds-web-storybook.cbhq.net/master/index.html)

```bash
bazel run //eng/shared/design-system/web/cloud:design-system
```

The command builds a production bundle of the storybook, zips it, and uploads the zipped file to S3 through [syn](https://confluence.coinbase-corp.com/display/INFRA/Syn) deploy.

## Deploy Feature Branch

[https://cds-web-storybook.cbhq.net/feature/YOUR_FEATURE_BRANCH_NAME/index.html](https://cds-web-storybook.cbhq.net/feature/YOUR_FEATURE_BRANCH_NAME/index.html)

Configure the url of the hosted feature branch by changing the path for the S3 zip in this file [eng/prime/frontend/cloud/BUILD.bazel](../cloud/BUILD.bazel)

**_Don't use any `/` slashes in the feature branch nam as it will confuse the HTML path_**

```bazel
pkg_zip(
  name = "bundled_storybook_feature",
  srcs = [
      "//eng/shared/design-system/web:storybook_build",
  ],
  remap_paths = {"{gendir}/eng/shared/design-system/web/storybook_build": "feature/YOUR_FEATURE_BRANCH_NAME"},
  visibility = ["//visibility:public"],
)
```

```bash
bazel run //eng/shared/design-system/web/cloud:design-system-feature
```

## Team

If you have any questions about using CDS-web, feel free to contact @hannah-jin.
