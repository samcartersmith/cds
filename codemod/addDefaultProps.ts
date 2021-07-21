import core, { FileInfo, API, Options } from 'jscodeshift';

import { Codemod } from './Codemod';

const importPath = process.env.IMPORT_PATH;
const componentName = process.env.COMPONENT_NAME;
const defaultProps = process.env.DEFAULT_PROPS;
const propPrefix = process.env.PROP_PREFIX;

if (!importPath && !componentName) {
  throw new Error(
    'Either IMPORT_PATH or COMPONENT_NAME is required for the component you would like to migrate.',
  );
}

if (!defaultProps) {
  throw new Error('No default props provided.');
}

if (!propPrefix) {
  throw new Error('No prop prefix provided.');
}

const getPropType = (cs: core.JSCodeshift, value: unknown) => {
  switch (typeof value) {
    case 'number':
      return cs.jsxExpressionContainer(cs.numericLiteral(value));
    case 'string':
      return cs.stringLiteral(value);
    default:
      throw Error('Prop type is not implemented. Please add it to getPropType function.');
  }
};

export default function addDefaultProps(
  fileInfo: FileInfo,
  api: API,
  options: Options,
): string | null | undefined | void {
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

  const propsToAdd = JSON.parse(defaultProps as string);

  elements.forEach(el => {
    const spacingProps = el.openingElement.attributes.find(
      attr =>
        attr.type === 'JSXAttribute' &&
        attr.name.type === 'JSXIdentifier' &&
        attr.name.name.startsWith(propPrefix as string), // ex. 'spacing'
    );

    // Add default spacing props if no spacing props are applied
    if (!spacingProps) {
      // To check the source code string console.log(mod.toSource(options).slice(el.openingElement.start, el.openingElement.end));
      Object.entries(propsToAdd).forEach(([name, value]) => {
        el.openingElement.attributes.unshift(
          mod.createNode(cs => cs.jsxAttribute(cs.jsxIdentifier(name), getPropType(cs, value))),
        );
      });
    }
  });

  return mod.toSource(options);
}
