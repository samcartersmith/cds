import { PaletteBackground, PaletteBorder, PaletteForeground } from '../types';
import { BannerTone } from '../types/BannerBaseProps';

type BannerToneStyle = {
  background: PaletteBackground | undefined;
  iconColor: PaletteForeground;
  textColor: PaletteForeground;
  actionColor: PaletteForeground;
  iconButtonColor: PaletteForeground;
  borderColor: PaletteBorder | undefined;
};

export type BannerToneConfig = Record<BannerTone, BannerToneStyle>;

export const tones: BannerToneConfig = {
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
  severe: {
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
