import type { HtmlNonHeadingTextTags } from '@cb/design-system-web/primitives/typography/typography';

export type TextProps = {
  /**
   * Text to be styled and wrapped with appropriate html tag.
   */
  children: React.ReactText | (React.ReactElement | React.ReactText)[];
  /**
   * Set text color. Default color will be the text color for the theme.
   */
  color?: string; // TODO (hannah): type this better once palette is defined.
  /**
   * Set CSS display attribute.
   */
  display?: 'block' | 'initial' | 'inline';
  /**
   * Specify text horizontal alignment.
   *
   * @default 'start'
   */
  textAlign?: 'center' | 'start' | 'end' | 'justify';
  /**
   * Text will wrap if true. Text does not wrap by default.
   *
   * @default false
   */
  wrap?: boolean;
  /**
   * Show numbers in monospace tabular style. It defaults to true for label2 and caption and false
   * in the other typographies.
   */
  tnum?: boolean;
  /**
   * Use a different non heading html text tag than the default one. The default element is `div`
   * for Body, Label1, Label2, Caption, and `p` for Legal. `h1`-`h6` are default for Display1,
   * Display2, Title1, Title2, Title3, and Headline. It is not possible to override the html tag to
   * another heading, but it is possible to use a heading typography as non heading.
   */
  as?: HtmlNonHeadingTextTags;
};
