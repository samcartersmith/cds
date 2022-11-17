/**
 * Tagged template function for formatting codegenerated typescript types.
 * This util will automatically join array of items as a union.
 *
 * You will use similiar to how we use the `css` tagged template function
 * from linaria.
 *
 * import { writePrettyFile } from '@cbhq/script-utils/fs';
 * import { typescriptTypesTemplate } from '@cbhq/script-utils/tagged-templates';
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
