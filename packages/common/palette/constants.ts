/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */

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
  secondary: 'gray0',
  secondaryForeground: 'gray100',
  transparent: ['gray0', 0],
} as const;

export const switchPalette = { backgroundAlternate: 'gray20' } as const;

export const frontierSpectrumPalette = {
  light: { secondary: 'gray5' },
  dark: { secondary: 'gray20' },
} as const;

export const elevation1Palette = { dark: { background: 'gray5', transparent: 'gray5' } } as const;

export const elevation1ChildrenPalette = { dark: { secondary: ['gray5', 1] } } as const;

export const elevation2Palette = { dark: { background: 'gray10', transparent: 'gray10' } } as const;

export const elevation2ChildrenPalette = {
  dark: { line: ['gray60', 0.68], secondary: ['gray10', 1] },
} as const;

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
] as const;
