/**
 * For Mobile.
 * ESLint rule for has-valid-accessibility-descriptors with extended CDS specific component targeting.
 * Checks for the presence of an `accessibilityLabel` on designated Mobile CDS components.
 * The rule does not flag components:
 * - they contain inner text or
 * - have props spread.
 */

import { type TSESLint } from '@typescript-eslint/utils';

import { extractA11yAttributesState } from '../utils/extractA11yAttributesState';

type MessageIds =
  | 'missingAccessibilityLabel'
  | 'missingHandleBarAccessibilityLabel'
  | 'missingHelperTextErrorIconAccessibilityLabel'
  | 'missingCalendarIconButtonAccessibilityLabel'
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
    'StickyFooter',
    'ProgressBar',
    'Select',
    'NavigationBar',
    'Sidebar',
    'Popover',
  ],
  checkForMissingHandleBarAccessibilityLabel: ['Drawer', 'SelectChip', 'Tray'],
  checkForHelperTextErrorIconAccessibilityLabelProps: ['TextInput'],
  checkForCalendarIconButtonAccessibilityLabelProps: ['DatePicker'],
  checkForCardDismissAccessibilityLabelProps: ['NudgeCard', 'UpsellCard'],
  checkForSearchInputAccessibilityLabelProps: ['SearchInput'],
};

export const hasValidA11yDescriptorsExtended: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'Checks for the presence of accessibilityLabel on Web CDS components. Will not flag it component has text content inside the element.',
    },
    messages: {
      missingAccessibilityLabel: `Missing 'accessibilityLabel' on <{{componentName}}>.`,
      missingHandleBarAccessibilityLabel: `Missing 'handleBarAccessibilityLabel' on <{{componentName}}>.`,
      missingHelperTextErrorIconAccessibilityLabel: `Missing 'helperTextErrorIconAccessibilityLabel' on <{{componentName}}>.`,
      missingCalendarIconButtonAccessibilityLabel: `Missing 'calendarIconButtonAccessibilityLabel' on <{{componentName}}>.`,
      missingCardDismissAccessibilityLabel: `Missing 'accessibilityLabel' on <{{componentName}}> for dismiss button.`,
      missingStartIconAccessibilityLabel: `Missing 'startIconAccessibilityLabel' on <{{componentName}}>.`,
      missingClearIconAccessibilityLabel: `Missing 'clearIconAccessibilityLabel' on <{{componentName}}>.`,
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      JSXElement(node) {
        const {
          hasAccessibilityLabel,
          hasSpreadProps,
          componentName,
          hasInnerText,
          hasHandleBarAccessibilityLabelProps,
          hasHelperTextErrorIconAccessibilityLabel,
          hasCalendarIconButtonAccessibilityLabel,
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
            configArray: config.checkForMissingHandleBarAccessibilityLabel,
            condition: !hasHandleBarAccessibilityLabelProps,
            messageId: 'missingHandleBarAccessibilityLabel',
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
          if (configArray.includes(componentName) && condition) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            context.report({
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
