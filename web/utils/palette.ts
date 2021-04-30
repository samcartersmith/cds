import { defaultPalette, PaletteValue, PartialPaletteConfig } from '@cbhq/cds-common';
import { mapValues, mapKeys, toCssVar, toCssVarFn } from '@cbhq/cds-utils';

export const paletteValueToCssVar = (paletteValue: PaletteValue) => {
  const [alias, opacity] = typeof paletteValue === 'string' ? [paletteValue] : paletteValue;
  const cssVariable = toCssVarFn(alias);
  if (opacity) {
    return `rgba(${cssVariable},${opacity})`;
  } else {
    return `rgb(${cssVariable})`;
  }
};

export const paletteConfigToCssVars = (paletteConfig: PartialPaletteConfig) => {
  const config = { ...defaultPalette, ...paletteConfig };
  const transformedValues = mapValues(config, paletteValue => paletteValueToCssVar(paletteValue));
  return mapKeys(transformedValues, (_, key) => toCssVar(String(key)));
};
