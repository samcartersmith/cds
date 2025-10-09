## Release Icons

**WARNING: FOLLOW THESE INSTRUCTIONS EXACTLY. Use a fresh clone of the repos EVERY TIME. Copy and paste these commands directly into your terminal, editing them with the current date as necessary. DO NOT MESS AROUND.**

**IMPORTANT: If any icons are renamed or deleted, this is a BREAKING CHANGE. This MUST be published with an accompanying major version bump, migration guide, and a migrator script.**

1. Make sure any existing sync repo names have been deleted

```sh
rm -rf temp-oss-cds temp-frontend-cds
```

2. Clone the github.com/coinbase/cds repo with this name

```sh
git clone git@github.com:coinbase/cds.git temp-oss-cds
```

3. Clone the github.cbhq.net/frontend/cds repo as a sibling with this name

```sh
git clone git@github.cbhq.net:frontend/cds.git temp-frontend-cds
```

4. Navigate into the `temp-oss-cds` repo and create a new branch with this name pattern

```sh
cd temp-oss-cds
git checkout -b icons/YYYY-MM-DD
```

5. Navigate into the `temp-frontend-cds` repo and run the icon sync script

```sh
cd ../temp-frontend-cds
yarn nx run icon-tasks:sync-icons
```

6. Navigate back into the `temp-oss-cds` repo and commit the changes with this message pattern, then push the branch

```sh
cd ../temp-oss-cds
git add .
git commit -m 'feat: Publish icons YYYY/MM/DD'
git push origin icons/YYYY-MM-DD
```

7. Open a PR in the github.com/coinbase/cds repo. Title the PR exactly the same as the commit message: `feat: Publish icons YYYY/MM/DD`. Take note of the PR number for the next step

8. Still in the `temp-oss-cds` repo, update the icons package changelog by completing the prompts as shown below

```sh
yarn changelog
```

> - Type of change?: Choose "Breaking" for breaking changes, otherwise choose "Update"
> - Changelog message?: "Publish icons YYYY/MM/DD"
> - PR number?: Copy/paste your PR number
> - Skip the rest (press enter to use defaults)

9. Commit and push the changes to your PR

```sh
git add .
git commit -m 'Update changelog'
git push origin icons/YYYY-MM-DD
```

10. DM the icons DRI on Slack and share direct links to:

- the icon changelog in your PR (example)
- the Web Visual Regression results in Percy (example)

You can get the Percy link from the GitHub Actions "Visreg Web" job on your PR

11. Carefully review the two links you shared with the icons DRI. Does the changelog look correct? Do the visual regression results look correct?

**IMPORTANT: Breaking change releases are a big deal. They should be performed extremely rarely, and should ALWAYS be accompanied by a migration plan. You are responsible for any breaking changes that you release.**

12. DO NOT MERGE until the icons DRI has carefully reviewed and signed off on the changelog and the visual regression test results.
