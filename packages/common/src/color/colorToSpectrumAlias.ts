import * as d3Color from 'd3-color';

import type { A11yColorUsage, SpectrumAlias, SpectrumHueStep } from '../types';
import { between } from '../utils/between';

import { isGray } from './isGray';

const { hsl } = d3Color;

const colorStepMap: Record<string, Record<A11yColorUsage, SpectrumHueStep>> = {
  minimum: {
    normalText: 60,
    largeText: 60,
    graphic: 50,
  },
  enhanced: {
    normalText: 70,
    largeText: 70,
    graphic: 60,
  },
};

/**
 * Take a non-CDS color and return the closest equivalent from CDS spectrum colors.
 */
export const colorToSpectrumAlias = (
  color: string,
  usage: A11yColorUsage = 'normalText',
  enhanced?: boolean,
): SpectrumAlias => {
  const step = colorStepMap[enhanced ? 'enhanced' : 'minimum'][usage];
  const hslColor = hsl(color);
  const hue = Math.round(hslColor.h);
  if (isGray(hslColor)) return 'gray100';
  if (hue === 345 || between(hue, 0, 14)) return `red${step}` as const;
  if (between(hue, 15, 35)) return `orange${step}` as const;
  if (between(hue, 36, 80)) return `yellow${step}` as const;
  if (between(hue, 81, 180)) return `green${step}` as const;
  if (between(hue, 181, 250)) return `blue${step}` as const;
  if (between(hue, 251, 289)) return `purple${step}` as const;
  if (between(hue, 290, 344)) return `pink${step}` as const;
  return 'gray100';
};
