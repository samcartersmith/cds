import { useMemo } from 'react';

import {
  ButtonVariant,
  PaletteBackground,
  PaletteForeground,
  PaletteBorder,
  PaletteAlias,
} from '../types';

export type ButtonVariantStyles = {
  backgroundColor: PaletteBackground;
  borderColor: PaletteBorder;
  color: PaletteForeground;
  underlay: PaletteAlias;
};

const variants: Record<ButtonVariant, ButtonVariantStyles> = {
  primary: {
    color: 'primaryForeground',
    backgroundColor: 'primary',
    borderColor: 'primary',
    underlay: 'foreground',
  },
  secondary: {
    color: 'secondaryForeground',
    backgroundColor: 'secondary',
    borderColor: 'line',
    underlay: 'foreground',
  },
  positive: {
    color: 'positiveForeground',
    backgroundColor: 'positive',
    borderColor: 'positive',
    underlay: 'foreground',
  },
  negative: {
    color: 'negative',
    backgroundColor: 'background',
    borderColor: 'line',
    underlay: 'foreground',
  },
};

export const useButtonVariant = (variant: ButtonVariant): ButtonVariantStyles => {
  return useMemo(() => variants[variant], [variant]);
};
