function isPrimitiveArray(items: unknown[]): items is (string | number)[] {
  return items.every((val) => typeof val === 'string' || typeof val === 'number');
}
/**
 * Tagged template function for formatting codegenerated objects.
 * This util will sort and stringify objects.
 *
 * You will use similiar to how we use the `css` tagged template function
 * from linaria.
 *
 * import { writePrettyFile } from '@cbhq/script-utils/fs';
 * import { objectMap } from '@cbhq/script-utils/tagged-templates';
 *
 * const lightStyles = [
 *  ['foreground', 'foreground_id'],
 *  ['background', 'background_id'],
 * ]
 *
 * const stylesContent = objectMap`
 *  export const light = ${new Map(lightStyles)};
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
  expr.forEach((item) => {
    let result: unknown;

    if (item && item instanceof Map) {
      const itemMap = item as Map<string, unknown>;
      const sortedByKeys = [...itemMap.entries()].sort(([prev], [next]) => {
        return prev.localeCompare(next);
      });
      const sortedObject = Object.fromEntries(sortedByKeys);
      result = sortedObject;
    }

    if (item && item instanceof Set) {
      const itemSet = item as Set<string>;
      const itemSorted = [...itemSet.values()].sort(([prev], [next]) => {
        return prev.localeCompare(next);
      });
      result = itemSorted;
    }

    if (item && Array.isArray(item) && isPrimitiveArray(item)) {
      const itemSorted = item.sort();
      result = itemSorted;
    }

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
