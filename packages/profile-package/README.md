# @cbhq/profile-package

A set of tools for evaluating and monitoring JavaScript package metadata in CI. Each tool is published in ESM and CJS as both a plain function and a CLI program.

### `checkDependencies`

Evaluates your packages for missing or unused dependencies

```sh
yarn node @cbhq/profile-package/cli/checkDependencies
```

```ts
import { checkDependencies } from '@cbhq/profile-package/checkDependencies';
checkDependencies();
```

### `measureSideEffects`

Measure the runtime side effect performance of your packages

```sh
yarn node @cbhq/profile-package/cli/measureSideEffects
```

```ts
import { measureSideEffects } from '@cbhq/profile-package/measureSideEffects';
measureSideEffects();
```

### Local development with ESM

You must be on Node v20.10+ to test easily with [the `--experimental-detect-module` flag](https://nodejs.org/en/blog/release/v20.10.0#--experimental-default-type-flag-to-flip-module-defaults)

```sh
nvm use 20.10
yarn nx run profile-package:build
yarn node --experimental-detect-module packages/profile-package/esm/cli/checkDependencies
```

### Local development with CJS

You must be on Node v20.10+ to test easily with [the `--experimental-detect-module` flag](https://nodejs.org/en/blog/release/v20.10.0#--experimental-default-type-flag-to-flip-module-defaults)

```sh
yarn nx run profile-package:build
yarn node packages/profile-package/lib/cli/checkDependencies
```
