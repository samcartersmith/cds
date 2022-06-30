import { PaletteBackground, PaletteBorder, PaletteForeground } from '../types';
import { BannerVariant } from '../types/BannerBaseProps';

type BannerVariantStyle = {
  background: PaletteBackground | undefined;
  iconColor: PaletteForeground;
  textColor: PaletteForeground;
  actionColor: PaletteForeground;
  iconButtonColor: PaletteForeground;
  borderColor: PaletteBorder | undefined;
};

export type BannerVariantConfig = Record<BannerVariant, BannerVariantStyle>;

export const variants: BannerVariantConfig = {
  informational: {
    background: 'primaryWash',
    iconColor: 'primary',
    textColor: 'foreground',
    actionColor: 'primary',
    iconButtonColor: 'foregroundMuted',
    borderColor: undefined,
  },
  promotional: {
    background: 'background',
    iconColor: 'primary',
    textColor: 'foreground',
    actionColor: 'primary',
    iconButtonColor: 'foregroundMuted',
    borderColor: 'line',
  },
  danger: {
    background: 'negative',
    iconColor: 'negativeForeground',
    textColor: 'negativeForeground',
    actionColor: 'negativeForeground',
    iconButtonColor: 'negativeForeground',
    borderColor: 'negative',
  },
  warning: {
    background: 'background',
    iconColor: 'negative',
    textColor: 'foreground',
    actionColor: 'foreground',
    iconButtonColor: 'foregroundMuted',
    borderColor: undefined,
  },
};
