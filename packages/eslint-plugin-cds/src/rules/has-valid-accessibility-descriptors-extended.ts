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

type MessageIds = 'missingAccessibilityLabel';

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
  ],
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
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      JSXElement(node) {
        const { hasAccessibilityLabel, hasSpreadProps, componentName, hasInnerText } =
          extractA11yAttributesState(node, node.openingElement);
        if (
          config.componentsRequiringAccessibilityLabel.includes(componentName) &&
          !hasAccessibilityLabel &&
          !(hasSpreadProps || hasInnerText)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          context.report({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            node,
            messageId: 'missingAccessibilityLabel',
            data: { componentName },
          });
        }
      },
    };
  },
};
