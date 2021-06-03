import { useMemo } from 'react';

import { PaletteBackground, PaletteForeground, PaletteBorder, ButtonVariant } from '../types';

export type ButtonVariantStyles = {
  backgroundColor: PaletteBackground;
  borderColor: PaletteBorder | 'transparent';
  color: PaletteForeground;
};

const variants: Record<ButtonVariant, ButtonVariantStyles> = {
  primary: {
    color: 'primaryForeground',
    backgroundColor: 'primary',
    borderColor: 'transparent',
  },
  secondary: {
    color: 'secondaryForeground',
    backgroundColor: 'secondary',
    borderColor: 'line',
  },
  foregroundMuted: {
    color: 'foregroundMuted',
    backgroundColor: 'secondary',
    borderColor: 'line',
  },
  positive: {
    color: 'positiveForeground',
    backgroundColor: 'positive',
    borderColor: 'transparent',
  },
  negative: {
    color: 'negative',
    backgroundColor: 'background',
    borderColor: 'line',
  },
};

const transparentVariants: Record<ButtonVariant, ButtonVariantStyles> = {
  primary: {
    color: 'primary',
    backgroundColor: 'background',
    borderColor: 'transparent',
  },
  secondary: {
    color: 'secondaryForeground',
    backgroundColor: 'background',
    borderColor: 'transparent',
  },
  foregroundMuted: {
    color: 'foregroundMuted',
    backgroundColor: 'background',
    borderColor: 'transparent',
  },
  positive: {
    color: 'positive',
    backgroundColor: 'background',
    borderColor: 'transparent',
  },
  negative: {
    color: 'negative',
    backgroundColor: 'background',
    borderColor: 'transparent',
  },
};

export const useButtonVariant = (
  variant: ButtonVariant,
  transparent?: boolean
): ButtonVariantStyles => {
  return useMemo(
    () => (transparent ? transparentVariants : variants)[variant],
    [variant, transparent]
  );
};
