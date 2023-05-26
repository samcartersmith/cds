import { getComponentFromJsx } from './getComponentFromJsx';
import { replaceKey } from './replaceKey';
import { searchAndProcessComponent } from './searchAndProcessComponent';
import { JsxElementType } from './types';

/**
 * Checks if the provided JSX element is a migratable component with a migratable API (attribute and/or value)
 * @param jsx - The JSX element to update
 * @param componentNames - The component names to search for
 * @param renameMap - The rename map to use for updating the component name.
 * @param attribute - The attribute to search for in the component
 * @param value - The value to search for in the component's attributes
 * @returns An object with the updateMap for the given component (works with import aliases, too!) and isMigratable boolean
 * We evaluate if a component is migratable if the actual component is imported in the file and the migratable attributes/values are present in its usage
 * And we return the correct updateMap for the component, even if the component is imported with an alias
 */
export const checkIsComponentWithMigrations = <T extends Record<string, unknown>>({
  jsx,
  componentNames,
  renameMap: defaultRenameMap,
  attribute,
  value,
}: {
  jsx: JsxElementType;
  componentNames: string[];
  renameMap: T;
  attribute?: string;
  value?: string | string[];
}): {
  updateMap: T[keyof T];
  isMigratable: boolean;
} => {
  const { component, actualComponentName } = getComponentFromJsx({
    jsx,
    componentNames,
  });
  let renameMap = defaultRenameMap;
  if (actualComponentName) {
    renameMap = replaceKey({
      obj: defaultRenameMap,
      oldKey: component,
      newKey: actualComponentName,
    });
  }
  const updateMap = renameMap[actualComponentName ?? component] as T[keyof T];

  // gate for components that are not migratable
  let isMigratable = false;
  if (updateMap) {
    searchAndProcessComponent({
      jsx,
      componentName: component,
      callback: (propName, propValue) => {
        let hasValue = false;
        let hasProp = false;
        if (value) {
          if (
            typeof propValue === 'string'
              ? propValue === value
              : value.includes(propValue as string)
          ) {
            hasValue = true;
          }
        }
        if (attribute) {
          if (propName === attribute) {
            hasProp = true;
          }
        }
        if (value && attribute && hasValue && hasProp) {
          isMigratable = true;
          return;
        }
        if (value && hasValue) {
          isMigratable = true;
          return;
        }
        if (attribute && hasProp) {
          isMigratable = true;
        }
      },
    });
  }

  return {
    updateMap,
    isMigratable,
  };
};
