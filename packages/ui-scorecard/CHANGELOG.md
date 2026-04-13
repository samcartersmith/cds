# Changelog

All notable changes to this project will be documented in this file.

`@cbhq/ui-scorecard` adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- template-start -->

## 0.2.9 (4/7/2026 PST)

#### 🚀 Updates

- Add new executor for running CDS eslint metrics. [[#4253](https://github.cbhq.net/frontend/cds/pull/4253)]

## 0.2.8 (7/8/2025 PST)

#### 🐞 Fixes

- Add force send call for a11y scores metrics. [[#4140](https://github.cbhq.net/frontend/cds/pull/4140)]

## 0.2.7 (5/30/2025 PST)

#### 🐞 Fixes

- Update path used in executors.json file. [[#4044](https://github.cbhq.net/frontend/cds/pull/4044)]

## 0.2.6 (5/29/2025 PST)

#### 🐞 Fixes

- Add executors.json file to exports. [[#4041](https://github.cbhq.net/frontend/cds/pull/4041)]

## 0.2.5 (5/15/2025 PST)

#### 🚀 Updates

- Log metric data for a11y scores to Datadog. [[#4029](https://github.cbhq.net/frontend/cds/pull/4029)]

## 0.2.4 (3/26/2025 PST)

#### 🐞 Fixes

- Remove @cbhq/jest-preset-mobile. [[#3738](https://github.cbhq.net/frontend/cds/pull/3738)]

## 0.2.3 (3/14/2025 PST)

#### 🐞 Fixes

- Formatting and linting. [[#3735](https://github.cbhq.net/frontend/cds/pull/3735)]

## 0.2.2 (1/28/2025 PST)

#### 🐞 Fixes

- Update to Nx 21. [[#3527](https://github.cbhq.net/frontend/cds/pull/3527)]

## 0.2.1 (12/10/2024 PST)

#### 🐞 Fixes

- Upgrade TypeScript to 5.7.2. [[#3458](https://github.cbhq.net/frontend/cds/pull/3458)]

## 0.2.0 (11/7/2024 PST)

#### 💥 Breaking

- Release CDS v7. [Read more here](https://cds.cbhq.net/blog/cds-v7) [[#3389](https://github.cbhq.net/frontend/cds/pull/3389)]

## 0.2.0-rc.0 (11/4/2024 PST)

#### 💥 Breaking

- Release CDS v7 rc 0. [[#3360](https://github.cbhq.net/frontend/cds/pull/3360)]

#### 📘 Misc

- Fix package.json node engine version. [[#3233](https://github.cbhq.net/frontend/cds/pull/3233)]

#### 📘 Misc

- Upgrade to Node 20. [[#3230](https://github.cbhq.net/frontend/cds/pull/3230)] [[DX-4205](https://jira.coinbase-corp.com/browse/DX-4205)]

#### 📘 Misc

- Remove unused s3 folder in ui-scorecard package. [[#2762](https://github.cbhq.net/frontend/cds/pull/2762)]

## 0.1.13 (2/2/2024 PST)

#### 🐞 Fixes

- Rename duplicate platform property to platformType. [[#2708](https://github.cbhq.net/frontend/cds/pull/2708)]

## 0.1.12 (2/1/2024 PST)

#### 🚀 Updates

- Added web a11y support with jest-axe. [[#2663](https://github.cbhq.net/frontend/cds/pull/2663)] [[DX-3034](https://jira.coinbase-corp.com/browse/DX-3034)]

## 0.1.11 (11/29/2023 PST)

#### 🐞 Fixes

- Handle filtering edgecases for total component calculations. [[#2490](https://github.cbhq.net/frontend/cds/pull/2490)]

## 0.1.10 (11/10/2023 PST)

#### 🐞 Fixes

- Fix jestScore to log correct value to snowflake.

## 0.1.9 (11/3/2023 PST)

#### 🐞 Fixes

- Resolve the codeOwnerFilePath relative to the current working directory in a11y FileParser. [[#2427](https://github.cbhq.net/frontend/cds/pull/2427)]

## 0.1.8 (10/30/2023 PST)

#### 🚀 Updates

- Add multiple a11y score reports and modify audit. [[#2289](https://github.cbhq.net/frontend/cds/pull/2289)] [[DX-2024](https://jira.coinbase-corp.com/browse/DX-2024)]

## 0.1.7 (10/27/2023 PST)

#### 🐞 Fixes

- Upgrade client-analytics, and mono-pipeline. [[#2274](https://github.cbhq.net/frontend/cds/pull/2274)]

#### 📘 Misc

- Added tests for a11y engine. [[#2339](https://github.cbhq.net/frontend/cds/pull/2339)] [[DX-2490](https://jira.coinbase-corp.com/browse/DX-2490)]

## 0.1.6 (9/14/2023 PST)

#### 🐞 Fixes

- Updated peer Dep for typescript to 5.2.2.

## 0.1.5 (9/13/2023 PST)

#### 🐞 Fixes

- Track function calls. [[#2253](https://github.cbhq.net/frontend/cds/pull/2253)]

## 0.1.4 (9/11/2023 PST)

#### 🚀 Updates

- Remove running toBeAccessible tests. [[#2248](https://github.cbhq.net/frontend/cds/pull/2248)]
- Log more stats into snowflake. [[#2248](https://github.cbhq.net/frontend/cds/pull/2248)]

#### 🐞 Fixes

- Add try-catch to handle errors. [[#2248](https://github.cbhq.net/frontend/cds/pull/2248)]

#### 📘 Misc

- Update eslint config. [[#2188](https://github.cbhq.net/frontend/cds/pull/2188)]

## 0.1.3 (8/18/2023 PST)

#### 🐞 Fixes

- Use nullish operator. [[#2135](https://github.cbhq.net/frontend/cds/pull/2135)]

## 0.1.2 (8/14/2023 PST)

#### 🐞 Fixes

- Remove depreacted loggingId and update readme. [[#2151](https://github.cbhq.net/frontend/cds/pull/2151)]

## 0.1.1 (6/23/2023 PST)

#### 🐞 Fixes

- Use tsconfig.lib format. [[#2057](https://github.cbhq.net/frontend/cds/pull/2057)] [[DX-1739](https://jira.coinbase-corp.com/browse/DX-1739)]

#### 📘 Misc

- Bump peerDep.

## 0.1.0 (5/25/2023 PST)

#### 🚀 Updates

- Integrate CCA to send automatedA11yScore to Snowflake. [[#2004](https://github.cbhq.net/frontend/cds/pull/2004)] [[CDS-3074](https://jira.coinbase-corp.com/browse/CDS-3074)]

## 0.0.4 (4/5/2023 PST)

#### 🐞 Fixes

- Update dependencies for repo alignment. [[#1894](https://github.cbhq.net/frontend/cds/pull/1894)] [[DX-179](https://jira.coinbase-corp.com/browse/DX-179)]

## 0.0.3

#### 📘 Misc

- Fixed issue with not including certain files in the package.

#### 📘 Misc

- Trying to retrigger artifactory to rebuild this package.
