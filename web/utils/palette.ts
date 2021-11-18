import { defaultPalette, PaletteValue, PaletteAlias, PartialPaletteConfig } from '@cbhq/cds-common';
import { mapValues, mapKeys, toCssVar, toCssVarFn } from '@cbhq/cds-utils';

/**
 * `Please don't use this unless you absolutely have to. This is meant as last resort.`
 * Takes a palette value and returns the rgb or rgba string with interpolated css variables.
 * @param paletteValue - 'gray0'
 * @returns rgb or rgba string - rgb(var(--gray0))
 */
export const paletteValueToCssVar = (paletteValue: PaletteValue) => {
  const [alias, opacity] = typeof paletteValue === 'string' ? [paletteValue] : paletteValue;
  const cssVariable = toCssVarFn(alias);
  if (opacity) {
    return `rgba(${cssVariable},${opacity})` as const;
  }
  return `rgb(${cssVariable})` as const;
};

/**
 * Given a palette alias, such as foregroundMuted, and the spectrum, it will output the rgb or rgba string with interpolated css variables.
 * @param palette - foregroundMuted, foreground, background etc...
 * @returns rgb or rgba string - rgb(var(--gray0))
 */
export const paletteAliasToCssVar = (palette: PaletteAlias) => {
  return paletteValueToCssVar(defaultPalette[palette] as PaletteValue);
};

/**
 * `Please don't use this unless you absolutely have to. This is meant as last resort.`
 * Takes a palette config and returns an object to access computed color values based on config.
 * @param paletteConfig  - { background: 'gray0' }
 * @returns { background: 'rgb(var(--gray0))' }
 */
export const paletteConfigToCssVars = (paletteConfig: PartialPaletteConfig) => {
  const config = { ...defaultPalette, ...paletteConfig };
  return mapValues(config, (paletteValue) => paletteValueToCssVar(paletteValue));
};

/**
 * Takes a palette config and returns an object to attach as inline style to assign css variables.
 * @param paletteConfig - { background: 'gray0' }
 * @returns { '--background': 'rgb(var(--gray0))' }
 */
export const setPaletteConfigToCssVars = (paletteConfig: PartialPaletteConfig) => {
  return mapKeys(paletteConfigToCssVars(paletteConfig), (_, key) => toCssVar(key));
};
