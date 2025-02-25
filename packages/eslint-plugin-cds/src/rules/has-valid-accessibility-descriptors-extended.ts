/**
 * For Mobile.
 * ESLint rule for has-valid-accessibility-descriptors with extended CDS specific component targeting.
 * Checks for the presence of an `accessibilityLabel` on designated Mobile CDS components.
 * The rule does not flag components:
 * - they contain inner text or
 * - have props spread.
 */

import { type TSESLint, AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

import { extractA11yAttributesState } from '../utils/extractA11yAttributesState';
import { getSimpleNameFromJSX } from '../utils/getSimpleNameFromJSX';

type MessageIds =
  | 'missingAccessibilityLabel'
  | 'missingAccessibilityLabelSuggestion'
  | 'missingHandleBarAccessibilityLabel'
  | 'missingHelperTextErrorIconAccessibilityLabel'
  | 'missingCalendarIconButtonAccessibilityLabel'
  | 'missingCardDismissAccessibilityLabel';

type ConditionalCheckType = {
  configArray: string[];
  condition: boolean;
  messageId: MessageIds;
  suggestedPropToAdd?: string;
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

  allowedPackages: ['@cbhq/cds-common', '@cbhq/cds-mobile', '@cbhq/cds-mobile-visualization'],
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
      missingAccessibilityLabelSuggestion: `Add missing accessibility label`,
      missingHandleBarAccessibilityLabel: `Missing 'handleBarAccessibilityLabel' on <{{componentName}}>.`,
      missingHelperTextErrorIconAccessibilityLabel: `Missing 'helperTextErrorIconAccessibilityLabel' on <{{componentName}}>.`,
      missingCalendarIconButtonAccessibilityLabel: `Missing 'calendarIconButtonAccessibilityLabel' on <{{componentName}}>.`,
      missingCardDismissAccessibilityLabel: `Missing 'accessibilityLabel' on <{{componentName}}> for dismiss button.`,
    },
    hasSuggestions: true,
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
          hasLabel,
          hasAccessibilityLabel,
          hasSpreadProps,
          componentName,
          hasInnerText,
          hasHandleBarAccessibilityLabelProps,
          hasHelperTextErrorIconAccessibilityLabel,
          hasCalendarIconButtonAccessibilityLabel,
          hasOnDismissPressProp,
        } = extractA11yAttributesState(node, node.openingElement);

        let isTextInputWithNegativeVariant = true;
        if (getSimpleNameFromJSX(node.openingElement) === 'TextInput') {
          const attributes = node.openingElement.attributes as TSESTree.JSXAttribute[];
          const variantAttribute = attributes.find((attr) => attr.name?.name === 'variant');
          if (variantAttribute) {
            const variantValue = variantAttribute.value;
            if (variantValue && variantValue.type === AST_NODE_TYPES.Literal) {
              isTextInputWithNegativeVariant = variantValue.value === 'negative';
            }
          } else {
            // No variant attribute found
            isTextInputWithNegativeVariant = false;
          }
        } else {
          // Not a TextInput
          isTextInputWithNegativeVariant = false;
        }

        const conditionalChecks: ConditionalCheckType[] = [
          {
            configArray: config.componentsRequiringAccessibilityLabel,
            condition: !hasAccessibilityLabel && !(hasSpreadProps || hasInnerText || hasLabel),
            messageId: 'missingAccessibilityLabel',
            suggestedPropToAdd: 'accessibilityLabel',
          },
          {
            configArray: config.checkForMissingHandleBarAccessibilityLabel,
            condition: !hasHandleBarAccessibilityLabelProps,
            messageId: 'missingHandleBarAccessibilityLabel',
          },
          {
            configArray: config.checkForHelperTextErrorIconAccessibilityLabelProps,
            condition: !hasHelperTextErrorIconAccessibilityLabel && isTextInputWithNegativeVariant,
            messageId: 'missingHelperTextErrorIconAccessibilityLabel',
            suggestedPropToAdd: 'helperTextErrorIconAccessibilityLabel',
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
        ];

        conditionalChecks.forEach(({ configArray, condition, messageId, suggestedPropToAdd }) => {
          if (
            importedComponents[componentName] &&
            configArray.includes(componentName) &&
            condition
          ) {
            context.report({
              node,
              messageId,
              data: { componentName },
              suggest: suggestedPropToAdd
                ? [
                    {
                      messageId: 'missingAccessibilityLabelSuggestion',
                      fix(fixer) {
                        return fixer.insertTextAfter(
                          node.openingElement.name,
                          ` ${suggestedPropToAdd}=""`,
                        );
                      },
                    },
                  ]
                : [],
            });
          }
        });
      },
    };
  },
};
