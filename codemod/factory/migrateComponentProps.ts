/* eslint-disable no-param-reassign */
import {
  FileInfo,
  API,
  Options,
  JSCodeshift,
  Literal,
  JSXText,
  BigIntLiteral,
  BooleanLiteral,
  NumericLiteral,
  NullLiteral,
  StringLiteral,
  RegExpLiteral,
  JSXExpressionContainer,
} from 'jscodeshift';

import { Codemod } from '../Codemod';

type PropValue = bigint | boolean | number | string | null | undefined | RegExp;

type ComponentPropMap = Record<
  string,
  {
    remove?: boolean;
    rename?: string;
    values?: null | { from: PropValue; to: PropValue; remove?: boolean }[];
  }
>;

function fromValueToAST(cs: JSCodeshift, value: PropValue) {
  switch (typeof value) {
    case 'bigint':
      return cs.bigIntLiteral(String(value));
    case 'boolean':
      return cs.booleanLiteral(value);
    case 'number':
      return cs.numericLiteral(value);
    case 'string':
      return cs.stringLiteral(value);
    case 'object': {
      if (value instanceof RegExp) {
        return cs.regExpLiteral(value.source, value.flags);
      }
      if (value === null) {
        return cs.nullLiteral();
      }
      break;
    }
    default:
      return null;
  }

  // Remove the node
  return null;
}

function matchesASTValue(
  node:
    | Literal
    | BigIntLiteral
    | BooleanLiteral
    | NumericLiteral
    | NullLiteral
    | StringLiteral
    | RegExpLiteral
    | JSXText
    | JSXExpressionContainer
    | null,
  value: PropValue,
): boolean {
  // Node is missing
  if (node === null) {
    return false;
  }

  switch (node.type) {
    case 'Literal':
    case 'BooleanLiteral':
    case 'NullLiteral':
    case 'NumericLiteral':
    case 'RegExpLiteral':
    case 'StringLiteral':
    case 'JSXText':
      return node.value === value;
    case 'BigIntLiteral':
      return String(node.value) === String(value);
    case 'JSXExpressionContainer':
      return matchesASTValue(node.expression as Literal, value);
    default:
      return false;
  }
}

function migrateComponentButtons(
  mod: Codemod,
  importPath: string | RegExp,
  migrateMap: ComponentPropMap,
  namesToFind: string[] = [],
): string | null | undefined | void {
  if (namesToFind.length === 0 && typeof importPath === 'string') {
    namesToFind.push(importPath.slice(importPath.lastIndexOf('/') + 1));
  }

  const compName = mod.getComponentNameFromImportPath(importPath, namesToFind);
  const elements = mod.findJsxElementsByName(compName);

  if (elements.length === 0) {
    return;
  }

  elements.forEach(el => {
    const removeIndexes: number[] = [];

    el.openingElement.attributes.forEach((attr, i) => {
      if (attr.type !== 'JSXAttribute' || attr.name.type !== 'JSXIdentifier') {
        return;
      }

      const config = migrateMap[attr.name.name];

      if (!config) {
        return;
      }

      // Remove the prop
      if (config.remove) {
        removeIndexes.push(i);
      }

      // Rename the prop
      if (config.rename) {
        attr.name.name = config.rename;
      }

      // Change prop value
      if (config.values === null) {
        attr.value = null;
      }

      if (config.values && attr.value) {
        const valueConfig = config.values.find(cfg => matchesASTValue(attr.value, cfg.from));

        if (valueConfig) {
          if (valueConfig.remove) {
            removeIndexes.push(i);
          } else {
            attr.value = fromValueToAST(mod.cs, valueConfig.to);
          }
        }
      }
    });

    // Remove prop after so that we dont mutate while looping
    if (removeIndexes.length > 0) {
      el.openingElement.attributes = el.openingElement.attributes.filter(
        (attr, i) => !removeIndexes.includes(i),
      );
    }
  });
}

export default function migrate(importPath: string | RegExp, migrateMap: ComponentPropMap) {
  return (fileInfo: FileInfo, api: API, options: Options) => {
    const mod = new Codemod(fileInfo, api);

    migrateComponentButtons(mod, importPath, migrateMap);

    return mod.toSource(options);
  };
}
