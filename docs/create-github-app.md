# Creating a NodeJS GitHub App

**IMPORTANT NOTE:** Make sure you are reading the _GitHub Enterprise Server 3.7_ docs for both GitHub Apps and the GitHub REST API. Do NOT use the normal GitHub docs. The URL should always have `enterprise-server@3.7` in it, e.g. `https://docs.github.com/en/enterprise-server@3.7/apps` and not just `https://docs.github.com/en/apps`.

## Table of Contents

1. [Docs Links](#docs-links)
   - [GitHub Enterprise Server 3.7 - GitHub App docs](#github-enterprise-server-37---github-app-docs)
   - [GitHub Enterprise Server 3.7 - GitHub REST API docs](#github-enterprise-server-37---github-rest-api-docs)
   - [GitHub's Octokit npm package docs](#githubs-octokit-npm-package-docs)
2. [About Octokit](#about-octokit)
3. [How to create a NodeJS GitHub App](#how-to-create-a-nodejs-github-app)

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

#### GitHub Enterprise Server 3.7 - GitHub REST API docs

- [GitHub REST API documentation](https://docs.github.com/en/enterprise-server@3.7/rest)
- [GitHub REST API - Permissions required for GitHub Apps](https://docs.github.com/en/enterprise-server@3.7/rest/overview/permissions-required-for-github-apps)
- [GitHub App API](https://docs.github.com/en/enterprise-server@3.7/rest/apps/apps)

#### GitHub's Octokit npm package docs

- [Scripting with the GitHub REST API and JavaScript](https://docs.github.com/en/enterprise-server@3.7/rest/guides/scripting-with-the-rest-api-and-javascript)
- [Octokit features](https://github.com/octokit/octokit.js#features)
- [Octokit `App` client](https://github.com/octokit/octokit.js#app-client)
- [`@octokit/app` API reference](https://github.com/octokit/app.js#readme)

## About Octokit

[Octokit](https://github.com/octokit/octokit.js#features) is the GitHub API's official SDK. The `octokit` npm package combines several core packages for integrating with [different aspects of GitHub's APIs](https://github.com/octokit/octokit.js#readme). It's useful to consult the docs for the individual Octokit packages, such as the [`@octokit/app`](https://github.com/octokit/app.js#readme) package for integrating with GitHub Apps.

## How to create a NodeJS GitHub App

1. Read [_About creating GitHub Apps_](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps).

2. Create a new empty NodeJS package with [`octokit`](https://github.com/octokit/octokit.js) as a dependency and push it to GitHub.

3. Read [_Registering a GitHub App_](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/registering-a-github-app/registering-a-github-app), and consult it while following the rest of these steps.

4. Click the [`New GitHub App`](https://github.cbhq.net/settings/apps/new) button in your [GitHub Developer Settings](https://github.cbhq.net/settings/apps). The options you select here can be changed later.

5. Name your GitHub App. Consider naming it similarly or identically to the package name in step 1. Give your App a description.

6. Set the `Homepage URL` of your App to the NodeJS package's GitHub URL. Optionally set the [`Callback URL`](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/registering-a-github-app/about-the-user-authorization-callback-url).

7. Ensure `Expire user authorization tokens` is enabled for security purposes.

8. Understand what level of authentication your App will require. Read [_About authentication with a GitHub App_](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/authenticating-with-a-github-app/about-authentication-with-a-github-app). There are 3 distinct auth strategies, which can be used individually or concurrently. Your authentication strategies will change based on what your App will do. Also read [_Choosing permissions for a GitHub App_](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app) and see [_Permissions required for GitHub Apps_](https://docs.github.com/en/enterprise-server@3.7/rest/overview/permissions-required-for-github-apps).

9. Optionally configure the following:

- [`Request user authorization (OAuth) during installation`](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [`Post installation`](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/registering-a-github-app/about-the-setup-url)
- [`Webhook`](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/registering-a-github-app/using-webhooks-with-github-apps)
- [`Permissions`](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app)
- [`Subscribe to events` (for Webhooks)](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/registering-a-github-app/using-webhooks-with-github-apps)

8. When configuring Permissions, make sure you give your App the minimum viable set of permissions. You can always change these later, so err on the side of caution! Read [_Best practices for creating a GitHub App_](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/about-creating-github-apps/best-practices-for-creating-a-github-app).

9. For [`Where can this GitHub App be installed?`](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/registering-a-github-app/making-a-github-app-public-or-private), you probably want to allow anyone to install it.

10. Click the `Create GitHub App` button to finish creating your App. You'll be redirected to the App's summary page. This page contains much of the information you might need when building NodeJS GitHub Apps with `octokit`, such as the `App ID`, `Client ID`, `Client Secrets`, etc.

11. After creating the App, you'll need to install it somewhere. GitHub Apps can be installed on a user's profile, or on an individual repo. Read [_About using GitHub Apps_](https://docs.github.com/en/enterprise-server@3.7/apps/using-github-apps/about-using-github-apps).

12. Go program your app. Read [_About writing code for a GitHub App_](https://docs.github.com/en/enterprise-server@3.7/apps/creating-github-apps/writing-code-for-a-github-app/about-writing-code-for-a-github-app). Understand that GitHub doesn't handle actually deploying and running your app's code. You will need to deploy and run your Node app somewhere, such as an AWS Lambda or EC2 instance.
