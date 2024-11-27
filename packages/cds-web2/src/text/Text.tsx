import React, { type ForwardedRef, forwardRef, memo, useMemo } from 'react';
import { css, cx } from '@linaria/core';
import { accessibleOpacityDisabled } from '@cbhq/cds-common/tokens/interactable';

import { type PolymorphicBoxProps, Box } from '../layout/Box';

export type TextBaseProps = {
  numberOfLines?: number;
  disabled?: boolean;
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
  /** Should the Text component inherit styles of parent */
  inherit?: boolean;
  /**
   * Set overflow behavior.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
   */
  readonly overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
  /**
   * accessibility label before strikethrough element
   * @default '[start of stricken text]'
   * */
  strikethroughStartAccessibilityLabel?: string;
  /**
   * accessibility label after strikethrough element
   * @default '[end of stricken text]'
   */
  strikethroughEndAccessibilityLabel?: string;
};

export type TextProps<AsComponent extends React.ElementType> = PolymorphicBoxProps<
  AsComponent,
  TextBaseProps
>;

const baseStyle = css`
  margin: 0;
`;

const monoStyle = css`
  font-family: var(--cds-font-mono);
`;

const textInherit = css`
  font-size: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  font-weight: inherit;
  font-family: inherit;
`;

/** Strikesthrough element accessibility implementation
 * @link: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s#accessibility_concerns
 */
const strikethroughStyle = css`
  &::before,
  &::after {
    clip-path: inset(100%);
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
  &::before {
    content: attr(data-strikethrough-start);
  }

  &::after {
    content: attr(data-strikethrough-end);
  }
`;

const numberOfLinesStyle = css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--text-numberOfLines);
  overflow: hidden;
`;

const disabledStyle = css`
  opacity: ${accessibleOpacityDisabled};
  cursor: default;
  pointer-events: none;
  touch-action: none;
`;

const tabularNumbersStyle = css`
  font-variant-numeric: tabular-nums;
`;

const slashedZeroStyle = css`
  font-variant-numeric: slashed-zero;
`;

const noWrapStyle = css`
  white-space: nowrap;
`;

const overflowStyle = {
  truncate: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  clip: css`
    overflow-wrap: break-word;
    text-overflow: clip;
  `,
  wrap: css`
    white-space: normal;
    overflow-wrap: break-word;
  `,
  break: css`
    /**
     * Fallback for mobile safari on iOS < 15.4
     * @link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap#browser_compatibility 
     */
    @supports not (overflow-wrap: anywhere) {
      word-break: break-word;
      overflow-wrap: break-word;
    }

    /* Desktop solution */
    overflow-wrap: anywhere;
  `,
} as const;

export const Text = memo(
  forwardRef(
    <AsComponent extends React.ElementType = 'span'>(
      {
        as = 'span' as AsComponent,
        font = 'body',
        color = 'textForeground',
        display = 'block',
        textAlign = 'start',
        numberOfLines,
        style,
        className,
        disabled,
        tabularNumbers,
        slashedZero,
        underline,
        mono,
        noWrap,
        overflow,
        inherit,
        strikethroughStartAccessibilityLabel = '[start of stricken text]',
        strikethroughEndAccessibilityLabel = '[end of stricken text]',
        textDecoration = underline ? 'underline' : undefined,
        ...props
      }: TextProps<AsComponent>,
      ref: ForwardedRef<HTMLElement>,
    ) => {
      const strikethroughAttributes = useMemo(
        () =>
          as === 's'
            ? {
                'data-strikethrough-start': strikethroughStartAccessibilityLabel,
                'data-strikethrough-end': strikethroughEndAccessibilityLabel,
              }
            : {},
        [as, strikethroughStartAccessibilityLabel, strikethroughEndAccessibilityLabel],
      );
      const textStyle = useMemo(
        () => ({
          '--text-numberOfLines': numberOfLines,
          ...style,
        }),
        [style, numberOfLines],
      );

      return (
        <Box
          ref={ref}
          as={as}
          className={cx(
            baseStyle,
            numberOfLines && numberOfLinesStyle,
            disabled && disabledStyle,
            inherit && textInherit,
            mono && monoStyle,
            as === 's' && strikethroughStyle,
            tabularNumbers && tabularNumbersStyle,
            slashedZero && slashedZeroStyle,
            noWrap && noWrapStyle,
            overflow && overflowStyle[overflow],
            className,
          )}
          color={color}
          display={display}
          font={font}
          style={textStyle}
          textAlign={textAlign}
          textDecoration={textDecoration}
          {...strikethroughAttributes}
          {...props}
        />
      );
    },
  ),
);
