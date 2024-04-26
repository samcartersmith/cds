import { paletteValueToRgbaString } from '@cbhq/cds-common/palette/paletteValueToRgbaString';
import { arrayToObject, mapValues, toCssVarFn } from '@cbhq/cds-utils/index';
import { setPaletteConfigToCssVars } from '@cbhq/cds-web/utils/palette';

export const defaultPalette = {
  foreground: 'gray100',
  foregroundMuted: 'gray60',
  background: 'gray0',
  backgroundAlternate: 'gray5',
  backgroundOverlay: ['gray80', 0.33],
  line: ['gray60', 0.2],
  lineHeavy: ['gray60', 0.66],
  primary: 'blue60',
  primaryWash: 'blue0',
  primaryForeground: 'gray0',
  negative: 'red60',
  negativeForeground: 'gray0',
  positive: 'green60',
  positiveForeground: 'gray0',
  secondary: 'gray5',
  secondaryForeground: 'gray100',
  transparent: ['gray0', 0],
  warning: 'yellow50',
} as const;

const defaultPaletteOverrides = {
  light: {},
  dark: {
    secondary: 'gray20',
    primary: 'blue70',
  },
} as const;

const darkDefaultPalette = { ...defaultPalette, ...defaultPaletteOverrides.dark } as const;

const switchPalette = {
  backgroundAlternate: 'gray20',
} as const;

const elevation1Palette = {
  dark: { background: 'gray5', transparent: 'gray5' },
} as const;

const elevation1ChildrenPalette = {
  dark: { secondary: ['gray20', 1] },
} as const;

const elevation2Palette = {
  dark: { background: 'gray10', transparent: 'gray10' },
} as const;

const elevation2ChildrenPalette = {
  dark: { line: ['gray60', 0.68] },
} as const;

const overlayPalette = {
  light: { backgroundOverlay: ['gray80', 0.33] },
  dark: { backgroundOverlay: ['gray0', 0.5] },
} as const;

const sparklinePalette = { line: 'gray20' } as const;

const switchControlPalette = {
  light: { background: 'gray0', backgroundAlternate: 'gray20' },
  dark: { background: 'gray100', backgroundAlternate: 'gray20' },
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
  'warning',
] as const;

export const paletteBackgrounds = [
  'background',
  'backgroundAlternate',
  'backgroundOverlay',
  'primary',
  'primaryWash',
  'secondary',
  'positive',
  'negative',
  'transparent',
  'warning',
] as const;

export const paletteBorders = [
  'primary',
  'primaryWash',
  'secondary',
  'positive',
  'negative',
  'line',
  'lineHeavy',
  'transparent',
  'warning',
];

const foregroundMap = arrayToObject(paletteForegrounds);
const backgroundMap = arrayToObject(paletteBackgrounds);
const borderMap = arrayToObject(paletteBorders);

const cssVariables = mapValues(defaultPalette, (_, key) => toCssVarFn(key));

const cssBackgroundColor = mapValues(backgroundMap, (_, key) => {
  return {
    'background-color': toCssVarFn(key),
  };
});

const cssBorderColor = mapValues(borderMap, (_, key) => {
  return {
    border: `1px solid ${toCssVarFn(key)}`,
  };
});
cssBorderColor.transparent = { border: '1px solid transparent' };

const cssColor = mapValues(foregroundMap, (_, key) => {
  return {
    color: toCssVarFn(key),
  };
});

const paletteAliases = [...paletteForegrounds, ...paletteBackgrounds, ...paletteBorders];

export const fallbackShimmer = {
  light: [
    paletteValueToRgbaString(['gray60', 0.05], 'light'),
    paletteValueToRgbaString(['gray60', 0], 'light'),
    paletteValueToRgbaString(['gray60', 0.1], 'light'),
  ],
  dark: [
    paletteValueToRgbaString(['gray60', 0.05], 'dark'),
    paletteValueToRgbaString(['gray60', 0], 'dark'),
    paletteValueToRgbaString(['gray60', 0.1], 'dark'),
  ],
};

export const Palette = {
  cssBackgroundColor,
  cssBorderColor,
  cssColor,
  cssVariables,
  setCssVariables: {
    light: setPaletteConfigToCssVars(defaultPalette),
    dark: setPaletteConfigToCssVars(darkDefaultPalette),
  },
  palettes: {
    defaultPalette,
    darkDefaultPalette,
    switchPalette,
    defaultPaletteOverrides,
    elevation1Palette,
    elevation1ChildrenPalette,
    elevation2Palette,
    elevation2ChildrenPalette,
    overlayPalette,
    sparklinePalette,
    switchControlPalette,
  },
  paletteForegrounds,
  paletteBackgrounds,
  paletteBorders,
  fallbackShimmer,
  validate: () => {
    const aliases = Object.keys(defaultPalette);
    aliases.forEach((item) => {
      if (!paletteAliases.includes(item)) {
        throw new Error(
          `The palette alias, ${item}, was added but neither paletteForegrounds, paletteBackgrounds or paletteBorders was updated to include it.`,
        );
      }
    });
  },
} as const;
