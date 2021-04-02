import { PaletteBackground, PaletteForeground, PaletteBorder } from '../types';

export type LinkButtonVariant = 'primary' | 'secondary' | 'negative';

export type LinkButtonVariantStyles = {
  color: PaletteForeground;
  backgroundColor: PaletteBackground;
  borderColor: PaletteBorder;
};

export const useLinkButtonVariant = (variant: LinkButtonVariant): LinkButtonVariantStyles => {
  return {
    color: variant === 'secondary' ? 'foreground' : variant,
    backgroundColor: 'background',
    borderColor: 'secondary',
  };
};
