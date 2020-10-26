export enum FontWeight {
  Regular = 400,
  Medium = 500,
  Semibold = 600,
}

export const xHeight = {
  Graphik: 0.53,
  Inter: 0.55,
};

export const fallbackStack =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";

export type TypeVariant = {
  /**
   * Default HTML tag to be associated with the typography.
   * Potential heading typographies use the tag definition from theme configuration and thus
   * do not have tag defined here.
   * Non-heading components can substitute other tags.
   */
  tag: HtmlTextTags;
  fontWeight: FontWeight;
  fontFamily: 'Graphik' | 'Inter';
  /** Font size based on the normal scale value */
  baseFontSize: number;
  /**
   * If true, the text will be transformed to all caps. Capped texts have a slightly higher minimum
   * font size because they are taller.
   */
  allowAllCaps?: boolean;
  /**
   * Disables applying the font size minimum constraint for legibility.
   */
  disableMinimums?: boolean;
  /**
   * Leading + fontSize is used to calculate line height. Line height will be rounded to multiples
   * of 4, which is the alignment grid size. It makes our text snap to the grid.
   */
  leading: number;
  /** If true, numbers will be displayed in tabular style, i.e. monospace. */
  tnum?: boolean;
};

export const typography = {
  Display1: {
    tag: 'h1' as const,
    baseFontSize: 64,
    leading: 7,
    fontFamily: 'Graphik' as const,
    fontWeight: FontWeight.Regular,
  },
  Display2: {
    tag: 'h2' as const,
    baseFontSize: 34,
    leading: 7,
    fontFamily: 'Graphik' as const,
    fontWeight: FontWeight.Regular,
  },
  Title1: {
    tag: 'h3' as const,
    baseFontSize: 28,
    leading: 6,
    fontFamily: 'Graphik' as const,
    fontWeight: FontWeight.Medium,
  },
  Title2: {
    tag: 'h4' as const,
    baseFontSize: 28,
    leading: 6,
    fontFamily: 'Graphik' as const,
    fontWeight: FontWeight.Regular,
  },
  Title3: {
    tag: 'h5' as const,
    baseFontSize: 20,
    leading: 5,
    fontFamily: 'Graphik' as const,
    fontWeight: FontWeight.Medium,
  },
  Headline: {
    tag: 'h6' as const,
    baseFontSize: 16,
    leading: 5,
    fontFamily: 'Inter' as const,
    fontWeight: FontWeight.Semibold,
  },
  Body: {
    tag: 'div' as const,
    baseFontSize: 16,
    leading: 5,
    fontFamily: 'Inter' as const,
    fontWeight: FontWeight.Regular,
  },
  Label1: {
    tag: 'div' as const,
    baseFontSize: 14,
    leading: 1,
    fontFamily: 'Inter' as const,
    fontWeight: FontWeight.Semibold,
    allowAllCaps: true,
  },
  Label2: {
    tag: 'div' as const,
    baseFontSize: 14,
    leading: 1,
    fontFamily: 'Inter' as const,
    fontWeight: FontWeight.Regular,
    allowAllCaps: true,
    tnum: true,
  },
  Caption: {
    tag: 'div' as const,
    baseFontSize: 13,
    leading: 1,
    fontFamily: 'Inter' as const,
    fontWeight: FontWeight.Semibold,
    allowAllCaps: true,
    tnum: true,
  },
  Legal: {
    tag: 'p' as const,
    baseFontSize: 13,
    leading: 2,
    fontFamily: 'Inter' as const,
    fontWeight: FontWeight.Regular,
    disableMinimums: true,
  },
};

export type Typography = keyof typeof typography;
export type HtmlHeadingTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HtmlNonHeadingTextTags =
  | 'div'
  | 'p'
  | 'span'
  | 'blockquote'
  | 'code'
  | 'pre'
  | 'li'
  | 'del'
  | 'ins'
  | 'sup'
  | 'sub';
export type HtmlTextTags = HtmlHeadingTags | HtmlNonHeadingTextTags;
