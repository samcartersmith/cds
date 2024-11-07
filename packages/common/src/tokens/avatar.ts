import { FallbackColor, PaletteValue, Spectrum } from '../types';

type FallbackColorMap = Record<Spectrum, Record<FallbackColor, PaletteValue>>;

export const colorSchemeMap: FallbackColorMap = {
  light: {
    blue: 'blue60',
    teal: 'teal60',
    purple: 'purple60',
    pink: 'pink60',
    green: 'green60',
    gray: 'gray100',
  },
  dark: {
    blue: 'blue60',
    teal: 'teal60',
    purple: 'purple60',
    pink: 'pink60',
    green: 'green60',
    gray: 'gray60',
  },
};

export const avatarDefaultFontColor = '#ffffff';
