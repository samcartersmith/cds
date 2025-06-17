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

const noAdjustmentThreshold = 0.2;
const maxAdjustmentScale = 0.75;
// Function to adjust opacity based on luminance difference
const getAdjustedOpacity = (
  overlayLuminance: number,
  underlayLuminance: number,
  baseOpacity: number,
) => {
  // Calculate absolute difference in luminance (0 to 1)
  const luminanceDelta = Math.abs(overlayLuminance - underlayLuminance);

  // If difference is below threshold, return base opacity
  if (luminanceDelta < noAdjustmentThreshold) {
    return baseOpacity;
  }

  // We need to normalize because we want to smoothly adjust opacity based on how different the colors are.
  // Without normalization, small differences above the threshold would cause too big of a jump in opacity.
  // Convert the luminance difference to a percentage (0-100%) of the remaining possible range.
  // For example, if threshold is 0.2 and difference is 0.6, this converts it to 0.5 (50% of the way between 0.2 and 1.0)
  const normalizedDiff = (luminanceDelta - noAdjustmentThreshold) / (1 - noAdjustmentThreshold);

  // Use square root function on normalized difference
  // The larger the normalizedDiff value is, the less opaque we want it to be (e.g. lower opacity for larger diff).
  // This effectively reduces the difference in the visual contrast between the two colors, along a curve.
  const opacityScale = Math.pow(normalizedDiff, 1 / 2) * maxAdjustmentScale;

  // Scale the opacity increase based on the base opacity
  const maxIncrease = 1 - baseOpacity;
  const opacityIncrease = maxIncrease * opacityScale;

  // The final opacity will increase with luminance difference but never reach 1
  return baseOpacity + opacityIncrease;
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
  // If the color is 'currentColor', we are unable to blend it with the theme background and return the background color
  if (color === 'currentColor') return color;

  const overlayColorRgba = d3color(color);
  if (overlayColorRgba === null) return color;

  const overlayColorOpacity = overlayColorRgba.opacity;
  // return transparent if the color is transparent
  if (overlayColorOpacity === 0) return 'transparent';

  const overlayLuminance = getLuminance(color) ?? 1;
  const inverseColorScheme = colorScheme === 'dark' ? 'light' : 'dark';
  const isHighContrastToColorSchemeBg =
    colorScheme === 'dark'
      ? overlayLuminance >= lightColorThreshold // This filters out the light colors in the default darkSpectrum, e.g. gray70-gray100
      : overlayLuminance < darkColorThreshold; // This filters out the dark colors in the default lightSpectrum, e.g. gray70-gray100

  const underlayColor =
    colorSchemeMap[isDisabled || isHighContrastToColorSchemeBg ? colorScheme : inverseColorScheme];
  const underlayLuminance = getLuminance(underlayColor) ?? 1;

  // Get adjusted opacity based on luminance difference between the overlay and underlay colors
  const adjustedOpacity = getAdjustedOpacity(overlayLuminance, underlayLuminance, opacity);

  const overlayColorRgbaWithAdjustedOpacity = overlayColorRgba.copy({ opacity: adjustedOpacity });

  return blendColors({
    underlayColor,
    overlayColor: overlayColorRgbaWithAdjustedOpacity,
    // If the overlay color is not fully opaque (eg. bgLine, bgLineHeavy),
    // blend the overlay color with the underlay color and then apply the original opacity to the blended color
    finalOpacity: overlayColorOpacity < 1 ? overlayColorOpacity : undefined,
  });
};
