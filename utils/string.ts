import { decamelize, camelize, pascalize } from 'humps';
import { KebabCase, CamelCase, PascalCase } from 'type-fest';

export const camelCase = <T extends string>(str: T): CamelCase<T> => camelize(str) as CamelCase<T>;
export const pascalCase = <T extends string>(str: T) => pascalize(str) as PascalCase<typeof str>;

export const kebabCase = <T extends string>(str: T) =>
  decamelize(str, { separator: '-' }) as KebabCase<typeof str>;

export const toCssVar = <T extends string>(str: T) => {
  return `--${kebabCase(str)}` as const;
};

export const toCssVarFn = <T extends string>(str: T) => {
  return `var(${toCssVar(str)})` as const;
};

export const capitalize = <T extends string>(str: T): Capitalize<T> => {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
};
