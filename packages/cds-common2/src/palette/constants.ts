/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */

export const defaultPalette = {
  foreground: 'gray100',
  foregroundMuted: 'gray60',
  background: 'gray0',
  backgroundAlternate: 'gray5',
  backgroundInverse: 'gray100',
  backgroundOverlay: ['gray80', 0.33],
  line: ['gray60', 0.2],
  lineHeavy: ['gray60', 0.66],
  primary: 'blue60',
  primaryWash: 'blue0',
  primaryForeground: 'gray0',
  negative: 'red60',
  negativeForeground: 'gray0',
  negativeWash: 'red0',
  positive: 'green60',
  positiveForeground: 'gray0',
  secondary: 'gray5',
  secondaryForeground: 'gray100',
  transparent: ['gray0', 0],
  warning: 'yellow50',
  warningForeground: 'orange40',
} as const;

export const darkDefaultPalette = {
  foreground: 'gray100',
  foregroundMuted: 'gray60',
  background: 'gray0',
  backgroundAlternate: 'gray5',
  backgroundInverse: 'gray100',
  backgroundOverlay: ['gray80', 0.33],
  line: ['gray60', 0.2],
  lineHeavy: ['gray60', 0.66],
  primary: 'blue70',
  primaryWash: 'blue0',
  primaryForeground: 'gray0',
  negative: 'red60',
  negativeForeground: 'gray0',
  negativeWash: 'red0',
  positive: 'green60',
  positiveForeground: 'gray0',
  secondary: 'gray20',
  secondaryForeground: 'gray100',
  transparent: ['gray0', 0],
  warning: 'yellow50',
  warningForeground: 'orange70',
} as const;

export const switchPalette = { backgroundAlternate: 'gray20' } as const;

export const defaultPaletteOverrides = {
  light: {},
  dark: { secondary: 'gray20', primary: 'blue70', warningForeground: 'orange70' },
} as const;

export const elevation1Palette = { dark: { background: 'gray5', transparent: 'gray5' } } as const;

export const elevation1ChildrenPalette = { dark: { secondary: ['gray20', 1] } } as const;

export const elevation2Palette = { dark: { background: 'gray10', transparent: 'gray10' } } as const;

export const elevation2ChildrenPalette = { dark: { line: ['gray60', 0.68] } } as const;

export const overlayPalette = {
  light: { backgroundOverlay: ['gray80', 0.33] },
  dark: { backgroundOverlay: ['gray0', 0.5] },
} as const;

export const sparklinePalette = { line: 'gray20' } as const;

export const switchControlPalette = {
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
  'warningForeground',
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
  'backgroundInverse',
  'negativeWash',
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
  'warningForeground',
] as const;
