# Husky

Husky is a JavaScript module for running and managing git hooks. You can optionally install and configure Husky for the CDS repo if you prefer to have automatic pre-commit linting and validation. The same linting and validation is performed by Buildkite, and is required to merge with master.

1. Install the Husky and lint-staged packages globally `npm i -g husky lint-staged`

2. Run the Husky install command in the CDS repo root `cd cds && husky install`

3. Create a `.lintstagedrc` file in the `.husky` directory and configure it like so:

```
{
  "*.{js,ts,tsx}": [
    "eslint --fix",
    "prettier --write",
    "stylelint"
  ],
  "*.{json,md}": [
    "prettier --write"
  ]
}
```

4. Create a pre-commit file with Husky `husky add .husky/pre-commit "yarn lint-staged"`

Now the `lint-staged` configuration will run each time you try to git commit.
