# @cbhq/cds-mobile

> [NPM registry](https://registry-npm.cbhq.net/-/web/detail/@cbhq/cds-mobile)

All notable changes to this project will be documented in this file.

`@cbhq/cds-mobile` adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- template-start -->

## 0.38.0 (1/12/2022, 03:10 PM PST)

#### 💥 Breaking

- **[Icons]** Publish icon jan-11-2022. Icon Name Change: report renamed to reportActive. [#48446](https://github.cbhq.net/mono/repo/pull/48446)

#### 🚀 Updates

- Added live examples and docs for chart header. [#48499](https://github.cbhq.net/mono/repo/pull/48499)

#### 🐞 Fixes

- Missed accessibility label. [#48576](https://github.cbhq.net/mono/repo/pull/48576)
- **[SearchInput]** Fix issue with clearButton requiring 2 presses. [#48402](https://github.cbhq.net/mono/repo/pull/48402), [CDS-1808](https://jira.coinbase-corp.com/browse/CDS-1808)

## 0.37.0 (1/12/2022, 05:27 AM PST)

#### 💥 Breaking

- **[Illustration]** Refactor Illustration to single HOC and remove width & height props. [#48247](https://github.cbhq.net/mono/repo/pull/48247)

#### 🚀 Updates

- Add support for flush buttons. [#48074](https://github.cbhq.net/mono/repo/pull/48074), [CDS-1823](https://jira.coinbase-corp.com/browse/CDS-1823)

#### 🐞 Fixes

- **[TextInput]** Fixed TextInput so that whatever content you pressed inside the Input will cause the focus state to trigger. [#48165](https://github.cbhq.net/mono/repo/pull/48165), [CDS-1859](https://jira.coinbase-corp.com/browse/CDS-1859)
- Trigger onSearch when onClear is called. [#48285](https://github.cbhq.net/mono/repo/pull/48285)

## 0.36.1 (1/11/2022, 11:27 AM PST)

#### 🚀 Updates

- Add ChartHeader for web. [#48177](https://github.cbhq.net/mono/repo/pull/48177)

#### 🐞 Fixes

- **[Inputs]** Implemented a more performant Input Border Animation. Uses opacity, and useNativeDriver is set to true. [#47994](https://github.cbhq.net/mono/repo/pull/47994), [CDS-1854](https://jira.coinbase-corp.com/browse/CDS-1854)

## 0.36.0 (1/10/2022, 09:23 AM PST)

#### 💥 Breaking

- Remove fontMigration feature flag and old Graphik,Inter fonts. [#47636](https://github.cbhq.net/mono/repo/pull/47636), [CDS-1818](https://jira.coinbase-corp.com/browse/CDS-1818)

#### 🚀 Updates

- Add ChartHeader for mobile. [#47815](https://github.cbhq.net/mono/repo/pull/47815)
- Add support for toast bottom offset. [#47765](https://github.cbhq.net/mono/repo/pull/47765)
- Web based InteractiveSparkline. [#47472](https://github.cbhq.net/mono/repo/pull/47472)
- Added y-axis scaling to InteractiveSparkline. [#46897](https://github.cbhq.net/mono/repo/pull/46897)

#### 🐞 Fixes

- **[Illustration]** Jan 7th, 2022 Illustration Update. [#47935](https://github.cbhq.net/mono/repo/pull/47935)
- **[SearchInput]** Fixed clearing returning previous value rather than empty string bug. Added onSearch which is triggered when 'Enter' is pressed. [#47853](https://github.cbhq.net/mono/repo/pull/47853), [CDS-1833](https://jira.coinbase-corp.com/browse/CDS-1833)
- Web sparkline fixes. [#47812](https://github.cbhq.net/mono/repo/pull/47812)
- Replace sample avatar image that was removed. [#47340](https://github.cbhq.net/mono/repo/pull/47340)

## 0.35.5 (1/4/2022, 09:25 AM PST)

#### 🐞 Fixes

- FeatureFlagProvider causing unnecessary re-renders. [#47242](https://github.cbhq.net/mono/repo/pull/47242), [CDS-1820](https://jira.coinbase-corp.com/browse/CDS-1820)
- Update SparklineGradient fill. [#46727](https://github.cbhq.net/mono/repo/pull/46727)

## 0.35.4 (12/15/2021, 02:10 PM PST)

#### 🚀 Updates

- Rename SparklineContainer to InteractiveSparkline. [#46374](https://github.cbhq.net/mono/repo/pull/46374)
- **[Group]** New Group & CardGroup component for mobile. [#46302](https://github.cbhq.net/mono/repo/pull/46302)
- Add SparklineArea to web. [#46261](https://github.cbhq.net/mono/repo/pull/46261)
- PopoverMenu cleanup work. [#46099](https://github.cbhq.net/mono/repo/pull/46099)
- **[Search]** Create Search for Web and Mobile. [#41009](https://github.cbhq.net/mono/repo/pull/41009), [CDS-1546](https://jira.coinbase-corp.com/browse/CDS-1546)
- Add fill support to SparklineContainer. [#46078](https://github.cbhq.net/mono/repo/pull/46078)
- Ensure keys for Group component & add Frontier card docs. [#46094](https://github.cbhq.net/mono/repo/pull/46094)
- Add fill area to Sparkline and SparklineGradient. [#45990](https://github.cbhq.net/mono/repo/pull/45990)
- **[Text]** Support prop overrides in createText hoc fn. [#46023](https://github.cbhq.net/mono/repo/pull/46023)
- **[Input]** Optional label & height prop and add forwardRef. [#45971](https://github.cbhq.net/mono/repo/pull/45971)
- **[Cards]** Add FeatureEntryCard and AnnouncementCard. [#45978](https://github.cbhq.net/mono/repo/pull/45978)
- **[CardGroup]** To leverage the new Group component on web. [#45942](https://github.cbhq.net/mono/repo/pull/45942)
- Sparkline Container website docs. [#45700](https://github.cbhq.net/mono/repo/pull/45700)
- Expose frontierCard feature flag in debug. [#45336](https://github.cbhq.net/mono/repo/pull/45336)
- Added back vertical motion configs for CDS Drawer. [#44801](https://github.cbhq.net/mono/repo/pull/44801)

#### 🐞 Fixes

- **[SearchInput]** Spacing, onClear and focus refinements. [#46361](https://github.cbhq.net/mono/repo/pull/46361)
- Removed width:100% on root View for all Dot. [#46393](https://github.cbhq.net/mono/repo/pull/46393)
- Refactored Code based on Feedback. [#46269](https://github.cbhq.net/mono/repo/pull/46269)
- Create stories for SelectOptions and add custom heights. [#45976](https://github.cbhq.net/mono/repo/pull/45976)
- Figured out truncation for select input trigger. [#45841](https://github.cbhq.net/mono/repo/pull/45841)
- Changed select option cell to select option. [#45918](https://github.cbhq.net/mono/repo/pull/45918)
- Rename CDS SelectInput to Select. [#45863](https://github.cbhq.net/mono/repo/pull/45863)
- CDS PopoverMenu + MenuItem. [#43669](https://github.cbhq.net/mono/repo/pull/43669)
- Spacing of 0 should set padding of 0. [#45708](https://github.cbhq.net/mono/repo/pull/45708)

#### 📘 Misc

- Mobile docs for Tray & Drawer, prototypes for Select and Tray. [#46297](https://github.cbhq.net/mono/repo/pull/46297)
- Dot Changes according to Design changes and Bug Bash feedback. [#44959](https://github.cbhq.net/mono/repo/pull/44959)
- Cds toast fixes. [#45350](https://github.cbhq.net/mono/repo/pull/45350), [CDS-1211](https://jira.coinbase-corp.com/browse/CDS-1211)

## 0.35.3 (12/9/2021, 09:13 AM PST)

#### 🐞 Fixes

- Remove text-transform checks. [#45142](https://github.cbhq.net/mono/repo/pull/45142)

#### 📘 Misc

- Remove flakey select input test. [#45201](https://github.cbhq.net/mono/repo/pull/45201)

## 0.35.2 (12/8/2021, 08:59 AM PST)

#### 🚀 Updates

- Cds toast gesture handles. [#44782](https://github.cbhq.net/mono/repo/pull/44782), [CDS-1211](https://jira.coinbase-corp.com/browse/CDS-1211)
- Added forwardRef to progress components. [#44716](https://github.cbhq.net/mono/repo/pull/44716)
- **[CardGroup]** Frontier gated CardGroup updates for mobile. [#44720](https://github.cbhq.net/mono/repo/pull/44720)

#### 🐞 Fixes

- Add text-transform:none as default. [#44918](https://github.cbhq.net/mono/repo/pull/44918)
- Lock toast scale to normal. [#44849](https://github.cbhq.net/mono/repo/pull/44849), [CDS-1211](https://jira.coinbase-corp.com/browse/CDS-1211)

#### 📘 Misc

- Port over react-native Chart to cds. [#44840](https://github.cbhq.net/mono/repo/pull/44840)

## 0.35.1 (12/6/2021, 12:08 PM PST)

#### 🚀 Updates

- **[Card]** FrontierCard gated Card & CardGroup changes. [#44358](https://github.cbhq.net/mono/repo/pull/44358), [CDS-1661](https://jira.coinbase-corp.com/browse/CDS-1661)
- Move mobile examples to cds-mobile package. [#44651](https://github.cbhq.net/mono/repo/pull/44651), [CDS-1788](https://jira.coinbase-corp.com/browse/CDS-1788)
- Cds toast web. [#44343](https://github.cbhq.net/mono/repo/pull/44343), [CDS-1211](https://jira.coinbase-corp.com/browse/CDS-1211)

#### 🐞 Fixes

- Add more test cases for DotStatusColor, DotSymbol, DotCount for mobile. [#44555](https://github.cbhq.net/mono/repo/pull/44555)
- Disable SelectInput flakey test. [#44547](https://github.cbhq.net/mono/repo/pull/44547)
- **[Illustrations]** Publish Illustration - Dec 1st 2021. [#44345](https://github.cbhq.net/mono/repo/pull/44345)

#### 📘 Misc

- Move story builders to common/internal. [#44615](https://github.cbhq.net/mono/repo/pull/44615)
- Dot Badges for Web. [#44414](https://github.cbhq.net/mono/repo/pull/44414), [CDS-1792](https://jira.coinbase-corp.com/browse/CDS-1792)
- Add DotStatusColor, DotCount, DotSymbol Component for Mobile. [#43064](https://github.cbhq.net/mono/repo/pull/43064), [CDS-1508](https://jira.coinbase-corp.com/browse/CDS-1508)

## 0.35.0 (12/2/2021, 09:43 AM PST)

#### 💥 Breaking

- **[Input]** Change allowed width type to percentage string for inputs. [#43620](https://github.cbhq.net/mono/repo/pull/43620), [CDS-1772](https://jira.coinbase-corp.com/browse/CDS-1772)

#### 🚀 Updates

- Cds toast mobile. [#43739](https://github.cbhq.net/mono/repo/pull/43739), [CDS-1211](https://jira.coinbase-corp.com/browse/CDS-1211)

#### 🐞 Fixes

- **[Icons]** Publish Icons Dec 1, 2021. [#44063](https://github.cbhq.net/mono/repo/pull/44063)
- Do not animate to intiial value onMount for mobile controls. [#43992](https://github.cbhq.net/mono/repo/pull/43992)
- **[SelectInput]** Use relative imports for mobile. [#43994](https://github.cbhq.net/mono/repo/pull/43994)
- **[ProgressBarFixedLabelContainer]** Add keys to spacer nodes. [#43780](https://github.cbhq.net/mono/repo/pull/43780)
- **[Illustration]** Refactor Illustration to remove async requires. [#43779](https://github.cbhq.net/mono/repo/pull/43779), [CDS-1775](https://jira.coinbase-corp.com/browse/CDS-1775)

#### 📘 Misc

- Implement mobile ProgressCircle tests. [#44184](https://github.cbhq.net/mono/repo/pull/44184)

## 0.34.0 (11/30/2021, 07:43 AM PST)

#### 💥 Breaking

- Prevent CoinbaseIcons from falling back to emoji unicode range. [#43429](https://github.cbhq.net/mono/repo/pull/43429), [CDS-725](https://jira.coinbase-corp.com/browse/CDS-725)

#### 🐞 Fixes

- **[Tray]** Animation configs for mobile Tray. [#43609](https://github.cbhq.net/mono/repo/pull/43609)

#### 📘 Misc

- Circular Progress Website docs. [#43735](https://github.cbhq.net/mono/repo/pull/43735)
- Mobile circular progress. [#43590](https://github.cbhq.net/mono/repo/pull/43590)
- Implement useCounter tests with mock timers and update API. [#43550](https://github.cbhq.net/mono/repo/pull/43550)

## 0.33.8 (11/24/2021, 01:24 PM PST)

#### 🐞 Fixes

- Remove minHeight on Cell. [#43420](https://github.cbhq.net/mono/repo/pull/43420)

## 0.33.7 (11/24/2021, 09:06 AM PST)

#### 🚀 Updates

- **[Icon]** New Icon release for Nov 24th. [#43355](https://github.cbhq.net/mono/repo/pull/43355)

#### 📘 Misc

- Fix it so that it does not console error in production. Only does so in development. [#43308](https://github.cbhq.net/mono/repo/pull/43308)

## 0.33.6 (11/23/2021, 10:29 AM PST)

#### 🚀 Updates

- CDS Mobile Drawer + Tray + SelectInput. [#38777](https://github.cbhq.net/mono/repo/pull/38777), [CDS-1536](https://jira.coinbase-corp.com/browse/CDS-1536)

#### 🐞 Fixes

- ProgressBar unit tests for mobile. [#43087](https://github.cbhq.net/mono/repo/pull/43087)
- Teal brightness for dark mode. [#43077](https://github.cbhq.net/mono/repo/pull/43077)

## 0.33.5 (11/22/2021, 03:27 PM PST)

#### 🚀 Updates

- Updated ProgressBar website docs. [#42984](https://github.cbhq.net/mono/repo/pull/42984)

#### 📘 Misc

- Update inner progress bar border radius. [#42832](https://github.cbhq.net/mono/repo/pull/42832)

## 0.33.4 (11/19/2021, 03:57 PM PST)

#### 🐞 Fixes

- Changed the path to use require, not import. [#42839](https://github.cbhq.net/mono/repo/pull/42839)

#### 📘 Misc

- Refactored progress bar api. [#42706](https://github.cbhq.net/mono/repo/pull/42706)

## 0.33.3 (11/19/2021, 08:48 AM PST)

#### 🚀 Updates

- Frontier spectrum changes to yellow. [#42707](https://github.cbhq.net/mono/repo/pull/42707)

## 0.33.2 (11/18/2021, 04:59 PM PST)

#### 🚀 Updates

- **[Inputs]** Add Input animations for web. [#42078](https://github.cbhq.net/mono/repo/pull/42078)
- Add Frontier color configs. [#42505](https://github.cbhq.net/mono/repo/pull/42505), [CDS-1735](https://jira.coinbase-corp.com/browse/CDS-1735)

#### 🐞 Fixes

- Frontier button alignment. [#42627](https://github.cbhq.net/mono/repo/pull/42627)
- **[Illustration]** Nov 17th Illustration Update. [#42463](https://github.cbhq.net/mono/repo/pull/42463)

#### 📘 Misc

- Add frontierColor to mobile debug menu. [#42670](https://github.cbhq.net/mono/repo/pull/42670)

## 0.33.1 (11/17/2021, 05:43 PM PST)

#### 🚀 Updates

- Web Circular Progress. [#42126](https://github.cbhq.net/mono/repo/pull/42126)

#### 🐞 Fixes

- Fixes ListCell minHeight which was being calculated incorrectly. [#42380](https://github.cbhq.net/mono/repo/pull/42380)
- Upgrade TypeScript to v4.4. [#40572](https://github.cbhq.net/mono/repo/pull/40572), [MONOFE-99](https://jira.coinbase-corp.com/browse/MONOFE-99)

## 0.33.0 (11/15/2021, 04:01 PM PST)

#### 💥 Breaking

- Added border animation for TextInput for Mobile. Created a useInputBorderAnimation so all components that fall under the Input family can use it. [#41693](https://github.cbhq.net/mono/repo/pull/41693), [CDS-1710](https://jira.coinbase-corp.com/browse/CDS-1710)

#### 🚀 Updates

- Types, Utils, Hooks, and Compact List Cell (part 1 of many for SelectInput). [#41448](https://github.cbhq.net/mono/repo/pull/41448), [CDS-1536](https://jira.coinbase-corp.com/browse/CDS-1536)
- **[Illustrations]** Migrate to Illustration 2.0. [#40456](https://github.cbhq.net/mono/repo/pull/40456), [CDS-1429](https://jira.coinbase-corp.com/browse/CDS-1429)

#### 🐞 Fixes

- Frontier icon button icon sizes. [#41768](https://github.cbhq.net/mono/repo/pull/41768)

#### 📘 Misc

- Setting up types for ProgressCircle. [#41838](https://github.cbhq.net/mono/repo/pull/41838)
- Add ability to selectively test features. [#41830](https://github.cbhq.net/mono/repo/pull/41830)
- Move Avatar to flat directory media structure. [#41793](https://github.cbhq.net/mono/repo/pull/41793)
- Fix border radius for bar when scaled down. [#41613](https://github.cbhq.net/mono/repo/pull/41613)
- Build Progress bar. [#39938](https://github.cbhq.net/mono/repo/pull/39938), [CDS-1681](https://jira.coinbase-corp.com/browse/CDS-1681)

## 0.32.0 (11/8/2021, 02:07 PM PST)

#### 💥 Breaking

- Remove SpacingProps in Cell and use innerSpacing + outerSpacing. [#41057](https://github.cbhq.net/mono/repo/pull/41057)

#### 🐞 Fixes

- **[button]** Frontier spacing conversion. [#40711](https://github.cbhq.net/mono/repo/pull/40711)

#### 📘 Misc

- Alert fixes. [#40971](https://github.cbhq.net/mono/repo/pull/40971)

## 0.31.5 (11/3/2021, 03:55 PM PST)

#### 🚀 Updates

- Alerts web. [#40312](https://github.cbhq.net/mono/repo/pull/40312), [CDS-1252](https://jira.coinbase-corp.com/browse/CDS-1252)

#### 🐞 Fixes

- **[button]** Ensure button padding is same pre-frontier in mobile. [#40646](https://github.cbhq.net/mono/repo/pull/40646)

## 0.31.4 (11/3/2021, 08:53 AM PST)

#### 🚀 Updates

- Frontier button height and spacing updates. [#40481](https://github.cbhq.net/mono/repo/pull/40481), [CDS-1596](https://jira.coinbase-corp.com/browse/CDS-1596)

## 0.31.3 (11/2/2021, 10:28 AM PST)

#### 🚀 Updates

- Frontier Button feature flag style updates. [#40232](https://github.cbhq.net/mono/repo/pull/40232), [CDS-1596](https://jira.coinbase-corp.com/browse/CDS-1596)
- Alerts mobile. [#39817](https://github.cbhq.net/mono/repo/pull/39817), [CDS-1252](https://jira.coinbase-corp.com/browse/CDS-1252)
- Add useFeatureFlagToggler and useFeatureFlagDispatcher. [#40040](https://github.cbhq.net/mono/repo/pull/40040)
- Added InputIcon and InputIconButton. [#39209](https://github.cbhq.net/mono/repo/pull/39209), [CDS-1640](https://jira.coinbase-corp.com/browse/CDS-1640)
- Add CoinbaseMono font and mono prop to typography. [#39662](https://github.cbhq.net/mono/repo/pull/39662), [CDS-1597](https://jira.coinbase-corp.com/browse/CDS-1597)

#### 🐞 Fixes

- **[Input]** Fix compact height and some other spacing. [#39953](https://github.cbhq.net/mono/repo/pull/39953)

#### 📘 Misc

- AvatarButton feedback updates. [#40078](https://github.cbhq.net/mono/repo/pull/40078)
- **[Input]** Improve textinput website documentation. [#38445](https://github.cbhq.net/mono/repo/pull/38445), [CDS-1615](https://jira.coinbase-corp.com/browse/CDS-1615)

## 0.31.2 (10/27/2021, 10:02 AM PST)

#### 🚀 Updates

- FrontierTypography feature flag changes. [#39430](https://github.cbhq.net/mono/repo/pull/39430)
- Add useFeatureFlagUpdater hook. [#39411](https://github.cbhq.net/mono/repo/pull/39411)
- Card props and docs. Add testId. [#38749](https://github.cbhq.net/mono/repo/pull/38749)

#### 🐞 Fixes

- Add support for closeModal. [#39220](https://github.cbhq.net/mono/repo/pull/39220), [CDS-1651](https://jira.coinbase-corp.com/browse/CDS-1651)

## 0.31.1 (10/26/2021, 02:33 PM PST)

#### 🚀 Updates

- Implement AvatarButton. [#39006](https://github.cbhq.net/mono/repo/pull/39006), [CDS-1607](https://jira.coinbase-corp.com/browse/CDS-1607)
- Add FeatureFlagProvider and docs. [#39106](https://github.cbhq.net/mono/repo/pull/39106), [CDS-1598](https://jira.coinbase-corp.com/browse/CDS-1598)

#### 🐞 Fixes

- Typography config for coinbase fonts. [#39288](https://github.cbhq.net/mono/repo/pull/39288)

## 0.31.0 (10/21/2021, 02:26 PM PST)

#### 💥 Breaking

- Oct-20-2021 Illustrations release. [#38832](https://github.cbhq.net/mono/repo/pull/38832)

## 0.30.2 (10/20/2021, 06:11 PM PST)

#### 🚀 Updates

- Update Avatar per feedback. [#38267](https://github.cbhq.net/mono/repo/pull/38267), [CDS-1608](https://jira.coinbase-corp.com/browse/CDS-1608)

## 0.30.1 (10/20/2021, 09:07 AM PST)

#### 🚀 Updates

- Modal updates. [#38463](https://github.cbhq.net/mono/repo/pull/38463)

#### 🐞 Fixes

- **[Button]** Fix button disable state. [#38565](https://github.cbhq.net/mono/repo/pull/38565)
- CardHeader should set its own spacing. [#38502](https://github.cbhq.net/mono/repo/pull/38502)

## 0.30.0 (10/18/2021, 04:13 PM PST)

#### 💥 Breaking

- **[Illustrations]** Load SVGs using XML strings. [#36771](https://github.cbhq.net/mono/repo/pull/36771), [CDS-1562](https://jira.coinbase-corp.com/browse/CDS-1562)

#### 📘 Misc

- **[Inputs]** Improved input accessibility. Added more test cases for web and mobile input. [#38321](https://github.cbhq.net/mono/repo/pull/38321), [CDS-1601](https://jira.coinbase-corp.com/browse/CDS-1601)

## 0.29.0 (10/15/2021, 04:00 PM PST)

#### 💥 Breaking

- Rename TextField to TextInput and move to controls. [#38226](https://github.cbhq.net/mono/repo/pull/38226)

#### 🐞 Fixes

- Remove tsconfig.tests.json. [#38174](https://github.cbhq.net/mono/repo/pull/38174)
- Rename props. [#38179](https://github.cbhq.net/mono/repo/pull/38179)
- Card bug bash fixes. [#38131](https://github.cbhq.net/mono/repo/pull/38131)
- Modal unit tests. [#37947](https://github.cbhq.net/mono/repo/pull/37947)

#### 📘 Misc

- Support Meta data text in CardHeader, Add theme aware Artboard. [#38243](https://github.cbhq.net/mono/repo/pull/38243)
- Avatar fixes. [#38073](https://github.cbhq.net/mono/repo/pull/38073)
- Add documentation to inputs, and add live examples. [#37232](https://github.cbhq.net/mono/repo/pull/37232), [CDS-735](https://jira.coinbase-corp.com/browse/CDS-735)
- Avatar unit tests. [#37942](https://github.cbhq.net/mono/repo/pull/37942)

## 0.28.8 (10/14/2021, 09:56 AM PST)

#### 🚀 Updates

- CardGroup for web and mobile. [#37987](https://github.cbhq.net/mono/repo/pull/37987)
- FeedCard. [#37816](https://github.cbhq.net/mono/repo/pull/37816)
- Avatar website docs. [#37435](https://github.cbhq.net/mono/repo/pull/37435), [CDS-1570](https://jira.coinbase-corp.com/browse/CDS-1570)

#### 🐞 Fixes

- PublishConfig registry. [#37972](https://github.cbhq.net/mono/repo/pull/37972)
- Update spacing to new spec. [#37973](https://github.cbhq.net/mono/repo/pull/37973)
- **[Input]** Fix input bugs based on bug bash. [#37724](https://github.cbhq.net/mono/repo/pull/37724), [CDS-1588](https://jira.coinbase-corp.com/browse/CDS-1588)
- Fix modal bugs from bug bash. [#37659](https://github.cbhq.net/mono/repo/pull/37659)

#### 📘 Misc

- Icon Oct 12, 2021 Release, 2 New Icons. [#37612](https://github.cbhq.net/mono/repo/pull/37612)

## 0.28.6 (10/12/2021, 01:31 PM PST)

#### 🐞 Fixes

- Updated icons.

## 0.28.5 (10/12/2021, 04:20 AM PST)

#### 🐞 Fixes

- Fix Input bugs based on Bug Bash and add Kitchen Sink Input example to website. [#37465](https://github.cbhq.net/mono/repo/pull/37465), [CDS-1572](https://jira.coinbase-corp.com/browse/CDS-1572)
- Modal known issues. [#37314](https://github.cbhq.net/mono/repo/pull/37314)

## 0.28.4 (10/11/2021, 04:48 PM PST)

#### 🐞 Fixes

- Bump all versions.

## 0.28.2 (10/11/2021, 10:25 AM PST)

#### 🚀 Updates

- Modal motion. [#36038](https://github.cbhq.net/mono/repo/pull/36038), [CDS-1005](https://jira.coinbase-corp.com/browse/CDS-1005)

#### 🐞 Fixes

- **[Input]** Add disabled state to web input. [#37132](https://github.cbhq.net/mono/repo/pull/37132), [CDS-1498](https://jira.coinbase-corp.com/browse/CDS-1498)

## 0.28.1 (10/5/2021, 12:35 PM PST)

#### 🚀 Updates

- Refining TextField and InputStack API and structure. [#36412](https://github.cbhq.net/mono/repo/pull/36412), [CDS-1499](https://jira.coinbase-corp.com/browse/CDS-1499)
- Published new icons. [#36316](https://github.cbhq.net/mono/repo/pull/36316)
- Correct Visuals of Price Charts for Cryptocurrencies with low Volatility. [#35764](https://github.cbhq.net/mono/repo/pull/35764), [CDS-753](https://jira.coinbase-corp.com/browse/CDS-753)

#### 🐞 Fixes

- Add excludes to all project refs. [#36404](https://github.cbhq.net/mono/repo/pull/36404)
- Enable TS project refs for shared code. [#35462](https://github.cbhq.net/mono/repo/pull/35462), [MONOFE-82](https://jira.coinbase-corp.com/browse/MONOFE-82)

## 0.28.0 (9/29/2021, 02:03 PM PST)

#### 💥 Breaking

- **[Illustration]** 21 New Illustrations. stateID and stateId replaced with identityCard. [#34746](https://github.cbhq.net/mono/repo/pull/34746)

#### 🚀 Updates

- CDS Modal. [#32815](https://github.cbhq.net/mono/repo/pull/32815), [CDS-975](https://jira.coinbase-corp.com/browse/CDS-975)

#### 🐞 Fixes

- System theme sometimes stops tracking on Android. [#35647](https://github.cbhq.net/mono/repo/pull/35647), [CDS-1489](https://jira.coinbase-corp.com/browse/CDS-1489)

## 0.27.2 (9/23/2021, 07:17 AM PST)

#### 🐞 Fixes

- Transparent border on Android fix. [#34771](https://github.cbhq.net/mono/repo/pull/34771)

## 0.27.1 (9/20/2021, 05:13 PM PST)

#### 🚀 Updates

- Support custom background in Sparkline. [#34285](https://github.cbhq.net/mono/repo/pull/34285), [CDS-806](https://jira.coinbase-corp.com/browse/CDS-806)

#### 🐞 Fixes

- Upgrade to React Native v0.64.2. [#33313](https://github.cbhq.net/mono/repo/pull/33313), [FES-19](https://jira.coinbase-corp.com/browse/FES-19)
- Migrate CDS/2FA to new yarn link package structure. [#33903](https://github.cbhq.net/mono/repo/pull/33903), [MONOFE-76](https://jira.coinbase-corp.com/browse/MONOFE-76)

## 0.27.0 (9/16/2021, 05:19 PM PST)

#### 💥 Breaking

- Removed 36 spotSquare. Added 6 illustrations. [#33485](https://github.cbhq.net/mono/repo/pull/33485)

#### 🚀 Updates

- Make <Box/> component faster for most use cases. [#33759](https://github.cbhq.net/mono/repo/pull/33759)

#### 🐞 Fixes

- Fix mispelling in noVisibility illustration. [#33739](https://github.cbhq.net/mono/repo/pull/33739)
- Add codemod for wrapping catch blocks in error instance checks. [#33084](https://github.cbhq.net/mono/repo/pull/33084)
- Fix up all design/eng differences for BetaTextInput. [#33315](https://github.cbhq.net/mono/repo/pull/33315)
- Pbpaste | tail -1. [#33688](https://github.cbhq.net/mono/repo/pull/33688)

#### 📘 Misc

- Added scaleMultiplier prop to illustration. [#32010](https://github.cbhq.net/mono/repo/pull/32010), [CDS-1367](https://jira.coinbase-corp.com/browse/CDS-1367)
- Use new linting, so its faster. [#33221](https://github.cbhq.net/mono/repo/pull/33221)
- Input, BetaTextInput, BetaCompactTextInput and Helper Components to build custom Input. [#32450](https://github.cbhq.net/mono/repo/pull/32450), [CDS-747](https://jira.coinbase-corp.com/browse/CDS-747)

## 0.26.0 (9/15/2021, 12:21 PM PST)

#### 💥 Breaking

- Removed 36 spotSquare. Added 6 illustrations. [#33485](https://github.cbhq.net/mono/repo/pull/33485)

#### 📘 Misc

- Use new linting, so its faster. [#33221](https://github.cbhq.net/mono/repo/pull/33221)
- Input, BetaTextInput, BetaCompactTextInput and Helper Components to build custom Input. [#32450](https://github.cbhq.net/mono/repo/pull/32450), [CDS-747](https://jira.coinbase-corp.com/browse/CDS-747)

## 0.25.3 (9/2/2021, 10:17 AM PST)

#### 🚀 Updates

- Add RootSpectrumPreference and RootScalePreference types with "system". [#30931](https://github.cbhq.net/mono/repo/pull/30931), [CDS-877](https://jira.coinbase-corp.com/browse/CDS-877)

## 0.25.2 (9/1/2021, 10:39 AM PST)

#### 🚀 Updates

- Sept 1st, 2021 Illustration Release. [#31434](https://github.cbhq.net/mono/repo/pull/31434)

#### 🐞 Fixes

- Added thumbsUp and thumbsDown illustration. [#31773](https://github.cbhq.net/mono/repo/pull/31773)

## 0.25.1 (8/30/2021, 05:14 PM PST)

#### 🐞 Fixes

- Re-add line height. [#31337](https://github.cbhq.net/mono/repo/pull/31337)

## 0.25.0 (8/26/2021, 02:47 PM PST)

#### 💥 Breaking

- Date: Aug 26, 2021 - Actions: 2 Updates, 30 New Illustrations. [#31094](https://github.cbhq.net/mono/repo/pull/31094)

#### 🚀 Updates

- Enable Jest rules. [#30635](https://github.cbhq.net/mono/repo/pull/30635)

## 0.24.1 (8/24/2021, 02:31 PM PST)

#### 🚀 Updates

- Link inherit text styles from parent. [#29611](https://github.cbhq.net/mono/repo/pull/29611), [CDS-793](https://jira.coinbase-corp.com/browse/CDS-793)
- LogoSubBrand component. [#30128](https://github.cbhq.net/mono/repo/pull/30128), [CDS-728](https://jira.coinbase-corp.com/browse/CDS-728)

## 0.24.0 (8/19/2021, 09:59 AM PST)

#### 💥 Breaking

- RootThemeProvider for CDS web. [#29706](https://github.cbhq.net/mono/repo/pull/29706), [CDS-701](https://jira.coinbase-corp.com/browse/CDS-701)

#### 🚀 Updates

- Add CoinbaseSans font scales. [#29290](https://github.cbhq.net/mono/repo/pull/29290)

#### 🐞 Fixes

- Added data-testid to all Illustrations. Cleaned up Illustration Props using Generics. [#29758](https://github.cbhq.net/mono/repo/pull/29758), [CDS-855](https://jira.coinbase-corp.com/browse/CDS-855)
- Add icon color to CellMedia. [#29464](https://github.cbhq.net/mono/repo/pull/29464), [CDS-826](https://jira.coinbase-corp.com/browse/CDS-826)

## 0.23.3 (8/16/2021, 08:53 AM PST)

#### 🚀 Updates

- Add illustration scaling and storybook for illustration. [#28452](https://github.cbhq.net/mono/repo/pull/28452), [CDS-810](https://jira.coinbase-corp.com/browse/CDS-810)

#### 🐞 Fixes

- Release cds. [#29049](https://github.cbhq.net/mono/repo/pull/29049)
- Card width when pressable. [#28920](https://github.cbhq.net/mono/repo/pull/28920), [CDS-813](https://jira.coinbase-corp.com/browse/CDS-813)
- Move NavigationIconProp to common, and export it. [#28868](https://github.cbhq.net/mono/repo/pull/28868)

## 0.23.2 (8/10/2021, 11:59 AM PST)

#### 🐞 Fixes

- Card width when pressable. [#28920](https://github.cbhq.net/mono/repo/pull/28920), [CDS-813](https://jira.coinbase-corp.com/browse/CDS-813)
- Move NavigationIconProp to common, and export it. [#28868](https://github.cbhq.net/mono/repo/pull/28868)

## 0.23.1 (8/4/2021, 12:37 PM PST)

#### 🚀 Updates

- Enable TypeScript ESLint rules. [#27666](https://github.cbhq.net/mono/repo/pull/27666)

## 0.23.0 (8/2/2021, 09:34 AM PST)

#### 💥 Breaking

- Rename Inter-SemiBold to Inter-Semi-Bold in CDS fonts. [#27818](https://github.cbhq.net/mono/repo/pull/27818)

#### 🐞 Fixes

- Add testID to Carousel component. [#27133](https://github.cbhq.net/mono/repo/pull/27133), [CDS-768](https://jira.coinbase-corp.com/browse/CDS-768)
- **[CellMedia]** Update icon from primary to foreground. [#27895](https://github.cbhq.net/mono/repo/pull/27895)
- Add clipboard, keyboard, Dex icons. [#27831](https://github.cbhq.net/mono/repo/pull/27831)
- **[CellMedia]** Change image to contain instead of cover. [#27606](https://github.cbhq.net/mono/repo/pull/27606)

## 0.22.0 (7/27/2021, 04:27 PM PST)

#### 💥 Breaking

- Unify useAccessibleForeground params + add Sparkline and SparklineGradient for CDS web. [#23621](https://github.cbhq.net/mono/repo/pull/23621), [CDS-636](https://jira.coinbase-corp.com/browse/CDS-636)

#### 🚀 Updates

- Always include `arrowParens` for Prettier config. [#26971](https://github.cbhq.net/mono/repo/pull/26971)

#### 🐞 Fixes

- Enabled options from InAppOpenWebBrowser to propagate to openWebBrowser. [#26335](https://github.cbhq.net/mono/repo/pull/26335)
- Add svg support to RemoteImage for CDS mobile. [#27121](https://github.cbhq.net/mono/repo/pull/27121), [CDS-696](https://jira.coinbase-corp.com/browse/CDS-696)

#### 📘 Misc

- Add CHANGELOG for packages to CDS website. [#27210](https://github.cbhq.net/mono/repo/pull/27210), [CDS-765](https://jira.coinbase-corp.com/browse/CDS-765)

## 0.21.1 (7/22/2021, 04:46 PM PST)

#### 🚀 Updates

- UseInvertedPaletteColor hook & shouldApplyDarkModeEnhacements to RemoteImage. [#26916](https://github.cbhq.net/mono/repo/pull/26916), [CRN-2135](https://jira.coinbase-corp.com/browse/CRN-2135)

## 0.21.0 (7/21/2021, 04:37 PM PST)

#### 💥 Breaking

- Fix advancedTrading and madeInUsa bug, fix SpotSquare props, update Doc. [#26680](https://github.cbhq.net/mono/repo/pull/26680)

#### 🚀 Updates

- Enable all `trailingCommas` for Prettier config. [#26673](https://github.cbhq.net/mono/repo/pull/26673)

## 0.20.0 (7/20/2021, 12:24 PM PST)

#### 💥 Breaking

- Renamed Nav Icons. [#26215](https://github.cbhq.net/mono/repo/pull/26215)

#### 🚀 Updates

- Use SVG for Illustration and Add Illustration for Web. [#24948](https://github.cbhq.net/mono/repo/pull/24948), [CDS-628](https://jira.coinbase-corp.com/browse/CDS-628)

#### 🐞 Fixes

- Normalize JS testing/linting Bazel macros. [#26432](https://github.cbhq.net/mono/repo/pull/26432)
- Illustrations that do not have dark mode should default to light on web. [#26435](https://github.cbhq.net/mono/repo/pull/26435)

## 0.19.0 (7/2/2021, 10:29 AM PST)

#### 💥 Breaking

- Add new icons. [#25338](https://github.cbhq.net/mono/repo/pull/25338)

#### 🚀 Updates

- **[Pressable]** Add onPressIn and onPressOut. [#25398](https://github.cbhq.net/mono/repo/pull/25398)

#### 🐞 Fixes

- Add readerMode as optional config and add close InAppBrowser when errored. [#25314](https://github.cbhq.net/mono/repo/pull/25314)
- Support data in `eslint_fix` and `eslint_test`. [#25346](https://github.cbhq.net/mono/repo/pull/25346)
- **[CellMedia]** Resolve image paths correctly and remove restrictions. [#25096](https://github.cbhq.net/mono/repo/pull/25096)

#### 📘 Misc

- Apply new ESLint rules to CDS. [#25195](https://github.cbhq.net/mono/repo/pull/25195)

## 0.18.3 (6/29/2021, 11:49 AM PST)

#### 🐞 Fixes

- Add await to openWebBrowser. [#25088](https://github.cbhq.net/mono/repo/pull/25088)

## 0.18.2 (6/29/2021, 10:11 AM PST)

#### 🚀 Updates

- Add pictogram illustration support to cells. [#24965](https://github.cbhq.net/mono/repo/pull/24965)

#### 🐞 Fixes

- Make cell icon blue when pressable. [#24872](https://github.cbhq.net/mono/repo/pull/24872)
- Allowed types to be more restrictive for Card. [#24902](https://github.cbhq.net/mono/repo/pull/24902)
- **[ListCell]** Make description muted. [#24893](https://github.cbhq.net/mono/repo/pull/24893)

## 0.18.1 (6/24/2021, 03:06 PM PST)

#### 🚀 Updates

- **[Cell]** Remove restrictions, fix truncation, and support new `priority` prop. [#24497](https://github.cbhq.net/mono/repo/pull/24497)
- Support `to` and `onPress` on all linkables. [#24172](https://github.cbhq.net/mono/repo/pull/24172)

#### 🐞 Fixes

- UA-1117: Fix issue with useLottieColorFilters source undefined issue. [#24383](https://github.cbhq.net/mono/repo/pull/24383)
- Fixing carousel dismiss (of the last item) scrolling on Android. [#24335](https://github.cbhq.net/mono/repo/pull/24335)
- Support offsetHorizontal prop on cells. [#24441](https://github.cbhq.net/mono/repo/pull/24441)
- Add overflow: hidden to Card children. [#24067](https://github.cbhq.net/mono/repo/pull/24067)

## 0.18.0 (6/22/2021, 11:48 AM PST)

#### 💥 Breaking

- Add allowFontScaling back but set maxFontSizeMultiplier to 1. [#24196](https://github.cbhq.net/mono/repo/pull/24196), [CDS-657](https://jira.coinbase-corp.com/browse/CDS-657)

#### 🐞 Fixes

- Made it so that OpenWebBrowserOptions is optional. [#24192](https://github.cbhq.net/mono/repo/pull/24192)
- Supports strings. [#24130](https://github.cbhq.net/mono/repo/pull/24130)

## 0.17.0 (6/17/2021, 05:25 PM PST)

#### 💥 Breaking

- Add a RootThemeProvider with device fontScale mapped to CDS scale. [#23725](https://github.cbhq.net/mono/repo/pull/23725), [CDS-448](https://jira.coinbase-corp.com/browse/CDS-448)
- Update useOpenExternalUrl API. [#23642](https://github.cbhq.net/mono/repo/pull/23642)

#### 🐞 Fixes

- Add new nav icon. [#23683](https://github.cbhq.net/mono/repo/pull/23683)
- Add node, react, and react-native ESLint configs. [#22869](https://github.cbhq.net/mono/repo/pull/22869)

## 0.16.0 (6/16/2021, 11:57 AM PST)

#### 💥 Breaking

- **[Box]** Rework border props. [#23543](https://github.cbhq.net/mono/repo/pull/23543)
- CDS card for web. [#23418](https://github.cbhq.net/mono/repo/pull/23418), [CDS-627](https://jira.coinbase-corp.com/browse/CDS-627)

#### 🐞 Fixes

- Disable flex grow/shrink when providing an explicit width. [#23529](https://github.cbhq.net/mono/repo/pull/23529)
- Mobile Carousel dismiss indexes to ids. [#23578](https://github.cbhq.net/mono/repo/pull/23578)

## 0.15.9 (6/11/2021, 02:37 PM PST)

#### 🚀 Updates

- Carousel component for CDS mobile. [#22517](https://github.cbhq.net/mono/repo/pull/22517), [CDS-611](https://jira.coinbase-corp.com/browse/CDS-611)

## 0.15.8 (6/11/2021, 09:44 AM PST)

#### 🐞 Fixes

- Add new Illustration Variant, Add images to node_module, Add first ever dark mode illustration. [#23100](https://github.cbhq.net/mono/repo/pull/23100)

## 0.15.7 (6/10/2021, 12:25 PM PST)

#### 🚀 Updates

- **[Cell]** Add `detailWidth` and `reduceHorizontalSpacing` props. [#23020](https://github.cbhq.net/mono/repo/pull/23020)
- Add overflow hidden option to Box. [#22523](https://github.cbhq.net/mono/repo/pull/22523)
- Illustration Component for Mobile. [#19813](https://github.cbhq.net/mono/repo/pull/19813), [CDS-552](https://jira.coinbase-corp.com/browse/CDS-552)

#### 🐞 Fixes

- Fix docusaurus and add new icon. [#22956](https://github.cbhq.net/mono/repo/pull/22956)

## 0.15.6 (6/9/2021, 12:45 PM PST)

#### 🐞 Fixes

- Update SVGO config file to use JS instead of YAML. Icon Cleanup work. [#22664](https://github.cbhq.net/mono/repo/pull/22664)
- Increase list cell height. [#22775](https://github.cbhq.net/mono/repo/pull/22775)

## 0.15.5 (6/8/2021, 11:45 AM PST)

#### 🐞 Fixes

- Set readerMode to false for openWebBrowser. [#22561](https://github.cbhq.net/mono/repo/pull/22561)
- Tighten cell spacing. [#22554](https://github.cbhq.net/mono/repo/pull/22554)

## 0.15.4 (6/4/2021, 04:23 PM PST)

#### 🐞 Fixes

- Multi line descriptions on mobile list cells. [#22461](https://github.cbhq.net/mono/repo/pull/22461)

## 0.15.3 (6/4/2021, 01:45 PM PST)

#### 🚀 Updates

- **[ListCell]** Add intermediary support for sparklines. [#22324](https://github.cbhq.net/mono/repo/pull/22324)

#### 🐞 Fixes

- **[ListCell,ContentCell]** Fix empty strings crashing cells on mobile. [#22302](https://github.cbhq.net/mono/repo/pull/22302)
- Export overlayPalettes and cardSizes. [#22380](https://github.cbhq.net/mono/repo/pull/22380)
- Remove max width when action exists. [#22285](https://github.cbhq.net/mono/repo/pull/22285)
- Upgrade to Prettier v2.3. [#22232](https://github.cbhq.net/mono/repo/pull/22232)
- Fix cell icon sizing. [#22175](https://github.cbhq.net/mono/repo/pull/22175)

## 0.15.2 (6/2/2021, 02:11 PM PST)

#### 🚀 Updates

- BorderRadius styles for card with pin prop. [#21916](https://github.cbhq.net/mono/repo/pull/21916), [CDS-591](https://jira.coinbase-corp.com/browse/CDS-591)
- Overlay and OverlayProvider for mobile. [#21994](https://github.cbhq.net/mono/repo/pull/21994), [CDS-576](https://jira.coinbase-corp.com/browse/CDS-576)
- **[ListCell]** Add multiline prop and improve edge spacing. [#21942](https://github.cbhq.net/mono/repo/pull/21942)

#### 🐞 Fixes

- Made active an optional prop. [#21664](https://github.cbhq.net/mono/repo/pull/21664)

## 0.15.1 (5/26/2021, 06:34 AM PST)

#### 🐞 Fixes

- Cds-mobile elevation style for android take 2. [#21331](https://github.cbhq.net/mono/repo/pull/21331)

## 0.15.0 (5/25/2021, 12:50 PM PST)

#### 💥 Breaking

- Add color folder to common and move color utils. [#21028](https://github.cbhq.net/mono/repo/pull/21028), [CDS-570](https://jira.coinbase-corp.com/browse/CDS-570)

#### 🚀 Updates

- Sparkline and SparklineGradient components for mobile. [#21081](https://github.cbhq.net/mono/repo/pull/21081), [CDS-577](https://jira.coinbase-corp.com/browse/CDS-577)

#### 🐞 Fixes

- Added more test cases for Link Mobile. [#20988](https://github.cbhq.net/mono/repo/pull/20988), [CDS-569](https://jira.coinbase-corp.com/browse/CDS-569)
- Elevation and border styles in mobile. [#21174](https://github.cbhq.net/mono/repo/pull/21174), [CDS-574](https://jira.coinbase-corp.com/browse/CDS-574)

## 0.14.0 (5/25/2021, 12:44 PM PST)

#### 💥 Breaking

- Add color folder to common and move color utils. [#21028](https://github.cbhq.net/mono/repo/pull/21028), [CDS-570](https://jira.coinbase-corp.com/browse/CDS-570)

#### 🚀 Updates

- Sparkline and SparklineGradient components for mobile. [#21081](https://github.cbhq.net/mono/repo/pull/21081), [CDS-577](https://jira.coinbase-corp.com/browse/CDS-577)

#### 🐞 Fixes

- Added more test cases for Link Mobile. [#20988](https://github.cbhq.net/mono/repo/pull/20988), [CDS-569](https://jira.coinbase-corp.com/browse/CDS-569)
- Elevation and border styles in mobile. [#21174](https://github.cbhq.net/mono/repo/pull/21174), [CDS-574](https://jira.coinbase-corp.com/browse/CDS-574)

## 0.13.0 (5/20/2021, 02:42 PM PST)

#### 💥 Breaking

- Mobile pressable to respect hitSlop and elevation overflow. [#20023](https://github.cbhq.net/mono/repo/pull/20023), [CDS-519](https://jira.coinbase-corp.com/browse/CDS-519)

#### 🚀 Updates

- Add block prop to pressables. [#20685](https://github.cbhq.net/mono/repo/pull/20685)
- Add cell components for web. [#20627](https://github.cbhq.net/mono/repo/pull/20627)
- Add Navigation Icon for Web. [#20465](https://github.cbhq.net/mono/repo/pull/20465), [CDS-249](https://jira.coinbase-corp.com/browse/CDS-249)
- Color overrides for elevated layers in dark mode. [#20601](https://github.cbhq.net/mono/repo/pull/20601), [CDS-560](https://jira.coinbase-corp.com/browse/CDS-560)

#### 🐞 Fixes

- Transparent background for pressableOpacity. [#20556](https://github.cbhq.net/mono/repo/pull/20556)

## 0.12.3 (5/18/2021, 01:02 PM PST)

#### 🚀 Updates

- TextIcon for Nested Text on CDS mobile. [#20493](https://github.cbhq.net/mono/repo/pull/20493), [CDS-559](https://jira.coinbase-corp.com/browse/CDS-559)

#### 🐞 Fixes

- Fix starInactive hollow space being too small. [#20425](https://github.cbhq.net/mono/repo/pull/20425)
- Add variant prop for Link component and Fix nested TextBody issue. [#19083](https://github.cbhq.net/mono/repo/pull/19083)

## 0.12.2 (5/17/2021, 05:38 PM PST)

#### 🚀 Updates

- Add dense height support to buttons. [#20264](https://github.cbhq.net/mono/repo/pull/20264), [CDS-504](https://jira.coinbase-corp.com/browse/CDS-504)
- UseLineHeight, useLineHeightMap and useTypographyStylesMap. [#20207](https://github.cbhq.net/mono/repo/pull/20207), [CDS-537](https://jira.coinbase-corp.com/browse/CDS-537)
- NavigationIcon component release. [#20144](https://github.cbhq.net/mono/repo/pull/20144)

#### 🐞 Fixes

- NavigationIcon Component for Mobile. [#20053](https://github.cbhq.net/mono/repo/pull/20053), [CDS-249](https://jira.coinbase-corp.com/browse/CDS-249)

## 0.12.1 (5/13/2021, 06:16 PM PST)

#### 🐞 Fixes

- NavigationIcon Component for Mobile. [#20053](https://github.cbhq.net/mono/repo/pull/20053), [CDS-249](https://jira.coinbase-corp.com/browse/CDS-249)

## 0.12.0 (5/12/2021, 04:45 PM PST)

#### 💥 Breaking

- Move web Icon component to icon font. [#19481](https://github.cbhq.net/mono/repo/pull/19481), [CDS-514](https://jira.coinbase-corp.com/browse/CDS-514)
- Move color utils to common and unify web/mobile. [#19738](https://github.cbhq.net/mono/repo/pull/19738), [CDS-529](https://jira.coinbase-corp.com/browse/CDS-529)

#### 🚀 Updates

- Add Card component to CDS mobile. [#19940](https://github.cbhq.net/mono/repo/pull/19940), [CDS-79](https://jira.coinbase-corp.com/browse/CDS-79)
- Make `testID` a shared prop amongst all components. [#19796](https://github.cbhq.net/mono/repo/pull/19796)
- Add mobile Cell components. [#17208](https://github.cbhq.net/mono/repo/pull/17208)

## 0.11.1 (5/11/2021, 10:48 AM PST)

#### 🐞 Fixes

- fix sortDownCenter and sortUpCenter mixup. @jennifer-liu [#19553](https://github.cbhq.net/mono/repo/pull/19553)

#### 📘 Misc

- Enable ESLint rules from standards meetings @miles-johnson [#19667](https://github.cbhq.net/mono/repo/pull/19667)

## 0.11.0 (5/6/2021, 02:13 PM PST)

#### 💥 Breaking

- Selectable text on CDS mobile to false @katherinemartinez [#19513](https://github.cbhq.net/mono/repo/pull/19513)

#### 📘 Misc

- Automate docgen + add design/implementation tabs @katherinemartinez [#19036](https://github.cbhq.net/mono/repo/pull/19036), [CDS-482](https://jira.coinbase-corp.com/browse/CDS-482)

## 0.10.4 (5/3/2021, 04:31 PM PST)

#### 🐞 Fixes

- move controls testid to the outer animated.view @hannah-jin [#19124](https://github.cbhq.net/mono/repo/pull/19124)

## 0.10.3 (4/30/2021, 01:37 PM PST)

#### 🐞 Fixes

- add camera icon. @jennifer-liu [#18954](https://github.cbhq.net/mono/repo/pull/18954)

## 0.10.2 (4/30/2021, 09:40 AM PST)

#### 🚀 Updates

- Add start/end icon support to buttons. @miles-johnson [#18597](https://github.cbhq.net/mono/repo/pull/18597)

#### 🐞 Fixes

- move control testID to icon @hannah-jin [#18887](https://github.cbhq.net/mono/repo/pull/18887)
- Added React import statement. @jennifer-liu [#18910](https://github.cbhq.net/mono/repo/pull/18910)

## 0.10.1 (4/28/2021, 04:42 PM PST)

#### 🐞 Fixes

- Change Box border to line. @miles-johnson [#18669](https://github.cbhq.net/mono/repo/pull/18669)
- Fix background color of switch component @katherinemartinez [#18589](https://github.cbhq.net/mono/repo/pull/18589), [CDS-452](https://jira.coinbase-corp.com/browse/CDS-452)
- Fix container styles. @miles-johnson [#18548](https://github.cbhq.net/mono/repo/pull/18548)

#### 📘 Misc

- Add interactable and pressable docs. @miles-johnson [#18442](https://github.cbhq.net/mono/repo/pull/18442)

## 0.10.0 (4/26/2021, 02:28 PM PST)

#### 💥 Breaking

- Add debounce to Pressable on mobile @katherinemartinez [#17708](https://github.cbhq.net/mono/repo/pull/17708), [CDS-460](https://jira.coinbase-corp.com/browse/CDS-460)

#### 🚀 Updates

- Add Link Component @jennifer-liu [#16713](https://github.cbhq.net/mono/repo/pull/16713), [CDS-390](https://jira.coinbase-corp.com/browse/CDS-390)
- **[LinkButton]** Update to have a transparent background until interacted with @miles-johnson [#18316](https://github.cbhq.net/mono/repo/pull/18316)

#### 🐞 Fixes

- Make Switch occupy the correct height in layout @hannah-jin [#18271](https://github.cbhq.net/mono/repo/pull/18271)
- Make text elements not expand beyond the parent width @hannah-jin [#18369](https://github.cbhq.net/mono/repo/pull/18369)

## 0.9.1 (4/21/2021, 02:23 PM PST)

#### 🐞 Fixes

- Multi line label controls alignment @hannah-jin [#18012](https://github.cbhq.net/mono/repo/pull/18012)

## 0.9.0 (4/13/2021, 11:30 AM PST)

#### 💥 Breaking

- clean up control API, remove indeterminate @hannah-jin [#17252](https://github.cbhq.net/mono/repo/pull/17252)

#### 🚀 Updates

- **[Pressable]** Add transparent background support [#17376](https://github.cbhq.net/mono/repo/pull/17376)

## 0.8.0 (4/12/2021, 12:52 PM PST)

#### 💥 Breaking

- Improve mobile pressable/interactable @miles-johnson [#17104](https://github.cbhq.net/mono/repo/pull/17104)

#### 🚀 Updates

- Implement Switch Component @hannah-jin [#15647](https://github.cbhq.net/mono/repo/pull/15647), [CDS-308](https://jira.coinbase-corp.com/browse/CDS-308)

## 0.7.7 (4/8/2021, 01:01 PM PST)

#### 🐞 Fixes

- **[PressableHighlight]** Pass style props. @miles-johnson [#17060](https://github.cbhq.net/mono/repo/pull/17060)
- Ensure status bar animates and fix AndroidNavigationBar color parsing @katherinemartinez [#17052](https://github.cbhq.net/mono/repo/pull/17052)
- Inter-SemiBold type naming for Android @hannah-jin [#17038](https://github.cbhq.net/mono/repo/pull/17038)
- Remove duplicate textAlignStyle in cds-mobile Text @katherinemartinez [#17033](https://github.cbhq.net/mono/repo/pull/17033)

## 0.7.6 (4/7/2021, 07:52 PM PST)

#### 🚀 Updates

- Web Checkbox, CheckboxGroup, and RadioGroup components @hannah-jin [#16628](https://github.cbhq.net/mono/repo/pull/16628), [CDS-308](https://jira.coinbase-corp.com/browse/CDS-308)
- Add StatusBar and AndroidNavigationBar to cds-mobile @katherinemartinez [#16898](https://github.cbhq.net/mono/repo/pull/16898), [CDS-377](https://jira.coinbase-corp.com/browse/CDS-377)
- Mobile Checkbox, CheckboxGroup, RadioGroup @hannah-jin [#16219](https://github.cbhq.net/mono/repo/pull/16219), [CDS-308](https://jira.coinbase-corp.com/browse/CDS-308)

## 0.7.5 (4/5/2021, 07:08 PM PST)

#### 🚀 Updates

- CDS Loader @jennifer-liu [#13964](https://github.cbhq.net/mono/repo/pull/13964), [CDS-273](https://jira.coinbase-corp.com/browse/CDS-273)

#### 🐞 Fixes

- useTextAlign return value for cds-mobile @katherinemartinez [#16750](https://github.cbhq.net/mono/repo/pull/16750)

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
