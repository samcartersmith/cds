# a11y-lint-tracker

## Overview

The a11y lint tracker is a script that collects eslint output data from repositories in order to help drive accessibility remediation efforts.

## Quick Start

To run the a11y lint tracker script, run

```
yarn nx run website:a11y-lint-tracker
```

## Development

This script will clone the target repos in the `config.ts` file and clone them to a temporary directory.

After cloning the repositories, it will install the `cbhq/cds` accessibility plugin (`cbhq/eslint-plugin-cds`) and run yarn to install the dependencies.

The CDS plugin we use contains specific a11y improvements to our existing a11y ruleset offered by the `cbhq` package. See the [P/PS](https://docs.google.com/document/d/1zZvMw53YysvSuPd9Uph7Yr3JewpIfSVK_a9eeJ6Xktw/edit#heading=h.govygr15uryx) for more information.

The script will replace the existing eslint file with our eslint configs and then run the ESLint command to gather output.

We default to use both rulesets for web and mobile:

- `temp-eslintrc`: eslint config containing both

We then apply a filter via `impl.ts` in the `filterRulePrefixes` constant. We look at the repo config and then filter to only display warnings based on the repo type.

```
const filterRulePrefixes: Record<RepoType, string[]> = {
  web: ['jsx-a11y', '@cbhq/cds/control-has-associated-label-extended'],
  mobile: ['@cbhq/cds/has-valid-accessibility-descriptors-extended', 'react-native-a11y'],
  both: [
    'jsx-a11y',
    '@cbhq/cds/control-has-associated-label-extended',
    '@cbhq/cds/has-valid-accessibility-descriptors-extended',
    'react-native-a11y',
  ],
};

```

The ESLint output will be stored in the directory based on the repo's name and target project.

The script also collects all the eslint disables by running a `grep` command and storing the raw output. We process the raw output into json for easier consumption for the UI component.

To modify the UI layer which displays the data, see `A11yLintTrackerOverview` which uses helper functions found in `A11yLintTrackerUtils`.
