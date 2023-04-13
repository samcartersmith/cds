# Commands

This CDS monorepo uses [Nx](https://nx.dev) for improved CI times.

- Nx workspace names are configured in the root workspace.json file.
- Each project has a project.json which lists the tasks available for a workspace.
- Nx commands follow the `nx run {project}:task` syntax.

```sh
nx run common:lint
```

| Command                                             | Description                                                  |
| --------------------------------------------------- | ------------------------------------------------------------ |
| yarn release                                        | Automatically update CHANGELOG based on PR titles            |
| yarn nx affected --target=build                     | Build all packages.                                          |
| yarn nx affected --target=format                    | Format all of the affected packages                          |
| yarn nx affected --target=lint                      | Lint all of the affected packages                            |
| yarn nx affected --target=lint --fix                | Lint all of the affected packages and fix errors             |
| yarn nx affected --target=lint-styles               | Stylelint all affected packages                              |
| yarn nx affected --target=lint-styles --fix         | Stylelint and fix all affected packages                      |
| yarn nx affected --target=test                      | Test all of the affected packages                            |
| yarn nx affected --target=typecheck                 | typecheck all of the affected packages                       |
| ----                                                | ----                                                         |
| yarn nx run codegen:all                             | Generate code in design system.                              |
| yarn nx run codegen:docs.internal                   | Copy CHANGELOG.md from packages to website.                  |
| yarn nx run codegen:format                          | Format the `codegen` project.                                |
| yarn nx run codegen:icons                           | Prepare icons                                                |
| yarn nx run codegen:illustrations                   | Prepare illustrations                                        |
| yarn nx run codegen:lint                            | Lint the `codegen` project.                                  |
| yarn nx run codegen:lint --fix                      | Lint the `codegen` project and fix errors.                   |
| yarn nx run codegen:mobile-routes                   | Create routes for mobile-playgrounds from screens directory. |
| yarn nx run codegen:release                         | Automatically update CHANGELOG based on PR titles            |
| ----                                                | ----                                                         |
| yarn nx run common:build                            | Build the `common` package.                                  |
| yarn nx run common:format                           | Format the `common` package.                                 |
| yarn nx run common:lint                             | Lint the `common` package.                                   |
| yarn nx run common:lint --fix                       | Lint the `common` package and fix errors.                    |
| yarn nx run common:test                             | Test the `common` package.                                   |
| yarn nx run common:test --collect-coverage          | Test the `common` package with coverage report               |
| yarn nx run common:typecheck                        | Typecheck the `common` package.                              |
| ----                                                | ----                                                         |
| yarn nx run fonts:build                             | Build the `fonts` package.                                   |
| yarn nx run fonts:format                            | Format the `fonts` package.                                  |
| yarn nx run fonts:lint                              | Lint the `fonts` package.                                    |
| yarn nx run fonts:typecheck                         | Typecheck the `fonts` package.                               |
| ----                                                | ----                                                         |
| yarn nx run lottie:build                            | Build the `lottie` package.                                  |
| yarn nx run lottie:format                           | Format the `lottie` package.                                 |
| yarn nx run lottie:lint                             | Lint the `lottie` package.                                   |
| yarn nx run lottie:typecheck                        | Typecheck the `lottie` package.                              |
| ----                                                | ----                                                         |
| yarn nx run mobile:build                            | Build the `mobile` package.                                  |
| yarn nx run mobile:format                           | Format the `mobile` package.                                 |
| yarn nx run mobile:lint                             | Lint the `mobile` package.                                   |
| yarn nx run mobile:lint --fix                       | Lint the `mobile` package and fix errors.                    |
| yarn nx run mobile:test                             | Test the `mobile` package.                                   |
| yarn nx run mobile:test --collect-coverage          | Test the `mobile` package with coverage report               |
| yarn nx run mobile:typecheck                        | Typecheck the `mobile` package.                              |
| ----                                                | ----                                                         |
| yarn nx run utils:build                             | Build the `utils` package.                                   |
| yarn nx run utils:format                            | Format the `utils` package.                                  |
| yarn nx run utils:lint                              | Lint the `utils` package.                                    |
| yarn nx run utils:lint --fix                        | Lint the `utils` package and fix errors.                     |
| yarn nx run utils:test                              | Test the `utils` package.                                    |
| yarn nx run utils:typecheck                         | Typecheck the `utils` package.                               |
| ----                                                | ----                                                         |
| yarn nx run web:build                               | Build the `web` package.                                     |
| yarn nx run web:build-css                           | Build the static css.                                        |
| yarn nx run web:format                              | Format the `web` package.                                    |
| yarn nx run web:lint                                | Lint the `web` package.                                      |
| yarn nx run web:lint --fix                          | Lint the `web` package and fix errors.                       |
| yarn nx run web:stylelint                           | Stylelint the `web` package                                  |
| yarn nx run web:stylelint --fix                     | Stylelint and fix the `web` package                          |
| yarn nx run web:test                                | Test the `web` package.                                      |
| yarn nx run web:test --collect-coverage             | Test the `web` package with coverage report                  |
| yarn nx run web:typecheck                           | Typecheck the `web` package.                                 |
| ----                                                | ----                                                         |
| yarn nx run website:adoption                        | Prepare adoption numbers                                     |
| yarn nx run website:adoption --DEBUG=1              | Debug adoption tracker script                                |
| yarn nx run website:build                           | Build website.                                               |
| yarn nx run website:format                          | Format the `website`                                         |
| yarn nx run website:lint                            | Lint the `website`.                                          |
| yarn nx run website:setup                           | Setup website and prebuild icons.                            |
| yarn nx run website:start                           | Start website local dev server and watch plugins.            |
| yarn nx run website:stylelint                       | Stylelint website                                            |
| yarn nx run website:stylelint --fix                 | Stylelint website and fix errors.                            |
| ----                                                | ----                                                         |
| yarn web-utils build                                | Build web-utils.                                             |
| yarn web-utils start                                | Build web-utils in watch mode.                               |
| ----                                                | ----                                                         |
| yarn nx run storybook:build                         | Build storybook.                                             |
| yarn nx run storybook:start                         | Start storybook local dev server.                            |
| yarn nx run storybook:format                        | Format the `storybook`                                       |
| ----                                                | ----                                                         |
| yarn tools build                                    | Build tools.                                                 |
| yarn tools start                                    | Build tools in watch mode.                                   |
| ----                                                | ----                                                         |
| yarn nx run mobile-playground:setup                 | Setup local environment to run the `mobile-playground`       |
| yarn nx run mobile-playground:format                | Format the `mobile-playground`                               |
| yarn nx run mobile-playground:start-metro           | Start the playground metro server.                           |
| yarn nx run mobile-playground:start-ios             | Start the playground ios app.                                |
| yarn nx run mobile-playground:build-ios             | Build the playground ios app.                                |
| yarn nx run mobile-playground:start-ios --clean     | Clean ios build                                              |
| yarn nx run mobile-playground:start-android         | Start the playground android app.                            |
| yarn nx run mobile-playground:build-android         | Build the playground android app.                            |
| yarn nx run mobile-playground:start-android --clean | Clean android build                                          |
| yarn nx run mobile-playground:ios-e2e --debug       | Run the ios e2e visreg tests in debug mode                   |
| yarn nx run mobile-playground:android-e2e --debug   | Run the android e2e visreg tests in debug mode               |

## Understand your workspace

Run `yarn nx dep-graph` to see a diagram of the dependencies of your projects.
