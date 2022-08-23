import { hsl } from 'd3-color';

import { A11yColorUsage, PaletteValueToRgbaStringFn } from '../types';

import { colorToSpectrumAlias } from './colorToSpectrumAlias';
import { getContrastRatio } from './getContrastRatio';
import { isAccessibleColor } from './isAccessibleColor';
import { isGray } from './isGray';

/**
 * People with low vision often have difficulty reading text that does not contrast with its background.
 * This can be exacerbated if the person has a color vision deficiency that lowers the contrast even further.
 * Providing a minimum luminance contrast ratio between the text and its background can make the text more
 * readable even if the person does not see the full range of colors. It also works for the rare individuals who see no color.
 *
 * 1. Check if foreground color meets contrast criteria.
 * 2. If pass, return color passed in.
 * 3. If fail, check saturation.
 * 4. If gray color check if white or black have a higher contrast ratio. Return the value with the highest contrast ratio.
 * 5. If non gray color return check if closest CDS spectrum alias (i.e. `orange60`) has a higher contrast ratio than passed in values.
 */
export const getAccessibleForeground = (
  /* Valid color value (hex, rgb, rgba, etc) */
  background: string,
  /* Valid color value (hex, rgb, rgba, etc) */
  foreground: string | 'auto',
  /** Where the foreground color is being applied. */
  usage: A11yColorUsage,
  /** Function to transform a paletteValue (blue60 or [blue60, 1]) into a valid color value. */
  transformFn: PaletteValueToRgbaStringFn,
  /** Use enhanced ratio. */
  enhanced?: boolean,
) => {
  if (foreground === 'auto') {
    return isAccessibleColor({ background, foreground: 'white', usage })
      ? 'rgb(255,255,255)'
      : 'rgb(0,0,0)';
  }
  const isAccessibleForeground = isAccessibleColor({ background, foreground, usage, enhanced });
  if (isAccessibleForeground) {
    return foreground;
  }
  const spectrumAlias = colorToSpectrumAlias(foreground, usage, enhanced);
  const darkestGrayContrastRatio = getContrastRatio(background, 'rgb(0,0,0)');
  const lightestGrayContrastRatio = getContrastRatio(background, 'rgb(255,255,255)');

  // If gray foreground doesn't meet a11y, check if darkest or lightest gray have a higher ratio
  if (isGray(hsl(foreground))) {
    return darkestGrayContrastRatio > lightestGrayContrastRatio ? 'rgb(0,0,0)' : 'rgb(255,255,255)';
  }

  return transformFn(spectrumAlias);
};
