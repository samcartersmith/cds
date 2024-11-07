/**
 * For Web.
 * ESLint rule for control-has-associated-label with extended CDS specific component targeting.
 * Checks for the presence of an `accessibilityLabel` on designated Web CDS components.
 * It enforces that components listed under `componentsRequiringAccessibilityLabel` have an `accessibilityLabel`
 * attribute unless
 * - they contain inner text or
 * - have props spread.
 *
 * For components listed under `collapsibleCheckForControlledElementAccessibilityProps` and `dropdownCheckForControlledElementAccessibilityProps`, this rule
 * ensures that `controlledElementAccessibilityProps` are provided.
 */

import { type TSESLint, TSESTree } from '@typescript-eslint/utils';

import { extractA11yAttributesState } from '../utils/extractA11yAttributesState';

type MessageIds =
  | 'missingAccessibilityLabel'
  | 'missingControlledElementAccessibilityProps'
  | 'missingControlledElementAccessibilityPropsDropdown'
  | 'missingHelperTextErrorIconAccessibilityLabel'
  | 'missingCalendarIconButtonAccessibilityLabel'
  | 'missingNextArrowAccessibilityLabel'
  | 'missingPreviousArrowAccessibilityLabel'
  | 'missingCardDismissAccessibilityLabel'
  | 'missingStartIconAccessibilityLabel'
  | 'missingClearIconAccessibilityLabel';

type ConditionalCheckType = {
  configArray: string[];
  condition: boolean;
  messageId: MessageIds;
};

const config = {
  componentsRequiringAccessibilityLabel: [
    'Button',
    'Checkbox',
    'InputChip',
    'IconButton',
    'IconCounterButton',
    'Pressable',
    'Switch',
    'TextInput',
    'FeedCard',
    'ProgressBar',
    'Select',
    'NavigationBar',
    'Sidebar',
    'Popover',
  ],
  collapsibleCheckForControlledElementAccessibilityProps: ['Collapsible'],
  dropdownCheckForControlledElementAccessibilityProps: ['Dropdown'],
  checkForHelperTextErrorIconAccessibilityLabelProps: ['TextInput', 'SelectStack'],
  checkForCalendarIconButtonAccessibilityLabelProps: ['DatePicker'],
  checkForArrowAccessibilityProps: ['DatePicker', 'Calendar', 'TabNavigation'],
  checkForCardDismissAccessibilityLabelProps: ['NudgeCard', 'UpsellCard'],
  checkForSearchInputAccessibilityLabelProps: ['SearchInput'],

  allowedPackages: ['@cbhq/cds-common', '@cbhq/cds-web', '@cbhq/cds-web-visualization'],
};

export const controlHasAssociatedLabelExtended: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'Checks for the presence of accessibilityLabel on Mobile CDS components. Will not flag it component has text content inside the element.',
      recommended: 'recommended',
    },
    messages: {
      missingAccessibilityLabel: `Missing 'accessibilityLabel' on <{{componentName}}>.`,
      missingControlledElementAccessibilityProps: `Missing 'controlledElementAccessibilityProps' on <{{componentName}}>. More info: https://cds.cbhq.net/components/collapsible#[object%20Object],Accessibility%20tip%20(web)`,
      missingControlledElementAccessibilityPropsDropdown: `Missing 'controlledElementAccessibilityProps' on <{{componentName}}>. More info: https://cds.cbhq.net/components/dropdown#page=implementation`,
      missingHelperTextErrorIconAccessibilityLabel: `Missing 'helperTextErrorIconAccessibilityLabel' on <{{componentName}}>.`,
      missingCalendarIconButtonAccessibilityLabel: `Missing 'calendarIconButtonAccessibilityLabel' on <{{componentName}}>.`,
      missingNextArrowAccessibilityLabel: `Missing 'nextArrowAccessibilityLabel' on <{{componentName}}>.`,
      missingPreviousArrowAccessibilityLabel: `Missing 'previousArrowAccessibilityLabel' on <{{componentName}}>.`,
      missingCardDismissAccessibilityLabel: `Missing 'accessibilityLabel' on <{{componentName}}> for dismiss button.`,
      missingStartIconAccessibilityLabel: `Missing 'startIconAccessibilityLabel' on <{{componentName}}>.`,
      missingClearIconAccessibilityLabel: `Missing 'clearIconAccessibilityLabel' on <{{componentName}}>.`,
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    const importedComponents: Record<string, string> = {};

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        const packageName = node.source.value;

        if (
          typeof packageName === 'string' &&
          config.allowedPackages.some(
            (pkg) => packageName === pkg || packageName.startsWith(`${pkg}/`),
          )
        ) {
          node.specifiers.forEach((specifier) => {
            switch (specifier.type) {
              case 'ImportSpecifier':
              case 'ImportDefaultSpecifier':
              case 'ImportNamespaceSpecifier':
                importedComponents[specifier.local.name] = packageName;
                break;
              default:
                break;
            }
          });
        }
      },
      JSXElement(node) {
        const {
          hasAccessibilityLabel,
          hasControlledElementAccessibilityProps,
          hasSpreadProps,
          componentName,
          hasInnerText,
          hasHelperTextErrorIconAccessibilityLabel,
          hasCalendarIconButtonAccessibilityLabel,
          hasMissingNextArrowAccessibilityLabel,
          hasMissingPreviousArrowAccessibilityLabel,
          hasOnDismissPressProp,
          hasMissingStartIconAccessibilityLabel,
          hasMissingClearIconAccessibilityLabel,
        } = extractA11yAttributesState(node, node.openingElement);

        const conditionalChecks: ConditionalCheckType[] = [
          {
            configArray: config.componentsRequiringAccessibilityLabel,
            condition: !hasAccessibilityLabel && !(hasSpreadProps || hasInnerText),
            messageId: 'missingAccessibilityLabel',
          },
          {
            configArray: config.collapsibleCheckForControlledElementAccessibilityProps,
            condition: !hasControlledElementAccessibilityProps,
            messageId: 'missingControlledElementAccessibilityProps',
          },
          {
            configArray: config.dropdownCheckForControlledElementAccessibilityProps,
            condition: !hasControlledElementAccessibilityProps,
            messageId: 'missingControlledElementAccessibilityPropsDropdown',
          },
          {
            configArray: config.checkForHelperTextErrorIconAccessibilityLabelProps,
            condition: !hasHelperTextErrorIconAccessibilityLabel,
            messageId: 'missingHelperTextErrorIconAccessibilityLabel',
          },
          {
            configArray: config.checkForCalendarIconButtonAccessibilityLabelProps,
            condition: !hasCalendarIconButtonAccessibilityLabel,
            messageId: 'missingCalendarIconButtonAccessibilityLabel',
          },
          {
            configArray: config.checkForArrowAccessibilityProps,
            condition: !hasMissingNextArrowAccessibilityLabel,
            messageId: 'missingNextArrowAccessibilityLabel',
          },
          {
            configArray: config.checkForArrowAccessibilityProps,
            condition: !hasMissingPreviousArrowAccessibilityLabel,
            messageId: 'missingPreviousArrowAccessibilityLabel',
          },
          {
            // Check for presence of onDismissPress prop and absence of accessibilityLabel
            // Applicable for NudgeCard and UpsellCard where the accessibilityLabel is conditionally rendered
            configArray: config.checkForCardDismissAccessibilityLabelProps,
            condition: !hasAccessibilityLabel && hasOnDismissPressProp,
            messageId: 'missingCardDismissAccessibilityLabel',
          },
          {
            configArray: config.checkForSearchInputAccessibilityLabelProps,
            condition: !hasMissingStartIconAccessibilityLabel,
            messageId: 'missingStartIconAccessibilityLabel',
          },
          {
            configArray: config.checkForSearchInputAccessibilityLabelProps,
            condition: !hasMissingClearIconAccessibilityLabel,
            messageId: 'missingClearIconAccessibilityLabel',
          },
        ];

        conditionalChecks.forEach(({ configArray, condition, messageId }) => {
          if (
            importedComponents[componentName] &&
            configArray.includes(componentName) &&
            condition
          ) {
            context.report({
              node,
              messageId,
              data: { componentName },
            });
          }
        });
      },
    };
  },
};
