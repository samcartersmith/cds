# Release Candidate

Release candidates (RC) are useful for batching breaking changes on a single branch. On this branch, we can create iterative milestones to cut RC package updates (5.0.0-rc.1, 5.0.0-rc.2, etc) which allows consumers to test out our upcoming breaking changes with the understanding that it is a pre-release. These releases eliminate the hassle of tarballs, and utilize npm to pull in these changes.

RCs provide a unified location for multiple developers to contribute to the next breaking version release. Every PR merged into the RC must be reviewed. This provides an easy pipeline towards cutting the stable release.

- [Release Candidate](#release-candidate)
  - [How to create one](#how-to-create-one)
  - [How to collaborate on a release candidate](#how-to-collaborate-on-a-release-candidate)
    - [When it's just you](#when-its-just-you)
    - [When multiple people are working off of the release candidate branch](#when-multiple-people-are-working-off-of-the-release-candidate-branch)
  - [How to create an npm package with the release candidate branch](#how-to-create-an-npm-package-with-the-release-candidate-branch)
  - [How to go from release candidate to stable release](#how-to-go-from-release-candidate-to-stable-release)

## How to create one

1. Create a PR off `master` to update `.codeflow.yml` branches to include `release-<your major version>.0.0-rc.x`. [Example](https://github.cbhq.net/frontend/cds/pull/1821)

2. **Once your PR is merged**, pull latest master down and create your protected release branch and push back up to remote.

```bash
git checkout master
git pull origin master
git checkout -b release-<your major version>0.0-rc.x
git push origin release-<your major version>0.0-rc.x
```

At this point, you should see your protected branch in codeflow at `https://codeflow.cbhq.net/#/frontend/cds/branch/release-<your major release>.0.0-rc.x` and you should be able to find your branch in github at `https://github.cbhq.net/frontend/cds/tree/release-<your major release>.0.0-rc.x`

## How to collaborate on a release candidate

Any change to your release candidate branch must go through a PR, **including rebasing master**.

### When it's just you

1. Create your PR based off of the release candidate branch, or rebase your existing PR to include the release candidate work.

```bash
git checkout release-<your major version>0.0-rc.x
git checkout ems/breaking-feature
```

2. Push up your PR for a review like normal, but set the base of your PR to `release-<your major release>.0.0-rc.x` instead of `master`.

3. Once approved, merge into `release-<your major release>.0.0-rc.x`

### When multiple people are working off of the release candidate branch

Release candidate package versions should _never_ be created with incomplete work. Since there can be multiple people working off the same release branch simultaneously, it's important that you only merge completed work to the release branch.

1. Work off of your own branch that is based off of `master` or the `release` branch.

2. When you're ready to merge your work, update the release branch to have latest master **with a separate PR based off of release**:

```bash
git checkout master
git pull origin master
git checkout release-<your major version>0.0-rc.x
git checkout -b update-release
git merge master
git push origin update-release
```

3. Go through the normal review process for your `update-release` to merge latest master into `release-<your major release>.0.0-rc.x`.

4. Ensure your breaking feature branch is also up to date with master.

5. Open a PR of your breaking feature against `release-<your major release>.0.0-rc.x` and merge.

## How to create an npm package with the release candidate branch

Once your work is merged in, create a release PR off of the release branch.

1. Create a new branch based off of `release-<your major version>0.0-rc.x`
2. Run `yarn release` to see what changes are needed for your versioning. It will prompt you to run `yarn mono-pipeline version <package>` for whichever packages need to be bumped. By the end of this step, your Changelogs, website changelogs & package.json versions should all be up to date and `yarn release` should pass.
3. If impacting cds-web, cds-mobile, or cds-common, increment the rc version in the website changelogs as well by adding `-rc.<version num>` in `package.json`, `Changelog`, and website changelogs.
4. Merge into the release branch.
5. After your branch has built on codeflow, deploy the packages in the codeflow UI. See [release.md](../release.md) for how to deploy each package.

## How to go from release candidate to stable release

CONGRATS! When you're ready to create a stable release, merge the `release-<your major version>0.0-rc.x` branch into `master`.

Update all impacted Changelogs to batch together RC messages under your stable version number.

Follow normal release protocol ([release](../release.md)) for creating npm packages.
