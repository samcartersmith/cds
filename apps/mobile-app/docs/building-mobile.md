# Mobile native modules builds

- [Mobile native modules builds](#mobile-native-modules-builds)
  - [Debug Builds](#debug-builds)
    - [What is a debug build?](#what-is-a-debug-build)
    - [When do you need to rebuild debug builds?](#when-do-you-need-to-rebuild-debug-builds)
    - [How do I rebuild a debug build?](#how-do-i-rebuild-a-debug-build)
  - [Release Builds](#release-builds)
    - [What is a release build?](#what-is-a-release-build)
    - [When do you need to rebuild release builds?](#when-do-you-need-to-rebuild-release-builds)
    - [How do I rebuild a release build?](#how-do-i-rebuild-a-release-build)
  - [Advanced](#advanced)
    - [Android V8](#android-v8)
    - [Creating new build configurations](#creating-new-build-configurations)

## Debug Builds

### What is a debug build?

It is a native module build of your application that is:

- Used for hot reloading & local development
- Large & stored locally in your repo
- Gitignore'd (because it's too big to commit).

### When do you need to rebuild debug builds?

- If you don't have any local debug build to develop off of
- If there's any dependency change in `apps/mobile-app/package.json` and `packages/mobile/package.json`

### How do I rebuild a debug build?

| Platform | Profile - engine type | Command                                      |
| -------- | --------------------- | -------------------------------------------- |
| ios      | local - jsc           | `yarn nx run mobile-app:build:ios-local`     |
| android  | local -hermes         | `yarn nx run mobile-app:build:android-local` |

## Release Builds

### What is a release build?

It is a native module build of your application that is:

- Used for visreg
- Much smaller & commited to our repo
- Cannot support hot reloading

### When do you need to rebuild release builds?

- Any dependency change in `apps/mobile-app/package.json` and `packages/mobile/package.json`
- Any JS change in `packages/mobile/*`.

### How do I rebuild a release build?

Generate the new shared, native module builds for everyone to use. **Be sure to commit both**. Visreg will use these builds to compare UIs from your PR to what was generated on master.

**Note: Committing these builds reduces CI time drastically by 14min for ios and 7 mins for android**

```shell
yarn nx run mobile-app:build:ios-release
yarn nx run mobile-app:build:android-release
```

## Advanced

### Android V8

Retail RN team currently uses V8 engine. This is a slower testing build with a much larger bundle size, so we opt to use hermes to test android playground. However, if you need to generate a V8 test you can run:

```shell
yarn nx run mobile-app:build:android-local-v8
```

### Creating new build configurations

You can create other build types using [app.config.js](./../app.config.js), [project.json](./../project.json), and an `.env` file like `.env-local`.

1. Create a new config in [project.json](./../project.json) `targets.build.configurations`. The key will be come your new command for `yarn nx run mobile-app:build:<your key>`.

2. Create a new `apps/mobile-app/.env-<config type>` file. This will contain the env variables that are passed to [app.config.js](./../app.config.js) upon build time.

3. Update [app.config.js](./../app.config.js) to generate the configuration of the build you'd like to support. You can call env variables from #2 with `process.env.<Variable>`

[Here is the reference guide on app configurations from Expo](https://docs.expo.dev/versions/latest/config/app/).
