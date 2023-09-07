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

- **IMPORTANT:** If any icons are renamed or deleted, this update will be a breaking change for consumers. Please ensure that you publish a migration guide and a migrator script along with this release to aid consumers with migration.

3. Commit the changes with a message in the following format: `[trivial] <feat/breaking>(Icons): Publish icons mm/dd/yyyy`

4. Open a PR with the changes

5. Bump the package version and update the changelog

```shell
yarn mono-pipeline version icons
```

- When prompted, do the following:
  - Type of change?: "Update" or "Breaking"
  - Changelog message?: Copy/paste your PR title (just the part after `(Icons):`)
  - PR number?: Copy/paste your PR number
  - Skip the rest (press enter to use defaults)

6. Run `yarn release` to generate website changelogs.

7. Commit and push the changes to your existing PR

8. When the Percy diffs are ready, share them with the Icons DRI for approval. Merge your PR once the DRI has signed off.

9. Locate your commit in [Codeflow](https://codeflow.cbhq.net/#/frontend/cds/commits) and check that `package-cds-icons` has been built, and that the `corporate::cds-icons` and `production::cds-docs` targets have been deployed when the entire build is finished. If not, manually trigger the build if necessary and/or deploy the targets as needed when the build is complete. **_NOTE:_** If you're releasing both icons and illustrations at the same time, you only need to deploy to `production::cds-docs` once, so just pick whichever commit is the most recent and deploy from there.

10. After the deploy has succeeded, verify that the new package was published at the [production Coinbase NPM registry](https://artifactory.cbhq.net/ui/repos/tree/General/cb-npm-master). It usually takes about 10 min or so for the package to be uploaded. Look for the version number at the bottom of the artifact list in the [package directory](https://artifactory.cbhq.net/ui/repos/tree/General/cb-npm-master/@cbhq/cds-icons/-/@cbhq/cds-icons-1.0.0.tgz).

### Gotchas

- You may see the task complete without any changes and the message: "There are no changes since the last update on XX/XX/XXXX". Verify this is expected with design.
