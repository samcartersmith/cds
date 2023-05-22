# Changelog

All notable changes to this project will be documented in this file.

`@cbhq/ui-mobile-playground` adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- template-start -->

## Unreleased

#### 📘 Misc

- **[Visreg]** Upgrade Visreg iOS device to iPhone 14. [[#1997](https://github.cbhq.net/frontend/cds/pull/1997)] [[DX-1440](https://jira.coinbase-corp.com/browse/DX-1440)]

## 0.3.7 (4/5/2023 PST)

#### 🐞 Fixes

- Update dependencies for repo alignment. [[#1894](https://github.cbhq.net/frontend/cds/pull/1894)] [[DX-179](https://jira.coinbase-corp.com/browse/DX-179)]

## 0.3.6 (4/3/2023 PST)

#### 🐞 Fixes

- Upgrade to Jest 29 and Detox 19.12.6. [[#1883](https://github.cbhq.net/frontend/cds/pull/1883)] [[DX-729](https://jira.coinbase-corp.com/browse/DX-729)]

## 0.3.5 (11/7/2022 PST)

#### 🐞 Fixes

- Simplify parallelization logic and reload logic. Decouple reload react native from package.

## 0.3.4 (9/8/2022 PST)

#### 🚀 Updates

- Improve dep structure to be compatible with wallet. [[#1072](https://github.cbhq.net/frontend/cds/pull/1072)]

## 0.3.3 (9/6/2022 PST)

#### 🚀 Updates

- Make imports correct, now can import directly to /visreg path for tests. This is a breaking change but not incrementing because in alpha. [[#1063](https://github.cbhq.net/frontend/cds/pull/1063)]

## 0.3.2 (8/31/2022 PST)

#### 🚀 Updates

- Add visreg to package. Leaving as non-breaking because no true consumers yet.
