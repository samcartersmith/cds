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
    borderColor: 'bgPrimary',
  },
  secondary: {
    color: 'fg',
    backgroundColor: 'bgSecondary',
    borderColor: 'bgSecondary',
  },
  foregroundMuted: {
    color: 'fgMuted',
    backgroundColor: 'bgSecondary',
    borderColor: 'bgLine',
  },
  positive: {
    color: 'fgInverse',
    backgroundColor: 'bgPositive',
    borderColor: 'bgPositive',
  },
  negative: {
    color: 'fgInverse',
    backgroundColor: 'bgNegative',
    borderColor: 'bgNegative',
  },
};

const transparentVariants: ButtonVariantConfig = {
  primary: {
    color: 'fgPrimary',
    backgroundColor: 'bg',
    borderColor: 'bg',
  },
  secondary: {
    color: 'fg',
    backgroundColor: 'bg',
    borderColor: 'bg',
  },
  foregroundMuted: {
    color: 'fgMuted',
    backgroundColor: 'bg',
    borderColor: 'bg',
  },
  positive: {
    color: 'fgPositive',
    backgroundColor: 'bg',
    borderColor: 'bg',
  },
  negative: {
    color: 'fgNegative',
    backgroundColor: 'bg',
    borderColor: 'bg',
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
