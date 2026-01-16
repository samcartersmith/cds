## Release Illustrations

**WARNING: FOLLOW THESE INSTRUCTIONS EXACTLY. Use a fresh clone of the repos EVERY TIME. Copy and paste these commands directly into your terminal, editing them with the current date as necessary. DO NOT MESS AROUND.**

**IMPORTANT: If any illustrations are renamed or deleted, this is a BREAKING CHANGE. This MUST be published with an accompanying major version bump, migration guide, and a migrator script.**

1. Make sure any existing sync repo names have been deleted

```sh
rm -rf temp-oss-cds temp-frontend-cds
```

2. Clone the [github.com/coinbase/cds](https://github.com/coinbase/cds) repo with this name

```sh
git clone git@github.com:coinbase/cds.git temp-oss-cds
```

3. Clone the [github.cbhq.net/frontend/cds](https://github.cbhq.net/frontend/cds) repo as a sibling with this name

```sh
git clone git@github.cbhq.net:frontend/cds.git temp-frontend-cds
```

4. Navigate into the `temp-frontend-cds` repo and run the illustration sync script. The script will create a new branch in the temp-oss-cds repo, sync the illustrations, then commit and push the changes

```sh
cd temp-frontend-cds
nvm use
yarn install
yarn nx run illustration-tasks:sync-illustrations
```

5. Open a PR in the [github.com/coinbase/cds](https://github.com/coinbase/cds) repo. Title the PR exactly the same as the commit message: `feat: Publish illustrations YYYY/MM/DD`. Take note of the PR number for the next step

6. Navigate into the `temp-oss-cds` repo and generate stories, then update the illustrations package changelog by completing the prompts as shown below

```sh
cd ../temp-oss-cds
nvm use
yarn install
yarn nx run illustrations:release
yarn changelog illustrations
```

> - **Type of change?:** Choose **"Breaking"** for breaking changes, otherwise choose **"Update"**
> - **Changelog message?:** "feat: Publish illustrations YYYY/MM/DD"
> - **PR number?:** Copy/paste your PR number
> - Skip the rest (press enter to use defaults)

7. Commit and push the changes to your PR

```sh
git add .
git commit -m 'Update changelog'
git push origin illustrations/YYYY-MM-DD
```

8. DM the illustrations DRI on Slack and share direct links to:

- the illustration changelog in your PR
- the Web Visual Regression results in Percy

You can get the Percy link from the GitHub Actions "Visreg Web" job on your PR

9. Carefully review the two links you shared with the illustrations DRI. Does the changelog look correct? Do the visual regression results look correct?

**IMPORTANT: Breaking change releases are a big deal. They should be performed extremely rarely, and should ALWAYS be accompanied by a migration plan. You are responsible for any breaking changes that you release.**

10. DO NOT MERGE until the illustrations DRI has carefully reviewed and signed off on the changelog and the visual regression test results.

### Troubleshooting

- You may see the task complete without any changes and the message: "There are no changes since the last update on XX/XX/XXXX". Verify this is expected with design.

- The color style manifests are now static files located at `libs/illustration-tasks/src/color-styles/`. These files were originally synced from Figma and contain the light/dark theme color mappings. If a new illustration uses a color style not present in these manifests, you will need to manually add the color definition to both `light.json` and `dark.json`. See the documentation comment in `libs/illustration-tasks/src/scripts/illustrations/task.ts` for details on how these manifests were originally generated.

- The `illustrations:release` command calls `illustrations:sync` which requires the `lightModeManifestFile` and `darkModeManifestFile` as inputs when generating the svg assets on the fly. If those files don't contain a color used in an illustration, the executor will fallback to the hex value of the color style used (which will always be a light mode fill since that is the only asset design provides), thus making the light and dark mode images the same.

- The light mode manifest assumes each color style is assigned a unique hex value. If there are duplicate hex values (check `libs/illustration-tasks/src/color-styles/light.json`), dark mode variants generated during the `illustrations:release` task may not have the correct colors.

- If seeing this error: "Cannot read properties of undefined ('styles')", you need to update your FIGMA token to the new value.
