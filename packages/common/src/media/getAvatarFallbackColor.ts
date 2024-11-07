/* eslint-disable no-bitwise */
import * as d3Color from 'd3-color';

import { isGray } from '../color/isGray';
import { FallbackColor } from '../types';
import { between } from '../utils/between';

const { hsl } = d3Color;

const hashFromString = (s: string): number =>
  s.split('').reduce((a, b) => {
    // eslint-disable-next-line no-param-reassign
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

const rgbFromHash = (hash: number): string => {
  const rgbValue = [0, 0, 0];
  rgbValue.forEach((_, idx) => {
    const newVal = (hash >> (idx * 8)) & 255;
    rgbValue[idx] = newVal;
  });

  return `rgb(${rgbValue[0]}, ${rgbValue[1]}, ${rgbValue[2]})`;
};

export const rgbToAvatarFallbackColor = (color: string): FallbackColor => {
  const hslColor = hsl(color);
  const hue = Math.round(hslColor.h);
  if (isGray(hslColor)) return 'gray';
  // if green or yellow
  if (hue === 0 || between(hue, 1, 79)) return 'green' as const;
  if (between(hue, 80, 169)) return 'teal' as const;
  if (between(hue, 170, 249)) return 'purple' as const;
  // if red or pink or orange
  if (between(hue, 250, 344) || hue === 345) return 'pink' as const;
  return 'gray';
};

/**
 * Generates a fallback color for an Avatar based on a unique identifier
 */
export const getAvatarFallbackColor = (id: string) => {
  const hash = hashFromString(id);
  const rgbValue = rgbFromHash(hash);
  return rgbToAvatarFallbackColor(rgbValue);
};
