/* eslint-disable @typescript-eslint/no-explicit-any */

// npx jscodeshift --extensions=js,jsx,ts,tsx --parser=tsx --transform=./codemod/halveSpacingProps.ts ./src

import {
  FileInfo,
  API,
  Options,
  JSXOpeningElement,
  NumericLiteral,
  UnaryExpression,
  StringLiteral,
  ConditionalExpression,
  TSAsExpression,
  JSXIdentifier,
  JSXExpressionContainer,
  Identifier,
} from 'jscodeshift';

import { Codemod } from './Codemod';

// RN is base 4 but CDS is base 8
function halveSpacing(value: number): number {
  if (value === 0.5) {
    return value;
  }

  let amount = Math.abs(value) / 2;

  if (amount % 1 !== 0 && amount !== 0.5) {
    amount = amount <= 3 ? Math.ceil(amount) : Math.floor(amount);
  }

  return amount;
}

function convertNumericValue(
  node:
    | StringLiteral
    | NumericLiteral
    | UnaryExpression
    | ConditionalExpression
    | TSAsExpression
    | JSXExpressionContainer
    | Identifier
) {
  if (!node) return;

  switch (node.type) {
    case 'StringLiteral':
      // Percentages, etc
      return;
    case 'NumericLiteral':
      node.value = halveSpacing(node.value);
      return;
    case 'UnaryExpression':
      convertNumericValue(node.argument as NumericLiteral);
      break;
    case 'ConditionalExpression':
      convertNumericValue(node.consequent as NumericLiteral);
      convertNumericValue(node.alternate as NumericLiteral);
      break;
    case 'TSAsExpression':
    case 'JSXExpressionContainer':
      convertNumericValue(node.expression as NumericLiteral);
      break;
    case 'Identifier':
      if (node.name === 'undefined' || node.name === 'gutter' || node.name === 'offsetGutter') {
        return;
      } else {
        throw new Error(`Unknown identifier "${node.name}".`);
      }
    default:
      throw new Error(`Unknown type "${(node as any).type}".`);
  }
}

export default function halveSpacingProps(
  fileInfo: FileInfo,
  api: API,
  options: Options
): string | null | undefined | void {
  const mod = new Codemod(fileInfo, api);

  mod.source.find(mod.cs.JSXAttribute).forEach(({ node, parentPath }) => {
    // Skip non-spacing props
    if (node.name.type !== 'JSXIdentifier' || !node.name.name.match(/^(spacing|offset)/)) {
      return;
    }

    // Icon has already been migrated
    const parentNode = parentPath.node as JSXOpeningElement;

    if (parentNode.name.type === 'JSXIdentifier' && parentNode.name.name === 'Icon') {
      return;
    }

    // Skip nulls
    if (node.value === null) {
      return;
    }

    // Halve all the values
    try {
      convertNumericValue(node.value as any);
    } catch (error) {
      console.error(
        `Failed to convert prop "${(node.name as JSXIdentifier).name}" for component "${
          (parentNode.name as JSXIdentifier).name
        }" in "${mod.fileInfo.path}". ${error.message}`
      );
    }
  });

  return mod.toSource(options);
}
