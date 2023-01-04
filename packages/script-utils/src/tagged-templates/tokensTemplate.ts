import { sortByAlphabet } from '../sort';

function isPrimitiveArray(items: unknown[]): items is (string | number)[] {
  return items.every((val) => typeof val === 'string' || typeof val === 'number');
}

type CreateTokensTemplate = {
  sort?: boolean;
  sortMapKeys?: boolean;
  sortObjectKeys?: boolean;
  sortSetValues?: boolean;
  sortArrayValues?: boolean;
};

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
export function createTokensTemplate({
  sort = true,
  sortMapKeys = sort,
  sortObjectKeys = sort,
  sortSetValues = sort,
  sortArrayValues = sort,
}: CreateTokensTemplate) {
  function template(strings: TemplateStringsArray, ...expr: unknown[]) {
    let str = '';
    /**
     * The `expr` argument represents all the interpolations within the string.
     * i.e. tokensTemplate`Hi my name is ${name} and I am ${age} years old.`
     *
     * the `name` value will be the first expression.
    @@ -42,67 +47,34 @@ export function tokensTemplate(strings: TemplateStringsArray, ...expr: unknown[]
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
        if (sortObjectKeys) {
          const sortedByKeys = Object.entries(item).sort(sortByAlphabet);
          const sortedObject = Object.fromEntries(sortedByKeys);
          result = sortedObject;
        } else {
          result = item;
        }
      }

      if (item && item instanceof Map) {
        const itemMap = item as Map<string, unknown>;
        let itemEntries = [...itemMap.entries()];
        if (sortMapKeys) {
          itemEntries = itemEntries.sort(sortByAlphabet);
        }
        const sortedObject = Object.fromEntries(itemEntries);
        result = sortedObject;
      }

      if (item && item instanceof Set) {
        const itemSet = item as Set<string>;
        let itemValues = [...itemSet.values()];

        if (sortSetValues) {
          itemValues = itemValues.sort((prev, next) => {
            return prev.localeCompare(next);
          });
        }
        result = itemValues;
      }

      if (item && Array.isArray(item)) {
        if (isPrimitiveArray(item) && sortArrayValues) {
          const itemSorted = item.sort();
          result = itemSorted;
        } else {
          result = item;
        }
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

  return template;
}

export const tokensSortedTemplate = createTokensTemplate({});

export const tokensTemplate = createTokensTemplate({
  sort: false,
});
