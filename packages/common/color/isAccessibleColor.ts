import type { A11yColorUsage } from '../types';

import { getContrastRatio } from './getContrastRatio';
/**
 * Contrast ratios can range from 1 to 21 (commonly written 1:1 to 21:1).
 * 7 - "enhanced" contrast for regular sized text under WCAG 2.0 1.4.6 (Level AAA)
 * 4.5 - minimum contrast for regular sized text under WCAG 2.0 1.4.3 (Level AA)
 * 3 - minimum contrast for "large scale" text (18 pt or 14 pt bold, or larger) under WCAG 2.0 1.4.3 (Level AA)
 * https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 */
export const isAccessibleColor = (
  background: string,
  foreground: string,
  usage: A11yColorUsage,
) => {
  const ratio = getContrastRatio(background, foreground);
  switch (usage) {
    case 'normalText':
      return ratio >= 7;
    case 'largeText':
      return ratio >= 4.5;
    case 'graphic':
      return ratio >= 3;
    default:
      return true;
  }
};
