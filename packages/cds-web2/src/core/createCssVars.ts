/* eslint-disable prefer-template */
export const createCssVars = <Vars extends Record<string, unknown>, Prefix extends string>(
  vars: Vars,
  prefix: Prefix,
) =>
  Object.fromEntries(
    Object.entries(vars).map(([key, value]) => [
      `--${prefix ? `${prefix}-` : ''}${key}`,
      typeof value === 'number' ? value + 'px' : value,
    ]),
  ) as { [key in string & keyof Vars as `--${Prefix}-${key}`]: Vars[key] };
