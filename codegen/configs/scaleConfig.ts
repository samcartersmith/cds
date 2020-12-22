export const DEFAULT_SCALE = 'large';

export const scaleConfig = {
  xSmall: -3 /* dense */,
  small: -2,
  medium: -1,
  large: 0 /* normal */,
  xLarge: 2,
  xxLarge: 4,
  xxxLarge: 6,
  /* in the future */
  // ax1: 10,
  // ax2: 14,
  // ax3: 18,
  // ax4: 22,
  // ax5: 26
} as const;

export type Scale = keyof typeof scaleConfig;
export const scales = Object.keys(scaleConfig);
