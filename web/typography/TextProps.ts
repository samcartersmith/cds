import type { TextBaseProps, PaletteForeground } from '@cbhq/cds-common';

export interface TextProps extends TextBaseProps {
  /**
   * Set CSS display attribute.
   */
  readonly display?: 'block' | 'initial' | 'inline';
  /**
   * Foreground text color. Accepts a valid `PaletteForeground` alias.
   * @default foreground
   */
  readonly color?: PaletteForeground | 'currentColor';
  /**
   * Set overflow behavior.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
   */
  readonly overflow?: 'truncate' | 'clip';
  /**
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   */
  dangerouslySetClassName?: string;
}

export type HTMLHeadingTags = 'h1' | 'h2' | 'h3' | 'h4';

export type HTMLNonHeadingTextTags =
  | 'p'
  | 'strong'
  | 'span'
  | 'label'
  | 'time'
  | 'output'
  | 'code'
  | 'pre'
  | 's'
  | 'abbr'
  | 'q'
  | 'kbd'
  | 'del'
  | 'ins'
  | 'sup'
  | 'sub'
  | 'li';

export type HTMLTextTags = HTMLHeadingTags | HTMLNonHeadingTextTags;
