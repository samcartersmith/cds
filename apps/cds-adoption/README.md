# cds-figma-asset-sync

**IMPORTANT NOTE:** Make sure you are reading the _GitHub Enterprise Server 3.7_ docs for both GitHub Apps and the GitHub REST API. Do NOT use the normal GitHub docs. The URL should always have `enterprise-server@3.7` in it, e.g. `https://docs.github.com/en/enterprise-server@3.7/apps` and not just `https://docs.github.com/en/apps`.

## Docs Links

#### GitHub Enterprise Server 3.7 - GitHub App docs

- [GitHub Apps overview](https://docs.github.com/en/enterprise-server@3.7/apps/overview)
- [About creating GitHub Apps](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps)
- [Registering a GitHub App](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/registering-a-github-app/registering-a-github-app)
- [Best practices for creating a GitHub App](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/about-creating-github-apps/best-practices-for-creating-a-github-app)
- [About authentication with a GitHub App](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/authenticating-with-a-github-app/about-authentication-with-a-github-app)
- [Choosing permissions for a GitHub App](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app)
- [GitHub REST API - Permissions required for GitHub Apps](https://docs.github.com/en/enterprise-server@3.7/rest/overview/permissions-required-for-github-apps)
- [About using GitHub Apps](https://docs.github.com/en/enterprise-server@3.7/apps/using-github-apps/about-using-github-apps)
- [About writing code for a GitHub App](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/writing-code-for-a-github-app/about-writing-code-for-a-github-app)

#### GitHub REST API docs

- [GitHub REST API documentation](https://docs.github.com/en/enterprise-server@3.7/rest)
- [GitHub REST API - Permissions required for GitHub Apps](https://docs.github.com/en/enterprise-server@3.7/rest/overview/permissions-required-for-github-apps)
- [GitHub App API](https://docs.github.com/en/enterprise-server@3.7/rest/apps/apps)

#### GitHub's Octokit npm package docs

- [Scripting with the GitHub REST API and JavaScript](https://docs.github.com/en/enterprise-server@3.7/rest/guides/scripting-with-the-rest-api-and-javascript)
- [Octokit features](https://github.com/octokit/octokit.js#features)
- [Octokit `App` client](https://github.com/octokit/octokit.js#app-client)
- [`@octokit/app` API reference](https://github.com/octokit/app.js#readme)

## About Octokit

[Octokit](https://github.com/octokit/octokit.js#features) is the GitHub API's official SDK. The `octokit` npm package combines several core packages for integrating with [different aspects of GitHub's APIs](https://github.com/octokit/octokit.js#readme). We'll be using the [`@octokit/app`](https://github.com/octokit/app.js#readme) package to integrate with our GitHub App.

## About this GitHub App

This GitHub App is designed to be installed to a specific repo that houses the CDS Figma assets. This App [authenticates as a GitHub App](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app) to access the [GitHub App API](https://docs.github.com/en/enterprise-server@3.7/rest/apps/apps) and as an [individual installation of the app](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation) - as opposed to authenticating on behalf of a user who has the app installed. This normally requires [creating a JWT](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-json-web-token-jwt-for-a-github-app), but the `octokit` npm package handles creating a JWT for us. We have to [create a private key](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/authenticating-with-a-github-app/managing-private-keys-for-github-apps) and pass it to the Octokit `App` client on initialization, so that Octokit can create the JWT.

## How it works

This is the flow the code goes through on startup:

1. If there are open PRs in the repo, stop running
2. Reset the log files and temp directory
3. Clone the repo if it doesn't exist locally
4. Pull the master branch
5. Download Figma assets to a temp directory
6. Diff the downloaded assets against the source assets in git
7. If there are changes, check out a new branch
8. Run any necessary scripts on the changed assets
9. If there are open PRs in the repo, stop running
10. Commit changed assets and push the branch
11. Create a PR
12. Checkout master

## Configuration

The [`./src/config.ts`](./src/config.ts) file must be configured for the Figma assets git repo.

## Error messages

- `RequestError [HttpError]: Resource not accessible by integration` - This means the GitHub App doesn't have the correct permission settings to access an API. **You must uninstall and reinstall the GitHub App to wherever it's installed any time you change permissions.**
