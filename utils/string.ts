import { decamelize, camelize } from 'humps';
import { KebabCase, CamelCase } from 'type-fest';

export const camelCase = <T extends string>(str: T): CamelCase<T> => camelize(str) as CamelCase<T>;

export const kebabCase = <T extends string>(str: T) =>
  decamelize(str, { separator: '-' }) as KebabCase<T>;

export const toCssVar = <T extends string>(str: T) => {
  return `--${kebabCase(str)}` as const;
};

export const toCssVarFn = <T extends string>(str: T) => {
  return `var(${toCssVar(str)})` as const;
};

export const capitalize = <T extends string>(str: T): Capitalize<T> => {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
};
