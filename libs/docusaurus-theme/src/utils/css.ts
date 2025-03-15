import entries from 'lodash/entries';

/**
 * Works like linaria's css tagged template function.
 */
export default function css(strings: TemplateStringsArray, ...expr: unknown[]) {
  let str = '';
  expr.forEach((item) => {
    if (item && typeof item === 'object') {
      const stringResult = entries(item)
        .map(([key, value]) => {
          return `${key}: ${value};`;
        })
        .join('\n');
      Object.defineProperty(item, 'toString', {
        value() {
          return stringResult;
        },
      });
    }
  });

  strings.forEach((string, i) => {
    str += string + (expr[i] || '');
  });
  return str;
}
