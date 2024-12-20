import { PaletteBackground, PaletteBorder, PaletteForeground } from '../types';
import { BannerVariant } from '../types/AlphaBannerBaseProps';

export type BannerVariantStyle = {
  background: PaletteBackground | undefined;
  iconColor: PaletteForeground;
  textColor: PaletteForeground;
  primaryActionColor: PaletteForeground;
  secondaryActionColor: PaletteForeground;
  iconButtonColor: PaletteForeground;
  borderColor: PaletteBorder;
};

export type BannerVariantConfig = Record<BannerVariant, BannerVariantStyle>;

export const variants: BannerVariantConfig = {
  informational: {
    background: 'secondary',
    iconColor: 'primary',
    textColor: 'foreground',
    primaryActionColor: 'primary',
    secondaryActionColor: 'foreground',
    iconButtonColor: 'foreground',
    borderColor: 'primary',
  },
  promotional: {
    background: 'primaryWash',
    iconColor: 'primary',
    textColor: 'foreground',
    primaryActionColor: 'primary',
    secondaryActionColor: 'foreground',
    iconButtonColor: 'foreground',
    borderColor: 'primary',
  },
  warning: {
    background: undefined, // todo: replace when token is available
    iconColor: 'warningForeground',
    textColor: 'foreground',
    primaryActionColor: 'primary',
    secondaryActionColor: 'foreground',
    iconButtonColor: 'foreground',
    borderColor: 'warningForeground',
  },
  error: {
    background: 'negativeWash',
    iconColor: 'negative',
    textColor: 'foreground',
    primaryActionColor: 'primary',
    secondaryActionColor: 'foreground',
    iconButtonColor: 'foreground',
    borderColor: 'negative',
  },
};

export const bannerMinWidth = 320;
