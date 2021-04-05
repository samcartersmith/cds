# Changelog

All notable changes to this project will be documented in this file.

`@cbhq/cds-mobile` adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 0.7.4 (4/5/2021, 03:16 PM PST)

#### 🚀 Updates

- Add disabled style and falsy check to Text @hannah-jin [#16194](https://github.cbhq.net/mono/repo/pull/16194)
- Add LinkButton component @jennifer-liu [#15629](https://github.cbhq.net/mono/repo/pull/15629), [CDS-276](https://jira.coinbase-corp.com/browse/CDS-276)
- useTextAlign and numberStyles @katherinemartinez [#16538](https://github.cbhq.net/mono/repo/pull/16538)

#### 🐞 Fixes

- update logo assets @katherinemartinez [#16598](https://github.cbhq.net/mono/repo/pull/16598)

## 0.7.3 (3/31/2021, 05:12 PM PST)

#### 🐞 Fixes

- Rework button border styles. @miles-johnson [#16308](https://github.cbhq.net/mono/repo/pull/16308)
- text overflow in mobile @katherinemartinez [#16449](https://github.cbhq.net/mono/repo/pull/16449)

## 0.7.2 (3/31/2021, 10:30 AM PST)

#### 🐞 Fixes

- uppercase text styles in cds mobile @katherinemartinez [#16192](https://github.cbhq.net/mono/repo/pull/16192)

#### 📘 Misc

- default to light caret icons and remove misspelled "indentity". @jennifer-liu [#16421](https://github.cbhq.net/mono/repo/pull/16421)

## 0.7.1 (3/29/2021, 04:03 PM PST)

#### 🐞 Fixes

- outline icons @katherinemartinez [#16206](https://github.cbhq.net/mono/repo/pull/16206)

## 0.7.0 (3/26/2021, 10:40 AM PST)

#### 💥 Breaking

- CDS Web Icon Migration @jennifer-liu [#15381](https://github.cbhq.net/mono/repo/pull/15381), [CDS-235](https://jira.coinbase-corp.com/browse/CDS-235), [CDS-323](https://jira.coinbase-corp.com/browse/CDS-323)

#### 📘 Misc

- update Spacer implementation and API @hannah-jin [#15857](https://github.cbhq.net/mono/repo/pull/15857), [CDS-308](https://jira.coinbase-corp.com/browse/CDS-308)

## 0.6.1 (3/24/2021, 01:32 PM PST)

#### 🐞 Fixes

- **[Divider]** Fix divider scaling (again). @miles-johnson [#15801](https://github.cbhq.net/mono/repo/pull/15801)

## 0.6.0 (3/23/2021, 06:11 PM PST)

#### 💥 Breaking

- Update button states for mobile. Remove spacing/offset. @miles-johnson [#15731](https://github.cbhq.net/mono/repo/pull/15731)

#### 🐞 Fixes

- **[Divider]** Fix vertical divider taking up full height @miles-johnson [#15640](https://github.cbhq.net/mono/repo/pull/15640)
- cds mobile buttons clean up [#15419](https://github.cbhq.net/mono/repo/pull/15419)

#### 📘 Misc

- Update util functions and hooks @hannah-jin [#15571](https://github.cbhq.net/mono/repo/pull/15571)
- update codegen styles and web styles @hannah-jin [#15564](https://github.cbhq.net/mono/repo/pull/15564)

## 0.5.6 (3/22/2021, 03:54 PM PST)

#### 🐞 Fixes

- ensure color is rgba string for RN @katherinemartinez [#15570](https://github.cbhq.net/mono/repo/pull/15570)

## 0.5.5 (3/20/2021, 03:59 PM PST)

#### 🐞 Fixes

- Bring back React imports for CDS. @miles-johnson [#15478](https://github.cbhq.net/mono/repo/pull/15478)
- OverflowGradient start value to pull from background palette @katherinemartinez [#15424](https://github.cbhq.net/mono/repo/pull/15424)
- Migrate to new React v17 JSX imports @miles-johnson [#15248](https://github.cbhq.net/mono/repo/pull/15248), [MONOFE-51](https://jira.coinbase-corp.com/browse/MONOFE-51)

#### 📘 Misc

- fix Lottie mocks @katherinemartinez [#15374](https://github.cbhq.net/mono/repo/pull/15374)
- add onAnimationFinish to Lottie mock @katherinemartinez [#15357](https://github.cbhq.net/mono/repo/pull/15357)

## 0.5.4 (3/18/2021, 08:52 AM PST)

#### 🐞 Fixes

- internal - add e2e mocks for lottie in react native @katherinemartinez [#15291](https://github.cbhq.net/mono/repo/pull/15291)
- Added unheartHeavy and shareHeavy icons. @jennifer-liu [#15209](https://github.cbhq.net/mono/repo/pull/15209)

#### 📘 Misc

- Add `Divider` component. @miles-johnson [#15086](https://github.cbhq.net/mono/repo/pull/15086)

## 0.5.3 (3/16/2021, 09:56 AM PST)

#### 🚀 Updates

- add LogoMark and LogoWordmark for web and mobile @katherinemartinez [#14892](https://github.cbhq.net/mono/repo/pull/14892), [CDS-327](https://jira.coinbase-corp.com/browse/CDS-327)

#### 🐞 Fixes

- Remove release sha. @miles-johnson
- add all lottie exports to animation index @katherinemartinez [#14969](https://github.cbhq.net/mono/repo/pull/14969)

## 0.5.2 (3/12/2021, 11:07 AM PST)

#### 🚀 Updates

- Add Badge component to CDS web and mobile @katherinemartinez [#14825](https://github.cbhq.net/mono/repo/pull/14825), [CDS-250](https://jira.coinbase-corp.com/browse/CDS-250)
- Update CDS compact primary button to be solid @miles-johnson [#14721](https://github.cbhq.net/mono/repo/pull/14721)
- **[Button]** Update compact primary to have a solid blue background @miles-johnson [#14721](https://github.cbhq.net/mono/repo/pull/14721)

#### 🐞 Fixes

- Update doubeChevron mispelling in icons @katherinemartinez [#14815](https://github.cbhq.net/mono/repo/pull/14815)
- Update manifest and changelog. @jennifer-liu [#14114](https://github.cbhq.net/mono/repo/pull/14114)

#### 📘 Misc

- Infer changelog entries from git commit messages. @miles-johnson [#14772](https://github.cbhq.net/mono/repo/pull/14772)

## 0.5.1 (3/11/2021, 09:50 AM PST)

#### 🐞 Fixes

- Improve browser build targets @miles-johnson

## 0.5.0 (3/8/2021, 11:49 AM PST)

#### 💥 Breaking

- Update NPM package to be deep importable (no lib/esm folders) @miles-johnson [#14059](https://github.cbhq.net/mono/repo/pull/14059)

## 0.4.1 (3/2/2021, 11:36 AM PST) [#13912](https://github.cbhq.net/mono/repo/pull/13912)

#### 🐞 Fixes

- Trigger bump to pull in latest common and utils @katherinemartinez [#13912](https://github.cbhq.net/mono/repo/pull/13912)

## 0.4.0 (3/2/2021, 07:04 AM PST) [#13912](https://github.cbhq.net/mono/repo/pull/13912)

#### 💥 Breaking

- Rename palette alias divider to line and stroke to lineHeavy @katherinemartinez [#13797](https://github.cbhq.net/mono/repo/pull/13797)

#### 🚀 Updates

- Add `accessibilityLabel` prop to buttons. @miles-johnson [#13838](https://github.cbhq.net/mono/repo/pull/13838)
- Add Spacer component @katherinemartinez [#13719](https://github.cbhq.net/mono/repo/pull/13719)
- Add LottieStatusAnimation component @katherinemartinez [#13719](https://github.cbhq.net/mono/repo/pull/13719)

## 0.3.0 (2/25/2021, 05:22 PM PST) [#13493](https://github.cbhq.net/mono/repo/pull/13493)

#### 💥 Breaking

- Removed `Offset` component @miles-johnson [#13677](https://github.cbhq.net/mono/repo/pull/13677)

#### 🚀 Updates

- Make second argument for useIconSize optional @katherinemartinez [#13493](https://github.cbhq.net/mono/repo/pull/13493)
- Add offset props to `Box` component @miles-johnson [#13677](https://github.cbhq.net/mono/repo/pull/13677)
- Add Lottie component @katherinemartinez [#13040](https://github.cbhq.net/mono/repo/pull/13040)

## 0.2.0 (2/25/2021, 11:45 AM PST) [#13638](https://github.cbhq.net/mono/repo/pull/13638)

#### 💥 Breaking

- Update some icon names to drop Heavy and add pay icon @katherinemartinez [#13638](https://github.cbhq.net/mono/repo/pull/13638)

## 0.1.4 (2/23/2021, 04:49 PM PST) [#13468](https://github.cbhq.net/mono/repo/pull/13468)

#### 🐞 Fixes

- Disable fontScaling in Icon component @katherinemartinez [#13468](https://github.cbhq.net/mono/repo/pull/13468)

## 0.1.3 (2/23/2021, 03:06 PM PST) [#13454](https://github.cbhq.net/mono/repo/pull/13454)

#### 🚀 Updates

- Ensure spacing and styles is applied to outer Icon and add ttf files in publish @katherinemartinez [#13454](https://github.cbhq.net/mono/repo/pull/13454)

## 0.1.2 (2/23/2021, 09:30 AM PST) [#13402](https://github.cbhq.net/mono/repo/pull/13402)

#### 🐞 Updates

- Add Icon component and icon font @katherinemartinez [#13324](https://github.cbhq.net/mono/repo/pull/13324)

## 0.1.1 (2/19/2021, 03:27 PM PST) [#](https://github.cbhq.net/mono/repo/pull/)

- Bump @cbhq/cds-common version to latest

## 0.1.0 (2/19/2021, 01:24 PM PST) [#13179](https://github.cbhq.net/mono/repo/pull/13179)

#### 💥 Breaking

- Rename PaletteConfig to PartialPaletteConfig and add tests to convertPalette @hannah-jin [#13179](https://github.cbhq.net/mono/repo/pull/13179)

#### 🚀 Updates

- Add `HStack` and `VStack` components @miles-johnson [#12758](https://github.cbhq.net/mono/repo/pull/12758)
- Add `pin` prop to `Box` component @miles-johnson [#13116](https://github.cbhq.net/mono/repo/pull/13116)
- Add overflow gradient support to `Box` @miles-johnson [#13116](https://github.cbhq.net/mono/repo/pull/13116)

#### 🐞 Fixes

- **[Button]** Fix elevation styles not rendering @miles-johnson [#13261](https://github.cbhq.net/mono/repo/pull/13261)

## 0.0.8 (2/9/2021, 03:30 PM PST) [#12583](https://github.cbhq.net/mono/repo/pull/12583)

#### 🚀 Updates

- Add CommonJS build alongside ESM @miles-johnson [#12570](https://github.cbhq.net/mono/repo/pull/12570)

## 0.0.7 (2/8/2021, 6:21 PM PST) [#12504](https://github.cbhq.net/mono/repo/pull/12504)

#### 🚀 Updates

- Add `ThemeProvider` and wildcard export cds/common package @katherinemartinez [#12452](https://github.cbhq.net/mono/repo/pull/12452)

## 0.0.6 (2/5/2021 2:30pm PST) [#12399](https://github.cbhq.net/mono/repo/pull/12399)

#### 💥 Breaking

- Removed left/right from text alignment @miles-johnson [#12241](https://github.cbhq.net/mono/repo/pull/12241)

#### 🚀 Updates

- Update `Text` component to include spacing, ellipsize, deprecatedLineHeight and dangerouslySetStyle @katherinemartinez [#12355](https://github.cbhq.net/mono/repo/pull/12355)
- Add `Offset` component to expand the component beyond its parent @hannah-jin [#12156](https://github.cbhq.net/mono/repo/pull/12156)
- Update `Box` component spacing prop behavior @hannah-jin [#11916](https://github.cbhq.net/mono/repo/pull/11916)

#### 📘 Misc

- Switched to common package @miles-johnson [#12128](https://github.cbhq.net/mono/repo/pull/12128)

## 0.0.5 (2/1/2021, 8:15am PST) [#12013](https://github.cbhq.net/mono/repo/pull/12013)

#### 📘 Misc

- Dependency sync @miles-johnson

## 0.0.4 (1/28/2021, 5:45pm PST) [#11919](https://github.cbhq.net/mono/repo/pull/11919)

#### 🚀 Updates

- Update dependencies in package.json by @katherinemartinez [#11919](https://github.cbhq.net/mono/repo/pull/11919)
- Create `Box` component by @miles-johnson [#11333](https://github.cbhq.net/mono/repo/pull/11436)

## 0.0.3 (1/19/2021, 12:15pm) [#11421](https://github.cbhq.net/mono/repo/pull/11421)

#### 🚀 Updates

- Init `@cbhq/cds-mobile` by @miles-johnson [#11333](https://github.cbhq.net/mono/repo/pull/11333)
