import { ThemeVars } from '../core/theme';
import { FallbackColor } from '../types';

type FallbackColorMap = Record<FallbackColor, ThemeVars.SpectrumColor>;

export const colorSchemeMap: FallbackColorMap = {
  blue: 'blue60',
  teal: 'teal60',
  purple: 'purple60',
  pink: 'pink60',
  green: 'green60',
  gray: 'gray60',
};

export const avatarDefaultFontColor = '#ffffff';
