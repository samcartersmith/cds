import { useMemo } from 'react';

import { PaletteBackground, PaletteForeground, PaletteBorder, ButtonVariant } from '../types';

export type ButtonVariantStyles = {
  backgroundColor: PaletteBackground;
  borderColor: PaletteBorder;
  color: PaletteForeground;
};

const variants: Record<ButtonVariant, ButtonVariantStyles> = {
  primary: {
    color: 'primaryForeground',
    backgroundColor: 'primary',
    borderColor: 'primary',
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

export const useButtonVariant = (variant: ButtonVariant): ButtonVariantStyles => {
  return useMemo(() => variants[variant], [variant]);
};
