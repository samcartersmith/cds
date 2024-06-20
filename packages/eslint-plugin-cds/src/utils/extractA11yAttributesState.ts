import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

import { checkForInnerText } from './checkForInnerText';

/**
 * Extracts a11y attribute presence information from a JSXOpeningElement.
 *
 * @param {TSESTree.JSXOpeningElement} node - The JSX opening element node.
 * @returns An object containing the states of required a11y attributes and the component name.
 */
export const extractA11yAttributesState = (
  parent: TSESTree.JSXElement,
  node: TSESTree.JSXOpeningElement,
) => {
  let hasAccessibilityLabel = false;
  let hasControlledElementAccessibilityProps = false;
  let hasSpreadProps = false;
  let componentName: string | undefined;

  const hasInnerText = checkForInnerText(parent);

  if (node.name.type === AST_NODE_TYPES.JSXIdentifier) {
    componentName = node.name.name as string;
  } else if (node.name.type === AST_NODE_TYPES.JSXMemberExpression) {
    componentName = node.name.property.name as string;
  }

  if (!componentName) {
    throw Error('Component name not found for node');
  }

  const allNodes = node.attributes as (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[];

  // Loop through all the JSX from the initial JSXOpeningElement
  allNodes.forEach((attr) => {
    if (attr.type === AST_NODE_TYPES.JSXAttribute && attr.name.name === 'accessibilityLabel') {
      hasAccessibilityLabel = true;
    } else if (
      attr.type === AST_NODE_TYPES.JSXSpreadAttribute &&
      attr.argument.type === AST_NODE_TYPES.Identifier &&
      attr.argument.name === 'controlledElementAccessibilityProps'
    ) {
      hasControlledElementAccessibilityProps = true;
    } else if (attr.type === AST_NODE_TYPES.JSXSpreadAttribute) {
      hasSpreadProps = true;
    }
  });
  return {
    hasAccessibilityLabel,
    hasControlledElementAccessibilityProps,
    hasSpreadProps,
    componentName,
    hasInnerText,
  };
};
