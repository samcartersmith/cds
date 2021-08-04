// npx jscodeshift --extensions=js,jsx,ts,tsx --parser=tsx --transform=./codemod/convertToNewSpacingProps.ts ./src

import {
  FileInfo,
  API,
  Options,
  JSXAttribute,
  ObjectExpression,
  ArrayExpression,
  Identifier,
  Node,
  NumericLiteral,
  UnaryExpression,
  ConditionalExpression,
  TSAsExpression,
} from 'jscodeshift';

import { Codemod } from './Codemod';

const importPath = process.env.IMPORT_PATH;
const componentName = process.env.COMPONENT_NAME;

if (!importPath && !componentName) {
  throw new Error(
    'Either IMPORT_PATH or COMPONENT_NAME is required for the component you would like to migrate.',
  );
}

const constVarMap: Record<string, ObjectExpression | ArrayExpression> = {};

function isValidSpacingValue(value: Node, allowIdentifier = false): boolean {
  switch (value.type) {
    // spacing={gap}
    case 'Identifier':
      return (value as Identifier).name === 'spacing' || allowIdentifier;
    // spacing={1}
    case 'NumericLiteral':
      return true;
    // spacing={-1}
    case 'UnaryExpression':
      return isValidSpacingValue((value as UnaryExpression).argument);
    // spacing={bool ? 1 : gap}
    case 'ConditionalExpression':
      return (
        isValidSpacingValue((value as ConditionalExpression).consequent) &&
        isValidSpacingValue((value as ConditionalExpression).alternate)
      );
    // spacing={foo as number}
    case 'TSAsExpression':
      return isValidSpacingValue((value as TSAsExpression).expression);
    default:
      return false;
  }
}

function createProp(mod: Codemod, value: Node | null, name: string): JSXAttribute {
  if (!value) {
    throw new Error('null');
  } else if (!isValidSpacingValue(value, true)) {
    throw new Error(value.type);
  }

  let id = name.replace('all', 'spacing').replace('left', 'start').replace('right', 'end');

  if (id !== 'spacing') {
    id = `spacing${id.charAt(0).toUpperCase()}${id.slice(1)}`;
  }

  let number = value as NumericLiteral | UnaryExpression;

  if (number.type === 'UnaryExpression' && number.operator === '-') {
    id = id.replace('spacing', 'offset');
    number = number.argument as NumericLiteral;
  }

  return mod.createNode((cs) =>
    cs.jsxAttribute(cs.jsxIdentifier(id), cs.jsxExpressionContainer(number)),
  );
}

function convertArrayToProps(mod: Codemod, array: ArrayExpression): JSXAttribute[] {
  const props: JSXAttribute[] = [];

  switch (array.elements.length) {
    default:
    case 1:
      props.push(createProp(mod, array.elements[0], 'spacing'));
      break;

    case 2:
      props.push(createProp(mod, array.elements[0], 'vertical'));
      props.push(createProp(mod, array.elements[1], 'horizontal'));
      break;

    case 3:
      props.push(createProp(mod, array.elements[0], 'top'));
      props.push(createProp(mod, array.elements[1], 'horizontal'));
      props.push(createProp(mod, array.elements[2], 'bottom'));
      break;

    case 4:
      props.push(createProp(mod, array.elements[0], 'top'));
      props.push(createProp(mod, array.elements[1], 'end'));
      props.push(createProp(mod, array.elements[2], 'bottom'));
      props.push(createProp(mod, array.elements[3], 'start'));
      break;
  }

  return props;
}

function convertObjectToProps(mod: Codemod, object: ObjectExpression): JSXAttribute[] {
  const props: JSXAttribute[] = [];

  object.properties.forEach((property) => {
    if (property.type !== 'ObjectProperty') {
      throw new Error(property.type);
    }

    if (property.key.type === 'Identifier') {
      props.push(createProp(mod, property.value, property.key.name));
    }
  });

  return props;
}

function convertNumericValue(
  node:
    | NumericLiteral
    | UnaryExpression
    | ConditionalExpression
    | TSAsExpression
    | ObjectExpression
    | ArrayExpression,
) {
  if (!node) return;

  switch (node.type) {
    case 'NumericLiteral':
      return;
    case 'UnaryExpression':
      convertNumericValue(node.argument as NumericLiteral);
      break;
    case 'ConditionalExpression':
      convertNumericValue(node.consequent as NumericLiteral);
      convertNumericValue(node.alternate as NumericLiteral);
      break;
    case 'TSAsExpression':
      convertNumericValue(node.expression as NumericLiteral);
      break;
    case 'ObjectExpression':
      node.properties.forEach((prop) => {
        if (prop.type === 'ObjectProperty') {
          convertNumericValue(prop.value as NumericLiteral);
        }
      });
      break;
    case 'ArrayExpression':
      node.elements.forEach((el) => {
        convertNumericValue(el as NumericLiteral);
      });
      break;
    default:
      break;
  }
}

export default function convertToNewSpacingProps(
  fileInfo: FileInfo,
  api: API,
  options: Options,
): string | null | undefined {
  const mod = new Codemod(fileInfo, api);

  // Find component names for the defined import path
  const compNames = importPath ? mod.getComponentNameFromImportPath(importPath) : [];

  if (componentName) {
    compNames.push(componentName);
  }

  if (compNames.length === 0) {
    return undefined;
  }

  // Find all JSX elements with the found names
  const elements = mod.findJsxElementsByName(compNames);

  if (elements.length === 0) {
    return undefined;
  }

  // Find all constants that may be used as spacing references
  mod.source
    .find(mod.cs.Program)
    .nodes()[0]
    .body.forEach((member) => {
      if (member.type !== 'VariableDeclaration') {
        return;
      }

      member.declarations.forEach((node) => {
        if (node.type !== 'VariableDeclarator') {
          return;
        }

        let { init } = node;

        if (node.id.type !== 'Identifier' || node.id.name === 'spacing' || !init) {
          return;
        }

        if (init.type === 'TSAsExpression') {
          init = init.expression;
        }

        if (init.type === 'ObjectExpression' || init.type === 'ArrayExpression') {
          constVarMap[node.id.name] = init;
        }
      });
    });

  // Convert spacing prop to new props
  elements.forEach((el) => {
    const newProps: JSXAttribute[] = [];
    let oldIndex = 0;

    el.openingElement.attributes.forEach((attr, index) => {
      if (
        attr.type === 'JSXSpreadAttribute' ||
        (attr.type === 'JSXAttribute' && attr.name.name !== 'spacing') ||
        !attr.value
      ) {
        return;
      }

      if (attr.value.type !== 'JSXExpressionContainer') {
        console.warn(`Spacing prop found with invalid value in "${fileInfo.path}".`);
        return;
      }

      // Persist the index to replace with
      oldIndex = index;

      const injectProp = (
        node: NumericLiteral | ArrayExpression | ObjectExpression | Identifier,
      ) => {
        switch (node.type) {
          case 'NumericLiteral':
            // This is valid in the new API
            return;

          case 'ArrayExpression':
            newProps.push(...convertArrayToProps(mod, node));
            return;

          case 'ObjectExpression':
            newProps.push(...convertObjectToProps(mod, node));
            return;

          case 'Identifier': {
            const id = node.name;
            const expr = constVarMap[id];

            // const gap = [1, 2];
            // spacing={gap}
            if (expr && expr.type === 'ArrayExpression') {
              convertNumericValue(expr);
              newProps.push(...convertArrayToProps(mod, expr));

              // const gap = {top: 1, right: 2};
              // spacing={gap}
            } else if (expr && expr.type === 'ObjectExpression') {
              convertNumericValue(expr);
              newProps.push(...convertObjectToProps(mod, expr));

              // spacing={spacing}
            } else if (id === 'spacing') {
              convertNumericValue(expr);

              // Unknown?
            } else {
              throw new Error('Identifier');
            }

            return;
          }

          default:
            throw new Error((node as Node).type);
        }
      };

      try {
        injectProp(attr.value.expression as ArrayExpression);
      } catch (error) {
        console.error(
          `Invalid spacing prop value type "${error.message}" found in "${fileInfo.path}".`,
        );

        if ((error as Error).message.includes('Cannot read property')) {
          console.log(error);
        }
      }
    });

    if (newProps.length > 0) {
      newProps.sort((left, right) => String(left.name.name).localeCompare(String(right.name.name)));

      el.openingElement.attributes.splice(oldIndex, 1, ...newProps);
    }
  });

  return mod.toSource(options);
}
