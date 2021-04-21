import { FileInfo, API, Options, JSCodeshift } from 'jscodeshift';

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
      } else if (value === null) {
        return cs.nullLiteral();
      }
    }
  }

  // Remove the node
  return null;
}

function migrateComponentButtons(
  mod: Codemod,
  importPath: string | RegExp,
  migrateMap: ComponentPropMap
): string | null | undefined | void {
  const compName = mod.getComponentNameFromImportPath(importPath);
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
        const valueConfig = config.values.find(cfg => cfg.from === attr.value);

        if (valueConfig) {
          if (valueConfig.remove) {
            removeIndexes.push(i);
          } else {
            attr.value = fromValueToAST(mod.cs, valueConfig.to);
          }
        } else {
          console.warn();
        }
      }
    });

    // Remove prop after so that we dont mutate while looping
    if (removeIndexes.length > 0) {
      el.openingElement.attributes = el.openingElement.attributes.filter(
        (attr, i) => !removeIndexes.includes(i)
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
