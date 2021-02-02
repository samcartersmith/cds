const dense = (size: number) => {
  if (size === 0.5) return 4;
  if (size === 1) return 8;
  return size * 4 + 4;
};

const normal = (size: number) => {
  if (size === 0.5) return 4;
  if (size === 1) return 8;
  return size * 8;
};

export const spacingConfig = {
  xSmall: dense,
  small: dense,
  medium: dense,
  large: normal,
  xLarge: normal,
  xxLarge: normal,
  xxxLarge: normal,
} as const;
