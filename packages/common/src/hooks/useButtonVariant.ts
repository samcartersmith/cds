import { useMemo } from 'react';

import { PaletteBackground, PaletteForeground, PaletteBorder, ButtonVariant } from '../types';
import { useFeatureFlag } from '../system/useFeatureFlag';

export type ButtonVariantStyles = {
  backgroundColor: PaletteBackground;
  borderColor: PaletteBorder | 'transparent';
  color: PaletteForeground;
};

export type ButtonVariantConfig = Record<ButtonVariant, ButtonVariantStyles>;

const variants: ButtonVariantConfig = {
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

const transparentVariants: ButtonVariantConfig = {
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

const frontierVariants: ButtonVariantConfig = {
  ...variants,
  secondary: {
    color: 'secondaryForeground',
    backgroundColor: 'secondary',
    borderColor: 'transparent',
  },
};

export const useButtonVariant = (
  variant: ButtonVariant,
  transparent?: boolean,
): ButtonVariantStyles => {
  const hasFrontier = useFeatureFlag('frontierColor');
  const nonTransparentVariants = hasFrontier ? frontierVariants : variants;
  return useMemo(
    () => (transparent ? transparentVariants : nonTransparentVariants)[variant],
    [transparent, nonTransparentVariants, variant],
  );
};
