# Changelog

All notable changes to this project will be documented in this file.

`@cbhq/cds-web` adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 0.4.0 (3/8/2021, 11:49 AM PST) [#todo](https://github.cbhq.net/mono/repo/pull/todo)

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
