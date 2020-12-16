import { fallbackStack } from '@cb/design-system-web/styles/shared';

enum FontWeight {
  Regular = 400,
  Medium = 500,
  Semibold = 600,
}

export const xHeight = {
  Graphik: 0.53,
  Inter: 0.55,
};

export const cssFontFamilies = {
  Graphik: `'Graphik', 'Inter', ${fallbackStack}`,
  Inter: `'Inter', 'Graphik', ${fallbackStack}`,
} as const;

export const typographyConfig = {
  display1: {
    tag: 'h1' as const,
    baseFontSize: 64,
    leading: 7,
    fontFamily: 'Graphik' as const,
    xHeight: xHeight.Graphik,
    fontWeight: FontWeight.Regular,
  },
  display2: {
    tag: 'h2' as const,
    baseFontSize: 34,
    leading: 7,
    fontFamily: 'Graphik' as const,
    xHeight: xHeight.Graphik,
    fontWeight: FontWeight.Regular,
  },
  title1: {
    tag: 'h3' as const,
    baseFontSize: 28,
    leading: 6,
    fontFamily: 'Graphik' as const,
    xHeight: xHeight.Graphik,
    fontWeight: FontWeight.Medium,
  },
  title2: {
    tag: 'h4' as const,
    baseFontSize: 28,
    leading: 6,
    fontFamily: 'Graphik' as const,
    xHeight: xHeight.Graphik,
    fontWeight: FontWeight.Regular,
  },
  title3: {
    tag: 'h5' as const,
    baseFontSize: 20,
    leading: 5,
    fontFamily: 'Graphik' as const,
    xHeight: xHeight.Graphik,
    fontWeight: FontWeight.Medium,
  },
  headline: {
    tag: 'div' as const,
    baseFontSize: 16,
    leading: 5,
    fontFamily: 'Inter' as const,
    xHeight: xHeight.Inter,
    fontWeight: FontWeight.Semibold,
  },
  body: {
    tag: 'div' as const,
    baseFontSize: 16,
    leading: 5,
    fontFamily: 'Inter' as const,
    xHeight: xHeight.Inter,
    fontWeight: FontWeight.Regular,
  },
  label1: {
    tag: 'div' as const,
    baseFontSize: 14,
    leading: 1,
    fontFamily: 'Inter' as const,
    xHeight: xHeight.Inter,
    fontWeight: FontWeight.Semibold,
    allowAllCaps: true,
  },
  label2: {
    tag: 'div' as const,
    baseFontSize: 14,
    leading: 1,
    fontFamily: 'Inter' as const,
    xHeight: xHeight.Inter,
    fontWeight: FontWeight.Regular,
    allowAllCaps: true,
    tnum: true,
  },
  caption: {
    tag: 'div' as const,
    baseFontSize: 13,
    leading: 1,
    fontFamily: 'Inter' as const,
    xHeight: xHeight.Inter,
    fontWeight: FontWeight.Semibold,
    allowAllCaps: true,
    tnum: true,
  },
  legal: {
    tag: 'div' as const,
    baseFontSize: 13,
    leading: 2,
    fontFamily: 'Inter' as const,
    xHeight: xHeight.Inter,
    fontWeight: FontWeight.Regular,
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
