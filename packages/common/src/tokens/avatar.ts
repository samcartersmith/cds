import type { ThemeVars } from '../core/theme';
import type { AvatarFallbackColor } from '../types';

type AvatarFallbackColorMap = Record<AvatarFallbackColor, ThemeVars.SpectrumColor>;

export const colorSchemeMap: AvatarFallbackColorMap = {
  blue: 'blue60',
  teal: 'teal60',
  purple: 'purple60',
  pink: 'pink60',
  green: 'green60',
  gray: 'gray60',
};

export const avatarDefaultFontColor = '#ffffff';
