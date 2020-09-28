/**
 * Scales is introduced to handle the different information density among Coinbase products.
 * It can also be used for responsive design as well as as a user preference feature.
 * The dense scale is intended to be the default scale for institutional trade page on the web.
 * The normal scale is intended to be the default scale for retail products and Custody features.
 */
export const scales = {
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
};

export type Scale = keyof typeof scales;

export const DEFAULT_SCALE = 'large';
