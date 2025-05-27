# Changelog

## Unreleased

#### 📘 Misc

- Update internal configs. [[#4035](https://github.cbhq.net/frontend/cds/pull/4035)]

## 3.0.0 (5/13/2025 PST)

#### 💥 Breaking

- Upgrade to CDS v8. [[#4023](https://github.cbhq.net/frontend/cds/pull/4023)]

## 2.0.0 (4/15/2025 PST)

#### 💥 Breaking

- web and mobile shareable configs are not using modern _[Flat Config](https://eslint.org/blog/2022/08/new-config-system-part-2/)_
- clients using these shareable configs must [migrate](https://eslint.org/docs/latest/use/configure/migration-guide) their EsLint configs files to the new format or switch to using the `web-legacy`/`mobile-legacy` shareable configs

#### 🚀 Updates

- fix unit tests and enable in CI
- remove unnecessary dependencies

## 0.0.8 (3/14/2025 PST)

#### 🐞 Fixes

- Formatting and linting. [[#3735](https://github.cbhq.net/frontend/cds/pull/3735)]

## 0.0.7 (2/25/2025 PST)

#### 🐞 Fixes

- Add back lint rules for a11y labels needed in SearchInput component.

## 0.0.6 (2/11/2025 PST)

#### 🚀 Updates

- Add suggested fixes to a11y label rules and update concondition for text error icon label. [[#3584](https://github.cbhq.net/frontend/cds/pull/3584)] [[DX-4649](https://jira.coinbase-corp.com/browse/DX-4649)]

## 0.0.5 (12/10/2024 PST)

#### 🐞 Fixes

- Upgrade TypeScript to 5.7.2. [[#3458](https://github.cbhq.net/frontend/cds/pull/3458)]

## 0.0.4 (11/7/2024 PST)

#### 💥 Breaking

- Release CDS v7. [Read more here](https://cds.cbhq.net/blog/cds-v7) [[#3389](https://github.cbhq.net/frontend/cds/pull/3389)]

## 0.0.4-rc.0 (11/4/2024 PST)

#### 💥 Breaking

- Release CDS v7 rc 0. [[#3360](https://github.cbhq.net/frontend/cds/pull/3360)]

## 0.0.3 (9/18/2024 PST)

#### 🐞 Fixes

- Add component import checks before applying rule. [[#3279](https://github.cbhq.net/frontend/cds/pull/3279)] [[DX-4157](https://jira.coinbase-corp.com/browse/DX-4157)]

## 0.0.2 (9/17/2024 PST)

#### 🚀 Updates

- A11y lint enhancements to CDS eslint-plugin. [[#3206](https://github.cbhq.net/frontend/cds/pull/3206)] [[DX-4157](https://jira.coinbase-corp.com/browse/DX-4157)]

## 0.0.1 (6/21/2024 PST)

#### 🚀 Updates

- Setup new a11y cds eslint plugin. [[#3103](https://github.cbhq.net/frontend/cds/pull/3103)]
