# React Native development

## Mobile playground

| Command                                             | Description                                            |
| --------------------------------------------------- | ------------------------------------------------------ |
| yarn nx run mobile-playground:setup                 | Setup local environment to run the `mobile-playground` |
| yarn nx run mobile-playground:format                | Format the `mobile-playground`                         |
| yarn nx run mobile-playground:start-metro           | Start the playground metro server.                     |
| yarn nx run mobile-playground:start-ios             | Start the playground ios app.                          |
| yarn nx run mobile-playground:build-ios             | Build the playground ios app.                          |
| yarn nx run mobile-playground:start-ios --clean     | Clean ios build                                        |
| yarn nx run mobile-playground:start-android         | Start the playground android app.                      |
| yarn nx run mobile-playground:build-android         | Build the playground android app.                      |
| yarn nx run mobile-playground:start-android --clean | Clean android build                                    |
| yarn nx run mobile-playground:ios-e2e --debug       | Run the ios e2e visreg tests in debug mode             |
| yarn nx run mobile-playground:android-e2e --debug   | Run the android e2e visreg tests in debug mode         |

### Setup

Run `yarn nx run mobile-playground:setup` to setup local environment to run ios and android locally.

For additional setup details please visit https://frontend.cbhq.net/mobile/getting-started.

### Start

Run the following in the terminal to run the simulator

- IOS: `yarn nx run mobile-playground:start-ios`
- Android: `yarn nx run mobile-playground:start-android`

### Adding stories

#### Requirements

1. Your story must use a default export.

- This is to simplify our routing codegen that is used for [react-navigation](https://reactnavigation.org/docs/screen/#getcomponent).
- TODO: Add lint rule to enforce all `*.stories.tsx` in cds-mobile use only default exports

2. Your story must have `*.stories.tsx` extension.

3. You story must live inside cds-mobile codebase.

### View stories

1. Start the mobile-playground

- IOS: `yarn nx run mobile-playground:start-ios`
- Android: `yarn nx run mobile-playground:start-android`

2. If mobile-playground running prior to creating a new story you will need to either:

- Restart the mobile-playground
- Run `yarn nx run codegen:mobile-routes` in separate terminal window.

3. View your story

- The stories are alphabetized in the root list view and each entry will match the file's basename.
- For example Lottie.stories.tsx would generate a screen named Lottie.

### Troubleshooting Guide

- **Emulator failed to load** Try manually launching the Emulator from terminal. Be sure the emulator also exists in Android Studio's AVD manager.
- **Icons failed to load on iOS** Run `yarn nx run mobile-playground:start-ios --clean` or `yarn nx run mobile-playground:start-android --clean` to clean the previous build and restart.

## Retail RN Experiments

### Setup

- Follow the steps in the Retail RN repo [here](https://github.cbhq.net/consumer/react-native/blob/master/docs/guides/add-an-experiment-or-feature-flag.md)

### Integrate

- Once you have setup the experiment in code, you need to access [Sherlock](https://sherlock.cbhq.net/) with the right permissions/Admin roles (general, engineer, cifer, level_2_support) follow the docs [here](https://github.cbhq.net/consumer/react-native/blob/master/docs/guides/add-an-experiment-or-feature-flag.md#step-1-access-cifer-via-sherlock)
- Now that you have access to Sherlock, you can create tests by following the instructions [here](https://github.cbhq.net/consumer/react-native/blob/master/docs/guides/add-an-experiment-or-feature-flag.md#step-2-create-a-new-experiment)

### Refine

- Find the earliest Retail RN version has your experiment
  - You will need to find the release that has your experiment to refine the test in Sherlock, specifically what is the minimum version to run it on.
  - To do this, look in the [RN repo](https://github.cbhq.net/consumer/react-native) for the latest release and work your way backwards until you see your experiment in the config file [Experiments.tsx](https://github.cbhq.net/consumer/react-native/blob/master/src/packages/app/src/utils/experiments/Experiments.tsx)
- Employee dogfooding
  - To force employees into the control bucket, add them to the treatment group
    ![](https://github.cbhq.net/mono/repo/raw/master/eng/shared/design-system/markdown-images/2021-10-21-11-57-00.png)

### Tips

- Add yourself to the `@rn-release-notifications` slack group for updates on releases
- you can filter down branches of releases by Tags ![](https://github.cbhq.net/mono/repo/raw/master/eng/shared/design-system/markdown-images/2021-10-21-11-52-54.png) ![](https://github.cbhq.net/mono/repo/raw/master/eng/shared/design-system/markdown-images/2021-10-21-11-54-45.png)
- If you know what release your experimentation PR was merged, you can just swap out the version in this GH link to check the experiment config file directly `https://github.cbhq.net/consumer/react-native/blob/release-{MAJOR.MINOR.PATCH}/src/packages/app/src/utils/experiments/Experiments.tsx`
