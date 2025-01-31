import { color } from 'd3-color';

import type { ColorScheme, ThemeVars } from '../core/theme';

import { type ColorValue, blendColors, getRGBColor } from './blendColors';

const darkColorThreshold = 0.11;
const lightColorThreshold = 0.4;

// Apply sRGB gamma correction
const correctSrgbGamma = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

// Function to calculate relative luminance
// WCGA 2.0 relative luminance calculation https://www.w3.org/WAI/GL/wiki/Relative_luminance
const getRelativeLuminance = (d3Color: ColorValue) => {
  const { r, g, b } = getRGBColor(d3Color);
  const [red, green, blue] = [r, g, b].map((val) => val / 255);

  const Y =
    0.2126 * correctSrgbGamma(red) +
    0.7152 * correctSrgbGamma(green) +
    0.0722 * correctSrgbGamma(blue);

  return Y; // Returns a brightness value from 0 (black) to 1 (white)
};

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
  const backgroundLuminance = getRelativeLuminance(d3BackgroundColor);
  const isHighHue =
    colorScheme === 'dark'
      ? backgroundLuminance >= lightColorThreshold // This filters out the light colors in the default darkSpectrum, e.g. gray70-gray100
      : backgroundLuminance < darkColorThreshold; // This filters out the dark colors in the defaut lightSpectrum, e.g. gray70-gray100
  const underlayColor = isDisabled
    ? themeColor.background
    : themeColor[isHighHue ? 'background' : 'backgroundInverse'];
  const overlayColor = d3BackgroundColor.copy({ opacity });

  return blendColors({ underlayColor, overlayColor });
};
