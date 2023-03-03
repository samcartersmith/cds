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

_What should I do when my feature branch is hanging because of a "Waiting for base build" status?_

- This status indicates that the feature branch is waiting for the visreg build on master to complete so that the feature branch can compare to the latest visual content
- As a result your first step should be to confirm there is in fact something wrong with the build on master
- If there is something wrong with the master build you can bypass this by:
  1. Navigate to the percy project settings
  2. Search for the "Wait for base build" section
  3. Toggle off the switch
  4. Rebuild your feature branch
- Once the next build lands on master please remember to toggle back on the "Wait for base build" setting to ensure latest builds are used for visreg diffing.

![visreg-wait-for-base-build.png](/docs/visreg-wait-for-base-build.png)

_One of my iOS Visreg jobs keeps hanging and timing out on CI, how do I fix this?_

This is likely occurring because the iPhone simulator that we use for Visreg testing on the `macos-metal` agent has entered some corrupted state, and Detox is unable to properly connect to it. Look for the following errors in the CI logs near the top of the `mobile-playground:ios-e2e` step:

```sh
16:10:56.468 detox[95197] ERROR: Exceeded timeout of 300000ms while handling jest-circus "setup" event
16:10:57.681 detox[95197] INFO:  All Playground Routes is assigned to undefined
```

We haven't been able to identify a root cause for this issue, or even that it's our Visreg testing that's responsible as multiple teams use these agents. But when this occurs, the only resolution we have at the moment is to temporarily take the problematic `macos-metal` agent offline and retry the job, then request a reboot of the agent. Restarting an agent restores it to a fresh state and temporarily resolves this issue. To do this, follow these steps:

1. To stop the agent, first get its id by hovering over the agent info in the job label on CI:

![visreg-macos-metal-id](/docs/visreg-macos-metal-id.png)

2. Navigate to the buildkite `macos-metal` [agent search](https://buildkite.com/organizations/coinbase/agents?q=queue%3Dmacos-metal+hostname%3Dbuildkite-10-246) and append the remaining digits of your agent id (but omitting the last digit) to the search query, like so:

![visreg-macos-metal-search](/docs/visreg-macos-metal-search.png)

- If you can't locate the agent via the search, then it was already stopped or taken offline. In this case, proceed to step 4.

3. Click into the agent and scroll down to the "Stop Agent" button and click it. This will send a signal to the agent to disconnect once it's no longer running any active jobs.
4. Retry the job in CI (just the failed/hanging iOS Visreg job, not the entire build) and check that it's using a different agent now. If your job is still running on the problematic agent, cancel the job first, then manually retry if it doesn't automatically do it for you.
5. **Important:** Post a request in the [#proj-mac-agents](https://coinbase.slack.com/archives/C02GL8LNV1R) Slack channel to request a restart of the agent that you stopped. Failing to do this will result in a decrease of our pool of available `macos-metal` agents, resulting in longer wait times across all teams that use them.
