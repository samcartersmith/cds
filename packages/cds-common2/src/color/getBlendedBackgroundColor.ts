import { color } from 'd3-color';

import type { ColorScheme, ThemeVars } from '../core/theme';

import { blendColors } from './blendColors';
import { getLuminance } from './getLuminance';

const darkColorThreshold = 0.11;
const lightColorThreshold = 0.4;

export const getBlendedBackgroundColor = ({
  background,
  themeColor,
  opacity,
  colorScheme,
  isDisabled,
}: {
  background: ThemeVars.Color;
  themeColor: Record<ThemeVars.Color, string>;
  opacity: number;
  colorScheme: ColorScheme;
  isDisabled?: boolean;
}) => {
  const d3BackgroundColor = color(themeColor[background]);
  // If the background is 'currentColor', we are unable to blend it with the theme background and return the background color
  if (background === 'currentColor' || d3BackgroundColor === null) return themeColor[background];
  // return transparent if the background is transparent
  if (d3BackgroundColor.opacity === 0) return 'transparent';
  const backgroundLuminance = getLuminance(themeColor[background]) ?? 1;
  const isHighHue =
    colorScheme === 'dark'
      ? backgroundLuminance >= lightColorThreshold // This filters out the light colors in the default darkSpectrum, e.g. gray70-gray100
      : backgroundLuminance < darkColorThreshold; // This filters out the dark colors in the defaut lightSpectrum, e.g. gray70-gray100
  const underlayColor = isDisabled ? themeColor.bg : themeColor[isHighHue ? 'bg' : 'bgInverse'];
  const overlayColor = d3BackgroundColor.copy({ opacity });

  return blendColors({ underlayColor, overlayColor });
};
