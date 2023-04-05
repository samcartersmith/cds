# @cbhq/cds-icons

CDS icons used in @cbhq/cds-web and @cbhq/cds-mobile.

## Installation

```shell
yarn add @cbhq/cds-icons
```

## Contributing

### Figma Links

- [CDS Icon Figma components](https://www.figma.com/file/tuc9LpASTO9mBrbg1tAdAl/%E2%9D%8C-Icons?node-id=513%3A3971&t=ctB9WBiSSu6wOe3o-0)

### Releasing Icons

1. Add a .env.local file at root of repo

```
FIGMA_ACCESS_TOKEN=[access or request access to the UI Infra shared vault on 1Password for the token]
```

2. Sync the latest Figma icon components

```shell
yarn nx run icons:release
```

3. Commit the changes with a message in the following format: `[trivial] feat(Icons): Publish icons mm/dd/yyyy`

4. Open a PR with the changes

5. Bump the package version and update the changelog

```shell
yarn mono-pipeline version icons
```

- When prompted, do the following:
  - Type of change?: "Update"
  - Changelog message?: Copy/paste your PR title (just the part after `feat(Icons):`)
  - PR number?: Copy/paste your PR number
  - Skip the rest (press enter to use defaults)

6. Commit and push the changes to your existing PR

7. When the Percy diffs are ready, share them with the Icons DRI for approval. Merge your PR once the DRI has signed off.

8. Locate your commit in [Codeflow](https://codeflow.cbhq.net/#/frontend/cds/commits), manually rebuild `package-cds-icons`, and deploy to `corporate::cds-icons` when the build is complete

9. After the deploy has succeeded, verify that the new package was published at the [production Coinbase NPM registry](https://artifactory.cbhq.net/ui/repos/tree/General/cb-npm-master). It usually takes about 10 min or so for the package to be uploaded. Look for the version number at the bottom of the artifact list in the [package directory](https://artifactory.cbhq.net/ui/repos/tree/General/cb-npm-master/@cbhq/cds-icons/-/@cbhq/cds-icons-1.0.0.tgz).

### FAQ

`yarn nx run icons:update-playground` fails with " [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string."

This occurs because you have not built our mobile-playground. Run `yarn nx run mobile-playground:build-ios` and `yarn nx run mobile-playground:build-android`, then retry `yarn nx run icons:update-playground`. **This is required to pass prior to merging the new icon release**
