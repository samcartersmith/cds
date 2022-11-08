# RN Visreg Testing

Technical Details of [RN Visual Regression Testing](https://docs.google.com/document/d/1PBPVNwj2R0CnxDcxmS7XSN9EtecOqjSYikgKtFHf70I/edit)

React native visual regression tests have two phases:

1. Screenshot collection phase
2. Visual diffing phase

The `Screenshot collection phase` leverages [Detox](https://github.com/wix/Detox) to step through the routes of the mobile playground and collect all of the screenshots.
The `Visual diffing phase` leverages [Percy](https://percy.io/) to compare new screenshots to old ones and confirm if they are unchanged.

These are the most common commands used to run visreg tests locally:

Note: many executors use the e2e naming because we reuse the executors that were originally intended for End to End testing in product apps like retail and wallet. If everything were named properly we would replace the 'e2e' pre and postfixes with 'detox' to be generic for both visreg and e2e.

| Command                                           | Description                                                        |
| ------------------------------------------------- | ------------------------------------------------------------------ |
| yarn nx run mobile-playground:build-ios-e2e       | Build iOS e2e build                                                |
| yarn nx run mobile-playground:ios-e2e             | Run ios e2e visreg tests with a prod build                         |
| yarn nx run mobile-playground:ios-e2e --debug     | Run ios e2e visreg tests in debug mode (metro must be running)     |
| yarn nx run mobile-playground:build-android-e2e   | Build android e2e build                                            |
| yarn nx run mobile-playground:android-e2e         | Run android e2e visreg tests in debug mode                         |
| yarn nx run mobile-playground:android-e2e --debug | Run android e2e visreg tests in debug mode (metro must be running) |

### Visreg in CI

In CI we use the [mobile-cli](https://frontend.cbhq.net/mobile/mobile-cli/what-is-mobile-cli) to save CI time building the native portion of the app. By using the mobile cli we are able to reuse the same native build of the mobile playground for every visreg test step.

The best way to understand how visreg works in CI is by reading the [tools/ci/visreg.sh](/tools/ci/visreg.sh) bash script. It consolidates all related visreg CI logic into a single place. Putting all visreg <> mobile cli logic in the same place allows us to unify on path names and filenames across all code paths of CI visreg testing and making debugging much easier.

## FAQ

What should I do when my feature branch is hanging because of a "Waiting for base build" Status?

- This status indicates that the feature branch is waiting for the visreg build on master to complete so that the feature branch can compare to the latest visual content
- As a result your first step should be to confirm there is in fact something wrong with the build on master
- If there is something wrong with the master build you can bypass this by:
  1. Navigate to the percy project settings
  2. Search for the "Wait for base build" section
  3. Toggle off the switch
  4. Rebuild your feature branch
- Once the next build lands on master please remember to toggle back on the "Wait for base build" setting to ensure latest builds are used for visreg diffing.

![[visreg-wait-for-base-build.png]]
