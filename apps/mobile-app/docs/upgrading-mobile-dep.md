# How to Upgrade a Mobile Dependency

Expo handles react native upgrades through their [SDK](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/). Their SDK will handle updating native modules, as well as recommend native package versions that are compatible with the new react native version.

Check out this doc [for more about mobile builds in general](./building-mobile.md)

**We can stray from their recommendations, but with caution.**

1.  Update to the new package

```shell
yarn workspace mobile-app yarn add <dependency name>@<version>
yarn workspace mobile yarn add <dependency name>@<version>
yarn
```

2. Resolve any errors generated from dependency bumps or the react native upgrade.

```shell
yarn nx run mobile:test
```

3. Test that your applications work locally as expected. You will need to build a new debug build & likely uninstall the previous application and reinstall your new build, following [setup instructions](../README.md).

4. Generate the new shared, native module builds for everyone to use in visreg. Be sure to commit both. This step is vital since visreg uses these builds to compare UI changes.

```shell
yarn nx run mobile-app:build:ios-production
yarn nx run mobile-app:build:android-production
```
