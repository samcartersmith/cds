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

1. Add a .env.local file at root of repo

```
FIGMA_ACCESS_TOKEN=[access or request access to the UI Infra shared vault on 1Password for the token]
```

2. (**optional**) Sync the latest illustration Figma color styles if a new color style was added. **You do not need to do a version bump for any changes**.

```shell
yarn nx run figma-styles:sync
```

3. Sync the latest Figma illustration components. This also programatically opens a PR in the [static-assets](https://github.cbhq.net/engineering/static-assets) repo. If you've never done this before, follow these [setup steps](#release-setup) first

```shell
yarn nx run illustrations:release
```

4. Merge the PR in static-assets and confirm the deploy in [Codeflow](https://codeflow.cbhq.net/#/engineering/static-assets/commits). Heimdall should automatically deploy the production shards after all build checks are complete, but if it fails to do this for some reason, then manually deploy:

- `production::production-shard-0`
- `production::production-shard-1`
- `production::production-shard-2`

5. Once the static-assets deployments are finished (the new assets need to be available before Percy can diff properly), commit the changes in the CDS repo with a message in the following format: `[trivial] feat(Illustrations): Publish illustrations mm/dd/yyyy`

6. Open a PR in the CDS repo with the changes

7. Bump the package version and update the changelog

```shell
yarn mono-pipeline version illustrations
```

- When prompted, do the following:
  - Type of change?: "Update"
  - Changelog message?: Copy/paste your PR title (just the part after `feat(Illustrations):`)
  - PR number?: Copy/paste your PR number
  - Skip the rest (press enter to use defaults)

8. Run `yarn release` to generate website changelogs.

9. Commit and push the changes to your existing PR

10. When the Percy diffs are ready, share them with the Illustrations DRI for approval. Merge your PR once the DRI has signed off.

11. Locate your commit in [Codeflow](https://codeflow.cbhq.net/#/frontend/cds/commits), manually rebuild `package-cds-illustrations`, and deploy to `corporate::cds-illustrations` when the build is complete

12. After the deploy has succeeded, verify that the new package was published at the [production Coinbase NPM registry](https://artifactory.cbhq.net/ui/repos/tree/General/cb-npm-master). It usually takes about 10 min or so for the package to be uploaded. Look for the version number at the bottom of the artifact list in the [package directory](https://artifactory.cbhq.net/ui/repos/tree/General/cb-npm-master/@cbhq/cds-illustrations/-/@cbhq/cds-illustrations-0.0.1.tgz).

### Release Setup

1. Install [hub](https://hub.github.com/) using [Homebrew](https://brew.sh/) (a CLI tool for managing Github repos)

```shell
brew install hub
```

2. Follow [these instructions](https://confluence.coinbase-corp.com/display/INFRA/How+to+Fork+a+Repository) to make sure that you have all the configs to make a programmatic fork from a Coinbase repo. _Note: This is different than just forking through the Github UI._

### Gotchas

- It is important to note that if an illustration asset is referencing a color style which was _not_ present the last time the color styles sync was run, then it will need to be run again before running `yarn nx run illustrations:release`.

- The `illustrations:release` command calls `illustrations:sync` which requires a `lightModeManifestFile` and `darkModeManifestFile` as inputs in `project.json` when generating the svg assets on the fly. If those files are stale, the executor will fallback to the hex value of the color style used (which will always be a light mode fill since that is the only asset design provides), thus making the light and dark mode images the same.

- If seeing this error: Cannot read properties of undefined ('styles'), you need to update your FIGMA token to the new value.

- If seeing a failed task, check that it's expected. You may see "There are no new updates since last release XXXX-XX-XX". Verify this is expected with design.
