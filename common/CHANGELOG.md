# Changelog

All notable changes to this project will be documented in this file.

`@cbhq/cds-common `adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 0.5.1 (3/29/2021, 04:03 PM PST)

#### 🐞 Fixes

- outline icons @katherinemartinez [#16206](https://github.cbhq.net/mono/repo/pull/16206)

## 0.5.0 (3/26/2021, 10:40 AM PST)

#### 💥 Breaking

- CDS Web Icon Migration @jennifer-liu [#15381](https://github.cbhq.net/mono/repo/pull/15381), [CDS-235](https://jira.coinbase-corp.com/browse/CDS-235), [CDS-323](https://jira.coinbase-corp.com/browse/CDS-323)

#### 📘 Misc

- update Spacer implementation and API @hannah-jin [#15857](https://github.cbhq.net/mono/repo/pull/15857), [CDS-308](https://jira.coinbase-corp.com/browse/CDS-308)
- Migrate to `reakit` from `react-aria` @miles-johnson [#15545](https://github.cbhq.net/mono/repo/pull/15545)

## 0.4.0 (3/23/2021, 06:11 PM PST)

#### 💥 Breaking

- Update button states for mobile. Remove spacing/offset. @miles-johnson [#15731](https://github.cbhq.net/mono/repo/pull/15731)

#### 📘 Misc

- Update util functions and hooks @hannah-jin [#15571](https://github.cbhq.net/mono/repo/pull/15571)
- update codegen styles and web styles @hannah-jin [#15564](https://github.cbhq.net/mono/repo/pull/15564)

## 0.3.5 (3/20/2021, 03:59 PM PST)

#### 🐞 Fixes

- Bring back React imports for CDS. @miles-johnson [#15478](https://github.cbhq.net/mono/repo/pull/15478)
- Migrate to new React v17 JSX imports @miles-johnson [#15248](https://github.cbhq.net/mono/repo/pull/15248), [MONOFE-51](https://jira.coinbase-corp.com/browse/MONOFE-51)

## 0.3.4 (3/18/2021, 08:52 AM PST)

#### 🐞 Fixes

- Added unheartHeavy and shareHeavy icons. @jennifer-liu [#15209](https://github.cbhq.net/mono/repo/pull/15209)

#### 📘 Misc

- Add `Divider` component. @miles-johnson [#15086](https://github.cbhq.net/mono/repo/pull/15086)

## 0.3.3 (3/16/2021, 09:56 AM PST)

#### 🚀 Updates

- Add SidebarSection for CDS web navigation @katherinemartinez [#14897](https://github.cbhq.net/mono/repo/pull/14897), [CDS-332](https://jira.coinbase-corp.com/browse/CDS-332)
- Add focus logic and styling to useInteractable @katherinemartinez [#14895](https://github.cbhq.net/mono/repo/pull/14895), [CDS-365](https://jira.coinbase-corp.com/browse/CDS-365)
- add LogoMark and LogoWordmark for web and mobile @katherinemartinez [#14892](https://github.cbhq.net/mono/repo/pull/14892), [CDS-327](https://jira.coinbase-corp.com/browse/CDS-327)

#### 🐞 Fixes

- Remove release sha. @miles-johnson

## 0.3.2 (3/12/2021, 11:07 AM PST)

#### 🚀 Updates

- Add Badge component to CDS web and mobile @katherinemartinez [#14825](https://github.cbhq.net/mono/repo/pull/14825), [CDS-250](https://jira.coinbase-corp.com/browse/CDS-250)
- Add Tabs for web navigation @katherinemartinez [#14792](https://github.cbhq.net/mono/repo/pull/14792), [CDS-321](https://jira.coinbase-corp.com/browse/CDS-321)
- Add zIndex to tokens @katherinemartinez [#36535](https://github.cbhq.net/mono/repo/pull/36535)
- Update CDS compact primary button to be solid @miles-johnson [#14721](https://github.cbhq.net/mono/repo/pull/14721)
- Update Navigation props @katherinemartinez [#14664](https://github.cbhq.net/mono/repo/pull/14664)
- **[Button]** Update compact primary to have a solid blue background @miles-johnson [#14721](https://github.cbhq.net/mono/repo/pull/14721)

#### 🐞 Fixes

- Update doubeChevron mispelling in icons @katherinemartinez [#14815](https://github.cbhq.net/mono/repo/pull/14815)
- Update manifest and changelog. @jennifer-liu [#14114](https://github.cbhq.net/mono/repo/pull/14114)

#### 📘 Misc

- Infer changelog entries from git commit messages. @miles-johnson [#14772](https://github.cbhq.net/mono/repo/pull/14772)

## 0.3.1 (3/11/2021, 09:50 AM PST)

#### 🚀 Updates

- Add useButtonVariant hook, borderRadius and interactable opacity tokens @katherinemartinez [#14548](https://github.cbhq.net/mono/repo/pull/14548)

#### 🐞 Fixes

- Improve browser build targets @miles-johnson

## 0.3.0 (3/8/2021, 11:49 AM PST)

#### 💥 Breaking

- Update NPM package to be deep importable (no lib/esm folders) @miles-johnson [#14059](https://github.cbhq.net/mono/repo/pull/14059)

## 0.2.2 (3/4/2021, 07:31 AM PST) [#14145](https://github.cbhq.net/mono/repo/pull/14145)

#### 🐞 Fixes

- Update BoxBaseProps to include BorderStyles. @katherinemartinez [#13892](https://github.cbhq.net/mono/repo/pull/13892)

## 0.2.1 (3/2/2021, 11:27 AM PST) [#13944](https://github.cbhq.net/mono/repo/pull/13944)

#### 🐞 Fixes

- Move NoopFn to types/Helpers.ts @katherinemartinez [#13944](https://github.cbhq.net/mono/repo/pull/13944)

## 0.2.0 (3/2/2021, 07:04 AM PST) [#13912](https://github.cbhq.net/mono/repo/pull/13912)

#### 💥 Breaking

- Rename palette alias divider to line and stroke to lineHeavy @katherinemartinez [#13797](https://github.cbhq.net/mono/repo/pull/13797)

#### 🚀 Updates

- Add `accessibilityLabel` prop to buttons. @miles-johnson [#13838](https://github.cbhq.net/mono/repo/pull/13838)
- Add join util for adding a separator element between react components except last item @katherinemartinez [#13719](https://github.cbhq.net/mono/repo/pull/13719)
- Add useStatusAnimationPoller for LottieStatusAnimation on mobile & web @katherinemartinez [#13719](https://github.cbhq.net/mono/repo/pull/13719)

#### 🐞 Fixes

- Pull out DimensionStyles to separate type file @katherinemartinez [#13719](https://github.cbhq.net/mono/repo/pull/13719)

## 0.1.3 (2/25/2021, 05:22 PM PST) [#13493](https://github.cbhq.net/mono/repo/pull/13493)

#### 🚀 Updates

- Make second argument for useIconSize optional @katherinemartinez [#13493](https://github.cbhq.net/mono/repo/pull/13493)
- Add offset prop types @miles-johnson [#13677](https://github.cbhq.net/mono/repo/pull/13677)
- Update Lottie types @katherinemartinez [#13040](https://github.cbhq.net/mono/repo/pull/13040)

## 0.1.2 (2/25/2021, 11:42 AM PST) [#13638](https://github.cbhq.net/mono/repo/pull/13638)

#### 🚀 Updates

- Update IconName types @katherinemartinez [#13638](https://github.cbhq.net/mono/repo/pull/13638)

## 0.1.1 (2/23/2021, 04:37 PM PST) [#13466](https://github.cbhq.net/mono/repo/pull/13466)

#### 🐞 Fixes

- Update IconName @katherinemartinez [#13454](https://github.cbhq.net/mono/repo/pull/13454)

## 0.1.0 (2/19/2021, 02:33 PM PST) [#13278](https://github.cbhq.net/mono/repo/pull/13278)

#### 💥 Breaking

- Rename PaletteConfig to PartialPaletteConfig @hannah-jin [#13179](https://github.cbhq.net/mono/repo/pull/13179)

#### 🚀 Updates

- Add `Pin` component types [#13116](https://github.cbhq.net/mono/repo/pull/13116)

#### 🐞 Fixes

- Move types to folder @katherinemartinez [#12937](https://github.cbhq.net/mono/repo/pull/12937)

## 0.0.8 (2/10/2021, 10:30 AM PST) [#12628](https://github.cbhq.net/mono/repo/pull/12628)

#### 🐞 Fixes

- Add Palette type which is the return type of usePalette @katherinemartinez [#12628](https://github.cbhq.net/mono/repo/pull/12628)

## 0.0.7 (2/9/2021, 03:30 PM PST) [#12583](https://github.cbhq.net/mono/repo/pull/12583)

#### 🚀 Updates

- Add CommonJS build alongside ESM @miles-johnson [#12570](https://github.cbhq.net/mono/repo/pull/12570)

## 0.0.6 (2/8/2021, 6:21 PM PST) [#12504](https://github.cbhq.net/mono/repo/pull/12504)

#### 🚀 Updates

- Add theme related providers and associated hooks + types @katherinemartinez [#12452](https://github.cbhq.net/mono/repo/pull/12452)

## 0.0.5 (2/5/2021 2:30pm PST) [#12399](https://github.cbhq.net/mono/repo/pull/12399)

#### 💥 Breaking

- Renamed package to `common` @miles-johnson [#12128](https://github.cbhq.net/mono/repo/pull/12128)
- Removed left/right from text alignment @miles-johnson [#12241](https://github.cbhq.net/mono/repo/pull/12241)

#### 🚀 Updates

- Add `UseSpacingStylesProps` type by @hannah-jin [#12156](https://github.cbhq.net/mono/repo/pull/12156)
- Update spacing types by @hannah-jin [#11916](https://github.cbhq.net/mono/repo/pull/11916)
- Pull out spacing types to root and extend in `TextBaseProps` @katherinemartinez [#12355](https://github.cbhq.net/mono/repo/pull/12355)

## 0.0.4 (2/1/2021 8:15am PST) [#12013](https://github.cbhq.net/mono/repo/pull/12013)

#### 🚀 Updates

- Add `Text` shared props @hannah-jin [#11435](https://github.cbhq.net/mono/repo/pull/11435)
- Add `Box` shared props @miles-johnson [#11436](https://github.cbhq.net/mono/repo/pull/11436)

## 0.0.3 (1/19/2021 12:15pm PST) [#11421](https://github.cbhq.net/mono/repo/pull/11421)

#### 🚀 Updates

- Init `@cbhq/cds-core` by @miles-johnson [#11333](https://github.cbhq.net/mono/repo/pull/11333)
