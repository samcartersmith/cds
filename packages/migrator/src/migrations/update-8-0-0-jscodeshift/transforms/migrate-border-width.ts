/**
 * Codemod to migrate borderWidth props to the new format.
 *
 * Example transformations:
 * Before:
 * ```
 * <Text borderWidth="none">Hello</Text>
 * <Box borderWidth="card">Content</Box>
 * <Box borderWidth={hasBorderWidth ? 'button' : undefined}>Content</Box>
 * <Label borderWidth="checkbox">Label</Label>
 * ```
 *
 * After:
 * ```
 * <Text borderWidth={0}>Hello</Text>
 * <Box borderWidth={100}>Content</Box>
 * <Box borderWidth={hasBorderWidth ? 100 : undefined}>Content</Box>
 * <Label borderWidth={200}>Label</Label>
 * ```
 */

import {
  API,
  type ASTPath,
  FileInfo,
  type ImportDeclaration,
  type JSXElement,
  Options,
  type VariableDeclarator,
} from 'jscodeshift';

import { DEFAULT_PRINT_OPTIONS } from '../constants';

// Mapping of old border radius values to new values
const borderWidthMapping = {
  none: 0,
  button: 100,
  card: 100,
  checkbox: 200,
  radio: 200,
  sparkline: 200,
  focusRing: 200,
  input: 100,
} as const;

const CDS_PACKAGES = ['@cbhq/cds-web', '@cbhq/cds-mobile'];

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const printOptions = options.printOptions || DEFAULT_PRINT_OPTIONS;
  const root = j(file.source);

  const hasCDSImport = root
    .find(j.ImportDeclaration)
    .some(
      (path: ASTPath<ImportDeclaration>) =>
        path.value.source &&
        typeof path.value.source.value === 'string' &&
        CDS_PACKAGES.some((pkg) => (path.value.source.value as string).startsWith(pkg)),
    );

  if (!hasCDSImport) {
    return file.source;
  }

  // 1. Find all imported component names from relevant CDS packages
  const importedComponentNames = new Set<string>();
  const componentNamespaceNames = new Set<string>(); // Keep track of namespace imports e.g., import * as CDS from '...'

  root
    .find(j.ImportDeclaration)
    .filter((path: ASTPath<ImportDeclaration>) => {
      const source = path.node.source.value;
      return (
        typeof source === 'string' &&
        (source.startsWith(CDS_PACKAGES[0]) || source.startsWith(CDS_PACKAGES[1]))
      );
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

  // Find all JSX elements with borderWidth props, whose tag matches a relevant name or namespace
  const elements = root.find(j.JSXElement).filter((path: ASTPath<JSXElement>) => {
    const openingElement = path.node.openingElement;
    let isRelevantComponent = false;

    if (openingElement.name.type === 'JSXIdentifier') {
      // <Box ...> or <Title ...>
      isRelevantComponent = relevantTagNames.has(openingElement.name.name);
    } else if (openingElement.name.type === 'JSXMemberExpression') {
      // <CDS.Box ...>
      const object = openingElement.name.object;
      if (object.type === 'JSXIdentifier') {
        isRelevantComponent = componentNamespaceNames.has(object.name);
      }
    }

    // Check if this element has borderWidth prop
    const attributes = openingElement.attributes || [];
    const hasBorderWidth = attributes.some((attr: any) => {
      if (attr.type !== 'JSXAttribute' || attr.name.type !== 'JSXIdentifier') {
        return false;
      }
      return attr.name.name === 'borderWidth';
    });

    // Include elements that are CDS components AND have borderWidth prop
    return isRelevantComponent && hasBorderWidth;
  });

  if (elements.length === 0) {
    return file.source;
  }

  elements.forEach((path) => {
    const attributes = path.node.openingElement.attributes || [];

    attributes.forEach((attr: any) => {
      if (attr.type !== 'JSXAttribute' || attr.name.type !== 'JSXIdentifier') {
        return;
      }

      // Handle borderWidth prop transformations
      if (attr.name.name === 'borderWidth') {
        // Case 1: borderWidth="button" (StringLiteral)
        if (attr.value.type === 'StringLiteral') {
          const oldValue = attr.value.value;
          const newValue = borderWidthMapping[oldValue as keyof typeof borderWidthMapping];
          if (newValue !== undefined) {
            // Convert to JSXExpressionContainer with NumericLiteral
            attr.value = j.jsxExpressionContainer(j.numericLiteral(newValue));
          }
        }
        // Case 2: borderWidth={'button'} or borderWidth={condition ? 'button' : undefined}
        else if (attr.value.type === 'JSXExpressionContainer') {
          const expression = attr.value.expression;

          // Direct string in expression: borderWidth={'button'}
          if (expression.type === 'StringLiteral') {
            const oldValue = expression.value;
            const newValue = borderWidthMapping[oldValue as keyof typeof borderWidthMapping];
            if (newValue !== undefined) {
              attr.value.expression = j.numericLiteral(newValue);
            }
          }
          // Conditional expression: borderWidth={condition ? 'button' : undefined}
          else if (expression.type === 'ConditionalExpression') {
            // Transform consequent
            if (expression.consequent.type === 'StringLiteral') {
              const oldValue = expression.consequent.value;
              const newValue = borderWidthMapping[oldValue as keyof typeof borderWidthMapping];
              if (newValue !== undefined) {
                expression.consequent = j.numericLiteral(newValue);
              }
            }

            // Transform alternate
            if (expression.alternate.type === 'StringLiteral') {
              const oldValue = expression.alternate.value;
              const newValue = borderWidthMapping[oldValue as keyof typeof borderWidthMapping];
              if (newValue !== undefined) {
                expression.alternate = j.numericLiteral(newValue);
              }
            }
          }
        }
      }
    });
  });

  return root.toSource(printOptions);
}
