## Release CDS Packages (@cbhq/cds-web, @cbhq/cds-mobile, etc.)

We release our packages to consumers through Coinbase's internal NPM registry (Verdaccio - https://publish-npm.cbhq.net/). Each package includes source TypeScript files for all typings information, and Babel transpiled ES modules. To split up the CSS code, we wrote a custom Babel plugin to take Linaria transpiled styles and put them into `.css` files corresponding to the `.js` files.

The following sections describe how to push new package releases to our consumers through Verdaccio.

When you're ready to cut a new release, do the following:

1. Check with the team for any last minute additions/merges to the release.

2. Announce a **CODE MERGE FREEZE** in #cds-engineering. This prevents PRs from being merged after generating the CHANGELOG, and keeps our semver aligned with what packages are released.

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

8. After your release PR is merged, announce that the Code Freeze is over and merges can resume in #cds-engineering.

9. Tag your release in Github by going to the [release page](https://github.cbhq.net/frontend/cds/releases) and clicking 'Draft a new release'. Create a new tag to match the current CDS version (e.g. v3.1.0). In the textarea field, provide a summary of the changes and wrap a copy of the full changelog in a dropdown (refer to previous release examples and click 'Edit' to see proper formatting).

### Manually Release Packages

Locate your release commit in [Codeflow](https://codeflow.cbhq.net/#/frontend/cds/commits) and manually deploy all of the following:

- corporate::cds-web-esm
- corporate::cds-web
- corporate::cds-common
- corporate::cds-mobile
- production::upload-css
- production::upload-css-sw-cache

heimdall should automatically deploy to our playgrounds and the CDS production website:

- corporate::ui-mobile-playground
- production::cds-docs
- development::cds-storybook

If heimdall fails to do this for some reason, then manually deploy to those targets as well.

![release.png](/docs/release.png)

After the Codeflow deploy has succeeded, double check that the package is published at [development Coinbase NPM registry](https://publish-npm-dev.cbhq.net/) or [production Coinbase NPM registry](https://publish-npm.cbhq.net/). It usually takes about 10 min or so for the package to be uploaded.

You will also need to verify that the CSS was deployed to AWS. If web was bumped, verify `upload_css` was deployed to AWS (i.e. `https://assets.coinbase.com/cds/web/version-0.18.0.css`). Verify `upload_css_sw_cache` deployed to aws was bumped (ie: `https://assets.coinbase.com/assets/sw-cache/web/version-0.30.8.css`) which should be mapped to `https://coinbase.com/assets/sw-cache/web/version-0.30.8.css`.

Verify that the [changelogs](https://cds.cbhq.net/changelog/mobile/) on the CDS website were properly updated.

Once verifications are complete, announce the new release in the [#announcements-cds](https://coinbase.slack.com/archives/C018PD8E6JG) Slack channel. You can reuse the same summary that you prepared for the Github release tag above.

### Updating Our Consumers

In certain special cases we may decide to update CDS for our consumers. [This](https://github.cbhq.net/consumer/react-native/pull/8067) is an example of how we would update the retail app to use an updated version of the CDS package. Please see directions below on how to manually deploy a CDS bump to the CB Alpha app.

### Manually Release @cbhq/cds-mobile to CB Alpha

Sometimes we want to test updates to the `@cbhq/cds-mobile` package in the `react-native` retail app. You can deploy a branch to CB Alpha without merging to `master` via [firebase](https://buildkite.com/coinbase/retail-rn-ios-firebase-delivery). Follow the directions [here](https://confluence.coinbase-corp.com/pages/viewpage.action?pageId=1243176705#:~:text=scheduled%20release%20train.-,Alpha%20Builds%20from%20custom%20branches,-Sometimes%2C%20it%20is).

### More Release Information

Checkout the [Release Workflow](https://cds.cbhq.net/resources/release) for more information.
For packages that are pre v1.0.0 we were not following a weekly release like the docs suggest. In order to move fast engineers will bump release as components are added.
