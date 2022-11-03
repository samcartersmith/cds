function isPrimitiveArray(items: unknown[]): items is (string | number)[] {
  return items.every((val) => typeof val === 'string' || typeof val === 'number');
}
/**
 * Tagged template function for formatting codegenerated objects.
 * This util will sort and stringify Maps, Sets, Objects and Arrays.
 *
 * Usage is similiar to how we use the `css` tagged template function
 * from linaria.
 *
 * import { writePrettyFile } from '@cbhq/script-utils/fs';
 * import { tokensTemplate } from '@cbhq/script-utils/tagged-templates';
 *
 * const lightStyles = new Map();
 *
 * lightStyles.set('foreground', 'foreground_id');
 * lightStyles.set('background', 'background_id');
 *
 * const stylesContent = tokensTemplate`
 *  export const light = ${lightStyles};
 * `
 *
 * writePrettyFile('__generated__/styles.ts', stylesContent);
 *
 * will output to:
 *
 * export const light = {
 *    background: 'background_id',
 *    foreground: 'foreground_id',
 * }
 *
 */
export function tokensTemplate(strings: TemplateStringsArray, ...expr: unknown[]) {
  let str = '';
  /**
   * The `expr` argument represents all the interpolations within the string.
   * i.e. tokensTemplate`Hi my name is ${name} and I am ${age} years old.`
   *
   * the `name` value will be the first expression.
   * the `age` value will be the second expression.
   *
   * Below we check what type the expression is and the do some
   * automatic formatting based on that information.
   */
  expr.forEach((item) => {
    let result: unknown;

    if (
      item &&
      typeof item === 'object' &&
      !(item instanceof Map) &&
      !(item instanceof Set) &&
      !Array.isArray(item)
    ) {
      const sortedByKeys = Object.entries(item).sort(([prevKey], [nextKey]) => {
        return prevKey.localeCompare(nextKey);
      });
      const sortedObject = Object.fromEntries(sortedByKeys);
      result = sortedObject;
    }

    if (item && item instanceof Map) {
      const itemMap = item as Map<string, unknown>;
      const sortedByKeys = [...itemMap.entries()].sort(([prevKey], [nextKey]) => {
        return prevKey.localeCompare(nextKey);
      });
      const sortedObject = Object.fromEntries(sortedByKeys);
      result = sortedObject;
    }

    if (item && item instanceof Set) {
      const itemSet = item as Set<string>;
      const itemSorted = [...itemSet.values()].sort((prev, next) => {
        return prev.localeCompare(next);
      });
      result = itemSorted;
    }

    if (item && Array.isArray(item) && isPrimitiveArray(item)) {
      const itemSorted = item.sort();
      result = itemSorted;
    }

    /**
     * Tagged template functions will assume each
     * expression was already converted to a string.
     * Because we are stringifying the values in this function
     * we have to add a toString property to the original expression and
     * return our result as a string.
     */
    if (result && typeof result !== 'string') {
      Object.defineProperty(item, 'toString', {
        value() {
          return JSON.stringify(result);
        },
      });
    }
  });

  strings.forEach((string, i) => {
    str = `${str}${string}${expr[i] || ''}`;
  });
  return str;
}
