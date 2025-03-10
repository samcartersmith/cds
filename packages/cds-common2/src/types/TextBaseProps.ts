import { SharedProps } from './SharedProps';
import { PaddingProps } from './SpacingProps';

export type TextTransform = 'uppercase' | 'lowercase' | 'capitalize' | 'none';

export type TextAlignProps = {
  /**
   * Specifies text alignment. On mobile, the value `justify` is only supported on iOS and fallbacks to `start` on Android.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align) | [React Native docs](https://reactnative.dev/docs/text-style-props#textalign)
   * @default start
   */
  align?: 'start' | 'end' | 'center' | 'justify';
};

export type TextBaseProps = {
  children?: React.ReactNode;
  /**
   * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
   * @default false
   */
  tabularNumbers?: boolean;
  /**
   * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
   * @default false
   */
  slashedZero?: boolean;
  /**
   * Set text decoration to underline.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
   * @default false
   */
  underline?: boolean;
  /**
   * Use CoinbaseMono font
   */
  mono?: boolean;
  /**
   * Set text to be in a single line.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
   * @default false
   */
  noWrap?: boolean;
  /**
   * Transform text to all uppercase, all lowercase, or capitalized. This is not available for label1, label2 and caption.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform) | [React Native Docs](https://reactnative.dev/docs/text-style-props#texttransform)
   */
  transform?: TextTransform;
  /**
   * Add disabled opacity style to text
   */
  disabled?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
  /** Should the Text component inherit styles of parent */
  inherit?: boolean;
  /**
   * Truncates text after wrapping to a defined number of lines.
   */
  numberOfLines?: number;
  /** @deprecated This is a migration escape hatch and will be removed in the next major version of CDS. Do not use this prop. */
  renderEmptyNode?: boolean;
} & PaddingProps &
  TextAlignProps &
  SharedProps;
