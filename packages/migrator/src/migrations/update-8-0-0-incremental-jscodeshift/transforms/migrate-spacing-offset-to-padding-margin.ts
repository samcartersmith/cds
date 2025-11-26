/**
 * Codemod to transform spacing and offset props to padding and margin props for CDS mobile and web components.
 *
 * Example transformations:
 * Before:
 * ```
 * <Box spacing={4} spacingHorizontal={2}>
 *   <Text>Content</Text>
 * </Box>
 *
 * <TextTitle1 spacing={4} spacingTop={3}>
 *   Content
 * </TextTitle1>
 *
 * <Collapsible spacingVertical={1}>
 *   Content
 * </Collapsible>
 *
 * <Box offset={4}>
 *   <Text>Content</Text>
 * </Box>
 *
 * <Box offsetHorizontal={isMobile ? 4 : 2}>
 *   <Text>Content</Text>
 * </Box>
 * ```
 *
 * After:
 * ```
 * <Box padding={4} paddingX={2}>
 *   <Text>Content</Text>
 * </Box>
 *
 * <TextTitle1 padding={4} paddingTop={3}>
 *   Content
 * </TextTitle1>
 *
 * <Collapsible paddingY={1}>
 *   Content
 * </Collapsible>
 *
 * <Box margin={-4}>
 *   <Text>Content</Text>
 * </Box>
 *
 * <Box marginX={isMobile ? -4 : -2>
 *   <Text>Content</Text>
 * </Box>
 * ```
 */

import type {
  API,
  ASTPath,
  FileInfo,
  ImportDeclaration,
  JSXElement,
  Options,
  VariableDeclarator,
} from 'jscodeshift';

import { getCustomPackages } from '../helpers/get-custom-packages';

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

const CDS_PACKAGES = ['@cbhq/cds-mobile', '@cbhq/cds-web'];

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const customPackages = getCustomPackages(options);
  const PACKAGE_PATHS = [...CDS_PACKAGES, ...customPackages];

  // Check if the file has a CDS import
  const hasCDSImport = root
    .find(j.ImportDeclaration)
    .some(
      (path: ASTPath<ImportDeclaration>) =>
        path.value.source &&
        typeof path.value.source.value === 'string' &&
        PACKAGE_PATHS.some(
          (pkg) =>
            typeof path.value.source.value === 'string' && path.value.source.value.startsWith(pkg),
        ),
    );

  if (!hasCDSImport) {
    // If no CDS imports are found, return the original source unchanged
    // This avoids the re-parsing/re-printing formatting changes.
    return file.source;
  }

  // 1. Find all imported component names from relevant CDS packages
  const importedComponentNames = new Set<string>();
  const componentNamespaceNames = new Set<string>(); // Keep track of namespace imports e.g., import * as CDS from '...'

  root
    .find(j.ImportDeclaration)
    .filter((path: ASTPath<ImportDeclaration>) => {
      const source = path.node.source.value;
      return typeof source === 'string' && PACKAGE_PATHS.some((pkg) => source.startsWith(pkg));
    })
    .forEach((path: ASTPath<ImportDeclaration>) => {
      path.node.specifiers?.forEach((spec) => {
        if (spec.type === 'ImportSpecifier' && spec.imported.type === 'Identifier') {
          const localName =
            spec.local && spec.local.type === 'Identifier' ? spec.local.name : spec.imported.name;
          importedComponentNames.add(localName);
        } else if (
          spec.type === 'ImportDefaultSpecifier' &&
          spec.local &&
          spec.local.type === 'Identifier'
        ) {
          importedComponentNames.add(spec.local.name);
        } else if (
          spec.type === 'ImportNamespaceSpecifier' &&
          spec.local &&
          spec.local.type === 'Identifier'
        ) {
          // Namespace imports: e.g. import * as CDS from ...
          componentNamespaceNames.add(spec.local.name);
        }
      });
    });

  // 2. Find variables assigned to imported CDS components
  const variableComponentNames = new Set<string>();
  root.find(j.VariableDeclarator).forEach((path: ASTPath<VariableDeclarator>) => {
    const varName = path.node.id.type === 'Identifier' ? path.node.id.name : null;
    if (!varName || !path.node.init) return;

    let isRelevant = false;
    const init = path.node.init;

    // Check direct assignment: const Title = TextTitle2;
    if (init.type === 'Identifier' && importedComponentNames.has(init.name)) {
      isRelevant = true;
    }
    // Check ternary assignment: const Title = cond ? TextTitle2 : TextDisplay1;
    else if (init.type === 'ConditionalExpression') {
      const { consequent, alternate } = init;
      if (
        (consequent.type === 'Identifier' && importedComponentNames.has(consequent.name)) ||
        (alternate.type === 'Identifier' && importedComponentNames.has(alternate.name))
      ) {
        isRelevant = true;
      }
    }

    if (isRelevant) {
      variableComponentNames.add(varName);
    }
  });

  // Combine imported names, namespace names, and variable names into relevant tag names
  const relevantTagNames = new Set([...importedComponentNames, ...variableComponentNames]);
  const componentName = options.component as string | undefined;

  // 3. Find all JSX elements whose tag matches a relevant name or namespace
  const elements = root.find(j.JSXElement).filter((path: ASTPath<JSXElement>) => {
    const openingElement = path.node.openingElement;
    let currentComponentName: string | undefined;

    if (openingElement.name.type === 'JSXIdentifier') {
      currentComponentName = openingElement.name.name;
      if (!relevantTagNames.has(currentComponentName)) return false;
    } else if (openingElement.name.type === 'JSXMemberExpression') {
      const object = openingElement.name.object;
      if (object.type !== 'JSXIdentifier' || !componentNamespaceNames.has(object.name)) {
        return false;
      }
    } else {
      return false;
    }

    // If a component name is passed, only transform that component
    if (componentName && currentComponentName !== componentName) {
      return false;
    }

    return true;
  });

  // 4. For each matching element, map old prop names to new prop names and handle negative values
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
