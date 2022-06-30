# Commands

## Commands (overview)

| Command                         | Description                                                  |
| ------------------------------- | ------------------------------------------------------------ |
| yarn build                      | Build all packages.                                          |
| yarn format                     | Format all of the affected packages                          |
| yarn lint                       | Lint all of the affected packages                            |
| yarn lint.fix                   | Lint all of the affected packages and fix errors             |
| yarn release                    | Automatically update CHANGELOG based on PR titles            |
| yarn stylelint                  | Stylelint all affected packages                              |
| yarn stylelint.fix              | Stylelint and fix all affected packages                      |
| yarn test                       | Test all of the affected packages                            |
| yarn typecheck                  | typecheck all of the affected packages                       |
| ----                            | ----                                                         |
| yarn codegen adoption           | Prepare adoption numbers                                     |
| yarn codegen adoption --DEBUG=1 | Debug adoption tracker script                                |
| yarn codegen all                | Generate code in design system.                              |
| yarn codegen docs.internal      | Copy CHANGELOG.md from packages to website.                  |
| yarn codegen format             | Format the `codegen` project.                                |
| yarn codegen icons              | Prepare icons                                                |
| yarn codegen illustrations      | Prepare illustrations                                        |
| yarn codegen lint               | Lint the `codegen` project.                                  |
| yarn codegen lint.fix           | Lint the `codegen` project and fix errors.                   |
| yarn codegen routes             | Create routes for mobile-playgrounds from screens directory. |
| ----                            | ----                                                         |
| yarn common build               | Build the `common` package.                                  |
| yarn common format              | Format the `common` package.                                 |
| yarn common lint                | Lint the `common` package.                                   |
| yarn common lint.fix            | Lint the `common` package and fix errors.                    |
| yarn common test                | Test the `common` package.                                   |
| yarn common typecheck           | Typecheck the `common` package.                              |
| ----                            | ----                                                         |
| yarn fonts build                | Build the `fonts` package.                                   |
| yarn fonts format               | Format the `fonts` package.                                  |
| yarn fonts lint                 | Lint the `fonts` package.                                    |
| yarn fonts typecheck            | Typecheck the `fonts` package.                               |
| ----                            | ----                                                         |
| yarn lottie build               | Build the `lottie` package.                                  |
| yarn lottie format              | Format the `lottie` package.                                 |
| yarn lottie lint                | Lint the `lottie` package.                                   |
| yarn lottie typecheck           | Typecheck the `lottie` package.                              |
| ----                            | ----                                                         |
| yarn mobile build               | Build the `mobile` package.                                  |
| yarn mobile format              | Format the `mobile` package.                                 |
| yarn mobile lint                | Lint the `mobile` package.                                   |
| yarn mobile lint.fix            | Lint the `mobile` package and fix errors.                    |
| yarn mobile test                | Test the `mobile` package.                                   |
| yarn mobile typecheck           | Typecheck the `mobile` package.                              |
| ----                            | ----                                                         |
| yarn utils build                | Build the `utils` package.                                   |
| yarn utils format               | Format the `utils` package.                                  |
| yarn utils lint                 | Lint the `utils` package.                                    |
| yarn utils lint.fix             | Lint the `utils` package and fix errors.                     |
| yarn utils test                 | Test the `utils` package.                                    |
| yarn utils typecheck            | Typecheck the `utils` package.                               |
| ----                            | ----                                                         |
| yarn web build                  | Build the `web` package.                                     |
| yarn web build.css              | Build the static css.                                        |
| yarn web format                 | Format the `web` package.                                    |
| yarn web lint                   | Lint the `web` package.                                      |
| yarn web lint.fix               | Lint the `web` package and fix errors.                       |
| yarn web stylelint              | Stylelint the `web` package                                  |
| yarn web stylelint.fix          | Stylelint and fix the `web` package                          |
| yarn web test                   | Test the `web` package.                                      |
| yarn web typecheck              | Typecheck the `web` package.                                 |
| ----                            | ----                                                         |
| yarn website build              | Build website.                                               |
| yarn website format             | Format the `website`                                         |
| yarn website lint               | Lint the `website`.                                          |
| yarn website setup              | Setup website and prebuild icons.                            |
| yarn website start              | Start website local dev server and watch plugins.            |
| yarn website stylelint          | Stylelint website                                            |
| yarn website stylelint.fix      | Stylelint website and fix errors.                            |
| ----                            | ----                                                         |
| yarn web-utils build            | Build web-utils.                                             |
| yarn web-utils start            | Build web-utils in watch mode.                               |
| ----                            | ----                                                         |
| yarn storybook build            | Build storybook.                                             |
| yarn storybook start            | Start storybook local dev server.                            |
| yarn storybook format           | Format the `storybook`                                       |
| ----                            | ----                                                         |
| yarn tools build                | Build tools.                                                 |
| yarn tools start                | Build tools in watch mode.                                   |
| ----                            | ----                                                         |
| yarn playground format          | Format the `mobile-playground`                               |
| yarn playground start           | Start the playground app (ios by default).                   |
| yarn playground start.metro     | Start the playground metro server.                           |
| yarn playground start.ios       | Start the playground ios app.                                |
| yarn playground build.ios       | Build the playground ios app.                                |
| yarn playground clean.ios       | Clean ios build                                              |
| yarn playground start.android   | Start the playground android app.                            |
| yarn playground build.android   | Build the playground android app.                            |
| yarn playground clean.android   | Clean android build                                          |

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

Yarn commands follow this structure -> yarn `<workspace-name-alias>` `<script>`

The alias of the workspace name can be obtained in Table 1.0. The script can be obtained by going to the folder of the workspace and inspecting the script key of the package.json.You can also add custom script in the key-value pair too.

**Table 1.0**

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

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.
