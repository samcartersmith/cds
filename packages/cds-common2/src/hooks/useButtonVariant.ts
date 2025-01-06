import { useMemo } from 'react';

import { ThemeVars } from '../new/vars';
import { ButtonVariant } from '../types';

export type ButtonVariantStyles = {
  backgroundColor: ThemeVars.Color;
  borderColor: ThemeVars.Color;
  color: ThemeVars.Color;
};

export type ButtonVariantConfig = Record<ButtonVariant, ButtonVariantStyles>;

const variants: ButtonVariantConfig = {
  primary: {
    color: 'textForegroundInverse',
    backgroundColor: 'backgroundPrimary',
    borderColor: 'transparent',
  },
  secondary: {
    color: 'textForeground',
    backgroundColor: 'backgroundSecondary',
    borderColor: 'transparent',
  },
  foregroundMuted: {
    color: 'textForegroundMuted',
    backgroundColor: 'backgroundSecondary',
    borderColor: 'line',
  },
  positive: {
    color: 'textForegroundInverse',
    backgroundColor: 'backgroundPositive',
    borderColor: 'transparent',
  },
  negative: {
    color: 'textForegroundInverse',
    backgroundColor: 'backgroundNegative',
    borderColor: 'transparent',
  },
};

const transparentVariants: ButtonVariantConfig = {
  primary: {
    color: 'textPrimary',
    backgroundColor: 'background',
    borderColor: 'transparent',
  },
  secondary: {
    color: 'textForeground',
    backgroundColor: 'background',
    borderColor: 'transparent',
  },
  foregroundMuted: {
    color: 'textForegroundMuted',
    backgroundColor: 'background',
    borderColor: 'transparent',
  },
  positive: {
    color: 'textPositive',
    backgroundColor: 'background',
    borderColor: 'transparent',
  },
  negative: {
    color: 'textNegative',
    backgroundColor: 'background',
    borderColor: 'transparent',
  },
};

export const useButtonVariant = (
  variant: ButtonVariant,
  transparent?: boolean,
): ButtonVariantStyles => {
  return useMemo(
    () => (transparent ? transparentVariants : variants)[variant],
    [transparent, variant],
  );
};
