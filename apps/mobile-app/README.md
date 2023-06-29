# Mobile App

This is a playground for mobile component development. It uses `packages/ui-mobile-playground` to manage the UI components that render the mobile storybook components. This app is primarily expo logic that wraps and renders `ui-mobile-playground` components.

## Setup

1. Setup your dependencies - fastlane, and eas-cli

Get the eas version in [eas.json](./eas.json) at `cli.version`.

```shell
brew install fastlane
npm install -g eas-cli@<insert version>
```

1. Add EXPO_TOKEN added to your root .env.local

```shell
EXPO_TOKEN=<get token from UI Infra 1Password>
```

3. Run `yarn install` from root

> All yarn nx commands should be run at the root.

## Spinning up mobile-app for hot-reloading development

> Complete setup if you haven't already

1. Build the application you wish to develop on with `build`

**Note: you should only need to build if you're missing your desired build in [prebuilds](./prebuilds/) or if there's been a recent native dependency upgrade.**

See more info about mobile builds [here](./docs/building-mobile.md).

| Platform | Profile - engine type | Command                                                                            |
| -------- | --------------------- | ---------------------------------------------------------------------------------- |
| ios      | debug - hermes        | `yarn nx run mobile-app:build:ios-debug`                                           |
| ios      | release - hermes      | `yarn nx run mobile-app:build:ios-release`                                         |
| android  | debug - hermes        | `yarn nx run mobile-app:build:android-debug`                                       |
| android  | release - hermes      | `yarn nx run mobile-app:build:android-release`                                     |
| ios      | debug - jsc           | `yarn nx run mobile-app:build --platform ios --jsEngine jsc --profile debug`       |
| ios      | release - jsc         | `yarn nx run mobile-app:build --platform ios --jsEngine jsc --profile release`     |
| android  | debug - jsc           | `yarn nx run mobile-app:build --platform android --jsEngine jsc --profile debug`   |
| android  | release - jsc         | `yarn nx run mobile-app:build --platform android --jsEngine jsc --profile release` |

**Note: If you run into errors when trying to prebuild, run `yarn workspace mobile-app expo prebuild -p <ios|android>` then rerun the `build` script.**

2. Install app in your simulator with `launch` configuration.

**Note: You can skip this if you've already launched the build in your [prebuilds](./prebuilds/) in your simulator.**

| Platform | Profile - engine type | Command                                                                             |
| -------- | --------------------- | ----------------------------------------------------------------------------------- |
| ios      | debug - hermes        | `yarn nx run mobile-app:launch:ios-debug`                                           |
| ios      | release - hermes      | `yarn nx run mobile-app:launch:ios-release`                                         |
| android  | debug - hermes        | `yarn nx run mobile-app:launch:android-debug`                                       |
| android  | release - hermes      | `yarn nx run mobile-app:launch:android-release`                                     |
| ios      | debug - jsc           | `yarn nx run mobile-app:launch --platform ios --jsEngine jsc --profile debug`       |
| ios      | release - jsc         | `yarn nx run mobile-app:launch --platform ios --jsEngine jsc --profile release`     |
| android  | debug - jsc           | `yarn nx run mobile-app:launch --platform android --jsEngine jsc --profile debug`   |
| android  | release - jsc         | `yarn nx run mobile-app:launch --platform android --jsEngine jsc --profile release` |

3. Start the metro server for installed application. Only relevant for debug builds.

| Platform | Profile - engine type | Command                                                     |
| -------- | --------------------- | ----------------------------------------------------------- |
| ios      | debug - hermes        | `yarn nx run mobile-app:start:ios-debug`                    |
| android  | debug - hermes        | `yarn nx run mobile-app:start:android-debug`                |
| ios      | debug - jsc           | `yarn nx run mobile-app:start:ios-debug --jsEngine jsc`     |
| android  | debug - jsc           | `yarn nx run mobile-app:start:android-debug --jsEngine jsc` |

**Note: If you see `CommandError: No development build (com.ui-systems.debug-ios-hermes) for this project is installed. Please make and install a development build on the device first.` delete `/mobile-app/ios` and `/mobile-app/.expo` and rerun the `start` script.**

When running the debug app after a rebuild or restart, you'll most likely need to close out the Debug app and reopen it to trigger the bundler to recompile.

1. Run detox tests locally

| Platform | Profile - engine type | Command                                                                            |
| -------- | --------------------- | ---------------------------------------------------------------------------------- |
| ios      | debug - hermes        | `yarn nx run mobile-app:detox:ios-debug`                                           |
| ios      | release - hermes      | `yarn nx run mobile-app:detox:ios-release`                                         |
| android  | debug -hermes         | `yarn nx run mobile-app:detox:android-debug`                                       |
| android  | debug -hermes         | `yarn nx run mobile-app:detox:android-debug`                                       |
| ios      | debug - jsc           | `yarn nx run mobile-app:detox --platform ios --jsEngine jsc --profile debug`       |
| ios      | release - jsc         | `yarn nx run mobile-app:detox --platform ios --jsEngine jsc --profile release`     |
| android  | debug - jsc           | `yarn nx run mobile-app:detox --platform android --jsEngine jsc --profile debug`   |
| android  | release - jsc         | `yarn nx run mobile-app:detox --platform android --jsEngine jsc --profile release` |

## An overview of Expo NX Targets

One should note that there are four NX targets associated with Expo that we leverage to build and run mobile-app in various contexts. The various contexts can be summarized as a debug and release mode for development and a debug and release mode for visreg tests (powered by detox).

The four NX Targets (also declared in `/apps/mobile-app/project.json`):

1. launch
2. start
3. build
4. detox

These targets call node scripts that live in the [scripts directory of mobile-app](/apps//mobile-app/scripts/). These scripts are intuitively named the same as their respective nx targets.

## Expo Debug vs Release Builds

There are eight relevant build variations associated with mobile-app:

Release builds:

1. iOS Release build
2. Android Release build
3. iOS Visreg (powered by Detox) Release build
4. Android Visreg (powered by Detox) Release build

Debug builds:

5. iOS Debug build
6. Android Debug build
7. iOS Visreg (powered by Detox) Debug build
8. Android Visreg (powered by Detox) Debug build

There are two key ideas to understand about these build variations:

1. The difference between a release and a debug build
2. Why visreg needs its own debug and release build

## The difference between a release and a debug build

The key difference between release and debug builds is how the javascript is bundled with the native portion of mobile-app. In release builds a fully optimized version of the javascript bundle is packaged into the iOS ipa or Android apk and is referenced by the native app entry point. In a debug build the javascript bundle is not bundled into the app artifact, instead it is kept external to the shippable native portion and the native entry point references a bundle managed by the metro bundler (the metro bundler is what runs in your terminal when you run the start target). This difference is key to understanding why hot-reloading works in debug builds but not in release builds. It is also important to note here that debug is clearly a very different environment compared to release, which is why our visreg tests must be run in the context of release build as opposed to debug.

## Why visreg needs its own debug and release build

Visreg tests are powered by an end-to-end testing framework called [Detox](https://github.com/wix/Detox). Detox is different compared to other e2e testing frameworks because it a "gray-box" testing framework. What this means is that Detox has specialized code injected into the native portion of our app build to enable Detox to watch what is happening inside of the target test app. This is great for ensuring more reliable e2e tests, but its major drawback is that it requires us to build a specialized detox build to hook into the app lifecycle.

For debugging visreg locally we highly recommend using the visreg debug build. Using the visreg debug build allows you to test your changes quicker because your javascript updates are hot-reloaded via metro.

Run iOS visreg debug tests: `yarn nx run mobile-app:detox:ios-debug`
Run iOS visreg release tests: `yarn nx run mobile-app:detox:ios-release`

## How visreg patching works

The key to understand Visreg tests is by investigating the `apps/mobile-app/scripts/detox.mjs` script.

The commands in that file are pretty straight forward; they initialize the needed emulator/simulator, launch them, and run the visreg tests via detox, but there is a key step in that file that is not immediately obvious; the patch step:

```
if (profile === 'release') {
  if (platform === 'android') await android.patchBundle();
  if (platform === 'ios') await ios.patchBundle();
}
```

The purpose of this step is to enable updating the javascript bundle of the visreg release build (on iOS and Android) in CI without having to rebuild the native portion of the app. The command varies depending on platform because their artifact architectures are different, but the goal across the two platforms is the same; uncompress given artifact, update javascript bundle with new bundle, re-compress artifact to a state that is acceptable by the given platform.

Why is this so important?
The native portion of the app takes over 6 minutes on Android and 8 minutes on iOS. But CDS developers rarely change the code that actually modifies the native portion of the app (native modules). Because of this it would be wasteful to rebuild the native portion of the app on every CI run. This patch method offers a very quick way of making sure all javascript code is up to date for the visreg tests without executing the long running build commands on every CI run.

When should the native portion of the app be rebuilt?
The short answer to this is any time native dependencies, native expo configs, or relevant build tooling changes.
Unfortunately to know exactly when this condition is true is not the easiest case to recognize. As a result this is definitely a shortcoming of this repo; ideally we would have a check that identifies whether any of these conditions are met and fail CI to indicate that a new build must be created. Until this tool is added to the repo the team is in a risky state because the native build could easily slip out of date if a developer forgets to rebuild when they should have.

## Advanced

- [How to upgrade React Native version](./docs/upgrade-rn.md)
- [How and when to create new mobile build](./docs/building-mobile.md)
- [How to upgrade a native dependency](./docs/upgrading-mobile-dep.md)

## FAQ

1. I'm seeing lots of warnings about watchman recrawling. How can I remove these from my terminal output?

- Shutdown watchman

```shell
watchman shutdown-server
```

- Delete running watch list

```shell
watchman watch-del-all
```

- Update homebrew

```shell
brew update
```

- Re-install watchman with latest version

```shell
brew reinstall watchman
```

- Print watchman location (to be used in steps below)

```shell
which watchman
```

- Open System Settings > Privacy & Security > Full Disk Access
- Ensure that your Terminal or iTerm (if applicable) and Visual Studio Code are added to list
- Click the plus button at the bottom of the window so we can add `Watchman` to the list
- Select Macintosh HD in the folders list
- Press `shift + Command + .` at the same time to see all the directories list
- Drill into the directory that `which watchman` printed and find all executables prefixed with `watchman` and add each one to have Full Disk Access list
- Run `yarn nx run mobile-app:start` multiple times to confirm you are no longer seeing the warning

2. Expo is throwing this error while I'm running a build command (`yarn nx run mobile-app:build:<build type>`): An Expo user account is required to proceed.
   › Error: Either log in with eas login or set the EXPO_TOKEN environment

- In root directory:

```shell
touch .env.local
```

- Open new file, and add:
  EXPO_TOKEN=<Get from UI Infra 1Password File>

3. `yarn nx run mobile-app:build:ios-debug` is throwing a `spawn ENOENT` error.

- Run `yarn workspace mobile-app run expo prebuild -p ios --clean`
- Delete the `mobile-app/ios` direcotry
- `yarn nx run mobile-app:build:ios-debug` should work as expected

4. `yarn nx run mobile-app:build:android-debug` is throwing this error `mobile-app/android directory not found`

- Run `mkdir apps/mobile-app/android`
- `yarn nx run mobile-app:build:android-debug` should work as expected
- Delete the `mobile-app/android` direcotry

5. An error like "You are on eas-cli@3.7.2 which does not satisfy the CLI version constraint in eas.json (3.8.1)"

Look up the `cli.version` in `apps/mobile-app/eas.json`.

```shell
npm -g install eas-cli@<version>
```
