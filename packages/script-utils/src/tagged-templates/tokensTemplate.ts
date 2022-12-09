import { sortByAlphabet } from '../sort';
import { transformKeyAndValue } from '../transform';

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
 * import { writePrettyFile } from '@cbhq/script-utils';
 * import { tokensTemplate } from '@cbhq/script-utils';
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
export function tokensTemplate(strings: TemplateStringsArray, ...values: unknown[]) {
  let str = '';
  const stringValues: string[] = [];
  /**
   * The `values` argument represents all the interpolations within the string.
   * i.e. tokensTemplate`Hi my name is ${name} and I am ${age} years old.`
   *
   * the `name` value will be the first expression.
   * the `age` value will be the second expression.
   *
   * Below we check what type the expression is and the do some
   * automatic formatting based on that information.
   */
  values.forEach((item, index) => {
    if (item instanceof Map) {
      const itemMap = item as Map<string, unknown>;
      const itemString = [...itemMap.entries()]
        .sort(sortByAlphabet)
        .map(transformKeyAndValue(`[key]: [value]`))
        .join(',\n');
      stringValues[index] = `{ ${itemString} }`;
    } else if (item instanceof Set) {
      const itemSet = item as Set<string>;
      const itemSorted = [...itemSet.values()].sort(sortByAlphabet);
      stringValues[index] = JSON.stringify(itemSorted);
    } else if (Array.isArray(item)) {
      const itemMaybeSorted = isPrimitiveArray(item) ? item.sort() : item;
      stringValues[index] = JSON.stringify(itemMaybeSorted);
    } else if (item instanceof Object) {
      const itemString = Object.entries(item)
        .sort(sortByAlphabet)
        .map(transformKeyAndValue(`[key]: [value]`))
        .join(',\n');
      stringValues[index] = `{ ${itemString} }`;
    } else {
      stringValues[index] = `${item}`;
    }
  });

  strings.forEach((string, i) => {
    str = `${str}${string}${stringValues[i] || ''}`;
  });
  return str;
}
