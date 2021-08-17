export const fontWeights = {
  Regular: 400,
  Medium: 500,
} as const;

export const xHeight = {
  display: 0.52,
  sans: 0.52,
  text: 0.535,
};

export type FontFamily = 'CoinbaseDisplay' | 'CoinbaseSans' | 'CoinbaseText';

export type FallbackStack =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";

export const fallbackStack: FallbackStack =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";

export const cssFontFamilies = {
  CoinbaseDisplay: `'CoinbaseDisplay', ${fallbackStack}`,
  CoinbaseSans: `'CoinbaseSans', ${fallbackStack}`,
  CoinbaseText: `'CoinbaseText', ${fallbackStack}`,
} as const;

export const typographyConfig = {
  display1: {
    tag: 'h1' as const,
    baseFontSize: 64,
    leading: 7,
    xHeight: xHeight.display,
    fontFamily: 'CoinbaseDisplay' as FontFamily,
    fontWeight: 'Regular' as const,
  },
  display2: {
    tag: 'h2' as const,
    baseFontSize: 34,
    leading: 7,
    xHeight: xHeight.display,
    fontFamily: 'CoinbaseDisplay' as FontFamily,
    fontWeight: 'Regular' as const,
  },
  title1: {
    tag: 'h3' as const,
    baseFontSize: 28,
    leading: 6,
    xHeight: xHeight.display,
    fontFamily: 'CoinbaseDisplay' as FontFamily,
    fontWeight: 'Medium' as const,
  },
  title2: {
    tag: 'h4' as const,
    baseFontSize: 28,
    leading: 6,
    xHeight: xHeight.display,
    fontFamily: 'CoinbaseDisplay' as FontFamily,
    fontWeight: 'Regular' as const,
  },
  title3: {
    tag: 'h5' as const,
    baseFontSize: 20,
    leading: 5,
    xHeight: xHeight.sans,
    fontFamily: 'CoinbaseSans' as FontFamily,
    fontWeight: 'Medium' as const,
  },
  headline: {
    tag: 'div' as const,
    baseFontSize: 16,
    leading: 5,
    xHeight: xHeight.sans,
    fontFamily: 'CoinbaseSans' as FontFamily,
    fontWeight: 'Medium' as const,
  },
  body: {
    tag: 'div' as const,
    baseFontSize: 16,
    leading: 5,
    xHeight: xHeight.sans,
    fontFamily: 'CoinbaseSans' as FontFamily,
    fontWeight: 'Regular' as const,
  },
  label1: {
    tag: 'div' as const,
    baseFontSize: 14,
    leading: 1,
    xHeight: xHeight.sans,
    fontFamily: 'CoinbaseSans' as FontFamily,
    fontWeight: 'Medium' as const,
    allowAllCaps: true,
  },
  label2: {
    tag: 'div' as const,
    baseFontSize: 14,
    leading: 1,
    xHeight: xHeight.sans,
    fontFamily: 'CoinbaseSans' as FontFamily,
    fontWeight: 'Regular' as const,
    allowAllCaps: true,
    tnum: true,
  },
  caption: {
    tag: 'div' as const,
    baseFontSize: 13,
    leading: 1,
    xHeight: xHeight.text,
    fontFamily: 'CoinbaseText' as FontFamily,
    fontWeight: 'Medium' as const,
    allowAllCaps: true,
    tnum: true,
  },
  legal: {
    tag: 'div' as const,
    baseFontSize: 13,
    leading: 2,
    xHeight: xHeight.text,
    fontFamily: 'CoinbaseText' as FontFamily,
    fontWeight: 'Regular' as const,
    disableMinimums: true,
  },
};

export type TypographyConfig = Omit<
  typeof typographyConfig[keyof typeof typographyConfig],
  'allowAllCaps' | 'tnum' | 'disableMinimums'
> & {
  allowAllCaps?: boolean;
  tnum?: boolean;
  disableMinimums?: boolean;
};
