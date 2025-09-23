/**
 * Codemod to migrate color props to the new format.
 *
 * Example transformations:
 * Before:
 * ```
 * <Text color="foreground">Hello</Text>
 * <Box background="backgroundAlternate">Content</Box>
 * <Box background={hasBackground ? 'backgroundAlternate' : undefined}>Content</Box>
 * <Box borderColor="line">Content</Box>
 * <Label labelColor="foreground">Label</Label>
 * ```
 *
 * After:
 * ```
 * <Text color="fg">Hello</Text>
 * <Box background="bgAlternate">Content</Box>
 * <Box background={hasBackground ? 'bgAlternate' : undefined}>Content</Box>
 * <Box borderColor="bgLine">Content</Box>
 * <Label labelColor="fg">Label</Label>
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

// Mapping of old foreground colors to new colors
const foregroundColorMapping = {
  foreground: 'fg',
  foregroundMuted: 'fgMuted',
  primary: 'fgPrimary',
  primaryForeground: 'fgInverse',
  secondary: 'bgSecondary',
  secondaryForeground: 'fg',
  positive: 'fgPositive',
  positiveForeground: 'fgInverse',
  negative: 'fgNegative',
  negativeForeground: 'fgInverse',
  warning: 'bgWarning',
  warningForeground: 'fgWarning',
} as const;

// Mapping of old background colors to new colors
const backgroundColorMapping = {
  ...foregroundColorMapping,
  background: 'bg',
  backgroundAlternate: 'bgAlternate',
  backgroundOverlay: 'bgOverlay',
  backgroundInverse: 'bgInverse',
  primary: 'bgPrimary',
  primaryWash: 'bgPrimaryWash',
  secondary: 'bgSecondary',
  positive: 'bgPositive',
  negative: 'bgNegative',
  warning: 'bgWarning',
  transparent: 'transparent',
  negativeWash: 'bgNegativeWash',
} as const;

// Mapping of old border colors to new colors
const borderColorMapping = {
  primary: 'bgLinePrimary',
  primaryWash: 'bgLinePrimarySubtle',
  secondary: 'bgLine',
  positive: 'bgPositive',
  negative: 'bgNegative',
  line: 'bgLine',
  lineHeavy: 'bgLineHeavy',
  transparent: 'transparent',
  warning: 'bgWarning',
  warningForeground: 'fgWarning',
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

  // Find all JSX elements with color, background, borderColor, or labelColor props,  whose tag matches a relevant name or namespace
  const elements = root.find(j.JSXElement).filter((path: ASTPath<JSXElement>) => {
    const openingElement = path.node.openingElement;
    if (openingElement.name.type === 'JSXIdentifier') {
      // <Box ...> or <Title ...>
      return relevantTagNames.has(openingElement.name.name);
    }
    if (openingElement.name.type === 'JSXMemberExpression') {
      // <CDS.Box ...>
      const object = openingElement.name.object;
      if (object.type === 'JSXIdentifier') {
        return componentNamespaceNames.has(object.name);
      }
    }

    const attributes = openingElement.attributes || [];
    return attributes.some((attr: any) => {
      if (attr.type !== 'JSXAttribute' || attr.name.type !== 'JSXIdentifier') {
        return false;
      }
      return (
        attr.name.name === 'color' ||
        attr.name.name === 'background' ||
        attr.name.name === 'borderColor' ||
        attr.name.name === 'labelColor'
      );
    });

    return false;
  });

  if (elements.length === 0) {
    return file.source;
  }

  // Helper function to transform string literals in expressions
  const transformStringLiteral = (
    node: any,
    mapping:
      | typeof foregroundColorMapping
      | typeof backgroundColorMapping
      | typeof borderColorMapping,
  ) => {
    if (node.type === 'StringLiteral') {
      const newColor = mapping[node.value as keyof typeof mapping];
      if (newColor) {
        node.value = newColor;
      }
    }
  };

  // Helper function to transform conditional expressions
  const transformConditionalExpression = (
    node: any,
    mapping:
      | typeof foregroundColorMapping
      | typeof backgroundColorMapping
      | typeof borderColorMapping,
  ) => {
    if (node.type === 'ConditionalExpression') {
      transformStringLiteral(node.consequent, mapping);
      transformStringLiteral(node.alternate, mapping);
    }
  };

  elements.forEach((path) => {
    const attributes = path.node.openingElement.attributes || [];

    attributes.forEach((attr: any) => {
      if (attr.type !== 'JSXAttribute' || attr.name.type !== 'JSXIdentifier') {
        return;
      }

      // Handle color and labelColor prop transformations
      if (attr.name.name === 'color' || attr.name.name === 'labelColor') {
        if (attr.value.type === 'StringLiteral') {
          transformStringLiteral(attr.value, foregroundColorMapping);
        } else if (attr.value.type === 'JSXExpressionContainer') {
          const expression = attr.value.expression;
          transformStringLiteral(expression, foregroundColorMapping);
          transformConditionalExpression(expression, foregroundColorMapping);
        }
      }

      // Handle background prop transformations
      if (attr.name.name === 'background') {
        if (attr.value === null) {
          // Handle boolean prop case (e.g., <Box background>)
          attr.value = j.stringLiteral('bg');
        } else if (attr.value.type === 'StringLiteral') {
          transformStringLiteral(attr.value, backgroundColorMapping);
        } else if (attr.value.type === 'JSXExpressionContainer') {
          const expression = attr.value.expression;
          transformStringLiteral(expression, backgroundColorMapping);
          transformConditionalExpression(expression, backgroundColorMapping);
        }
      }

      // Handle borderColor prop transformations
      if (attr.name.name === 'borderColor') {
        if (attr.value.type === 'StringLiteral') {
          transformStringLiteral(attr.value, borderColorMapping);
        } else if (attr.value.type === 'JSXExpressionContainer') {
          const expression = attr.value.expression;
          transformStringLiteral(expression, borderColorMapping);
          transformConditionalExpression(expression, borderColorMapping);
        }
      }
    });
  });

  return root.toSource(printOptions);
}
