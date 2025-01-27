import React, { forwardRef, useMemo } from 'react';
import { type LinariaClassName, css, cx } from '@linaria/core';
import { accessibleOpacityDisabled } from '@cbhq/cds-common2/tokens/interactable';
import { isChildrenFalsy } from '@cbhq/cds-common2/utils/isChildrenFalsy';

import type { Polymorphic } from '../core/polymorphism';
import { type BoxBaseProps, Box } from '../layout/Box';

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

const userSelectStyle: Record<NonNullable<TextBaseProps['selectable']>, LinariaClassName> = {
  none: css`
    user-select: none;
  `,
  text: css`
    user-select: text;
  `,
  all: css`
    user-select: all;
  `,
};

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

const textDefaultElement = 'span';

export type TextDefaultElement = typeof textDefaultElement;

export type TextBaseProps = Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
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
     * Set select behavior.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select)
     */
    selectable?: 'none' | 'text' | 'all';
    /**
     * Set overflow behavior.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
     */
    overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: string;
  }
>;

export type TextProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  TextBaseProps
>;

type TextComponent = (<AsComponent extends React.ElementType = TextDefaultElement>(
  props: TextProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const Text: TextComponent = forwardRef<React.ReactElement<TextBaseProps>, TextBaseProps>(
  <AsComponent extends React.ElementType>(
    {
      as,
      font = 'body',
      color = 'textForeground',
      display = 'block',
      textAlign = 'start',
      numberOfLines,
      style,
      className,
      disabled,
      dangerouslySetColor,
      tabularNumbers,
      slashedZero,
      underline,
      mono,
      noWrap,
      selectable,
      overflow,
      inherit,
      textDecoration = underline ? 'underline' : undefined,
      ...props
    }: TextProps<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? textDefaultElement) satisfies React.ElementType;
    const textStyle = useMemo(
      () => ({
        color: dangerouslySetColor,
        '--text-numberOfLines': numberOfLines,
        ...style,
      }),
      [dangerouslySetColor, numberOfLines, style],
    );

    if (isChildrenFalsy(props.children)) {
      return null;
    }
    return (
      <Box
        ref={ref}
        as={Component}
        className={cx(
          baseStyle,
          numberOfLines && numberOfLinesStyle,
          disabled && disabledStyle,
          inherit && textInherit,
          mono && monoStyle,
          tabularNumbers && tabularNumbersStyle,
          slashedZero && slashedZeroStyle,
          noWrap && noWrapStyle,
          selectable && userSelectStyle[selectable],
          overflow && overflowStyle[overflow],
          className,
        )}
        color={color}
        display={display}
        font={font}
        style={textStyle}
        textAlign={textAlign}
        textDecoration={textDecoration}
        {...props}
      />
    );
  },
);

Text.displayName = 'Text';
