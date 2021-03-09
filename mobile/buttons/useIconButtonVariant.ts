import { useMemo } from 'react';

import { IconButtonVariant, PaletteForeground } from '@cbhq/cds-common';

import { usePalette } from '../hooks/usePalette';

export interface IconButtonVariantStyles {
  backgroundColor: string;
  borderColor: string;
  foregroundColor: PaletteForeground;
}

export const useIconButtonVariant = (variant: IconButtonVariant): IconButtonVariantStyles => {
  const palette = usePalette();

  return useMemo(() => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: palette.primary,
          borderColor: palette.primary,
          foregroundColor: 'primaryForeground',
        };
      case 'secondary':
        return {
          backgroundColor: palette.secondary,
          borderColor: palette.lineHeavy,
          foregroundColor: 'secondaryForeground',
        };
    }
  }, [palette, variant]);
};
