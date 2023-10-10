/**
 * Tagged template function for formatting codegenerated typescript types.
 * This util will automatically join array of items as a union.
 *
 * You will use similiar to how we use the `css` tagged template function
 * from linaria.
 *
 * import { writePrettyFile } from '@cbhq/script-utils';
 * import { typescriptTypesTemplate } from '@cbhq/script-utils';
 *
 * const paletteNames = ['foreground', 'background']
 *
 * const paletteNameContent = typescriptTypesTemplate`
 *  type PaletteName = ${paletteNames};
 * `
 *
 * writePrettyFile('packages/common/types/PaletteName', paletteNameContent);
 *
 * will output to:
 *
 * type PaletteName = 'foreground' | 'background';
 *
 */
export function typescriptTypesTemplate(strings: TemplateStringsArray, ...expr: unknown[]) {
  let str = '';
  expr.forEach((item) => {
    if (item && Array.isArray(item)) {
      const stringResult = item
        .sort((prevKey: string | number, nextKey: string | number): number => {
          if (typeof prevKey === 'string' && typeof nextKey === 'string') {
            return prevKey.localeCompare(nextKey);
          }
          if (typeof prevKey === 'number' && typeof nextKey === 'number') {
            return prevKey - nextKey;
          }
          return -1;
        })
        .map((val) => {
          if (typeof val === 'string') {
            return `'${val}'`;
          }
          return `${val}`;
        })
        .join('|');
      Object.defineProperty(item, 'toString', {
        value() {
          return stringResult;
        },
      });
    }
  });

  strings.forEach((string, i) => {
    str = `${str}${string}${expr[i] || ''}`;
  });
  return str;
}
