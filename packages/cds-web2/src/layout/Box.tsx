import React, { forwardRef, useMemo } from 'react';
import { css, cx } from '@linaria/core';
import type { SharedAccessibilityProps } from '@cbhq/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@cbhq/cds-common/types/SharedProps';

import type { Polymorphic } from '../core/polymorphism';
import { type StyleProps, getStyles } from '../styles/styleProps';

const borderStyle = {
  bordered: css`
    border-width: var(--borderWidth-100);
    border-style: solid;
    border-color: var(--color-line);
  `,
  borderedHorizontal: css`
    border-left-width: var(--borderWidth-100);
    border-left-style: solid;
    border-right-width: var(--borderWidth-100);
    border-right-style: solid;
    border-color: var(--color-line);
  `,
  borderedVertical: css`
    border-top-width: var(--borderWidth-100);
    border-top-style: solid;
    border-bottom-width: var(--borderWidth-100);
    border-bottom-style: solid;
    border-color: var(--color-line);
  `,
  borderedStart: css`
    border-left-width: var(--borderWidth-100);
    border-left-style: solid;
    border-color: var(--color-line);
  `,
  borderedEnd: css`
    border-right-width: var(--borderWidth-100);
    border-right-style: solid;
    border-color: var(--color-line);
  `,
  borderedTop: css`
    border-top-width: var(--borderWidth-100);
    border-top-style: solid;
    border-color: var(--color-line);
  `,
  borderedBottom: css`
    border-bottom-width: var(--borderWidth-100);
    border-bottom-style: solid;
    border-color: var(--color-line);
  `,
};

const boxDefaultElement = 'div';

export type BoxDefaultElement = typeof boxDefaultElement;

export type BoxBaseProps = StyleProps &
  SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > & {
    style?: React.CSSProperties;
    unstyled?: boolean;
    baseClassName?: string;
    /** Add a border around all sides of the box. */
    bordered?: boolean;
    /** Add a border to the top side of the box. */
    borderedTop?: boolean;
    /** Add a border to the bottom side of the box. */
    borderedBottom?: boolean;
    /** Add a border to the leading side of the box. */
    borderedStart?: boolean;
    /** Add a border to the trailing side of the box. */
    borderedEnd?: boolean;
    /** Add a border to the leading and trailing sides of the box. */
    borderedHorizontal?: boolean;
    /** Add a border to the top and bottom sides of the box. */
    borderedVertical?: boolean;
    // TODO: remove id and tabIndex once type issue is fixed in PolymorphicProps
    /** @danger This should only be used for accessibility purposes, eg: aria-controls https://accessibilityresources.org/aria-controls */
    id?: string;
    /**
     * Necessary to control roving tabindex for accessibility
     * https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex
     * */
    tabIndex?: number;
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetBackground?: string;
  };

export type BoxProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  BoxBaseProps
>;

type BoxComponent = (<AsComponent extends React.ElementType = BoxDefaultElement>(
  props: BoxProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const Box: BoxComponent = forwardRef<React.ReactElement<BoxBaseProps>, BoxBaseProps>(
  <AsComponent extends React.ElementType>(
    {
      children,
      as,
      accessibilityLabel,
      accessibilityLabelledBy,
      accessibilityHint,
      style,
      className,
      unstyled,
      baseClassName,
      testID,
      dangerouslySetBackground,
      // Begin className style props
      display = 'flex',
      position,
      overflow,
      zIndex,
      gap,
      columnGap,
      rowGap,
      justifyContent,
      alignContent,
      alignItems,
      alignSelf,
      flexDirection,
      flexWrap,
      color,
      background,
      borderColor,
      bordered,
      borderedTop,
      borderedBottom,
      borderedStart,
      borderedEnd,
      borderedHorizontal,
      borderedVertical,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopWidth,
      borderRightWidth,
      borderBottomWidth,
      borderLeftWidth,
      elevation,
      hoverColor,
      hoverBackground,
      hoverBorderColor,
      borderWidth,
      borderRadius,
      font,
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
      textAlign,
      textDecoration,
      textDecorationColor,
      textDecorationThickness,
      textTransform,
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      margin,
      marginX,
      marginY,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      userSelect,
      visibility,
      // Begin inline style props
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      aspectRatio,
      top,
      bottom,
      left,
      right,
      transform,
      flexBasis,
      flexShrink,
      flexGrow,
      gridTemplateColumns,
      gridTemplateRows,
      gridTemplateAreas,
      gridTemplate,
      gridAutoColumns,
      gridAutoRows,
      gridAutoFlow,
      grid,
      gridRowStart,
      gridColumnStart,
      gridRowEnd,
      gridColumnEnd,
      gridRow,
      gridColumn,
      gridArea,
      opacity,
      // End style props
      ...props
    }: Polymorphic.Props<AsComponent, BoxBaseProps>,
    ref: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = as ?? 'div';

    const inlineStyle = useMemo(
      () => ({
        ...(dangerouslySetBackground ? { backgroundColor: dangerouslySetBackground } : {}),
        ...style,
      }),
      [dangerouslySetBackground, style],
    );

    const styles = useMemo(
      () =>
        getStyles(
          {
            display,
            position,
            overflow,
            zIndex,
            gap,
            columnGap,
            rowGap,
            justifyContent,
            alignContent,
            alignItems,
            alignSelf,
            flexDirection,
            flexWrap,
            color,
            background,
            borderColor,
            hoverColor,
            hoverBackground,
            hoverBorderColor,
            borderWidth,
            borderRadius,
            borderTopLeftRadius,
            borderTopRightRadius,
            borderBottomLeftRadius,
            borderBottomRightRadius,
            borderTopWidth,
            borderRightWidth,
            borderBottomWidth,
            borderLeftWidth,
            elevation,
            font,
            fontFamily,
            fontSize,
            fontWeight,
            lineHeight,
            textAlign,
            textDecoration,
            textDecorationColor,
            textDecorationThickness,
            textTransform,
            padding,
            paddingX,
            paddingY,
            paddingTop,
            paddingBottom,
            paddingLeft,
            paddingRight,
            margin,
            marginX,
            marginY,
            marginTop,
            marginBottom,
            marginLeft,
            marginRight,
            userSelect,
            visibility,
            width,
            height,
            minWidth,
            minHeight,
            maxWidth,
            maxHeight,
            aspectRatio,
            top,
            bottom,
            left,
            right,
            transform,
            flexBasis,
            flexShrink,
            flexGrow,
            gridTemplateColumns,
            gridTemplateRows,
            gridTemplateAreas,
            gridTemplate,
            gridAutoColumns,
            gridAutoRows,
            gridAutoFlow,
            grid,
            gridRowStart,
            gridColumnStart,
            gridRowEnd,
            gridColumnEnd,
            gridRow,
            gridColumn,
            gridArea,
            opacity,
          },
          inlineStyle,
        ),
      [
        display,
        position,
        overflow,
        zIndex,
        gap,
        columnGap,
        rowGap,
        justifyContent,
        alignContent,
        alignItems,
        alignSelf,
        flexDirection,
        flexWrap,
        color,
        background,
        borderColor,
        hoverColor,
        hoverBackground,
        hoverBorderColor,
        borderWidth,
        borderRadius,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
        borderTopWidth,
        borderRightWidth,
        borderBottomWidth,
        borderLeftWidth,
        elevation,
        font,
        fontFamily,
        fontSize,
        fontWeight,
        lineHeight,
        textAlign,
        textDecoration,
        textDecorationColor,
        textDecorationThickness,
        textTransform,
        padding,
        paddingX,
        paddingY,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        margin,
        marginX,
        marginY,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        userSelect,
        visibility,
        width,
        height,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
        aspectRatio,
        top,
        bottom,
        left,
        right,
        transform,
        flexBasis,
        flexShrink,
        flexGrow,
        gridTemplateColumns,
        gridTemplateRows,
        gridTemplateAreas,
        gridTemplate,
        gridAutoColumns,
        gridAutoRows,
        gridAutoFlow,
        grid,
        gridRowStart,
        gridColumnStart,
        gridRowEnd,
        gridColumnEnd,
        gridRow,
        gridColumn,
        gridArea,
        opacity,
        inlineStyle,
      ],
    );

    return (
      <Component
        ref={ref}
        aria-describedby={accessibilityHint}
        aria-label={accessibilityLabel}
        aria-labelledby={accessibilityLabelledBy}
        className={cx(
          styles.className,
          bordered && borderStyle.bordered,
          borderedTop && borderStyle.borderedTop,
          borderedBottom && borderStyle.borderedBottom,
          borderedStart && borderStyle.borderedStart,
          borderedEnd && borderStyle.borderedEnd,
          borderedHorizontal && borderStyle.borderedHorizontal,
          borderedVertical && borderStyle.borderedVertical,
          className,
        )}
        data-testid={testID}
        style={styles.style}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Box.displayName = 'Box';

/**
 * @example
 * Use `PolymorphicBoxProps` to create polymorphic components from Box (components with the `as` prop and style props):
 * ```tsx
 * type MyComponentBaseProps = { message?: string }
 * type MyComponentProps<AsComponent extends React.ElementType> =
 *   PolymorphicBoxProps<AsComponent, MyComponentBaseProps>
 * const MyComponent = <
 *   AsComponent extends React.ElementType = 'button',
 * >({
 *   as = 'button' as AsComponent,
 *   message,
 *   ...props
 * }: MyComponentProps<AsComponent>) => {
 *   return <Box as={as} {...props}>{message}</Box>
 * }
 * ```
 */
export type PolymorphicBoxProps<
  AsComponent extends React.ElementType,
  OverrideProps,
> = Polymorphic.Props<AsComponent, Polymorphic.ExtendableProps<BoxBaseProps, OverrideProps>>;

export type ExtendedBoxProps<OverrideProps> = Polymorphic.ExtendableProps<
  BoxBaseProps,
  OverrideProps
>;
