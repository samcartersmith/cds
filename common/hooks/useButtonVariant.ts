import { useMemo } from 'react';

import { ButtonVariant, PaletteBackground, PaletteForeground, PaletteBorder } from '../types';

export type ButtonVariantStyles = {
  backgroundColor: PaletteBackground;
  borderColor: PaletteBorder;
  color: PaletteForeground;
};

const variants: Record<ButtonVariant | 'primaryCompact', ButtonVariantStyles> = {
  primary: {
    color: 'primaryForeground',
    backgroundColor: 'primary',
    borderColor: 'primary',
  },
  primaryCompact: {
    color: 'primary',
    backgroundColor: 'background',
    borderColor: 'line',
  },
  secondary: {
    color: 'secondaryForeground',
    backgroundColor: 'secondary',
    borderColor: 'line',
  },
  positive: {
    color: 'positiveForeground',
    backgroundColor: 'positive',
    borderColor: 'positive',
  },
  negative: {
    color: 'negative',
    backgroundColor: 'background',
    borderColor: 'line',
  },
};

export const useButtonVariant = (variant: ButtonVariant, compact = false): ButtonVariantStyles => {
  return useMemo(() => {
    switch (variant) {
      default:
      case 'primary':
        return compact ? variants.primaryCompact : variants.primary;
      case 'secondary':
        return variants.secondary;
      case 'positive':
        return variants.positive;
      case 'negative':
        return variants.negative;
    }
  }, [variant, compact]);
};
