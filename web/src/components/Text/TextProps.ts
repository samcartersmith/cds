import type { ReactChild, ReactFragment } from 'react';

export type TextProps = {
  /**
   * Text to be styled and wrapped with appropriate html tag.
   */
  children: ReactChild | ReactFragment;
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
   * Text will not wrap if true. Text wraps by default.
   *
   * @default false
   */
  noWrap?: boolean;
  /**
   * Show numbers in monospace tabular style. It defaults to true for label2 and caption and false
   * in the other typographies.
   */
  tnum?: boolean;
  /**
   * Use a different non heading html text tag than the default one. The default element is `div`
   * for Headline, Body, Label1, Label2, Caption, and `p` for Legal. `h1`-`h5` are default for
   * Display1, Display2, Title1, Title2, Title3. It is not possible to override the html tag to
   * another heading, but it is possible to use a heading typography as non heading.
   */
  as?: HtmlNonHeadingTextTags;
  /**
   * **DANGER** This is a migration escape hatch. It is not intended to be used normally.
   */
  dangerouslySetClassName?: string;
};

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
