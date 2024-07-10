# Publishing a New Package

After you've created a new package that you want to release pubicly, you'll need to publish it to our internal npm registry, Artifactory. This guide will walk you through the steps to publish a new package automatically whenever a commit is merged to `master`.

## New Package Template

You can follow the new package scaffold found in the new package directory: `cds/tools/new-package/`

Follow instructions from `tools/new-package/README.md`

> Copy the `tools/new-package` directory to `packages/my-new-package`, then find and replace `{{NEW_PACKAGE}}` with `my-new-package`. Rename the `nx-project.json` file to `project.json`, then run `yarn` to add your package to the yarn.lock.

## Create a Codeflow config

You'll need to add your package to the codeflow config under the `packages` [section](https://github.cbhq.net/frontend/cds/blob/master/.codeflow.yml#L54) in the `.codeflow.yml` file. **Note**: packages must be sorted in alphabetical order.

For example:

```yaml
- BaldurNode:
    name: package-<YOUR_PACKAGE>
    path: ./packages/<YOUR_PACKAGE>/publish.Dockerfile
    autobuild_files:
      - packages/<YOUR_PACKAGE>/package.json
    expire_keep_tags_after_days: 1
    expire_tmp_tags_after_days: 1
    expire_all_after_days: 2
```

1. For the `name` field, prefix with `package-` and then the name of the package.
2. For the `path` field, specify the path to the Dockerfile that will be used to build the package.
3. For the `autobuild_files` field, specify the files that will trigger a build when they are changed.

## Deployment

Navigate to [frontend/cds - settings](https://codeflow.cbhq.net/#/frontend/cds/settings) and click **New Configuration**.

For the deploy target, choose **Corporate**.
For the Configuration Name, paste your package name. Usually your **Display Name** will be changed to `corporate::<YOUR_PACKAGE>`

Ensure that your configuration is set to **being stored on Codeflow**. Paste the following into the textbox and save.

```
engine: Node
continuous: true
build_name: package-<YOUR_PACKAGE>
```

Be sure to build on Codeflow and test that the build works.

After your PR is merged Codeflow will automatically deploy it to Artifactory. But you should also verify that it was deployed by checking the commit in the codeflow UI.

## Updates

Whenever you make updates to your package you'll want to bump the version and changelog, you can use the `yarn mono-pipeline version` and the name of your package to bump the version and changelog.

Example:

```
yarn mono-pipeline version <YOUR_PACKAGE>
```

ie. `yarn mono-pipeline version eslint-plugin-cds`

## Resources

- [(Recording) NodeJS Service on Coinbase Infra by Cody](https://drive.google.com/file/d/1FZg5T1GFItkppUxeL7cU3Zxms36ajnXR/view)
- [(Recording)Codeflow Overview Process by Hollis](https://drive.google.com/file/d/1ccfq6WD9SJADqaHUXskj3fkbl2UFvVdd/view)
