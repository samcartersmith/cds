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

export const paletteBorders = ['line', 'lineHeavy'] as const;
