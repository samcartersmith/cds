# Mobile App

This is a playground for mobile component development. It uses `packages/ui-mobile-playground` to manage the UI components that render the mobile storybook components. This app is primarily expo logic that wraps and renders `ui-mobile-playground` components.

## Setup

1. `yarn install` from root

2. `yarn nx run mobile-app:launch`

3. `yarn nx run mobile-app:start`

### Run the app in the iOS/Android simulator

Press 'i' or 'a' to open iOS or Android simulator respectively.

## Creating a new route

Whenever you want to add a new screen to the mobile-app, you'll need to run this codegen script to generate the new route(s).

```zsh
yarn nx run codegen:mobile-routes
```

## Advanced

<!-- - [How to share your builds with others](./docs/share-builds.md) -->

- [How to generate prebuilds](./docs/prebuilds.md)
- [How to upgrade React Native version](./docs/upgrade-rn.md)
- [How and when to create new mobile build](./docs/building-mobile.md)
- [How to upgrade a native dependency](./docs/upgrading-mobile-dep.md)
- [How to debug failures & common errors](./docs/help.md)
