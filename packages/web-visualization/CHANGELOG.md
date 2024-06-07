# Changelog

All notable changes to this project will be documented in this file.

`@cbhq/cds-web-visualization` adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- template-start -->

## 1.1.0 (6/7/2024 PST)

#### 🚀 Updates

- Display hover price on scrubbing. [[#2971](https://github.cbhq.net/frontend/cds/pull/2971)] [[DX-3674](https://jira.coinbase-corp.com/browse/DX-3674)]

## 1.0.2 (4/30/2024 PST)

#### 🐞 Fixes

- Fix sparkline bottom overflow. [[#2982](https://github.cbhq.net/frontend/cds/pull/2982)] [[DX-3658](https://jira.coinbase-corp.com/browse/DX-3658)]

## 1.0.1 (4/19/2024 PST)

#### 🐞 Fixes

- Fix replace clean id logic for sparkline gradient. [[#2947](https://github.cbhq.net/frontend/cds/pull/2947)] [[DX-3619](https://jira.coinbase-corp.com/browse/DX-3619)]

## 1.0.0 (2/23/2024 PST)

#### 💥 Breaking

- CDS 6 release. [[#2779](https://github.cbhq.net/frontend/cds/pull/2779)]

#### 📘 Misc

- **[Sparkline]** Suppress web a11y color contrast errors in web-visualization stories. [[#2736](https://github.cbhq.net/frontend/cds/pull/2736)]

## 0.0.7 (1/23/2024 PST)

#### 🐞 Fixes

- Chore: deprecated VisualizationContainer which was incorrectly decomped.

#### 📘 Misc

- Add missing cds-tasks dev dependency. [[#2364](https://github.cbhq.net/frontend/cds/pull/2364)]

## 0.0.6 (10/20/2023 PST)

#### 🐞 Fixes

- Enforce props alphabetical sorting (react/jsx-sort-props). [[#2349](https://github.cbhq.net/frontend/cds/pull/2349)]

#### 📘 Misc

- Move private packages to libs directory. [[#2320](https://github.cbhq.net/frontend/cds/pull/2320)]

## 0.0.5 (8/22/2023 PST)

#### 🚀 Updates

- Exposed package version via `import { version } from '@cbhq/cds-web-visualization/version'`. [[#2175](https://github.cbhq.net/frontend/cds/pull/2175)]

## 0.0.4 (4/26/2023 PST)

#### 🐞 Fixes

- Export SparklineArea.

#### 📘 Misc

- Move sparkline code into own folder to enable scalability of package.

#### 📘 Misc

- Correct Deployment script and move sparkline code into nested folder to enable package scalability.

#### 📘 Misc

- Test package deployment.
