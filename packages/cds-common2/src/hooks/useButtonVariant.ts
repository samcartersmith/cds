import { useMemo } from 'react';

import { ThemeVars } from '../core/theme';
import { ButtonVariant } from '../types';

export type ButtonVariantStyles = {
  backgroundColor: ThemeVars.Color;
  borderColor: ThemeVars.Color;
  color: ThemeVars.Color;
};

export type ButtonVariantConfig = Record<ButtonVariant, ButtonVariantStyles>;

const variants: ButtonVariantConfig = {
  primary: {
    color: 'fgInverse',
    backgroundColor: 'bgPrimary',
    borderColor: 'transparent',
  },
  secondary: {
    color: 'fg',
    backgroundColor: 'bgSecondary',
    borderColor: 'transparent',
  },
  foregroundMuted: {
    color: 'fgMuted',
    backgroundColor: 'bgSecondary',
    borderColor: 'bgLine',
  },
  positive: {
    color: 'fgInverse',
    backgroundColor: 'bgPositive',
    borderColor: 'transparent',
  },
  negative: {
    color: 'fgInverse',
    backgroundColor: 'bgNegative',
    borderColor: 'transparent',
  },
};

const transparentVariants: ButtonVariantConfig = {
  primary: {
    color: 'fgPrimary',
    backgroundColor: 'bg',
    borderColor: 'transparent',
  },
  secondary: {
    color: 'fg',
    backgroundColor: 'bg',
    borderColor: 'transparent',
  },
  foregroundMuted: {
    color: 'fgMuted',
    backgroundColor: 'bg',
    borderColor: 'transparent',
  },
  positive: {
    color: 'fgPositive',
    backgroundColor: 'bg',
    borderColor: 'transparent',
  },
  negative: {
    color: 'fgNegative',
    backgroundColor: 'bg',
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
