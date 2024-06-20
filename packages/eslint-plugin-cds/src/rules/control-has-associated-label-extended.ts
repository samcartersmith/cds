/**
 * For Web.
 * ESLint rule for control-has-associated-label with extended CDS specific component targeting.
 * Checks for the presence of an `accessibilityLabel` on designated Web CDS components.
 * It enforces that components listed under `componentsRequiringAccessibilityLabel` have an `accessibilityLabel`
 * attribute unless
 * - they contain inner text or
 * - have props spread.
 *
 * For components listed under `collapsibleCheckForControlledElementAccessibilityProps`, this rule
 * ensures that `controlledElementAccessibilityProps` are provided.
 */

import { type TSESLint } from '@typescript-eslint/utils';

import { extractA11yAttributesState } from '../utils/extractA11yAttributesState';

type MessageIds = 'missingAccessibilityLabel' | 'missingControlledElementAccessibilityProps';

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
  collapsibleCheckForControlledElementAccessibilityProps: ['Collapsible'],
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
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      JSXElement(node) {
        const {
          hasAccessibilityLabel,
          hasControlledElementAccessibilityProps,
          hasSpreadProps,
          componentName,
          hasInnerText,
        } = extractA11yAttributesState(node, node.openingElement);

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

        if (
          config.collapsibleCheckForControlledElementAccessibilityProps.includes(componentName) &&
          !hasControlledElementAccessibilityProps
        ) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          context.report({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            node,
            messageId: 'missingControlledElementAccessibilityProps',
            data: { componentName },
          });
        }
      },
    };
  },
};
