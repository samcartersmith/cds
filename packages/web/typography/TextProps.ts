import type {
  PaletteForeground,
  ResponsiveProps,
  SharedProps,
  TextBaseProps,
} from '@cbhq/cds-common';
import { SharedAccessibilityProps } from '@cbhq/cds-common/types/SharedAccessibilityProps';

export type TextProps = {
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
  readonly overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
  /**
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   */
  dangerouslySetClassName?: string;
  /** Used to associate a label with a control */
  id?: string;
  /** Specify props by device breakpoint */
  responsiveConfig?: ResponsiveProps;
} & TextBaseProps &
  SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityLabelledBy'>;

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
  | 'li'
  | 'dl'
  | 'dt'
  | 'dd'
  | 'div';

export type HTMLTextTags = HTMLHeadingTags | HTMLNonHeadingTextTags;
