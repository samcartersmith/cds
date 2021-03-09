export * as backgroundStyles from './styles/backgroundColor';
export * as foregroundStyles from './styles/foregroundColor';
export * as typographyStyles from './styles/typography';

export * from '@cbhq/cds-common';
export * from './layout/Box';
export * from './layout/HStack';
export * from './layout/Spacer';
export * from './layout/VStack';
export * from './buttons/Button';
export * from './iconButtons/IconButton';
export * from './icons/Icon';
export * from './icons/Logo';
export * from './navigation/Navigation';
export * from './navigation/Navbar';
export * from './navigation/Sidebar';
export * from './navigation/SidebarItem';
export * from './typography/Text';
export * from './styles/ThemeProvider';
export * from './hooks/useInteractable';
export * from './hooks/useOffsetStyles';
export * from './hooks/usePalette';
export * from './hooks/usePinStyles';
export * from './hooks/useSpacingStyles';
export * from './types';

// Linaria interpolation crashes when the palette is re-exported from palette/palette.ts,
// so let's duplicate this here temporarily until we can figure out a better API.
export const palette = {
  foreground: 'var(--foreground)',
  foregroundMuted: 'var(--foreground-muted)',
  background: 'var(--background)',
  backgroundAlternate: 'var(--background-alternate)',
  backgroundOverlay: 'var(--background-overlay)',
  line: 'var(--line)',
  lineHeavy: 'var(--line-heavy)',
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
