import { HSLColor } from 'd3-color';

export const isGray = (hslColor: HSLColor) => {
  return hslColor.s < 0.3 || Number.isNaN(hslColor.s);
};
