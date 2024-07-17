/**
* DO NOT MODIFY
* Generated from yarn nx run website:a11y-lint-tracker
*/
export const a11yLintRepos = [
  {
    "id": "wallet-wallet-mobile",
    "name": "Wallet Repo",
    "repo": "wallet/wallet-mobile",
    "workspaceDir": "workspaces",
    "targetProjects": [
      {
        "name": "rn",
        "repoType": "mobile",
        "projectPath": "apps/rn"
      },
      {
        "name": "ext",
        "repoType": "web",
        "projectPath": "apps/extension"
      }
    ],
    "repoType": "complex",
    "codeownersUrl": "./CODEOWNERS"
  },
  {
    "id": "consumer-react-native",
    "name": "React Mobile",
    "repo": "consumer/react-native",
    "repoType": "mobile",
    "codeownersUrl": "./.github/CODEOWNERS"
  },
  {
    "id": "frontend-coinbase-www",
    "name": "Retail Web",
    "repo": "frontend/coinbase-www",
    "repoType": "web",
    "codeownersUrl": "./.github/CODEOWNERS"
  }
];
