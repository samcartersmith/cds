import { FallbackColor } from '../types';

const altFallbackColors = ['green', 'teal', 'pink', 'purple', 'gray'] as unknown as FallbackColor[];

/**
 * Generates fallback colors for a group of Avatars
 * First Avatar will always be blue (primary color)
 * Subsequent Avatars will cycle through remaining fallback colors
 * @param count = number of Avatars you need to generate background colors for
 */
export const useAvatarFallbackColors = (count: number): FallbackColor[] => {
  const altColorsCount = altFallbackColors.length;
  const getRemainder = (num: number) => Math.floor(num % altColorsCount);
  const fallbackColors: FallbackColor[] = [];
  Array.from(Array(count)).forEach((_, idx) => {
    if (idx === 0) {
      fallbackColors.push('blue');
      return;
    }
    if (idx <= altColorsCount) {
      fallbackColors.push(altFallbackColors[idx - 1]);
      return;
    }
    fallbackColors.push(altFallbackColors[getRemainder(idx) - 1]);
  });
  return fallbackColors;
};
