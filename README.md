# Coinbase design system

## Setup

```sh
yarn install
```

## Commands (nx workflow)

This CDS monorepo uses [Nx](https://nx.dev) for improved CI times.

- Nx workspace names are configured in the root workspace.json file.
- Each project has a project.json which lists the tasks available for a workspace.
- Nx commands follow the `nx run {project}:task` syntax.

```sh
nx run common:lint
```

## Commands (yarn workflow)

This CDS monorepo uses [yarn workspaces](https://yarnpkg.com/features/workspaces).

- Yarn workspace names are configured in each projects package.json.
- Aliases for each workspace have been added to the root package.json to simplify the yarn workspace workflow.
- Each project has a package.json which lists the yarn commands available for a workspace.

| Workspace name         | Alias      |
| ---------------------- | ---------- |
| @cbhq/cds-common       | common     |
| @cbhq/cds-fonts        | fonts      |
| @cbhq/cds-lottie-files | lottie     |
| @cbhq/cds-mobile       | mobile     |
| @cbhq/cds-utils        | utils      |
| @cbhq/cds-web          | web        |
| @cds/codegen           | codegen    |
| @cds/mobile-playground | playground |
| @cds/storybook         | storybook  |
| @cds/website           | website    |

A diff for adding lodash to cds-utils in workspace vs alias syntax is shown below.

```diff
- yarn workspace @cbhq/cds-utils add lodash
+ yarn utils add lodash
```

Both commands work, but the alias version is preferred if you want to minimize keystrokes.

Alias examples:

```sh
yarn codegen docs
yarn common lint
yarn common lint.fix
yarn website start
yarn storybook start
yarn playground start // defaults to ios
yarn playground start.ios
yarn playground start.android
```

## When should I use Nx vs Yarn CLI?

This is sort of personal preference, but there are also known limitations to Nx commands. Majority of CDS's yarn commands call Nx internally so the recommendation is to use `yarn` workflow to avoid decision fatique.

**Why yarn?**

- Adding a dependency, i.e. `yarn utils add lodash`
- Want to watch a single test file / pass args not accounted for in Nx task, i.e. `yarn web test packages/web/buttons/__tests__/Button.test.tsx --watch`
- Want to avoid sticky nx cache, i.e. `yarn website start`. (All start commands do not pipe through Nx to avoid this.)
- Run a simple ts-node script which is not hooked into Nx. i.e. custom CLI for Codegen 2.0.
- Standardized command names. Nx offers multiple ways to trigger tasks which can be confusing.

**Why Nx?**

- Debug/replicate CI workflow
- Run a task or Nx command which is not included in yarn commands.

## Tasks

The task list below is needed to get the hello world of the poly repo. There are no new features planned in these tasks.

#### Linting, testing, typechecking and formatting

- [x] common
- [x] utils
- [x] mobile
- [x] lottie-files
- [x] fonts
- [x] web
- [x] web utils (webpack, jest, etc.)
- [x] website
- [x] codegen
- [ ] codemod

#### Stylelint

- [x] web
- [x] common
- [x] website

#### Codegen tasks

- [x] adoption tracker
- [x] codegen
- [x] docgen
- [x] changelog
- [x] sync_icons
- [x] build_icons
- [x] build_illustrations
- [x] prepare_adoption (One issue with Wallet, might need to modify code to handle. Will look into it later)
- [x] prepare_mobile_routes

#### npm package building

- [x] common
- [x] fonts
- [x] utils
- [x] mobile
- [x] web
- [x] lottie-files
- [x] static css

#### Storybook

- [x] Deploy storybook locally with web stories
- [x] Hook up Percy

#### Mobile Playground

- [x] Deploy mobile playground with mobile stories

#### Website

- [x] deploy website locally
- [x] deploy dev website
- [x] deploy prod website

#### Releases

- [x] Build release script to auto update package.json's
- [x] Enable npm publish to verdaccio
- [x] Upload css to cloud
- [x] Update service worker cache

#### Buildkite

- [x] Hook up buildkite

## Repo migration cutover items

- [ ] Migrate mono repo to cds npm packages

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.
