import type { TextBaseProps } from '@cds/core';

export interface TextProps extends TextBaseProps {
  /**
   * Set CSS display attribute.
   */
  readonly display?: 'block' | 'initial' | 'inline';
  /**
   * Text will not wrap if true. Text wraps by default.
   *
   * @default false
   */
  readonly noWrap?: boolean;
}

export type HTMLHeadingTags = 'h1' | 'h2' | 'h3' | 'h4';
export type HTMLNonHeadingTextTags =
  | 'p'
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
  | 'sub';
export type HTMLTextTags = HTMLHeadingTags | HTMLNonHeadingTextTags;
