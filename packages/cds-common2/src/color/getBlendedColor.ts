import { color as d3color } from 'd3-color';

import type { ColorScheme } from '../core/theme';

import { blendColors } from './blendColors';
import { getLuminance } from './getLuminance';

const darkColorThreshold = 0.11;
const lightColorThreshold = 0.4;

const colorSchemeMap: Record<ColorScheme, string> = {
  light: '#fff',
  dark: '#000',
};

/** Blends a color to make it darker or lighter, depending on the colorScheme and the hue of the color. */
export const getBlendedColor = ({
  color,
  opacity,
  colorScheme,
  isDisabled,
}: {
  color: string;
  opacity: number;
  colorScheme: ColorScheme;
  isDisabled?: boolean;
}) => {
  const overlayColorRgb = d3color(color);
  // If the color is 'currentColor', we are unable to blend it with the theme background and return the background color
  if (color === 'currentColor' || overlayColorRgb === null) return color;
  // return transparent if the color is transparent
  if (overlayColorRgb.opacity === 0) return 'transparent';
  const backgroundLuminance = getLuminance(color) ?? 1;
  const isHighHue =
    colorScheme === 'dark'
      ? backgroundLuminance >= lightColorThreshold // This filters out the light colors in the default darkSpectrum, e.g. gray70-gray100
      : backgroundLuminance < darkColorThreshold; // This filters out the dark colors in the defaut lightSpectrum, e.g. gray70-gray100
  const inverseColorScheme = colorScheme === 'dark' ? 'light' : 'dark';
  const underlayColor = colorSchemeMap[isDisabled || isHighHue ? colorScheme : inverseColorScheme];
  const overlayColorRgba = overlayColorRgb.copy({ opacity });

  return blendColors({ underlayColor, overlayColor: overlayColorRgba });
};
