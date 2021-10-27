export const fontWeights = {
  Regular: 400,
  Medium: 500,
  'Semi-Bold': 600,
} as const;

export const xHeight = {
  Graphik: 0.53,
  Inter: 0.55,
};

export type FallbackStack =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";

export const fallbackStack: FallbackStack =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";

export const cssFontFamilies = {
  Graphik: `'Graphik', 'Inter', ${fallbackStack}`,
  Inter: `'Inter', 'Graphik', ${fallbackStack}`,
} as const;

export const typographyConfig = {
  display1: {
    baseFontSize: 64,
    leading: 7,
    fontFamily: 'Graphik' as const,
    xHeight: xHeight.Graphik,
    fontWeight: 'Regular' as const,
  },
  display2: {
    baseFontSize: 34,
    leading: 7,
    fontFamily: 'Graphik' as const,
    xHeight: xHeight.Graphik,
    fontWeight: 'Regular' as const,
  },
  display2Frontier: {
    baseFontSize: 48,
    leading: 7,
    fontFamily: 'Graphik' as const,
    xHeight: xHeight.Graphik,
    fontWeight: 'Regular' as const,
  },
  display3: {
    baseFontSize: 40,
    leading: 7,
    fontFamily: 'Graphik' as const,
    xHeight: xHeight.Graphik,
    fontWeight: 'Regular' as const,
  },
  title1: {
    baseFontSize: 28,
    leading: 6,
    fontFamily: 'Graphik' as const,
    xHeight: xHeight.Graphik,
    fontWeight: 'Medium' as const,
  },
  title2: {
    baseFontSize: 28,
    leading: 6,
    fontFamily: 'Graphik' as const,
    xHeight: xHeight.Graphik,
    fontWeight: 'Regular' as const,
  },
  title3: {
    baseFontSize: 20,
    leading: 5,
    fontFamily: 'Graphik' as const,
    xHeight: xHeight.Graphik,
    fontWeight: 'Medium' as const,
  },
  title4: {
    baseFontSize: 20,
    leading: 5,
    fontFamily: 'Graphik' as const,
    xHeight: xHeight.Graphik,
    fontWeight: 'Regular' as const,
  },
  headline: {
    baseFontSize: 16,
    leading: 5,
    fontFamily: 'Inter' as const,
    xHeight: xHeight.Inter,
    fontWeight: 'Semi-Bold' as const,
  },
  body: {
    baseFontSize: 16,
    leading: 5,
    fontFamily: 'Inter' as const,
    xHeight: xHeight.Inter,
    fontWeight: 'Regular' as const,
  },
  label1: {
    baseFontSize: 14,
    leading: 1,
    fontFamily: 'Inter' as const,
    xHeight: xHeight.Inter,
    fontWeight: 'Semi-Bold' as const,
    allowAllCaps: true,
  },
  label2: {
    baseFontSize: 14,
    leading: 1,
    fontFamily: 'Inter' as const,
    xHeight: xHeight.Inter,
    fontWeight: 'Regular' as const,
    allowAllCaps: true,
    tnum: true,
  },
  caption: {
    baseFontSize: 13,
    leading: 1,
    fontFamily: 'Inter' as const,
    xHeight: xHeight.Inter,
    fontWeight: 'Semi-Bold' as const,
    allowAllCaps: true,
    tnum: true,
  },
  legal: {
    baseFontSize: 13,
    leading: 2,
    fontFamily: 'Inter' as const,
    xHeight: xHeight.Inter,
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
