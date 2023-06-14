# How to Upgrade to Next React Native version

Expo handles react native upgrades through their [SDK](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/). Their SDK will handle updating native modules, as well as recommend native package versions that are compatible with the new react native version. We can stray from their recommendations, but with caution.

1.  Update to the new SDK version

```shell
yarn workspace mobile-app yarn add expo@^48.0.0-beta
```

2. Fixes native and expo dependencies to match recommended versions. You can override versions in package.json after running the fix command.

```shell
yarn workspace mobile-app run npx expo install --fix
```

3. Resolve any errors generated from dependency bumps or the react native upgrade.

```shell
yarn nx run mobile:test
```

4. Generate the new shared, native module builds for everyone to use. Be sure to commit both.

```shell
yarn nx run mobile-app:build:ios-production
yarn nx run mobile-app:build:android-production
```
