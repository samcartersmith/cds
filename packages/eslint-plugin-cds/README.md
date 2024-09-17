# @cbhq/eslint-plugin-cds

## 🔗 Go link: [go/cds-a11y-rules](http://go/cds-a11y-rules)

## Overview

The CDS ESLint Plugin targets gaps in existing accessibility linting and CDS Best Practices that were identified in our [CDS A11y linting rules audit](https://docs.google.com/spreadsheets/d/1qL_83p7iYsX81OzMjPtZc1xN7oaEbCCXh6hKqkB9otE/edit?usp=sharing).

Currently, the [`cbhq` official plugin](https://github.cbhq.net/frontend/nx-tools/tree/master/packages/eslint-plugin) has two main configs:

- 🌐 [react.ts](https://github.cbhq.net/frontend/nx-tools/blob/master/packages/eslint-plugin/src/configs/react.ts): Used in web repositories and uses `airbnb/rules/react-a11y`. Airbnb react-a11y rules uses [`jsx-a11y` a11y rules](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/main).
- 📱[react-native.ts](https://github.cbhq.net/frontend/nx-tools/blob/master/packages/eslint-plugin/src/configs/react-native.ts): Used in mobile repositories and uses `react-native-a11y` for accessibility.

There is currently a gap in the existing ruleset that cannot target specific CDS components.
More detail found in [P/PS: CDS ESLint Plugin For Accessibility Remediation](https://docs.google.com/document/d/1zZvMw53YysvSuPd9Uph7Yr3JewpIfSVK_a9eeJ6Xktw/edit?usp=sharing)

🎯 Our goal with the `eslint-plugin-cds` package is to create new rules to address these gaps in accessibility and to enforce CDS Best Practices.

## Development

### Building Locally

To build locally, run

```
yarn nx run eslint-plugin-cds:build
```

### Creating New Rule

To create a new ESLint rule, you can add your rule from the `packages/eslint-plugin-cds/src/rules/` directory.

We have two configs:

- mobile: config containing rules targeting mobile / react-native rules
- web: config containing rules targeting web / react rules

After creating a rule, be sure to add it to the appropriate config.

Note: Use [AST Explorer](https://astexplorer.net/) with parser set to `@typescript-eslint/parser` to determine AST node types.

### Testing on Consumer Repos Locally

To test on consumer repos locally, you will need to build your `eslint-plugin-cds` package, add your package to the `package.json` and modify `eslintrc`.

1. Build your local package

   ```
   yarn nx run eslint-plugin-cds:build
   ```

2. Add your package as a `devDependency` in the consumer's `package.json`. Use the path in your local directory.
   ```
   "@cbhq/eslint-plugin-cds": "file:../cds/packages/eslint-plugin-cds",
   ```
3. Add your plugin and extend your specific config in the `.eslintrc.js` file.

   📝 Note: There are differences between `extends` and `plugins`:

   - `extends`: Allows you to use and build upon an existing set of ESLint rules defined in another configuration. Useful for adhering to standardized coding styles like Airbnb or Google.
     - By using the extends keyword, you're not just making rules available, but you are actively applying a set of predefined rules from another configuration. This means that the rules defined in the extended configurations are automatically enforced in your project, unless explicitly overridden.
   - `plugins`: Introduces new rules or environments to ESLint that extend its core capabilities, tailored for specific frameworks or libraries.
     - When you use plugins, you make a set of additional rules available to your configuration. However, simply including a plugin does not apply those rules. You must explicitly enable the rules provided by the plugin in your configuration file to enforce them in your project. Essentially, plugins expand the rule set that you can choose from, but they don't enforce any rules by default.

   Examples:

   - [react-native draft PR](https://github.cbhq.net/consumer/react-native/pull/31138)
   - [coinbase-wwww draft PR](https://github.cbhq.net/frontend/coinbase-www/pull/36718)
   - [wallet-mobile - RN only draft PR](https://github.cbhq.net/wallet/wallet-mobile/pull/21702)

4. Run `yarn` in root directory or `workspace`.
5. Run `yarn nx run <target>:lint` or `npx eslint .` in root directory or `workspace`.
   - 💡 Tip: Run `npx eslint . > eslint_output.txt` to be able to see all the output.

## CDS Rules

## ♿ Accessibility Rules

We currently have two additional accessibility rules:

### 🔍  controlHasAssociatedLabelExtended (Web)

**Rule Description**:

The `controlHasAssociatedLabelExtended` rule checks for the presence of an `accessibilityLabel` or other specific a11yLabel props on designated Web CDS components.

The `accessibilityLabel` is required for components listed under `componentsRequiringAccessibilityLabel`. The rule enforces that these components must have an `accessibilityLabel` attribute unless:

- They contain inner text, or
- They have props spread which might implicitly handle accessibility.

**Targeted Components** This rule specifically targets components such as:

- `Button`
- `Checkbox`
- `InputChip`
- `IconButton`
- `IconCounterButton`
- `Pressable`
- `Switch`
- `TextInput`
- `FeedCard`
- `ProgressBar`
- `Select`
- `NavigationBar`
- `Sidebar`
- `Popover`

**Extended A11y Lint Coverage**:

This rule also checks for other required a11y labels that need to be enforced outside of `accessibilityLabel`.

For components listed under `collapsibleCheckForControlledElementAccessibilityProps`, this rule ensures that `controlledElementAccessibilityProps` are provided to manage their accessibility state dynamically.

**Extended Targeted Components**

- `Collapsible`, `Dropdown`
  - Checks for presence of `controlledElementAccessibilityProps`
- `TextInput`, `SelectStack`
  - Checks for presence of `helperTextErrorIconAccessibilityLabel`
- `DatePicker`
  - Checks for presence of `calendarIconButtonAccessibilityLabel`
- `DatePicker`, `Calendar`, `TabNavigation`
  - Checks for presence of `nextArrowAccessibilityLabel` and `previousArrowAccessibilityLabel`
- `NudgeCard`, `UpsellCard`
  - Checks for presence of `accessibilityLabel` when `onDismissPress` is present
- `SearchInput`
  - Checks for presence of `startIconAccessibilityLabel` and `clearIconAccessibilityLabel`

### 🔍  hasValidA11yDescriptorsExtended (mobile)

**Rule Description**:

The `hasValidA11yDescriptorsExtended` rule verifies that mobile CDS components such as buttons and switches have an `accessibilityLabel` or other specific a11yLabel props on designated Mobile CDS components. It does not flag components if:

- They contain inner text that serves as an implicit label.
- They have properties spread that can implicitly provide accessibility attributes.

**Targeted Components** This rule specifically targets components such as:

- `Button`
- `Checkbox`
- `InputChip`
- `IconButton`
- `IconCounterButton`
- `Pressable`
- `Switch`
- `TextInput`
- `FeedCard`
- `StickyFooter`
- `ProgressBar`
- `Select`
- `NavigationBar`
- `Sidebar`
- `Popover`

**Extended A11y Lint Coverage**:

This rule also checks for other required a11y labels that need to be enforced outside of `accessibilityLabel`.

**Extended Targeted Components**

- `Drawer`, `SelectChip`, `Tray`
  - Checks for presence of `handleBarAccessibilityLabel`
- `TextInput`
  - Checks for presence of `helperTextErrorIconAccessibilityLabel`
- `DatePicker`
  - Checks for presence of `calendarIconButtonAccessibilityLabel`
- `NudgeCard`, `UpsellCard`
  - Checks for presence of `accessibilityLabel` when `onDismissPress` is present
- `SearchInput`
  - Checks for presence of `startIconAccessibilityLabel` and `clearIconAccessibilityLabel`

### Current CDS Best Practices Rules

TBD

### Resources

- [Fixing A11y Engine Issues Guidebook](https://docs.google.com/document/d/1vafx_gnf8VKF9Kc6O-HGIftymI0obnn0-HnriOnWCE0/edit)
