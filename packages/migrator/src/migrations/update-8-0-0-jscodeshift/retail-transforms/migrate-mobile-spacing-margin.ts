/**
 * Codemod to transform spacing and offset props to padding and margin props for custom components.
 *
 * This codemod looks for specific custom components (defined in CUSTOM_COMPONENTS) and transforms
 * their spacing and offset props to use the new padding and margin prop names.
 *
 * Example transformations:
 * Before:
 * ```
 * <ConfirmationCell spacing={4} spacingHorizontal={2} offset={1}>
 *   <Text>Content</Text>
 * </ConfirmationCell>
 * ```
 *
 * After:
 * ```
 * <ConfirmationCell padding={4} paddingX={2} margin={-1}>
 *   <Text>Content</Text>
 * </ConfirmationCell>
 * ```
 */

import type { API, ASTPath, FileInfo, JSXElement, Options } from 'jscodeshift';
import { ImportDeclaration, VariableDeclarator } from 'jscodeshift';

const propMapping = {
  spacing: 'padding',
  spacingStart: 'paddingStart',
  spacingEnd: 'paddingEnd',
  spacingTop: 'paddingTop',
  spacingBottom: 'paddingBottom',
  spacingHorizontal: 'paddingX',
  spacingVertical: 'paddingY',
  offset: 'margin',
  offsetTop: 'marginTop',
  offsetBottom: 'marginBottom',
  offsetStart: 'marginStart',
  offsetEnd: 'marginEnd',
  offsetHorizontal: 'marginX',
  offsetVertical: 'marginY',
} as const;

// Props that need negative values (offset -> margin)
const marginProps = new Set([
  'margin',
  'marginTop',
  'marginBottom',
  'marginStart',
  'marginEnd',
  'marginX',
  'marginY',
]);

const CUSTOM_COMPONENTS = ['ConfirmationCell', 'Button'];

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Check if the file has any custom components
  const hasCustomComponents = root.find(j.JSXElement).some((path: ASTPath<JSXElement>) => {
    const openingElement = path.node.openingElement;
    if (openingElement.name.type === 'JSXIdentifier') {
      return CUSTOM_COMPONENTS.includes(openingElement.name.name);
    }
    return false;
  });

  if (!hasCustomComponents) {
    // If no custom components are found, return the original source unchanged
    // This avoids the re-parsing/re-printing formatting changes.
    return file.source;
  }

  // Find all JSX elements whose tag matches a custom component name
  const elements = root.find(j.JSXElement).filter((path: ASTPath<JSXElement>) => {
    const openingElement = path.node.openingElement;
    if (openingElement.name.type === 'JSXIdentifier') {
      // <ConfirmationCell ...>
      return CUSTOM_COMPONENTS.includes(openingElement.name.name);
    }
    return false;
  });

  // For each matching custom component, map old prop names to new prop names and handle negative values
  let modified = false;
  elements.forEach((path: ASTPath<JSXElement>) => {
    const attributes = path.node.openingElement.attributes || [];
    attributes.forEach((attr) => {
      if (
        attr.type === 'JSXAttribute' &&
        attr.name.type === 'JSXIdentifier' &&
        Object.prototype.hasOwnProperty.call(propMapping, attr.name.name)
      ) {
        const oldPropName = attr.name.name as keyof typeof propMapping;
        const newPropName = propMapping[oldPropName];

        // Update the prop name
        attr.name.name = newPropName;
        modified = true;

        // Handle negative values for margin props (offset -> margin)
        if (marginProps.has(newPropName) && attr.value) {
          if (attr.value.type === 'Literal' && typeof attr.value.value === 'number') {
            // Simple numeric literal: offset={4} -> margin={-4}, but skip if value is 0
            if (attr.value.value !== 0) {
              attr.value.value = -attr.value.value;
            }
          } else if (attr.value.type === 'JSXExpressionContainer') {
            const expression = attr.value.expression;

            if (
              (expression.type === 'Literal' || expression.type === 'NumericLiteral') &&
              typeof (expression as any).value === 'number'
            ) {
              // Expression with numeric literal: offset={4} -> margin={-4}, but skip if value is 0
              if ((expression as any).value !== 0) {
                (expression as any).value = -(expression as any).value;
              }
            } else if (expression.type !== 'JSXEmptyExpression') {
              // Check if the expression is just a literal 0
              const isZeroLiteral = (node: any): boolean => {
                return (
                  node &&
                  (node.type === 'Literal' || node.type === 'NumericLiteral') &&
                  node.value === 0
                );
              };

              // Skip negation if the expression is just 0
              if (isZeroLiteral(expression)) {
                return;
              }

              // Check if it's a ternary with both branches being 0
              const isTernaryWithZeros = (node: any): boolean => {
                return (
                  node &&
                  node.type === 'ConditionalExpression' &&
                  isZeroLiteral(node.consequent) &&
                  isZeroLiteral(node.alternate)
                );
              };

              // Skip negation if it's a ternary with all zeros
              if (isTernaryWithZeros(expression)) {
                return;
              }

              // Create negated expression that preserves zeros
              const createNegatedExpression = (node: any): any => {
                if (isZeroLiteral(node)) {
                  // Keep zero as zero
                  return node;
                }

                if (node.type === 'ConditionalExpression') {
                  // Handle ternary: negate each branch individually
                  return j.conditionalExpression(
                    node.test,
                    createNegatedExpression(node.consequent),
                    createNegatedExpression(node.alternate),
                  );
                }

                // For all other cases, create unary minus
                return j.unaryExpression('-', node);
              };

              // Create the negated expression
              const negatedExpression = createNegatedExpression(expression);
              attr.value.expression = negatedExpression;
            }
          }
        }
      }
    });
  });

  // Only return new source if changes were made, otherwise return original
  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
