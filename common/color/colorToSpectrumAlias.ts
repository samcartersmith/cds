import { hsl } from 'd3-color';

import type { SpectrumAlias } from '../types';
import { between } from '../utils/between';
import { isGray } from './isGray';

/**
 * Take a non-CDS color and return the closest equivalent from CDS spectrum colors.
 */
export const colorToSpectrumAlias = (color: string): SpectrumAlias => {
  const hslColor = hsl(color);
  const hue = hslColor.h;
  if (isGray(hslColor)) return 'gray100';
  if (hue === 345 || between(hue, 0, 14)) return 'red60';
  if (between(hue, 15, 39)) return 'orange60';
  if (between(hue, 40, 80)) return 'yellow60';
  if (between(hue, 81, 180)) return 'green60';
  if (between(hue, 181, 250)) return 'blue60';
  if (between(hue, 251, 289)) return 'purple60';
  if (between(hue, 290, 344)) return 'pink60';
  return 'gray100';
};
