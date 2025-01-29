import { getRGBColor, type ColorValue } from '../color/blendColors';

const contrastRatio = (l1: number, l2: number) => {
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

export const getAccessibleColor = (backgroundColor: ColorValue) => {
  const { r, g, b } = getRGBColor(backgroundColor);
  const rLuminance = (r / 255) ** 2.2;
  const gLuminance = (g / 255) ** 2.2;
  const bLuminance = (b / 255) ** 2.2;

  // sRGB constants
  const colorLuminance = 0.2126 * rLuminance + 0.7151 * gLuminance + 0.0721 * bLuminance;

  // Contrast ratios with white and black
  const whiteContrast = contrastRatio(colorLuminance, 1); // White luminance = 1
  const blackContrast = contrastRatio(colorLuminance, 0); // Black luminance = 0

  // Return the color with higher contrast
  return whiteContrast >= blackContrast ? '#ffffff' : '#000000';
};
