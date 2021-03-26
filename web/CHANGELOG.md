# Changelog

All notable changes to this project will be documented in this file.

`@cbhq/cds-web` adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 0.6.0 (3/26/2021, 10:40 AM PST)

#### 💥 Breaking

- CDS Web Icon Migration @jennifer-liu [#15381](https://github.cbhq.net/mono/repo/pull/15381), [CDS-235](https://jira.coinbase-corp.com/browse/CDS-235), [CDS-323](https://jira.coinbase-corp.com/browse/CDS-323)

#### 🐞 Fixes

- Fix type error. @miles-johnson [#15921](https://github.cbhq.net/mono/repo/pull/15921)
- add onPress to Tab component @katherinemartinez [#15838](https://github.cbhq.net/mono/repo/pull/15838)

#### 📘 Misc

- update Spacer implementation and API @hannah-jin [#15857](https://github.cbhq.net/mono/repo/pull/15857), [CDS-308](https://jira.coinbase-corp.com/browse/CDS-308)
- Migrate to `reakit` from `react-aria` @miles-johnson [#15545](https://github.cbhq.net/mono/repo/pull/15545)

## 0.5.1 (3/24/2021, 01:32 PM PST)

#### 🐞 Fixes

- **[Divider]** Fix divider scaling (again). @miles-johnson [#15801](https://github.cbhq.net/mono/repo/pull/15801)

## 0.5.0 (3/23/2021, 06:11 PM PST)

#### 💥 Breaking

- Update button states for mobile. Remove spacing/offset. @miles-johnson [#15731](https://github.cbhq.net/mono/repo/pull/15731)

#### 🚀 Updates

- add focus-visible for keyboard only focus styling @hannah-jin [#15611](https://github.cbhq.net/mono/repo/pull/15611)

#### 🐞 Fixes

- Fix Storybook unknown prop error on Button events @jennifer-liu [#15673](https://github.cbhq.net/mono/repo/pull/15673)
- **[Divider]** Fix vertical divider taking up full height @miles-johnson [#15640](https://github.cbhq.net/mono/repo/pull/15640)
- Add opacity styles to interactable content on web @katherinemartinez [#15638](https://github.cbhq.net/mono/repo/pull/15638)

#### 📘 Misc

- Update util functions and hooks @hannah-jin [#15571](https://github.cbhq.net/mono/repo/pull/15571)
- update codegen styles and web styles @hannah-jin [#15564](https://github.cbhq.net/mono/repo/pull/15564)

## 0.4.5 (3/20/2021, 03:59 PM PST)

#### 🐞 Fixes

- Bring back React imports for CDS. @miles-johnson [#15478](https://github.cbhq.net/mono/repo/pull/15478)
- Migrate to new React v17 JSX imports @miles-johnson [#15248](https://github.cbhq.net/mono/repo/pull/15248), [MONOFE-51](https://jira.coinbase-corp.com/browse/MONOFE-51)

## 0.4.4 (3/18/2021, 08:52 AM PST)

#### 🐞 Fixes

- Added unheartHeavy and shareHeavy icons. @jennifer-liu [#15209](https://github.cbhq.net/mono/repo/pull/15209)

#### 📘 Misc

- Add `Divider` component. @miles-johnson [#15086](https://github.cbhq.net/mono/repo/pull/15086)

## 0.4.3 (3/16/2021, 09:56 AM PST)

#### 🚀 Updates

- Scroll animation for DisplayTitle or DisplayTitle + Tabs variants @katherinemartinez [#14988](https://github.cbhq.net/mono/repo/pull/14988), [CDS-360](https://jira.coinbase-corp.com/browse/CDS-360)
- Add SidebarSection for CDS web navigation @katherinemartinez [#14897](https://github.cbhq.net/mono/repo/pull/14897), [CDS-332](https://jira.coinbase-corp.com/browse/CDS-332)
- Add focus logic and styling to useInteractable @katherinemartinez [#14895](https://github.cbhq.net/mono/repo/pull/14895), [CDS-365](https://jira.coinbase-corp.com/browse/CDS-365)
- add LogoMark and LogoWordmark for web and mobile @katherinemartinez [#14892](https://github.cbhq.net/mono/repo/pull/14892), [CDS-327](https://jira.coinbase-corp.com/browse/CDS-327)

#### 🐞 Fixes

- Remove release sha. @miles-johnson
- Spelling in logo title @katherinemartinez [#14935](https://github.cbhq.net/mono/repo/pull/14935)
- fix - vertical padding and nowrap for button @katherinemartinez [#14856](https://github.cbhq.net/mono/repo/pull/14856)

## 0.4.2 (3/12/2021, 11:07 AM PST)

#### 🚀 Updates

- Add Badge component to CDS web and mobile @katherinemartinez [#14825](https://github.cbhq.net/mono/repo/pull/14825), [CDS-250](https://jira.coinbase-corp.com/browse/CDS-250)
- Add Tabs for web navigation @katherinemartinez [#14792](https://github.cbhq.net/mono/repo/pull/14792), [CDS-321](https://jira.coinbase-corp.com/browse/CDS-321)
- Update Navigation props @katherinemartinez [#14664](https://github.cbhq.net/mono/repo/pull/14664)
- **[Button]** Update compact primary to have a solid blue background @miles-johnson [#14721](https://github.cbhq.net/mono/repo/pull/14721)

#### 🐞 Fixes

- Update doubeChevron mispelling in icons @katherinemartinez [#14815](https://github.cbhq.net/mono/repo/pull/14815)
- Update manifest and changelog. @jennifer-liu [#14114](https://github.cbhq.net/mono/repo/pull/14114)
- Deprecate old interactable @katherinemartinez [#14739](https://github.cbhq.net/mono/repo/pull/14739)

#### 📘 Misc

- Infer changelog entries from git commit messages. @miles-johnson [#14772](https://github.cbhq.net/mono/repo/pull/14772)

## 0.4.1 (3/11/2021, 09:50 AM PST)

#### 🚀 Updates

- Add useDimensions hook @katherinemartinez [#14587](https://github.cbhq.net/mono/repo/pull/14587)
- Have tokens.ts codegenerated. Add new useInteractable hook to buttons @katherinemartinez [#14548](https://github.cbhq.net/mono/repo/pull/14548)

#### 🐞 Fixes

- Improve browser build targets @miles-johnson

## 0.4.0 (3/8/2021, 11:49 AM PST)

#### 💥 Breaking

- Update NPM package to be deep importable (no lib/esm folders) @miles-johnson [#14059](https://github.cbhq.net/mono/repo/pull/14059)

## 0.3.2 (3/4/2021, 07:31 AM PST) [#14145](https://github.cbhq.net/mono/repo/pull/14145)

#### 🚀 Updates

- Add `Navigation`, `Sidebar`, `Navbar`, `Logo` & `IconButton` components @katherinemartinez [#13998](https://github.cbhq.net/mono/repo/pull/13998)
- Add `Tooltip` component @miles-johnson [#13958](https://github.cbhq.net/mono/repo/pull/13958)
- Add useFlexStyles and useBorderStyles @katherinemartinez [#13892](https://github.cbhq.net/mono/repo/pull/13892)

#### 🐞 Fixes

- Tabular number CSS property is wrong @hannah-jin [#14003](https://github.cbhq.net/mono/repo/pull/14003)

## 0.3.1 (3/2/2021, 11:33 AM PST) [#13944](https://github.cbhq.net/mono/repo/pull/13944)

#### 🚀 Updates

- Add isSSR and isBrowser functions @katherinemartinez [#13944](https://github.cbhq.net/mono/repo/pull/13944)

## 0.3.0 (3/2/2021, 07:04 AM PST) [#13912](https://github.cbhq.net/mono/repo/pull/13912)

#### 💥 Breaking

- Replaced `Interactable` component with a `useInteractable` hook. @miles-johnson [#13838](https://github.cbhq.net/mono/repo/pull/13838)
- Rename palette alias divider to line and stroke to lineHeavy @katherinemartinez [#13797](https://github.cbhq.net/mono/repo/pull/13797)

#### 🚀 Updates

- Add `accessibilityLabel` prop to buttons. @miles-johnson [#13838](https://github.cbhq.net/mono/repo/pull/13838)
- Add Spacer component @katherinemartinez [#13719](https://github.cbhq.net/mono/repo/pull/13719)
- Add LottieStatusAnimation component @katherinemartinez [#13719](https://github.cbhq.net/mono/repo/pull/13719)

## 0.2.0 (2/25/2021, 05:22 PM PST) [#13493](https://github.cbhq.net/mono/repo/pull/13493)

#### 💥 Breaking

- Removed `Offset` component @miles-johnson [#13677](https://github.cbhq.net/mono/repo/pull/13677)

#### 🚀 Updates

- Make second argument for useIconSize optional @katherinemartinez [#13493](https://github.cbhq.net/mono/repo/pull/13493)
- Add offset props to `Box` component @miles-johnson [#13677](https://github.cbhq.net/mono/repo/pull/13677)
- Add Lottie component @katherinemartinez [#13040](https://github.cbhq.net/mono/repo/pull/13040)

## 0.1.0 (2/25/2021, 11:42 AM PST) [#13638](https://github.cbhq.net/mono/repo/pull/13638)

#### 💥 Breaking

- Update some icon names to drop Heavy and add pay icon @katherinemartinez [#13638](https://github.cbhq.net/mono/repo/pull/13638)

## 0.0.5 (2/23/2021, 09:30 AM PST) [#13402](https://github.cbhq.net/mono/repo/pull/13402)

#### 🚀 Updates

- Add Icon component @katherinemartinez [#13324](https://github.cbhq.net/mono/repo/pull/13324)
- Add `HStack` and `VStack` components [#12758](https://github.cbhq.net/mono/repo/pull/12758)
- Add `pin` prop to `Box` component [#13116](https://github.cbhq.net/mono/repo/pull/13116)

## 0.0.4 (2/9/2021, 03:30 PM PST) [#12583](https://github.cbhq.net/mono/repo/pull/12583)

#### 🚀 Updates

- Add CommonJS build alongside ESM @miles-johnson [#12570](https://github.cbhq.net/mono/repo/pull/12570)

## 0.0.3 (2/8/2021, 6:21 PM PST) [#12504](https://github.cbhq.net/mono/repo/pull/12504)

#### 💥 Breaking

- Removed left/right from text alignment @miles-johnson [#12241](https://github.cbhq.net/mono/repo/pull/12241)

#### 🚀 Updates

- Update `Text` component to include spacing @katherinemartinez [#12355](https://github.cbhq.net/mono/repo/pull/12355)
- Add `ThemeProvider` and wildcard export cds/common package @katherinemartinez [#12452](https://github.cbhq.net/mono/repo/pull/12452)

#### 📘 Misc

- Switched to common package @miles-johnson [#12128](https://github.cbhq.net/mono/repo/pull/12128)

## 0.0.2 (2/1/2021, 8:15am PST) [#12013](https://github.cbhq.net/mono/repo/pull/12013)

#### 💥 Breaking

- Make `Text` back to wrap by default @hannah-jin [#9595](https://github.cbhq.net/mono/repo/pull/9595)
- Make `Text` not wrap by default @hannah-jin [#8095](https://github.cbhq.net/mono/repo/pull/8095)

#### 🚀 Updates

- Set default html tag for legal to div @hannah-jin [#8167](https://github.cbhq.net/mono/repo/pull/8167)
- Implement spacing props in `Box` component @hannah-jin [#11916](https://github.cbhq.net/mono/repo/pull/11916)
- Add `Text` component @hannah-jin [#11435](https://github.cbhq.net/mono/repo/pull/11435)
- Add `Box` component @miles-johnson [#11436](https://github.cbhq.net/mono/repo/pull/11436)
- Add `dangerouslySetClassName` in `Text` component for migration purpose by @hannah-jin [#9700](https://github.cbhq.net/mono/repo/pull/9700)
- Add new icons from figma e.g., speaker, news feed, trading remove, gift box by @maureen-durnin [#8081](https://github.cbhq.net/mono/repo/pull/8081)
- Change typography children prop type by @iuliasoimaru [#7566](https://github.cbhq.net/mono/repo/pull/7566)
- Change typography to use css variables by @hannah-jin [#6535](https://github.cbhq.net/mono/repo/pull/6535)
- Typography styles and Text components by @hannah-jin [#5842](https://github.cbhq.net/mono/repo/pull/5842)

#### 📘 Misc

- Move to design-system and add components folder and index files by @hannah-jin
- Remove display default value 'initial' by @hannah-jin [#7992](https://github.cbhq.net/mono/repo/pull/7992)
