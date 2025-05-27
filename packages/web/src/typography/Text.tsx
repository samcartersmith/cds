import React, { forwardRef, memo, useMemo } from 'react';
import { css, cx, type LinariaClassName } from '@linaria/core';
import { accessibleOpacityDisabled } from '@cbhq/cds-common/tokens/interactable';

import type { Polymorphic } from '../core/polymorphism';
import { Box, type BoxBaseProps } from '../layout/Box';

const baseStyle = css`
  margin: 0;
  text-transform: var(--text-textTransform);
`;

const monoStyle = css`
  font-family: var(--text-fontFamilyMono);
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

export const textDefaultElement = 'span';

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
     * Use monospace font family.
     */
    mono?: boolean;
    /**
     * Set text to be in a single line.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
     * @default false
     */
    noWrap?: boolean;
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
    /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
    renderEmptyNode?: boolean;
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

export const Text: TextComponent = memo(
  forwardRef<React.ReactElement<TextBaseProps>, TextBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        font = 'inherit',
        fontFamily = font,
        color = 'fg',
        display = 'inline',
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
        textDecoration = underline ? 'underline' : 'none',
        textTransform,
        children,
        renderEmptyNode = true,
        ...props
      }: TextProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? textDefaultElement) satisfies React.ElementType;
      const textStyle = useMemo(
        () => ({
          color: dangerouslySetColor,
          '--text-numberOfLines': numberOfLines,
          '--text-textTransform': textTransform ?? `var(--textTransform-${fontFamily})`,
          '--text-fontFamilyMono': mono && `var(--fontFamilyMono-${fontFamily})`,
          ...style,
        }),
        [dangerouslySetColor, numberOfLines, textTransform, mono, fontFamily, style],
      );

      if (
        !renderEmptyNode &&
        (children === null || children === undefined || children === '' || Number.isNaN(children))
      )
        return null;

      return (
        <Box
          ref={ref}
          as={Component}
          className={cx(
            baseStyle,
            numberOfLines && numberOfLinesStyle,
            disabled && disabledStyle,
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
          fontFamily={fontFamily}
          style={textStyle}
          textAlign={textAlign}
          textDecoration={textDecoration}
          {...props}
        >
          {children}
        </Box>
      );
    },
  ),
);

Text.displayName = 'Text';
