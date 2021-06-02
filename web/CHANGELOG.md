# Changelog

All notable changes to this project will be documented in this file.

`@cbhq/cds-web` adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 0.12.4 (6/2/2021, 02:11 PM PST)

#### 🚀 Updates

- **[ListCell]** Add multiline prop and improve edge spacing. [#21942](https://github.cbhq.net/mono/repo/pull/21942)

#### 🐞 Fixes

- Fix content resize issue in button. [#21420](https://github.cbhq.net/mono/repo/pull/21420)
- Use deep imports in web cell components. [#21967](https://github.cbhq.net/mono/repo/pull/21967)
- Made active an optional prop. [#21664](https://github.cbhq.net/mono/repo/pull/21664)

#### 📘 Misc

- Add cells documentation. [#20845](https://github.cbhq.net/mono/repo/pull/20845)

## 0.12.3 (5/20/2021, 02:42 PM PST)

#### 🚀 Updates

- Add block prop to pressables. [#20685](https://github.cbhq.net/mono/repo/pull/20685)
- Add cell components for web. [#20627](https://github.cbhq.net/mono/repo/pull/20627)
- Add Navigation Icon for Web. [#20465](https://github.cbhq.net/mono/repo/pull/20465), [CDS-249](https://jira.coinbase-corp.com/browse/CDS-249)
- Add chart utilities to cds-common. [#20312](https://github.cbhq.net/mono/repo/pull/20312), [CDS-550](https://jira.coinbase-corp.com/browse/CDS-550)

## 0.12.2 (5/18/2021, 01:02 PM PST)

#### 🚀 Updates

- TextIcon for Nested Text on CDS mobile. [#20493](https://github.cbhq.net/mono/repo/pull/20493), [CDS-559](https://jira.coinbase-corp.com/browse/CDS-559)

#### 🐞 Fixes

- **[Pressable]** Fix unwanted black background. [#20470](https://github.cbhq.net/mono/repo/pull/20470)
- Fix starInactive hollow space being too small. [#20425](https://github.cbhq.net/mono/repo/pull/20425)
- Add variant prop for Link component and Fix nested TextBody issue. [#19083](https://github.cbhq.net/mono/repo/pull/19083)

## 0.12.1 (5/17/2021, 05:38 PM PST)

#### 🚀 Updates

- Add dense height support to buttons. [#20264](https://github.cbhq.net/mono/repo/pull/20264), [CDS-504](https://jira.coinbase-corp.com/browse/CDS-504)

#### 🐞 Fixes

- PressableOpacity container width fluid and control styles. [#20386](https://github.cbhq.net/mono/repo/pull/20386)

#### 📘 Misc

- Add template files for newPackage scaffold. [#20292](https://github.cbhq.net/mono/repo/pull/20292)
- Remove destyle as dep of cds web. [#20204](https://github.cbhq.net/mono/repo/pull/20204)

## 0.12.0 (5/14/2021, 09:45 AM PST)

#### 💥 Breaking

- Remove fill-content from overlay in interactable for web. [#20139](https://github.cbhq.net/mono/repo/pull/20139)

## 0.11.1 (5/13/2021, 06:16 PM PST)

#### 🐞 Fixes

- NavigationIcon Component for Mobile. [#20053](https://github.cbhq.net/mono/repo/pull/20053), [CDS-249](https://jira.coinbase-corp.com/browse/CDS-249)

## 0.11.0 (5/12/2021, 04:45 PM PST)

#### 💥 Breaking

- Move web Icon component to icon font. [#19481](https://github.cbhq.net/mono/repo/pull/19481), [CDS-514](https://jira.coinbase-corp.com/browse/CDS-514)
- Move color utils to common and unify web/mobile. [#19738](https://github.cbhq.net/mono/repo/pull/19738), [CDS-529](https://jira.coinbase-corp.com/browse/CDS-529)

#### 🚀 Updates

- Add Card component to CDS mobile. [#19940](https://github.cbhq.net/mono/repo/pull/19940), [CDS-79](https://jira.coinbase-corp.com/browse/CDS-79)
- Make `testID` a shared prop amongst all components. [#19796](https://github.cbhq.net/mono/repo/pull/19796)

#### 🐞 Fixes

- Web mobile navigation list size. [#19400](https://github.cbhq.net/mono/repo/pull/19400), [CDS-469](https://jira.coinbase-corp.com/browse/CDS-469)
- Remove global list resets. [#19786](https://github.cbhq.net/mono/repo/pull/19786)

## 0.10.2 (5/11/2021, 10:48 AM PST)

#### 🐞 Fixes

- Make Text extend the props of its generic as element @hannah-jin [#19689](https://github.cbhq.net/mono/repo/pull/19689)
- make overflow clip wrap break-word @hannah-jin [#19674](https://github.cbhq.net/mono/repo/pull/19674)
- Fix navigation tooltips. Add `to` prop. @miles-johnson [#19547](https://github.cbhq.net/mono/repo/pull/19547)
- fix sortDownCenter and sortUpCenter mixup. @jennifer-liu [#19553](https://github.cbhq.net/mono/repo/pull/19553)

#### 📘 Misc

- Enable ESLint rules from standards meetings @miles-johnson [#19667](https://github.cbhq.net/mono/repo/pull/19667)

## 0.10.1 (5/6/2021, 08:02 PM PST)

#### 🐞 Fixes

- Reset pressable buttons. @miles-johnson [#19489](https://github.cbhq.net/mono/repo/pull/19489)

#### 📘 Misc

- Add percy snapshots for Icon component @katherinemartinez [#19494](https://github.cbhq.net/mono/repo/pull/19494), [CDS-517](https://jira.coinbase-corp.com/browse/CDS-517)

## 0.10.0 (5/6/2021, 06:47 AM PST)

#### 💥 Breaking

- Cleanup `IconButton` implementation. @miles-johnson [#19100](https://github.cbhq.net/mono/repo/pull/19100)

#### 🚀 Updates

- paletteValueToCssVar for Retail web migration @katherinemartinez [#19042](https://github.cbhq.net/mono/repo/pull/19042), [CDS-497](https://jira.coinbase-corp.com/browse/CDS-497)

#### 📘 Misc

- Automate docgen + add design/implementation tabs @katherinemartinez [#19036](https://github.cbhq.net/mono/repo/pull/19036), [CDS-482](https://jira.coinbase-corp.com/browse/CDS-482)

## 0.9.2 (4/30/2021, 01:37 PM PST)

#### 🚀 Updates

- Expose paletteValueToCssVar util for cds web @katherinemartinez [#18878](https://github.cbhq.net/mono/repo/pull/18878)

#### 🐞 Fixes

- Revert " feat: Expose paletteValueToCssVar util for cds web (#18878)" @katherinemartinez [#18959](https://github.cbhq.net/mono/repo/pull/18959)
- add camera icon. @jennifer-liu [#18954](https://github.cbhq.net/mono/repo/pull/18954)

## 0.9.1 (4/30/2021, 09:40 AM PST)

#### 🚀 Updates

- Add start/end icon support to buttons. @miles-johnson [#18597](https://github.cbhq.net/mono/repo/pull/18597)

#### 🐞 Fixes

- web control with no label doesn't handle change @hannah-jin [#18879](https://github.cbhq.net/mono/repo/pull/18879)
- Asset Hub - Fix table scroll [#18815](https://github.cbhq.net/mono/repo/pull/18815)
- Add link decoration reset @travis-ueki [#18835](https://github.cbhq.net/mono/repo/pull/18835)

## 0.9.0 (4/28/2021, 04:42 PM PST)

#### 💥 Breaking

- Remove destyle from CDS @travis-ueki [#18263](https://github.cbhq.net/mono/repo/pull/18263), [CDS-464](https://jira.coinbase-corp.com/browse/CDS-464)

#### 🐞 Fixes

- Fix background color of switch component @katherinemartinez [#18589](https://github.cbhq.net/mono/repo/pull/18589), [CDS-452](https://jira.coinbase-corp.com/browse/CDS-452)

#### 📘 Misc

- Add interactable and pressable docs. @miles-johnson [#18442](https://github.cbhq.net/mono/repo/pull/18442)

## 0.8.2 (4/26/2021, 02:28 PM PST)

#### 🚀 Updates

- Add Link Component @jennifer-liu [#16713](https://github.cbhq.net/mono/repo/pull/16713), [CDS-390](https://jira.coinbase-corp.com/browse/CDS-390)
- **[LinkButton]** Update to have a transparent background until interacted with @miles-johnson [#18316](https://github.cbhq.net/mono/repo/pull/18316)
- Add Interactable/Pressable components to web @miles-johnson [#17805](https://github.cbhq.net/mono/repo/pull/17805)

#### 🐞 Fixes

- Make Switch occupy the correct height in layout @hannah-jin [#18271](https://github.cbhq.net/mono/repo/pull/18271)

#### 📘 Misc

- Use TextBody in storybook Lorem Ipsum @katherinemartinez [#18300](https://github.cbhq.net/mono/repo/pull/18300)

## 0.8.1 (4/22/2021, 04:26 PM PST)

#### 🐞 Fixes

- missing React import for Interactable @katherinemartinez [#18209](https://github.cbhq.net/mono/repo/pull/18209)

## 0.8.0 (4/21/2021, 02:23 PM PST)

#### 💥 Breaking

- **[IconButton]** Remove badge prop. [#18034](https://github.cbhq.net/mono/repo/pull/18034)

#### 🐞 Fixes

- Multi line label controls alignment @hannah-jin [#18012](https://github.cbhq.net/mono/repo/pull/18012)

## 0.7.6 (4/21/2021, 08:32 AM PST)

#### 🚀 Updates

- useThemeProviderStyles to apply theme styles to custom element [#17941](https://github.cbhq.net/mono/repo/pull/17941)

#### 🐞 Fixes

- navigationStyles degredation @travis-ueki [#17773](https://github.cbhq.net/mono/repo/pull/17773)

#### 📘 Misc

- clean up control API, remove indeterminate @hannah-jin [#17252](https://github.cbhq.net/mono/repo/pull/17252)

## 0.7.5 (4/12/2021, 12:52 PM PST)

#### 🚀 Updates

- Implement Switch Component @hannah-jin [#15647](https://github.cbhq.net/mono/repo/pull/15647), [CDS-308](https://jira.coinbase-corp.com/browse/CDS-308)

## 0.7.4 (4/8/2021, 01:01 PM PST)

#### 🐞 Fixes

- Inter-SemiBold type naming for Android @hannah-jin [#17038](https://github.cbhq.net/mono/repo/pull/17038)

## 0.7.3 (4/7/2021, 07:52 PM PST)

#### 🚀 Updates

- navigation for mobile web @travis-ueki [#16662](https://github.cbhq.net/mono/repo/pull/16662), [CDS-333](https://jira.coinbase-corp.com/browse/CDS-333)
- Web Checkbox, CheckboxGroup, and RadioGroup components @hannah-jin [#16628](https://github.cbhq.net/mono/repo/pull/16628), [CDS-308](https://jira.coinbase-corp.com/browse/CDS-308)
- Mobile Checkbox, CheckboxGroup, RadioGroup @hannah-jin [#16219](https://github.cbhq.net/mono/repo/pull/16219), [CDS-308](https://jira.coinbase-corp.com/browse/CDS-308)

#### 🐞 Fixes

- default uppercase text transformation for label1 and label2 in dense scales @hannah-jin [#16820](https://github.cbhq.net/mono/repo/pull/16820)

## 0.7.2 (4/5/2021, 07:08 PM PST)

#### 🚀 Updates

- CDS Loader @jennifer-liu [#13964](https://github.cbhq.net/mono/repo/pull/13964), [CDS-273](https://jira.coinbase-corp.com/browse/CDS-273)

## 0.7.1 (4/5/2021, 03:16 PM PST)

#### 🚀 Updates

- Add disabled style and falsy check to Text @hannah-jin [#16194](https://github.cbhq.net/mono/repo/pull/16194)
- Add LinkButton component @jennifer-liu [#15629](https://github.cbhq.net/mono/repo/pull/15629), [CDS-276](https://jira.coinbase-corp.com/browse/CDS-276)
- Allow <strong> for Text @hannah-jin [#16569](https://github.cbhq.net/mono/repo/pull/16569)

#### 🐞 Fixes

- update logo assets @katherinemartinez [#16598](https://github.cbhq.net/mono/repo/pull/16598)

#### 📘 Misc

- default to light caret icons and remove misspelled "indentity". @jennifer-liu [#16421](https://github.cbhq.net/mono/repo/pull/16421)

## 0.7.0 (3/29/2021, 04:03 PM PST)

#### 💥 Breaking

- Delete old icons package. @miles-johnson [#16048](https://github.cbhq.net/mono/repo/pull/16048)

#### 🚀 Updates

- Move to CSS only for interactable hover/pressed states. @miles-johnson [#15932](https://github.cbhq.net/mono/repo/pull/15932)

#### 🐞 Fixes

- outline icons @katherinemartinez [#16206](https://github.cbhq.net/mono/repo/pull/16206)

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
