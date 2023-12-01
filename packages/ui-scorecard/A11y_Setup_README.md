# A11y Quick Start

## Getting Started

### Installation and Configuration

For installation steps, follow [A11y_Executor_README](./A11y_Executor_README.md#installation).

For specific file path setup and categorization of a11y score by CODEOWNER, add the following to your `project.json`:

- targetPath: the specific path that you want to parse within your CODEOWNERS file
- codeOwnerFilePath: path to your CODEOWNERS file

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
        "codeOwnerFilePath": ".github/CODEOWNERS"
      },
      "dependsOn": [
        "^build",
        "test"
      ]
    },
  }
}
```

#### Examples:

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

#### Getting results

To get the output json results, go to the `.nx/outs` directory. Sample output found here: [sample output](https://drive.google.com/drive/folders/1e26_PJUnbTCFert06kUCfiYpQ_OwXp-X)

Note: The sample output is formatted for readability. The actual output file isn't formatted.

### Running locally without params in project.json

We can also run entirely on command line.

```
yarn nx run <targetProject>:audit-a11y --targetPath=<path-string-to-filter-by> --codeOwnerFilePath=<path-to-codeowner-file>x
```
