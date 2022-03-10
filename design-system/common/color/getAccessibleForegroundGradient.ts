import { A11yColorUsage, GradientArray, Spectrum, PaletteValueToRgbaStringFn } from '../types';
import { colorToSpectrumAlias } from './colorToSpectrumAlias';
import { darkenColor } from './darkenColor';
import { getAccessibleForeground } from './getAccessibleForeground';
import { incrementHueStep } from './incrementHueStep';
import { isAccessibleColor } from './isAccessibleColor';

type GetAccessibleForegroundGradientParams = {
  /* Valid color value (hex, rgb, rgba, etc) */
  background: string;
  /* Valid color value (hex, rgb, rgba, etc) */
  color: string;
  /** Active spectrum (light or dark) */
  spectrum: Spectrum;
  /** Function to transform a paletteValue (blue60 or [blue60, 1]) into a valid color value. */
  transformFn: PaletteValueToRgbaStringFn;
  /** Where the foreground color is being applied. */
  usage: A11yColorUsage;
};

export const getAccessibleForegroundGradient = ({
  background,
  color,
  spectrum,
  transformFn,
  usage,
}: GetAccessibleForegroundGradientParams): GradientArray => {
  let color1 = color;
  let color2 = color;
  // Disable gradients in dark mode
  if (spectrum === 'dark' || color === 'auto') {
    color1 = getAccessibleForeground(background, color, usage, transformFn);
    color2 = color1;
  } else if (isAccessibleColor(background, color, usage)) {
    color1 = color;
    color2 = darkenColor(color) ?? color;
  } else {
    const alias1 = colorToSpectrumAlias(color, usage);
    const alias2 = incrementHueStep(alias1);
    color1 = transformFn(alias1);
    color2 = transformFn(alias2);
  }
  return [
    { offset: '0%', color: color1 },
    { offset: '100%', color: color2 },
  ];
};
