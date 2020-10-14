import type { HtmlNonHeadingTextTags } from '@cb/design-system-web/primitives/typography/typography';

export type TextProps = {
  /**
   * Text to be styled and wrapped with appropriate html tag.
   */
  children: React.ReactText;
  /**
   * Set text color. Default color will be the text color for the theme.
   */
  color?: string; // TODO (hannah): type this better once palette is defined.
  /**
   * Set CSS display attribute.
   *
   * @default 'initial'
   */
  display?: 'block' | 'initial' | 'inline';
  /**
   * Specify text horizontal alignment.
   *
   * @default 'start'
   */
  textAlign?: 'center' | 'start' | 'end' | 'justify';
  /**
   * Text will not wrap if `noWrap` is true.
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
   * Use a different html tag than the default one. Only applies to non heading typography
   * components. The default element is `span` for Body, Label1, Label2, Caption, and `p` for legal.
   */
  as?: HtmlNonHeadingTextTags;
};
