import { PaletteBackground, PaletteBorder, PaletteForeground } from '../types';
import { BannerVariant } from '../types/BannerBaseProps';

type BannerVariantStyle = {
  background: PaletteBackground | undefined;
  iconColor: PaletteForeground;
  textColor: PaletteForeground;
  primaryActionColor: PaletteForeground;
  secondaryActionColor: PaletteForeground;
  iconButtonColor: PaletteForeground;
  borderColor: PaletteBorder | undefined;
};

export type BannerVariantConfig = Record<BannerVariant, BannerVariantStyle>;

export const variants: BannerVariantConfig = {
  informational: {
    background: 'background',
    iconColor: 'primary',
    textColor: 'foreground',
    primaryActionColor: 'primary',
    secondaryActionColor: 'foreground',
    iconButtonColor: 'foregroundMuted',
    borderColor: 'line',
  },
  promotional: {
    background: 'primaryWash',
    iconColor: 'primary',
    textColor: 'foreground',
    primaryActionColor: 'primary',
    secondaryActionColor: 'foreground',
    iconButtonColor: 'foregroundMuted',
    borderColor: undefined,
  },
  danger: {
    background: 'negative',
    iconColor: 'negativeForeground',
    textColor: 'negativeForeground',
    primaryActionColor: 'negativeForeground',
    secondaryActionColor: 'negativeForeground',
    iconButtonColor: 'negativeForeground',
    borderColor: 'negative',
  },
  warning: {
    background: 'background',
    iconColor: 'negative',
    textColor: 'foreground',
    primaryActionColor: 'foreground',
    secondaryActionColor: 'foreground',
    iconButtonColor: 'foregroundMuted',
    borderColor: undefined,
  },
  error: {
    background: undefined,
    iconColor: 'negative', // TODO: update to error icon color when available
    textColor: 'foreground',
    primaryActionColor: 'primary',
    secondaryActionColor: 'foreground',
    iconButtonColor: 'foreground',
    borderColor: undefined,
  },
};
