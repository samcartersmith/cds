export { ThemeProvider } from './ThemeProvider';
export { usePalette } from './palette/usePalette';
export { useScale } from './scale/useScale';
export { useSpectrum } from './spectrum/useSpectrum';

export * from './palette/constants';
export * from './palette/types';
export * from './scale/types';
export * from './spectrum/types';

// Linaria interpolation crashes when the palette is re-exported from palette/palette.ts,
// so let's duplicate this here temporarily until we can figure out a better API.
export const palette = {
  foreground: 'var(--foreground)',
  foregroundMuted: 'var(--foreground-muted)',
  background: 'var(--background)',
  backgroundAlternate: 'var(--background-alternate)',
  backgroundOverlay: 'var(--background-overlay)',
  divider: 'var(--divider)',
  stroke: 'var(--stroke)',
  primary: 'var(--primary)',
  primaryForeground: 'var(--primary-foreground)',
  negative: 'var(--negative)',
  negativeForeground: 'var(--negative-foreground)',
  positive: 'var(--positive)',
  positiveForeground: 'var(--positive-foreground)',
  secondary: 'var(--secondary)',
  secondaryForeground: 'var(--secondary-foreground)',
} as const;
