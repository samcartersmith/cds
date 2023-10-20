# @cbhq/cds-illustrations

CDS illustrations used in @cbhq/cds-web and @cbhq/cds-mobile.

## Installation

```shell
yarn add @cbhq/cds-illustrations
```

## Contributing

### Figma Links

- [CDS Illustrations Figma components](https://www.figma.com/file/LmkJatvMRVzNgfiIkJDb99/%E2%9C%A8-Illustrations)
- [CDS Illustration Figma light styles](https://www.figma.com/file/skPXKFmI64GqqEkOaBSHcL/%F0%9F%8C%9E--Illustration-Light-Styles?t=NAycPBCIl5jp15ou-6)
- [CDS Illustration Figma dark styles](https://www.figma.com/file/etJaiHq7aFlJFICLKIrcK7/%F0%9F%8C%9A--Illustration-Dark-Styles?t=NAycPBCIl5jp15ou-6)

### Summary

The [CDS Illustrations Figma components](https://www.figma.com/file/LmkJatvMRVzNgfiIkJDb99/%E2%9C%A8-Illustrations) are composed of vectors which leverage the [CDS Figma Illustration light color styles](https://www.figma.com/file/skPXKFmI64GqqEkOaBSHcL/%F0%9F%8C%9E--Illustration-Light-Styles?t=NAycPBCIl5jp15ou-6) to power their color fills. This allows design to create a single light mode version, and engineering handles creating the dark mode version through the CDS Figma plugin or through code generation.

In order for engineering to generate a dark mode version of an illustration asset, we need to pull information about the light and dark mode color styles from Figma (`yarn nx run figma-styles:sync`). The CDS Illustration color styles should not change often and can be run on an as-needed basis.

### Releasing Illustrations

1. (**optional**) Sync the latest illustration Figma color styles if they were changed. **You do not need to do a version bump for any changes**.

```shell
yarn nx run figma-styles:sync-illustration-dark-styles
yarn nx run figma-styles:sync-illustration-light-styles
```

2. Sync the latest Figma illustration components. This also programatically opens a PR in the [static-assets](https://github.cbhq.net/engineering/static-assets) repo. If you've never done this before, follow these [setup steps](#release-setup) first

```shell
yarn nx run illustrations:release
```

- **IMPORTANT:** If any illustrations are renamed or deleted, this update will be a breaking change for consumers. Please ensure that you publish a migration guide and a migrator script along with this release to aid consumers with migration.

3. Merge the PR in static-assets and confirm the deploy in [Codeflow](https://codeflow.cbhq.net/#/engineering/static-assets/commits). Heimdall should automatically deploy the production shards after all build checks are complete, but if it fails to do this for some reason, then manually deploy:

- `production::production-shard-0`
- `production::production-shard-1`
- `production::production-shard-2`

4. Once the static-assets deployments are finished (the new assets need to be available before Percy can diff properly), commit the changes in the CDS repo with a message in the following format: `[trivial] <feat/breaking>(Illustrations): Publish illustrations mm/dd/yyyy`

5. Open a PR in the CDS repo with the changes

6. Bump the package version and update the changelog

```shell
yarn mono-pipeline version illustrations
```

- When prompted, do the following:
  - Type of change?: "Update" or "Breaking"
  - Changelog message?: Copy/paste your PR title (just the part after `(Illustrations):`)
  - PR number?: Copy/paste your PR number
  - Skip the rest (press enter to use defaults)

7. Run `yarn release` to generate website changelogs.

8. Commit and push the changes to your existing PR

9. When the Percy diffs are ready, share them with the Illustrations DRI for approval. Merge your PR once the DRI has signed off.

10. Locate your commit in [Codeflow](https://codeflow.cbhq.net/#/frontend/cds/commits) and check that `package-cds-illustrations` has been built, and that the `corporate::cds-illustrations` and `production::cds-docs` targets have been deployed when the entire build is finished. If not, manually trigger the build if necessary and/or deploy the targets as needed when the build is complete. **_NOTE:_** If you're releasing both icons and illustrations at the same time, you only need to deploy to `production::cds-docs` once, so just pick whichever commit is the most recent and deploy from there.

11. After the deploy has succeeded, verify that the new package was published at the [production Coinbase NPM registry](https://artifactory.cbhq.net/ui/repos/tree/General/cb-npm-master). It usually takes about 10 min or so for the package to be uploaded. Look for the version number at the bottom of the artifact list in the [package directory](https://artifactory.cbhq.net/ui/repos/tree/General/cb-npm-master/@cbhq/cds-illustrations/-/@cbhq/cds-illustrations-0.0.1.tgz).

### Release Setup

1. Install [hub](https://hub.github.com/) using [Homebrew](https://brew.sh/) (a CLI tool for managing Github repos)

```shell
brew install hub
```

2. Follow [these instructions](https://confluence.coinbase-corp.com/display/INFRA/How+to+Fork+a+Repository) to make sure that you have all the configs to make a programmatic fork from a Coinbase repo. _Note: This is different than just forking through the Github UI._

### Gotchas

- It is important to note that if an illustration asset is referencing a color style which was _not_ present the last time the color syncs were run, then the `yarn nx run figma-styles:sync-*` commands will need to be run again before running `yarn nx run illustrations:release`.

- The `illustrations:release` command calls `illustrations:sync` which requires a `lightModeManifestFile` and `darkModeManifestFile` as inputs in `project.json` when generating the svg assets on the fly. If those files are stale, the executor will fallback to the hex value of the color style used (which will always be a light mode fill since that is the only asset design provides), thus making the light and dark mode images the same.

- The release script assumes that each light mode color style synced with `figma-styles:sync-illustration-light-styles` is assigned a unique hex value in Figma. If there are duplicate hex values (check the [light mode manifest](../figma-styles/__generated__/illustration/light/manifest.json)), dark mode variants generated during the `illustrations:release` task may not have the correct colors.

- If seeing this error: "Cannot read properties of undefined ('styles')", you need to update your FIGMA token to the new value.

- You may see the task complete without any changes and the message: "There are no changes since the last update on XX/XX/XXXX". Verify this is expected with design.
