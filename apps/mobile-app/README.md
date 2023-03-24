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

| Platform | Profile - engine type | Command                                      |
| -------- | --------------------- | -------------------------------------------- |
| ios      | local - jsc           | `yarn nx run mobile-app:build:ios-local`     |
| android  | local -hermes         | `yarn nx run mobile-app:build:android-local` |

2. Install app in your simulator with `launch` configuration.

**Note: You can skip this if you've already launched the build in your [prebuilds](./prebuilds/) in your simulator.**

| Platform | Profile - engine type | Command                                       |
| -------- | --------------------- | --------------------------------------------- |
| ios      | local - jsc           | `yarn nx run mobile-app:launch:ios-local`     |
| android  | local -hermes         | `yarn nx run mobile-app:launch:android-local` |

1. Start the metro server for installed application

| Platform | Profile - engine type | Command                                      |
| -------- | --------------------- | -------------------------------------------- |
| ios      | local - jsc           | `yarn nx run mobile-app:start:ios-local`     |
| android  | local -hermes         | `yarn nx run mobile-app:start:android-local` |

## Advanced

- [How to upgrade React Native version](./docs/upgrade-rn.md)
- [How and when to create new mobile build](./docs/building-mobile.md)
- [How to upgrade a native dependency](./docs/upgrading-mobile-dep.md)
- TODO: How do visreg and detox work with expo

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

3. `yarn nx run mobile-app:build:ios-local` is throwing a `spawn ENOENT` error.

- Run `yarn workspace mobile-app run expo prebuild -p ios --clean`
- Delete the `mobile-app/ios` direcotry
- `yarn nx run mobile-app:build:ios-local` should work as expected

4. `yarn nx run mobile-app:build:android-local` is throwing this error `mobile-app/android directory not found`

- Run `mkdir apps/mobile-app/android`
- `yarn nx run mobile-app:build:android-local` should work as expected
- Delete the `mobile-app/android` direcotry

5. An error like "You are on eas-cli@3.7.2 which does not satisfy the CLI version constraint in eas.json (3.8.1)"

Look up the `cli.version` in `apps/mobile-app/eas.json`.

```shell
npm -g install eas-cli@<version>
```
