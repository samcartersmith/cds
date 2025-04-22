/** Takes a JS object and formats its keys as CSS variables. */
export const createCssVars = (vars: Record<string, unknown>, prefix: string) =>
  Object.fromEntries(
    Object.entries(vars).map(([key, value]) => [
      `--${prefix ? `${prefix}-` : ''}${key}`,
      typeof value === 'number' ? value + 'px' : value,
    ]),
  );
