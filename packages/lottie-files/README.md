# Coinbase Design System - Lottie Files

[Design System Doc website (latest)](https://cds.cbhq.net/) (go/cds)

## Get Started

Install package with `yarn add @cbhq/cds-lottie-files`

- `import { tradeStatus } from '@cbhq/cds-lottie-files/tradeStatus'` for mobile to prevent bundling all assets on build
- `import { tradeStatus } from '@cbhq/cds-lottie-files'` for web if your project supports treeshaking

### External contributions / adding lottie assets

The CDS Lottie package contains files owned and managed by the UI Systems team. We recommend teams to host their Lottie files within their own repo or with the following alternatives below.

Recommended ways to host Lottie files:

- Add Lottie files to contentful and fetch them from contentful
  - Example in `react-native`: [AdvocacyTransparentLottie.tsx](https://github.cbhq.net/consumer/react-native/blob/master/src/packages/app/src/screens/AdvocacyTransparentScreenTakeover/components/AdvocacyTransparentLottie.tsx), and [useContentfulAdvocacyFullScreenTakeover](https://github.cbhq.net/consumer/react-native/blob/master/src/packages/app/src/screens/AdvocacyTransparentScreenTakeover/hooks/useContentfulAdvocacyFullScreenTakeover.ts)
- Add the Lottie file to [engineering/static-assets](https://github.cbhq.net/engineering/static-assets)

### Inside mono/repo

- Use import convention above

### 🚧 Outside mono/repo (WIP)

Make sure `@cbhq:registry=https://registry-npm.cbhq.net` is in your `.npmrc`.

```
yarn add @cbhq/cds-lottie
```

### (Internal) Updating lottie assets

1. Replace or add the new json
2. Run `make codegen` from `eng/shared/design-system` in go/repo
3. Commit the changes and fix any Typescript errors
4. After PR is merged, in a separate PR with changes now in master run `make release`.
5. Open a PR with the commit message that is output once the command completes.

### Testing locally in a project outside of monorepo

- Run `make build.lottie`
- The package will be built and output to `bazel-out/darwin-fastbuild/bin/eng/shared/design-system/lottie-files/package`
- control + click on this folder in file editor of VSCode and select `Copy path`. This will copy the absolute path of this repo to your clipboard.
- Go to the repo you would like to test this package in and add `@cbhq/cds-lottie-files` with the value as `file:` followed by the pasted path to the `resolutions` section.

If `resolutions` object does not already exist you will need to add one.

The final key/value should look something like

```
"@cbhq/cds-lottie-files": "file:/Users/katherinemartinez/src/repo/bazel-out/darwin-fastbuild/bin/eng/shared/design-system/lottie-files/package"
```

For more details about module resolutions for package.json files can be found [here](https://classic.yarnpkg.com/en/docs/selective-version-resolutions/).
