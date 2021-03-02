import { arrayToObject, mapValues, toCssVarFn } from '@cbhq/cds-utils';

export const defaultPalette = {
  foreground: 'gray100',
  foregroundMuted: 'gray60',
  background: 'gray0',
  backgroundAlternate: 'gray5',
  backgroundOverlay: ['gray80', 0.33],
  line: ['gray60', 0.2],
  lineHeavy: ['gray60', 0.66],
  primary: 'blue60',
  primaryForeground: 'gray0',
  negative: 'red60',
  negativeForeground: 'gray0',
  positive: 'green60',
  positiveForeground: 'gray0',
  secondary: 'gray0',
  secondaryForeground: 'gray100',
} as const;

export const paletteForegrounds = [
  'foreground',
  'foregroundMuted',
  'primary',
  'primaryForeground',
  'secondary',
  'secondaryForeground',
  'positive',
  'positiveForeground',
  'negative',
  'negativeForeground',
] as const;

export const paletteBackgrounds = [
  'background',
  'backgroundAlternate',
  'backgroundOverlay',
  'primary',
  'secondary',
  'positive',
  'negative',
] as const;

export const paletteBorders = ['line', 'lineHeavy'];

const foregroundMap = arrayToObject(paletteForegrounds);
const backgroundMap = arrayToObject(paletteBackgrounds);
const borderMap = arrayToObject([...paletteBackgrounds, ...paletteBorders]);

const cssVariables = mapValues(defaultPalette, (_, key) => toCssVarFn(key));

const cssBackgroundColor = mapValues(backgroundMap, (_, key) => {
  return {
    'background-color': toCssVarFn(key),
  };
});

const cssBorderColor = mapValues(borderMap, (_, key) => {
  return {
    'border-color': toCssVarFn(key),
  };
});

const cssColor = mapValues(foregroundMap, (_, key) => {
  return {
    color: toCssVarFn(key),
  };
});

const paletteAliases = [...paletteForegrounds, ...paletteBackgrounds, ...paletteBorders];

export const Palette = {
  cssBackgroundColor,
  cssBorderColor,
  cssColor,
  cssVariables,
  defaultPalette,
  paletteForegrounds,
  paletteBackgrounds,
  paletteBorders,
  validate: () => {
    const aliases = Object.keys(defaultPalette);
    aliases.forEach(item => {
      if (!paletteAliases.includes(item)) {
        throw new Error(
          `The palette alias, ${item}, was added but neither paletteForegrounds, paletteBackgrounds or paletteBorders was updated to include it.`
        );
      }
    });
  },
} as const;
