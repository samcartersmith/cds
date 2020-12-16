/* eslint-disable id-length */
const scaleMap1 = { l: 24, m: 16, s: 12, xs: 8 } as const;
const scaleMap2 = { l: 32, m: 24, s: 16, xs: 12 } as const;

export const iconConfig = {
  xSmall: scaleMap1,
  small: scaleMap1,
  medium: scaleMap1,
  large: scaleMap1,
  xLarge: scaleMap2,
  xxLarge: scaleMap2,
  xxxLarge: scaleMap2,
} as const;
