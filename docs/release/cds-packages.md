# Release CDS Packages (@cbhq/cds-web, @cbhq/cds-mobile, etc.)

We release our packages to consumers through Coinbase's internal NPM registry (Artifactory - https://artifactory.cbhq.net/ui/repos/tree/General/cb-npm-master). Each package includes source TypeScript files for all typings information, and Babel transpiled ES modules. To split up the CSS code, we wrote a custom Babel plugin to take Linaria transpiled styles and put them into `.css` files corresponding to the `.js` files.

The following sections describe how to push new package releases to our consumers through Verdaccio.

- [Release CDS Packages (@cbhq/cds-web, @cbhq/cds-mobile, etc.)](#release-cds-packages-cbhqcds-web-cbhqcds-mobile-etc)
  - [Cutting a Release](#cutting-a-release)
  - [Deploying a Release](#deploying-a-release)
  - [Verifying a Release](#verifying-a-release)
  - [Deploying Old Releases](#deploying-old-releases)
  - [Updating Our Consumers](#updating-our-consumers)
  - [Manually Testing Local Builds in Consumer Apps](#manually-testing-local-builds-in-consumer-apps)
  - [Create a Tarball](#create-a-tarball)
    - [Testing cds-mobile in CB Alpha](#testing-cds-mobile-in-cb-alpha)
  - [Create an Alpha release](#create-an-alpha-release)
  - [More Release Information](#more-release-information)

## Cutting a Release

When you're ready to cut a new release, do the following:

1. Check with the team for any last minute additions/merges to the release.

2. Announce a **CODE MERGE FREEZE** in #guild-dx-ui-systems. This prevents PRs from being merged after generating the CHANGELOG, and keeps our semver aligned with what packages are released.

3. Ensure you have the latest from master, then checkout a new branch with a branch name following the format `last-name/release-mm-dd-yyyy`.

4. Run `yarn release` in the repo root directory.

The `yarn release` script will automatically update the `CHANGELOG` with the latest version and add latest merged PR titles, links, and Jira tickets. It will also run the docgen script and lint the website files. You can see the public changelog [here](https://cds.cbhq.net/changelog/mobile/)

5. Copy the title that is in the output logs after "Pull request title: " and use it for **BOTH** the commit and the PR title. It can be found directly above " > NX Successfully ran target release for project codegen (24s)".

**Notes**:

- Since this is likely a single commit, if the commit message is not the provided title, it will break the `CHANGELOG` for future commits.
- cds-mobile, cds-web, and cds-common all need to bump at the same time. If a bump is not introduced for one of these packages, please add one like [this](https://github.cbhq.net/frontend/cds/pull/1448).

Your PR should like [this](https://github.cbhq.net/frontend/cds/pull/1112).

6. If your release has generated a breaking change (major bump) or introduced a major library change in the changelog, **you must confirm your changes in a consumer iOS & android emulator prior to merging the release**. This is helpful for generating major bump PRs in consumer apps, confirming library versions are still compatible, and preventing high severity regression incidents. To test, follow this document on [generating a Tarball](https://docs.google.com/document/d/1yF8IkgLI53l7t9z0lq7wktbYIhxrf8ohAY3J0PCkZRY/edit#heading=h.fxzn0dxbrhom).

7. If your release has a major bump, you must include a migration guide to bump to your version. [Example](https://github.cbhq.net/frontend/cds/pull/1256)

8. After your release PR is merged, announce that the Code Freeze is over and merges can resume in #guild-dx-ui-systems.

9. Tag your release in Github by going to the [release page](https://github.cbhq.net/frontend/cds/releases) and clicking 'Draft a new release'. Create a new tag to match the current CDS version (e.g. v3.1.0). **Make sure you tag the release commit (select the correct commit in Recent Commits in the Target dropdown)**. Click the 'Generate release notes' button above the textarea field. Inside the textarea, provide a brief summary of the changes above the release notes that were just generated for you (you can refer to previous release examples for inspiration). Click 'Publish release' when you're finished.

## Deploying a Release

Locate your release commit in [Codeflow](https://codeflow.cbhq.net/#/frontend/cds/commits) and manually deploy to all of the following:

- corporate::cds-web-esm
- corporate::cds-web
- corporate::cds-common
- corporate::cds-mobile
- production::upload-css
- production::upload-css-sw-cache
- production::cds-docs

heimdall should automatically deploy to the following when the build finishes:

- development::cds-storybook

If heimdall fails to do this for some reason, then manually deploy to those targets as well.

![release.png](/docs/release.png)

## Verifying a Release

After the Codeflow deploys have succeeded, double check that all packages have been published at the [production Coinbase NPM registry](https://artifactory.cbhq.net/ui/repos/tree/General/cb-npm-master). It usually takes about 10 min or so for the package to be uploaded. Look for the version number at the bottom of the artifact list in each package directory:

- [cds-common](https://artifactory.cbhq.net/ui/repos/tree/General/cb-npm-master/@cbhq/cds-common/-/@cbhq/cds-common-3.2.0.tgz)
- [cds-mobile](https://artifactory.cbhq.net/ui/repos/tree/General/cb-npm-master/@cbhq/cds-mobile/-/@cbhq/cds-mobile-3.2.0.tgz)
- [cds-web](https://artifactory.cbhq.net/ui/repos/tree/General/cb-npm-master/@cbhq/cds-web/-/@cbhq/cds-web-3.2.0.tgz)

You will also need to verify that the CSS was deployed to AWS. If web was bumped, verify `upload_css` was deployed to AWS (i.e. `https://assets.coinbase.com/cds/web/version-0.18.0.css`). Verify `upload_css_sw_cache` deployed to aws was bumped (ie: `https://assets.coinbase.com/assets/sw-cache/web/version-0.30.8.css`) which should be mapped to `https://coinbase.com/assets/sw-cache/web/version-0.30.8.css`.

Verify that the [changelogs](https://cds.cbhq.net/changelog/mobile/) on the CDS website were properly updated.

Once verifications are complete, announce the new release in the [#announcements-cds](https://coinbase.slack.com/archives/C018PD8E6JG) Slack channel. You can reuse the same summary that you prepared for the Github release tag above.

## Deploying Old Releases

Sometimes we forget to deploy after merging the release PR, and currently there's a constraint on Codeflow preventing deploys of commits older than 14 days from the master branch. If you need to deploy a release that's older than 14 days and Codeflow blocks you, do the following:

1. Create and merge a PR to master to add a new branch to the protected/secure branches list in `.codeflow.yml`. The branch name should be formatted like so: `release-<version>` (e.g. `release-3.5.0`).
2. In your local environment, checkout either the old release tag or release commit and from that create a new branch with the same name as the protected branch, then push to Github.
3. Release from the protected branch in Codeflow (see [Deploying a Release](#deploying-a-release) above).
4. Create and merge a PR to master to remove the protected branch from `.codeflow.yml` once you've verified the release was successfully deployed.

## Updating Our Consumers

In certain special cases we may decide to update CDS for our consumers. [This](https://github.cbhq.net/consumer/react-native/pull/8067) is an example of how we would update the retail app to use an updated version of the CDS package. Please see directions below on how to manually deploy a CDS bump to the CB Alpha app.

## Manually Testing Local Builds in Consumer Apps

## Create a Tarball

You can create a local build by creating a tar ball [go/how-to-tarball](https://docs.google.com/document/d/1yF8IkgLI53l7t9z0lq7wktbYIhxrf8ohAY3J0PCkZRY/edit) and then install the tar bundle in a consuming repo and update the `package.json` to reference the local file.

### Testing cds-mobile in CB Alpha

Sometimes we want to test updates to the `@cbhq/cds-mobile` package in the `react-native` retail app. You can deploy a branch to CB Alpha without merging to `master` via [firebase](https://buildkite.com/coinbase/retail-rn-ios-firebase-delivery). Follow the directions at [go/how-to-tarball](https://docs.google.com/document/d/1yF8IkgLI53l7t9z0lq7wktbYIhxrf8ohAY3J0PCkZRY/edit).

## Create an Alpha release

If you want to cut an alpha release you'll need to create a protected branch. This will allow you to deploy releases via Codeflow. Add the branch to `secure.branches` to `codeflow.yml`. This is required to make a branch deployable.

The branch name must be prefixed with `alpha-`, otherwise Github won't protect it with a Duo 2FA push.

## More Release Information

Checkout the [Release Workflow](https://cds.cbhq.net/resources/release) for more information.
For packages that are pre v1.0.0 we were not following a weekly release like the docs suggest. In order to move fast engineers will bump release as components are added.
