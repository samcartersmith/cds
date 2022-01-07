export const fontWeights = {
  Regular: 400,
  Medium: 500,
} as const;

export const xHeight = {
  display: 0.52,
  sans: 0.52,
  text: 0.535,
};

export const fallbackStack =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";

export const fontFamilies = {
  display: {
    name: 'display',
    fontFamily: 'CoinbaseDisplay',
    minimum: 25,
  },
  sans: {
    name: 'sans',
    fontFamily: 'CoinbaseSans',
    minimum: 14,
  },
  text: {
    name: 'text',
    fontFamily: 'CoinbaseText',
    minimum: 0,
  },
  mono: {
    name: 'mono',
    fontFamily: 'CoinbaseMono',
    minimum: 0,
  },
} as const;

export const typographyConfig = {
  display1: {
    baseFontSize: 64,
    leading: 7,
    fontWeight: 'Regular' as const,
  },
  display2: {
    baseFontSize: 34,
    leading: 7,
    fontWeight: 'Regular' as const,
  },
  display2Frontier: {
    baseFontSize: 48,
    leading: 7,
    fontWeight: 'Regular' as const,
  },
  display3: {
    baseFontSize: 40,
    leading: 7,
    fontWeight: 'Regular' as const,
  },
  title1: {
    baseFontSize: 28,
    leading: 6,
    fontWeight: 'Medium' as const,
  },
  title2: {
    baseFontSize: 28,
    leading: 6,
    fontWeight: 'Regular' as const,
  },
  title3: {
    baseFontSize: 20,
    leading: 5,
    fontWeight: 'Medium' as const,
  },
  title4: {
    baseFontSize: 20,
    leading: 5,
    fontWeight: 'Regular' as const,
  },
  headline: {
    baseFontSize: 16,
    leading: 5,
    fontWeight: 'Medium' as const,
  },
  body: {
    baseFontSize: 16,
    leading: 5,
    fontWeight: 'Regular' as const,
  },
  label1: {
    baseFontSize: 14,
    leading: 3,
    fontWeight: 'Medium' as const,
    allowAllCaps: true,
  },
  label2: {
    baseFontSize: 14,
    leading: 3,
    fontWeight: 'Regular' as const,
    allowAllCaps: true,
    tnum: true,
  },
  caption: {
    baseFontSize: 13,
    leading: 2,
    fontWeight: 'Medium' as const,
    allowAllCaps: true,
    tnum: true,
  },
  legal: {
    baseFontSize: 13,
    leading: 2,
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
