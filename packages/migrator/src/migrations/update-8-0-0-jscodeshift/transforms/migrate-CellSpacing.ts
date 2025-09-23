/**
 * Codemod to migrate CellSpacing props to spacing and offset props.
 *
 * Example transformations:
 * Before:
 * const cellSpacing = { spacingHorizontal: 0, offset: 1 } as CellSpacing;
 * const outerSpacing: CellSpacing = { spacingHorizontal: 0, spacingVertical: 0, offset: 1 };
 *
 * After:
 * const cellSpacing = { paddingX: 0, margin: -1 } as CellSpacing;
 * const outerSpacing: CellSpacing = { paddingX: 0, paddingY: 0, margin: -1 };
 *
 */
import type { API, ASTPath, FileInfo, ImportDeclaration, Options } from 'jscodeshift';

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

const CDS_PACKAGES = ['@cbhq/cds-mobile', '@cbhq/cds-web', '@cbhq/cds-common'];

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Check if the file has CellSpacing imported from CDS packages
  const hasCellSpacingImport = root
    .find(j.ImportDeclaration)
    .some((path: ASTPath<ImportDeclaration>) => {
      const source = path.value.source;
      if (!source || typeof source.value !== 'string') return false;

      const isFromCDSPackage = CDS_PACKAGES.some(
        (pkg) => source.value && typeof source.value === 'string' && source.value.startsWith(pkg),
      );

      if (!isFromCDSPackage) return false;

      // Check if CellSpacing is imported
      return (
        path.value.specifiers?.some((spec) => {
          if (spec.type === 'ImportSpecifier' && spec.imported.type === 'Identifier') {
            return spec.imported.name === 'CellSpacing';
          }
          return false;
        }) || false
      );
    });

  if (!hasCellSpacingImport) {
    // If no CellSpacing import is found, return the original source unchanged
    return file.source;
  }

  let modified = false;

  // Helper function to check if a type reference is CellSpacing
  const isCellSpacingType = (typeAnnotation: any): boolean => {
    if (!typeAnnotation) return false;

    if (typeAnnotation.type === 'TSTypeReference' && typeAnnotation.typeName) {
      if (typeAnnotation.typeName.type === 'Identifier') {
        return typeAnnotation.typeName.name === 'CellSpacing';
      }
    }
    return false;
  };

  // Helper function to transform properties in an object expression
  const transformObjectProperties = (properties: any[]) => {
    properties.forEach((prop) => {
      if (
        prop.type === 'ObjectProperty' &&
        ((prop.key.type === 'Identifier' &&
          Object.prototype.hasOwnProperty.call(propMapping, prop.key.name)) ||
          (prop.key.type === 'StringLiteral' &&
            Object.prototype.hasOwnProperty.call(propMapping, prop.key.value)))
      ) {
        const oldPropName = prop.key.type === 'Identifier' ? prop.key.name : prop.key.value;
        const newPropName = propMapping[oldPropName as keyof typeof propMapping];

        // Update the property name
        if (prop.key.type === 'Identifier') {
          prop.key.name = newPropName;
        } else if (prop.key.type === 'StringLiteral') {
          prop.key.value = newPropName;
        }
        modified = true;

        // Handle negative values for margin props (offset -> margin)
        if (marginProps.has(newPropName) && prop.value) {
          if (prop.value.type === 'Literal' && typeof prop.value.value === 'number') {
            // Simple numeric literal: offset: 1 -> margin: -1, but skip if value is 0
            if (prop.value.value !== 0) {
              prop.value.value = -prop.value.value;
            }
          } else if (prop.value.type === 'NumericLiteral' && typeof prop.value.value === 'number') {
            // NumericLiteral: offset: 1 -> margin: -1, but skip if value is 0
            if (prop.value.value !== 0) {
              prop.value.value = -prop.value.value;
            }
          } else if (prop.value.type === 'UnaryExpression' && prop.value.operator === '-') {
            // Already negative: offset: -1 -> margin: 1 (double negative becomes positive)
            prop.value = prop.value.argument;
          } else if (prop.value.type === 'Identifier' || prop.value.type === 'MemberExpression') {
            // Variable or member expression: offset: someValue -> margin: -someValue
            prop.value = j.unaryExpression('-', prop.value);
          } else if (prop.value.type === 'ConditionalExpression') {
            // Handle ternary expressions
            const createNegatedExpression = (node: any): any => {
              if (node.type === 'Literal' && node.value === 0) {
                return node; // Keep zero as zero
              }
              if (node.type === 'NumericLiteral' && node.value === 0) {
                return node; // Keep zero as zero
              }
              if (node.type === 'UnaryExpression' && node.operator === '-') {
                return node.argument; // Double negative becomes positive
              }
              return j.unaryExpression('-', node);
            };

            prop.value.consequent = createNegatedExpression(prop.value.consequent);
            prop.value.alternate = createNegatedExpression(prop.value.alternate);
          }
        }
      }
    });
  };

  // Find object expressions that are explicitly typed as CellSpacing

  // 1. Variable declarations with CellSpacing type annotation
  // const cellSpacing: CellSpacing = { ... }
  root.find(j.VariableDeclarator).forEach((path) => {
    if (
      path.value.id.type === 'Identifier' &&
      path.value.id.typeAnnotation &&
      path.value.id.typeAnnotation.type === 'TSTypeAnnotation' &&
      isCellSpacingType(path.value.id.typeAnnotation.typeAnnotation) &&
      path.value.init &&
      path.value.init.type === 'ObjectExpression'
    ) {
      transformObjectProperties(path.value.init.properties);
    }
  });

  // 2. Type assertions with CellSpacing
  // { ... } as CellSpacing
  root.find(j.TSAsExpression).forEach((path) => {
    if (
      isCellSpacingType(path.value.typeAnnotation) &&
      path.value.expression.type === 'ObjectExpression'
    ) {
      transformObjectProperties(path.value.expression.properties);
    }
  });

  // 3. Type assertions with angle bracket syntax
  // <CellSpacing>{ ... }
  root.find(j.TSTypeAssertion).forEach((path) => {
    if (
      isCellSpacingType(path.value.typeAnnotation) &&
      path.value.expression.type === 'ObjectExpression'
    ) {
      transformObjectProperties(path.value.expression.properties);
    }
  });

  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
