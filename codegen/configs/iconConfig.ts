const map1 = { large: 24, medium: 16, small: 12, xSmall: 8 } as const;
const map2 = { large: 32, medium: 24, small: 16, xSmall: 12 } as const;

export const iconScaleMap = {
  xSmall: map1,
  small: map1,
  medium: map1,
  large: map1,
  xLarge: map2,
  xxLarge: map2,
  xxxLarge: map2,
} as const;
