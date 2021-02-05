import type { TextBaseProps } from '@cds/common';

export interface TextProps extends TextBaseProps {
  /**
   * Set CSS display attribute.
   */
  readonly display?: 'block' | 'initial' | 'inline';
  /**
   * Set overflow behavior.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space) | [React Native Docs](https://reactnative.dev/docs/text#ellipsizemode)
   */
  readonly overflow?: 'truncate' | 'clip';
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
