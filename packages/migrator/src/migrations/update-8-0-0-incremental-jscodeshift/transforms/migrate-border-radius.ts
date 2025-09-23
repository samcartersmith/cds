/**
 * Codemod to migrate borderRadius props to the new format.
 *
 * Example transformations:
 * Before:
 * ```
 * <Text borderRadius="roundedNone">Hello</Text>
 * <Box borderRadius="roundedSmall">Content</Box>
 * <Box borderRadius={hasBorderRadius ? 'rounded' : undefined}>Content</Box>
 * <Label borderRadius="roundedLarge">Label</Label>
 * ```
 *
 * After:
 * ```
 * <Text borderRadius={0}>Hello</Text>
 * <Box borderRadius={100}>Content</Box>
 * <Box borderRadius={hasBorderRadius ? 200 : undefined}>Content</Box>
 * <Label borderRadius={400}>Label</Label>
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

import { DEFAULT_PRINT_OPTIONS } from '../constants';

// Mapping of old border radius values to new values
const borderRadiusMapping = {
  roundedNone: 0,
  roundedSmall: 100,
  rounded: 200,
  roundedMedium: 300,
  roundedLarge: 400,
  roundedXLarge: 500,
  roundedFull: 1000,
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
  const componentName = options.component as string | undefined;

  // Find all JSX elements with borderRadius props, whose tag matches a relevant name or namespace
  const elements = root.find(j.JSXElement).filter((path: ASTPath<JSXElement>) => {
    const openingElement = path.node.openingElement;
    let isRelevantComponent = false;
    let currentComponentName: string | undefined;

    if (openingElement.name.type === 'JSXIdentifier') {
      currentComponentName = openingElement.name.name;
      // <Box ...> or <Title ...>
      isRelevantComponent = relevantTagNames.has(currentComponentName);
    } else if (openingElement.name.type === 'JSXMemberExpression') {
      // <CDS.Box ...>
      const object = openingElement.name.object;
      if (object.type === 'JSXIdentifier') {
        isRelevantComponent = componentNamespaceNames.has(object.name);
      }
    }

    // If a component name is passed, only transform that component
    if (componentName && currentComponentName !== componentName) {
      return false;
    }

    // Check if this element has borderRadius prop
    const attributes = openingElement.attributes || [];
    const hasBorderRadius = attributes.some((attr: any) => {
      if (attr.type !== 'JSXAttribute' || attr.name.type !== 'JSXIdentifier') {
        return false;
      }
      return attr.name.name === 'borderRadius';
    });

    // Include elements that are CDS components AND have borderRadius prop
    return isRelevantComponent && hasBorderRadius;
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

      // Handle borderRadius prop transformations
      if (attr.name.name === 'borderRadius') {
        // Case 1: borderRadius="roundedNone" (StringLiteral)
        if (attr.value.type === 'StringLiteral') {
          const oldValue = attr.value.value;
          const newValue = borderRadiusMapping[oldValue as keyof typeof borderRadiusMapping];
          if (newValue !== undefined) {
            // Convert to JSXExpressionContainer with NumericLiteral
            attr.value = j.jsxExpressionContainer(j.numericLiteral(newValue));
          }
        }
        // Case 2: borderRadius={'rounded'} or borderRadius={condition ? 'rounded' : undefined}
        else if (attr.value.type === 'JSXExpressionContainer') {
          const expression = attr.value.expression;

          // Direct string in expression: borderRadius={'rounded'}
          if (expression.type === 'StringLiteral') {
            const oldValue = expression.value;
            const newValue = borderRadiusMapping[oldValue as keyof typeof borderRadiusMapping];
            if (newValue !== undefined) {
              attr.value.expression = j.numericLiteral(newValue);
            }
          }
          // Conditional expression: borderRadius={condition ? 'rounded' : undefined}
          else if (expression.type === 'ConditionalExpression') {
            // Transform consequent
            if (expression.consequent.type === 'StringLiteral') {
              const oldValue = expression.consequent.value;
              const newValue = borderRadiusMapping[oldValue as keyof typeof borderRadiusMapping];
              if (newValue !== undefined) {
                expression.consequent = j.numericLiteral(newValue);
              }
            }

            // Transform alternate
            if (expression.alternate.type === 'StringLiteral') {
              const oldValue = expression.alternate.value;
              const newValue = borderRadiusMapping[oldValue as keyof typeof borderRadiusMapping];
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
