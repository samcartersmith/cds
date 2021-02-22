import { useMemo } from 'react';

import { ButtonVariant } from '@cbhq/cds-common';

import { usePalette } from '../hooks/usePalette';

export interface ButtonVariantStyles {
  backgroundColor: string;
  borderColor: string;
  foregroundColor: string;
  underlay: string;
}

export const useButtonVariant = (variant: ButtonVariant, compact = false): ButtonVariantStyles => {
  const palette = usePalette();

  return useMemo(() => {
    switch (variant) {
      default:
      case 'primary':
        return compact
          ? {
              backgroundColor: palette.background,
              borderColor: palette.stroke,
              foregroundColor: palette.primary,
              underlay: palette.foreground,
            }
          : {
              backgroundColor: palette.primary,
              borderColor: palette.primary,
              foregroundColor: palette.primaryForeground,
              underlay: palette.foreground,
            };
      case 'secondary':
        return {
          backgroundColor: palette.secondary,
          borderColor: palette.stroke,
          foregroundColor: palette.secondaryForeground,
          underlay: palette.foreground,
        };
      case 'positive':
        return {
          backgroundColor: palette.positive,
          borderColor: palette.positive,
          foregroundColor: palette.positiveForeground,
          underlay: palette.foreground,
        };
      case 'negative':
        return {
          backgroundColor: palette.background,
          borderColor: palette.stroke,
          foregroundColor: palette.negative,
          underlay: palette.foreground,
        };
    }
  }, [palette, variant, compact]);
};
