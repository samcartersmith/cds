# @cbhq/cds-utils

> [NPM registry](https://registry-npm.cbhq.net/-/web/detail/@cbhq/cds-utils)

All notable changes to this project will be documented in this file.

`@cbhq/cds-utils` adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- template-start -->

## 1.1.2 (4/5/2023 PST)

#### 🐞 Fixes

- Update dependencies for repo alignment. [[#1894](https://github.cbhq.net/frontend/cds/pull/1894)] [[DX-179](https://jira.coinbase-corp.com/browse/DX-179)]

## 1.1.1 (2/8/2023, 01:59 PM PST)

#### 🐞 Fixes

- Upgrade ESLint and disable new rules to enable parallel eslint updates. [#1557](https://github.cbhq.net/frontend/cds/pull/1557)

#### 📘 Misc

- Run yarn nx repair on master. [#1564](https://github.cbhq.net/frontend/cds/pull/1564)
- **[deps]** Upgrade NX to later version of 15, mono-\*, babel,. [#1542](https://github.cbhq.net/frontend/cds/pull/1542)
- **[upgrade deps]** Upgrade NX from v14 to v15. [#1334](https://github.cbhq.net/frontend/cds/pull/1334)
- Unify babel configurations across all packages. [#1304](https://github.cbhq.net/frontend/cds/pull/1304), [CDS-2577](https://jira.coinbase-corp.com/browse/CDS-2577)
- Remove root level jest config and preset. [#1133](https://github.cbhq.net/frontend/cds/pull/1133)
- Remove yarn scripts in favor of nx commands. [#1125](https://github.cbhq.net/frontend/cds/pull/1125)
- Use mono-tasks when possible. [#1075](https://github.cbhq.net/frontend/cds/pull/1075)

## 1.1.0 (6/30/2022, 01:09 PM PST)

#### 🐞 Fixes

- **[Tag]** Extend all Box props for Tag. [#694](https://github.cbhq.net/frontend/cds/pull/694)

## 1.0.0 (6/22/2022, 09:55 PM PST)

#### 🚀 Updates

- Formatting fixes and adding it to pipeline script. [#227](https://github.cbhq.net/frontend/cds/pull/227)

#### 🐞 Fixes

- Block imports from current package. [#288](https://github.cbhq.net/frontend/cds/pull/288)

#### 📘 Misc

- Add typescript paths to suppot package auto complete. [#259](https://github.cbhq.net/frontend/cds/pull/259)
- Add env checks to prevent errors in SSR for website. [#242](https://github.cbhq.net/frontend/cds/pull/242), [CDS-1850](https://jira.coinbase-corp.com/browse/CDS-1850)
- Fix items in CHANGELOG that has incorrect formats. [#210](https://github.cbhq.net/frontend/cds/pull/210)
- Fix figma access token error. [#198](https://github.cbhq.net/frontend/cds/pull/198)
- Downgrade storybook to fix percy. [#196](https://github.cbhq.net/frontend/cds/pull/196)

## 0.4.1 (6/8/2022, 01:19 PM PST)

#### 🐞 Fixes

- **[illustrations]** Publish 06/08/22 [mm/dd/yy] Illo. [#627](https://github.cbhq.net/frontend/cds/pull/627)

## 0.4.0 (5/17/2022, 01:24 PM PST)

#### 📘 Misc

- Cds-tools as workspace package and simplify setup script. [#358](https://github.cbhq.net/frontend/cds/pull/358)

## 0.3.7 (5/5/2022, 01:35 PM PST)

#### 🐞 Fixes

- Block imports from current package. [#288](https://github.cbhq.net/frontend/cds/pull/288)

#### 📘 Misc

- Add typescript paths to suppot package auto complete. [#259](https://github.cbhq.net/frontend/cds/pull/259)
- Add env checks to prevent errors in SSR for website. [#242](https://github.cbhq.net/frontend/cds/pull/242), [CDS-1850](https://jira.coinbase-corp.com/browse/CDS-1850)

## 0.3.6 (4/12/2022, 03:01 PM PST)

#### 🚀 Updates

- Formatting fixes and adding it to pipeline script. [#227](https://github.cbhq.net/frontend/cds/pull/227)

#### 📘 Misc

- Fix items in CHANGELOG that has incorrect formats. [#210](https://github.cbhq.net/frontend/cds/pull/210)
- Fix figma access token error. [#198](https://github.cbhq.net/frontend/cds/pull/198)
- Downgrade storybook to fix percy. [#196](https://github.cbhq.net/frontend/cds/pull/196)

## 0.3.5 (4/6/2022, 10:44 AM PST)

#### 🚀 Updates

- **[UserSwitcher]** add tuple type to cell priority. [#179](https://github.cbhq.net/frontend/cds/pull/179), [CDS-2224](https://jira.coinbase-corp.com/browse/CDS-2224)

#### 🐞 Fixes

- **[prettier]** Re-run prettier format. [#171](https://github.cbhq.net/frontend/cds/pull/171)

#### 📘 Misc

- Remove yarn setup from Dockerfiles. [#67](https://github.cbhq.net/frontend/cds/pull/67)
- Yarn commands and readme update. [#65](https://github.cbhq.net/frontend/cds/pull/65)

## 0.3.4 (3/14/2022, 08:37 AM PST)

#### 🐞 Fixes

- Web release build errors. [#63](https://github.cbhq.net/frontend/cds/pull/63)

#### 📘 Misc

- Fix codegen scripts. Port contributing to codegen. [#43](https://github.cbhq.net/frontend/cds/pull/43)

## 0.3.3 (3/10/2022, 03:34 PM PST)

#### 📘 Misc

- Move existing code into new repo. [#38](https://github.cbhq.net/frontend/cds/pull/38)

## 0.3.2 (2/3/2022, 01:35 PM PST)

#### 🐞 Fixes

- Add snake_case util to string utils. [#52248](https://github.cbhq.net/mono/repo/pull/52248)

## 0.3.1 (1/27/2022, 08:20 AM PST)

#### 🚀 Updates

- Import re-order to trigger cds-utils release. [#50359](https://github.cbhq.net/mono/repo/pull/50359)

## 0.3.0 (1/12/2022, 05:27 AM PST)

#### 💥 Breaking

- **[Illustration]** Refactor Illustration to single HOC and remove width & height props. [#48247](https://github.cbhq.net/mono/repo/pull/48247)

## 0.2.15 (1/10/2022, 12:32 PM PST)

#### 🐞 Fixes

- Process.env checks to ensure process is available. [#47988](https://github.cbhq.net/mono/repo/pull/47988), [CDS-1850](https://jira.coinbase-corp.com/browse/CDS-1850)

## 0.2.14 (11/18/2021, 04:59 PM PST)

#### 🚀 Updates

- Frontier palette changes. [#42588](https://github.cbhq.net/mono/repo/pull/42588), [CDS-1736](https://jira.coinbase-corp.com/browse/CDS-1736)

## 0.2.13 (10/27/2021, 10:02 AM PST)

#### 🐞 Fixes

- Replace uuid package with util. [#39464](https://github.cbhq.net/mono/repo/pull/39464)

## 0.2.12 (10/14/2021, 09:56 AM PST)

#### 🐞 Fixes

- PublishConfig registry. [#37972](https://github.cbhq.net/mono/repo/pull/37972)

## 0.2.10 (10/11/2021, 04:48 PM PST)

#### 🐞 Fixes

- Bump all versions.

## 0.2.8 (10/5/2021, 12:35 PM PST)

#### 🐞 Fixes

- Add excludes to all project refs. [#36404](https://github.cbhq.net/mono/repo/pull/36404)
- Enable TS project refs for shared code. [#35462](https://github.cbhq.net/mono/repo/pull/35462), [MONOFE-82](https://jira.coinbase-corp.com/browse/MONOFE-82)

## 0.2.7 (9/20/2021, 05:13 PM PST)

#### 🐞 Fixes

- Migrate CDS/2FA to new yarn link package structure. [#33903](https://github.cbhq.net/mono/repo/pull/33903), [MONOFE-76](https://jira.coinbase-corp.com/browse/MONOFE-76)

#### 📘 Misc

- Use new linting, so its faster. [#33221](https://github.cbhq.net/mono/repo/pull/33221)

## 0.2.6 (8/4/2021, 12:37 PM PST)

#### 🚀 Updates

- Enable TypeScript ESLint rules. [#27666](https://github.cbhq.net/mono/repo/pull/27666)

#### 📘 Misc

- Add CHANGELOG for packages to CDS website. [#27210](https://github.cbhq.net/mono/repo/pull/27210), [CDS-765](https://jira.coinbase-corp.com/browse/CDS-765)

## 0.2.5 (7/21/2021, 04:37 PM PST)

#### 🚀 Updates

- Enable all `trailingCommas` for Prettier config. [#26673](https://github.cbhq.net/mono/repo/pull/26673)

## 0.2.4 (7/20/2021, 12:24 PM PST)

#### 🐞 Fixes

- Normalize JS testing/linting Bazel macros. [#26432](https://github.cbhq.net/mono/repo/pull/26432)

## 0.2.3 (7/2/2021, 10:29 AM PST)

#### 🐞 Fixes

- Support data in `eslint_fix` and `eslint_test`. [#25346](https://github.cbhq.net/mono/repo/pull/25346)

#### 📘 Misc

- Apply new ESLint rules to CDS. [#25195](https://github.cbhq.net/mono/repo/pull/25195)

## 0.2.2 (5/17/2021, 05:38 PM PST)

#### 🚀 Updates

- NavigationIcon component release. [#20144](https://github.cbhq.net/mono/repo/pull/20144)

#### 🐞 Fixes

- NavigationIcon Component for Mobile. [#20053](https://github.cbhq.net/mono/repo/pull/20053), [CDS-249](https://jira.coinbase-corp.com/browse/CDS-249)

## 0.2.1 (5/13/2021, 06:16 PM PST)

#### 🐞 Fixes

- NavigationIcon Component for Mobile. [#20053](https://github.cbhq.net/mono/repo/pull/20053), [CDS-249](https://jira.coinbase-corp.com/browse/CDS-249)

## 0.2.0 (5/12/2021, 04:45 PM PST)

#### 💥 Breaking

- Move color utils to common and unify web/mobile. [#19738](https://github.cbhq.net/mono/repo/pull/19738), [CDS-529](https://jira.coinbase-corp.com/browse/CDS-529)

## 0.1.6 (4/21/2021, 08:32 AM PST)

#### 🐞 Fixes

- Initial tech debt pass [#17863](https://github.cbhq.net/mono/repo/pull/17863)

## 0.1.5 (4/7/2021, 07:52 PM PST)

#### 🚀 Updates

- Add StatusBar and AndroidNavigationBar to cds-mobile @katherinemartinez [#16898](https://github.cbhq.net/mono/repo/pull/16898), [CDS-377](https://jira.coinbase-corp.com/browse/CDS-377)

#### 📘 Misc

- update codegen styles and web styles @hannah-jin [#15564](https://github.cbhq.net/mono/repo/pull/15564)

## 0.1.4 (3/20/2021, 03:59 PM PST)

#### 🐞 Fixes

- OverflowGradient start value to pull from background palette @katherinemartinez [#15424](https://github.cbhq.net/mono/repo/pull/15424)

## 0.1.3 (3/16/2021, 09:56 AM PST)

#### 🐞 Fixes

- Remove release sha. @miles-johnson

## 0.1.2 (3/12/2021, 11:07 AM PST)

#### 📘 Misc

- Infer changelog entries from git commit messages. @miles-johnson [#14772](https://github.cbhq.net/mono/repo/pull/14772)

## 0.1.1 (3/11/2021, 09:50 AM PST)

#### 🐞 Fixes

- Improve browser build targets @miles-johnson

## 0.1.0 (3/8/2021, 11:49 AM PST)

#### 💥 Breaking

- Update NPM package to be deep importable (no lib/esm folders) @miles-johnson [#14059](https://github.cbhq.net/mono/repo/pull/14059)

## 0.0.9 (3/2/2021, 11:27 AM PST) [#13944](https://github.cbhq.net/mono/repo/pull/13944)

#### 🐞 Fixes

- Move isSSR, isBrowser, and noop functions to web package @katherinemartinez [#13944](https://github.cbhq.net/mono/repo/pull/13944)

## 0.0.8 (3/2/2021, 07:04 AM PST) [#13912](https://github.cbhq.net/mono/repo/pull/13912)

#### 🚀 Updates

- Add isSSR, isBrowser, and noop functions @katherinemartinez [#13719](https://github.cbhq.net/mono/repo/pull/13719)

## 0.0.7 (2/23/2021, 09:30 AM PST) [#13402](https://github.cbhq.net/mono/repo/pull/13402)

#### 🚀 Updates

- Add arrayToObject @katherinemartinez [#12937](https://github.cbhq.net/mono/repo/pull/12937)

## 0.0.6 (2/10/2021, 10:30 AM PST) [#12628](https://github.cbhq.net/mono/repo/pull/12628)

#### 🚀 Updates

- Add color utils @katherinemartinez [#12628](https://github.cbhq.net/mono/repo/pull/12628)

## 0.0.5 (2/9/2021, 03:30 PM PST) [#12583](https://github.cbhq.net/mono/repo/pull/12583)

#### 🚀 Updates

- Add CommonJS build alongside ESM @miles-johnson [#12570](https://github.cbhq.net/mono/repo/pull/12570)

## 0.0.4 (1/25/2021 3:30pm PST) [#11711](https://github.cbhq.net/mono/repo/pull/11711)

#### 🐞 Fixes

- Update dependencies in package.json by @katherinemartinez [#11711](https://github.cbhq.net/mono/repo/pull/11711)

## 0.0.3 (1/19/2021 12:15pm PST) [#11421](https://github.cbhq.net/mono/repo/pull/11421)

#### 🚀 Updates

- Initial array, object, and string helpers by @katherinemartinez
