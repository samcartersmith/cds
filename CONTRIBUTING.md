# Contribute to Coinbase Design System - Web

## Code Generation

Please run codegen before running anything else to create necessary code including icons.

```
make codegen
```

## API Documentation

Web + Mobile documentation is viewed together on our website and we try minimze API deviation. However, there are times when the behavior slightly varies or there is a unique callout we want to make for a specific platform. To accomadate this we use JSDOC tags within API definitions to aid in documentation generation.

- `@default`: Default value of a property
- `@danger`: Property which is used as an escape hatch and is not recommended.
- `@link`: Link to MDN React Native or other documentation which is relevant
- `@experimental`: Experimental/unstable API's
- `@deprecated`: Deprecated API's

If you want to add a custom example or more details for a component you can create a directory in website/docs/components/examples matching the component's name. In that component's directory you can add mdx files for intro.mdx (shown at the very top of page), outro.mdx (at the very bottom of page) or for individual properties. For example, in examples/ThemeProvider we have a spectrum.mdx file with a live code example.

Don't forget to add an index.ts to that component's example directory with exports for any children mdx files. You will also need to add a wildcard export for the directory in website/docs/components/examples/index.ts.

## Create A New Package

1. Run `make new.package name=<package>`.
2. Edit [cds_package.bzl](./cds_package.bzl) `PACKAGES` to include the new package.
3. Check out `<package>/basepackage.json` and `<package>/BUILD.bazel` and make necessary updates.
4. Update `<package>/CHANGELOG.md`.

## Package

To use CDS packages outside of mono/repo, NPM packages are available through the Coinbase's internal NPM registry. Each package includes source TypeScript files for all typings information, and Babel transpiled ES modules at `lib/`. To split up the CSS code, we wrote a custom Babel plugin to take Linaria transpiled styles and put them into `.css` files corresponding to the `.js` files.

### Publishing to the NPM registry

Continuous deploy is turned on for CDS package publishing. If you need to trigger a manual deploy, do the following

1. Run

```bash
ash_login (for dev)
assume-role development eng-ops  (for production)
ash deploy -p eng/shared/design-system/cloud
```

2. Enter the number for the commit/package you want to deploy for prod or development registry

3. Check that the package is published at[development Coinbase NPM registry](https://registry-npm-dev.cbhq.net/) or [production Coinbase NPM registry](https://registry-npm.cbhq.net/). It usually takes about 10 min or so for the package to be uploaded.
## Commit Message Conventions

To ensure the changelog is correctly generated and packages are correctly versioned and released, you must format your _squash_ commit message the following way:

If no jira ticket exists, replace it with 'trivial'
[{jira ticket}] {LogType}: {message}
ex: [trivial] docs: added new feature docs

- breaking - major version bump
- feat, change - minor version bump
- fix, chore, types - patch version bump
- release, internal, docs - noop

[prepareRelease.ts](https://github.cbhq.net/mono/repo/blob/master/eng/shared/design-system/codegen/scripts/prepareRelease.ts#L19)

## Storybook

### Run Storybook Local Dev Server

```bash
make start.story
```

### Build Storybook

```bash
make build.story
```

### Deploy Master Design System

[Master Design System Hosted Link](https://cds-web-storybook.cbhq.net/master/index.html)

```bash
bazel run //eng/shared/design-system/web/cloud:storybook
```

The command builds a production bundle of the storybook, zips it, and uploads the zipped file to S3 through [syn](https://confluence.coinbase-corp.com/display/INFRA/Syn) deploy.

### Deploy Feature Branch

[https://cds-web-storybook.cbhq.net/feature/YOUR_FEATURE_BRANCH_NAME/index.html](https://cds-web-storybook.cbhq.net/feature/YOUR_FEATURE_BRANCH_NAME/index.html)

Configure the url of the hosted feature branch by changing the path for the S3 zip in this file [eng/prime/frontend/cloud/BUILD.bazel](../cloud/BUILD.bazel)

_Don't use any `/` slashes in the feature branch name as it will confuse the HTML path_

```bazel
pkg_zip(
  name = "bundled_storybook_feature",
  srcs = [
      "//eng/shared/design-system/web:storybook",
  ],
  remap_paths = {"{gendir}/eng/shared/design-system/web/storybook": "feature/YOUR_FEATURE_BRANCH_NAME"},
  visibility = ["//visibility:public"],
)
```

```bash
bazel run //eng/shared/design-system/web/cloud:storybook_feature
```

## CDS Website

Our website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

### Local Development

```console
make start.website
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

### Build

```console
make build.website
```

### Serve

```console
ash_login
make serve.website
```

### Deploy

```console
ash_login
make deploy.website
```

### Deploy Dev

```console
make deploy.website-dev
```

## How to auto generate component docs

Once you have built the component for **_both web and mobile_**. You can auto generate the documentation associated with it by following these steps:

1. Update docs for `codegen/website/docgen.ts`. Add the following line to docgen. Replace `<component-name>` with name of your component.

```
{
  dest: `${WEBSITE_COMPONENT_DOCS_DIR}/<component-name>.mdx`,
  data: getDocgenForPackage({ componentName: <component-name> }),
}
```

2. Run `make codegen` in the root of eng/shared/design-system

## Guide for Setting up CDS React Native development environment

This section helps you install and build the CDS React Native app to test components on mobile.

> Note: Run these commands in eng/shared/design-system folder. Also, make sure your fork is up to date with master

### Installing dependencies

You will need the following:

- **Cocoapods**
- **XCode**
- **XCode CLI**
- **Android Studio**
- **Java 8 and the Android SDK**
- **Watchman**

### Cocoapods

[Cocoapods](https://cocoapods.org/) is a Ruby-based dependency manager for Swift and Objective-C projects. After installing an up-to-date version of Ruby and ensuring that it's being targeted (`ruby -v`), run the following to install bundler:

```shell
gem install cocoapods
```

### XCode

[XCode](https://developer.apple.com/xcode/) is an IDE for developing macOS and iOS applications and is necessary for working with React Native. Install it through the [App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12).

#### Xcode Command-line Tools

You'll also need a [family of command-line tools](http://osxdaily.com/2014/02/12/install-command-line-tools-mac-os-x/) that will allow you to leverage some of XCode's functionality from the terminal. Install them by running:

```shell
xcode-select --install
```

### Android Studio

[Android Studio](https://developer.android.com/studio/intro) is an IDE for developing Android applications and is necessary for working with React Native. Download the application from [the Android developer site](https://developer.android.com/studio/install#mac) and follow the install instructions.

#### Java 8 and the Android SDK

[OpenJDK](https://adoptopenjdk.net/index.html) is an open-source implementation of the Java platform and is necessary to develop React Native apps with Android. To install, run the following:

```shell
# Install Java 8
brew tap AdoptOpenJDK/openjdk
brew install --cask adoptopenjdk8

# Note: if you have other versions installed, you'll need to set the default Java on your computer to Java 8
# You can do this by setting JAVA_HOME in your relevant (.zshenv|.zshrc|.bashrc)
# export JAVA_HOME=/Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home

# Install the Android SDK
brew install --cask android-sdk
```

Be sure to follow any post-install instructions that Homebrew provides. If you want to revisit these instructions, run `brew info --cask android-sdk`.

You can verify that OpenJDK has been installed by running `sdkmanager --version`.

Configure the `ANDROID_HOME` environment variable. Add the following lines to your `$HOME/.zshrc` or `$HOME/.bash_profile` config file.

```shell
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Type `source $HOME/.bash_profile` or `source $HOME/.zshrc` to load the config into your current shell. You can verify by running `adb` command.

### Watchman

[Watchman](https://facebook.github.io/watchman/) is a service used by Metro to trigger rebuilds whenever a relevant file changes. To install it, run:

```shell
brew install watchman
```

Be sure to follow any post-install instructions that Homebrew provides. If you want to revisit these instructions, run `brew info watchman`.

### Known issues

> Failed to install the following Android SDK packages as some licences have not been accepted.

- Open Android Studio
- Tools > SDK Manager
- Select the `Android 10.0 (Q)` image, press the Apply button and then follow the instructions. The installer should prompt to accept the license

If the issue persist select the second tab (SDK Tools) and install the missing packages from there.

If you see:

```
xcrun: error: SDK "iphoneos" cannot be located
xcrun: error: SDK "iphoneos" cannot be located
xcrun: error: unable to lookup item 'Path' in SDK 'iphoneos'
```

when running `xcrun -k --sdk iphoneos --show-sdk-path` or when trying to install dependencies, try running `sudo xcode-select --switch /Applications/Xcode.app` (from [this github issue](https://github.com/facebook/react-native/issues/18408#issuecomment-386696744))

> Watchman Permission denied

- Run `yarn start:{app/onboarding/designSystem}` (after `yarn setup:{...}`)
- See the following error:

```
Failed to open {$HOME}/Library/LaunchAgents/com.github.facebook.watchman.plist for write: Permission denied
```

Try running `sudo chown -R $(whoami):staff ~/Library/LaunchAgents` (from [this github issue](https://github.com/facebook/react-native/issues/9116))

### Installation Steps and Build Steps

_Run the following steps in the terminal in this order_

1. `make setup.mobile` (Note: this only need to be ran the 1st time)
2. `make start.mobile`
3. While `make start.mobile` is running in the terminal/shell, run `make build.ios/make build.android` (depends on what mobile OS you want to test) in another terminal

### Troubleshooting Guide

- **Emulator failed to load** Try manually launching the Emulator from terminal. Be sure the emulator also exists in Android Studio's AVD manager.
