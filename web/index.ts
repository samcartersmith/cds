// Consumers outside of monorepo need this reference import for ThemeProvider style tag to use custom CSS variables
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="css.d.ts" />

export * as backgroundStyles from './styles/backgroundColor';
export * as foregroundStyles from './styles/foregroundColor';
export * as typographyStyles from './styles/typography';

export * from '@cds/common';
export * from './Box/Box';
export * from './Box/HStack';
export * from './Box/VStack';
export * from './Box/Offset';
export * from './Button/Button';
export * from './Icon/Icon';
export * from './Interactable/Interactable';
export * from './Text/Text';
export * from './types';
export * from './ThemeProvider/ThemeProvider';

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

export const spacing = {
  '0.5': 'var(--spacing-0\\.5)',
  '1': 'var(--spacing-1)',
  '2': 'var(--spacing-2)',
  '3': 'var(--spacing-3)',
  '4': 'var(--spacing-4)',
  '5': 'var(--spacing-5)',
  '6': 'var(--spacing-6)',
  '7': 'var(--spacing-7)',
  '8': 'var(--spacing-8)',
  '9': 'var(--spacing-9)',
  '10': 'var(--spacing-10)',
} as const;
