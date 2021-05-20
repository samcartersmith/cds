import { useMemo } from 'react';

import { hsl, rgb, HSLColor } from 'd3-color';

import { SpectrumAlias } from '../types';

type ContrastCriteriaUsage = 'largeText' | 'normalText' | 'graphics';
type ReturnOriginalValue = { value: string; type: 'color' };
type ReturnPaletteValue = { value: SpectrumAlias; type: 'paletteValue' };

/**
 * People with low vision often have difficulty reading text that does not contrast with its background.
 * This can be exacerbated if the person has a color vision deficiency that lowers the contrast even further.
 * Providing a minimum luminance contrast ratio between the text and its background can make the text more
 * readable even if the person does not see the full range of colors. It also works for the rare individuals who see no color.
 *
 * 1. Check if color meets contrast criteria.
 * 2. If pass, return color passed in.
 * 3. If fail, check saturation.
 * 4. If gray color return `gray100`.
 * 5. If non gray color return equivalent CDS palette value.
 */
export const useCompliantForeground = (
  background: string,
  foreground: string,
  usage: ContrastCriteriaUsage
): ReturnOriginalValue | ReturnPaletteValue => {
  return useMemo(() => {
    if (meetsContrastCriteria(background, foreground, usage)) {
      return { value: foreground, type: 'color' };
    } else {
      return { value: getCompliantPaletteValue(foreground), type: 'paletteValue' };
    }
  }, [background, foreground, usage]);
};

/**
 * The Web Content Accessibility Guidelines (WCAG) include convenient quantitative recommendations for making text and graphics accessible based on the minimum acceptable contrast of foreground against background.
 * For example, black on yellow has a high contrast ratio (19.56) and therefore should be easier to read, whereas blue on blue is low contrast (2.31) and harder to read.
 */
export const getContrastRatio = (background: string, foreground: string) => {
  const backgroundLuminance = luminance(background);
  const foregroundLuminance = luminance(foreground);
  return (
    (Math.max(backgroundLuminance, foregroundLuminance) + 0.05) /
    (Math.min(backgroundLuminance, foregroundLuminance) + 0.05)
  );
};

/**
 * Relative luminance is the relative brightness of any point in a colorspace, normalized to 0 for darkest black and 1 for lightest white.
 * https://contrastchecker.online/color-relative-luminance-calculator
 */
export const luminance = (color: string) => {
  const { r: red, g: green, b: blue } = rgb(color);
  const [redLinear, greenLinear, blueLinear] = [red / 255, green / 255, blue / 255].map(item =>
    item <= 0.04045 ? item / 12.92 : ((item + 0.055) / 1.055) ** 2.4
  );
  return 0.2126 * redLinear + 0.7152 * greenLinear + 0.0722 * blueLinear;
};

/**
 * Contrast ratios can range from 1 to 21 (commonly written 1:1 to 21:1).
 * 7 - "enhanced" contrast for regular sized text under WCAG 2.0 1.4.6 (Level AAA)
 * 4.5 - minimum contrast for regular sized text under WCAG 2.0 1.4.3 (Level AA)
 * 3 - minimum contrast for "large scale" text (18 pt or 14 pt bold, or larger) under WCAG 2.0 1.4.3 (Level AA)
 * https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 */
export const meetsContrastCriteria = (
  background: string,
  foreground: string,
  usage: ContrastCriteriaUsage
) => {
  const ratio = getContrastRatio(background, foreground);
  switch (usage) {
    case 'normalText':
      return ratio >= 7;
    case 'largeText':
      return ratio >= 4.5;
    case 'graphics':
      return ratio >= 3;
  }
};

export const isGray = (hslColor: HSLColor) => {
  return hslColor.s < 0.3 || isNaN(hslColor.s);
};

/**
 * Take a non-CDS color and return the closest equivalent from CDS spectrum colors.
 */
export const getCompliantPaletteValue = (color: string): SpectrumAlias => {
  const hslColor = hsl(color);
  const hue = hslColor.h;
  if (isGray(hslColor)) return 'gray100';
  if (hue === 345 || between(hue, 0, 14)) return 'red60';
  if (between(hue, 15, 30)) return 'orange60';
  if (between(hue, 31, 80)) return 'yellow60';
  if (between(hue, 81, 180)) return 'green60';
  if (between(hue, 181, 250)) return 'blue60';
  if (between(hue, 251, 289)) return 'purple60';
  if (between(hue, 290, 344)) return 'pink60';
  return 'gray100';
};

export const between = (value: number, min: number, max: number) => {
  return value >= min && value <= max;
};
