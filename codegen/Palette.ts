import { mapValues, toCssVarFn } from '@cb/design-system/utils';

type PaletteAlias = keyof typeof defaultPalette;

const defaultPalette = {
  foreground: 'gray100',
  foregroundMuted: 'gray60',
  background: 'gray0',
  backgroundAlternate: 'gray5',
  backgroundOverlay: ['blue90', 0.33],
  divider: ['gray60', 0.33],
  stroke: ['gray60', 0.66],
  primary: 'blue60',
  primaryForeground: 'gray0',
  negative: 'red60',
  negativeForeground: 'gray0',
  positive: 'green60',
  positiveForeground: 'gray0',
  secondary: 'gray0',
  secondaryForeground: 'gray100',
} as const;

const paletteForegrounds: PaletteAlias[] = [
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
];
const paletteBackgrounds: PaletteAlias[] = [
  'background',
  'backgroundAlternate',
  'backgroundOverlay',
  'divider',
  'stroke',
  'primary',
  'secondary',
  'positive',
  'negative',
];

const arrayToObject = <T extends string>(arr: T[] | Readonly<T[]>) =>
  [...arr].reduce((prev, next) => {
    return {
      ...prev,
      [`${next}`]: next,
    };
  }, {} as { [key in T]: key });

const foregroundMap = arrayToObject(paletteForegrounds);
const backgroundMap = arrayToObject(paletteBackgrounds);
const cssVariables = mapValues(defaultPalette, (_, key) => toCssVarFn(key));

const cssBackgroundColor = mapValues(backgroundMap, (_, key) => {
  return {
    'background-color': toCssVarFn(key),
  };
});

const cssBorderColor = mapValues(backgroundMap, (_, key) => {
  return {
    'border-color': toCssVarFn(key),
  };
});

const cssColor = mapValues(foregroundMap, (_, key) => {
  return {
    color: toCssVarFn(key),
  };
});

export const Palette = {
  defaultPalette,
  cssBackgroundColor,
  cssBorderColor,
  cssColor,
  cssVariables,
  paletteForegrounds,
  paletteBackgrounds,
  validate: () => {
    const aliases = Object.keys(defaultPalette) as PaletteAlias[];
    aliases.forEach(item => {
      if (!paletteBackgrounds.includes(item) && !paletteForegrounds.includes(item)) {
        throw new Error(
          `The palette alias, ${item}, was added but neither paletteForegrounds or paletteBackgrounds was updated to include it.`
        );
      }
    });
  },
} as const;
