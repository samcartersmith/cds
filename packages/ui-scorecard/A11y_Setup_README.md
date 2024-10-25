# A11y Quick Start

## Getting Started

### Installation and Configuration

For installation steps, follow [A11y_Executor_README](./A11y_Executor_README.md#installation) and this [setup testing documentation](https://docs.google.com/document/d/1fCmteNp_ZEWoMxi74YZnbvhGV3CnZjUlWzAeF-9_1Sk/edit?usp=sharing).

For specific file path setup and categorization of a11y score by CODEOWNER, add the following to your `project.json`:

- **targetPath** [optional]: the specific path that you want to parse within your CODEOWNERS file
- **codeOwnerFilePath** [optional]: path to your CODEOWNERS file
- **platform** [required]: the platform type of your repo: web or mobile

Sample CODEOWNERS file:

```
# CODE OWNERS TEST FILE
# USING CDS REPO

# FROM TEST 1
packages/mobile/buttons/ @test/buttontest

# FROM TEST 2
packages/mobile/banner/ @test/bannertest
```

```json
{
  // …
  “targets”: {
    // …
    "audit-a11y": {
      "executor": "@cbhq/ui-scorecard:audit-a11y",
      "options": {
        "eventProjectName": "consumer_onboarding",
        "targetPath": "/src/packages/onboarding/",
        "codeOwnerFilePath": ".github/CODEOWNERS",
        "platform": "mobile"
      },
      "dependsOn": [
        "^build",
        "test"
      ]
    },
  }
}
```

#### Project.json Examples:

- Examples in retail: ([snippet](https://github.cbhq.net/consumer/react-native/blob/master/src/packages/app/project.json#L400-L408))
- Example in wallet: ([snippet](https://github.cbhq.net/wallet/wallet-mobile/blob/master/workspaces/apps/rn/project.json#L487-L496))

### Running locally

To run locally, run the following command:

```
yarn nx run <target>:audit-a11y
```

Examples:
retail: run in root

```
yarn nx run retail:audit-retail-a11y
yarn nx run onboarding:audit-a11y
```

wallet: run in /workspaces/

```
 yarn nx run rn:audit-a11y
```

**Tip**:

A recommendation to ensure a faster experience is to first run the test command: `yarn nx run <target>:test` then followed by the a11y command.
Example a11y command: `yarn nx run <target>:a11y-audit`

#### Getting results

To get the output json results, go to the `.nx/outs` directory. Sample output found here: [sample output](https://drive.google.com/drive/folders/1e26_PJUnbTCFert06kUCfiYpQ_OwXp-X)

Note: The sample output is formatted for readability. The actual output file isn't formatted.

### Running locally without params in project.json

We can also run entirely on command line.

```
yarn nx run <targetProject>:audit-a11y --targetPath=<path-string-to-filter-by> --codeOwnerFilePath=<path-to-codeowner-file>x
```

### Testing: Writing a11y tests

Depending on the repo type, there are different ways to test accessibility and write a11y unit tests.

- For `web`, we use jest-axe and write unit tests with `toHaveNoViolations`.
- For `mobile`, we use RNAE and write unit tests with `toBeAccessible`.

#### Testing Strategies

We recommend writing component unit tests first before writing tests for pages.

#### Examples:

**Mobile**

- [RNAE example](https://github.com/aryella-lacerda/react-native-accessibility-engine?tab=readme-ov-file#with-react-elements)
- [CDS Example for mobile](https://github.cbhq.net/frontend/cds/blob/master/packages/mobile/buttons/__tests__/IconButton.test.tsx#L17)
- [consumer/react-native example](https://github.cbhq.net/consumer/react-native/blob/master/libs/react-native-core/components/cells/ConfirmationCell.test.tsx#L34)
- [wallet/wallet-mobile example](https://github.cbhq.net/wallet/wallet-mobile/pull/18495/commits/d6027f675e6210c3b62f1982083c95ac77dcf47c)

**Web**

- [jest-axe example](https://github.com/NickColley/jest-axe?tab=readme-ov-file#usage)
- [CDS Example for web](https://github.cbhq.net/frontend/cds/blob/master/packages/web/buttons/__tests__/AvatarButton.test.tsx#L8)
- [frontend/coinbase-www example](https://github.cbhq.net/frontend/coinbase-www/blob/master/app/src/views/Home/components/TopOfFeed/components/TradeItem.test.tsx#L53-L57)
- [wallet/wallet-mobile example](https://github.cbhq.net/wallet/wallet-mobile/blob/master/workspaces/apps/extension/src/screens/CollectibleDetail/CollectibleButton.test.tsx#L41-L50)
