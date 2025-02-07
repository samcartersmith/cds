import { color } from 'd3-color';

/**
 * Relative luminance is the relative brightness of any point in a colorspace, normalized to 0 for darkest black and 1 for lightest white.
 * https://contrastchecker.online/color-relative-luminance-calculator
 */
export const getLuminance = (value: string) => {
  const rgbObject = color(value)?.rgb();

  if (!rgbObject) return undefined;

  const { r, g, b } = rgbObject;
  const red = Number.isNaN(r) ? 0 : r;
  const green = Number.isNaN(g) ? 0 : g;
  const blue = Number.isNaN(b) ? 0 : b;
  const [redLinear, greenLinear, blueLinear] = [red / 255, green / 255, blue / 255].map((item) =>
    item <= 0.04045 ? item / 12.92 : ((item + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * redLinear + 0.7152 * greenLinear + 0.0722 * blueLinear;
};
