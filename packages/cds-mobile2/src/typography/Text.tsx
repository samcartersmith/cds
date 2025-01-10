import React, { forwardRef, useMemo } from 'react';
import {
  type StyleProp,
  type TextProps as NativeTextProps,
  type TextStyle,
  Animated,
  Text as NativeText,
} from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { type StyleProps, getStyles } from '../styles/styleProps';

// TO DO: Make elevation and "bordered" props work!!!

const borderStyle = {
  bordered: `
    border-width: var(--borderWidth-100);
    border-style: solid;
    border-color: var(--color-line);
  `,
  borderedHorizontal: `
    border-left-width: var(--borderWidth-100);
    border-left-style: solid;
    border-right-width: var(--borderWidth-100);
    border-right-style: solid;
    border-color: var(--color-line);
  `,
  borderedVertical: `
    border-top-width: var(--borderWidth-100);
    border-top-style: solid;
    border-bottom-width: var(--borderWidth-100);
    border-bottom-style: solid;
    border-color: var(--color-line);
  `,
  borderedStart: `
    border-left-width: var(--borderWidth-100);
    border-left-style: solid;
    border-color: var(--color-line);
  `,
  borderedEnd: `
    border-right-width: var(--borderWidth-100);
    border-right-style: solid;
    border-color: var(--color-line);
  `,
  borderedTop: `
    border-top-width: var(--borderWidth-100);
    border-top-style: solid;
    border-color: var(--color-line);
  `,
  borderedBottom: `
    border-bottom-width: var(--borderWidth-100);
    border-bottom-style: solid;
    border-color: var(--color-line);
  `,
};

export type TextProps = StyleProps &
  Omit<NativeTextProps, 'style'> & {
    children?: React.ReactNode;
    style?: Animated.WithAnimatedValue<StyleProp<TextStyle>>;
    animated?: boolean;
    inherit?: boolean;
    unstyled?: boolean;
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
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: TextStyle['color'];
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetBackground?: TextStyle['backgroundColor'];
    /** Used to locate this element in unit and end-to-end tests. */
    testID?: string;
  };

export const Text = forwardRef<NativeText, TextProps>(
  (
    {
      children,
      accessibilityLabel,
      accessibilityLabelledBy,
      accessibilityHint,
      style,
      animated,
      inherit,
      unstyled,
      testID,
      bordered,
      borderedTop,
      borderedBottom,
      borderedStart,
      borderedEnd,
      borderedHorizontal,
      borderedVertical,
      dangerouslySetColor,
      dangerouslySetBackground,
      // Begin style props
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
      color = 'textForeground',
      background,
      borderColor,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopWidth,
      borderRightWidth,
      borderBottomWidth,
      borderLeftWidth,
      elevation,
      borderWidth,
      borderRadius,
      font,
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
      align,
      textDecorationStyle,
      textDecorationColor,
      textDecorationLine,
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
      opacity,
      ...props
    },
    ref,
  ) => {
    const Component = animated ? Animated.Text : NativeText;

    const theme = useTheme();

    const inlineStyle = useMemo(
      () => ({
        color: dangerouslySetColor,
        backgroundColor: dangerouslySetBackground,
      }),
      [dangerouslySetColor, dangerouslySetBackground],
    );

    const styles = useMemo(
      () => [
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
            font: inherit ? undefined : font,
            fontFamily: inherit ? undefined : fontFamily,
            fontSize: inherit ? undefined : fontSize,
            fontWeight: inherit ? undefined : fontWeight,
            lineHeight: inherit ? undefined : lineHeight,
            align,
            textDecorationStyle,
            textDecorationColor,
            textDecorationLine,
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
            opacity,
          },
          theme,
        ),
        inlineStyle,
        style,
      ],
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
        align,
        textDecorationStyle,
        textDecorationColor,
        textDecorationLine,
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
        opacity,
        theme,
        inlineStyle,
        style,
        inherit,
      ],
    );

    return (
      <Component
        ref={ref}
        // aria-describedby={accessibilityHint}
        // aria-label={accessibilityLabel}
        // aria-labelledby={accessibilityLabelledBy}
        // className={cx(
        //   bordered && borderStyle.bordered,
        //   borderedTop && borderStyle.borderedTop,
        //   borderedBottom && borderStyle.borderedBottom,
        //   borderedStart && borderStyle.borderedStart,
        //   borderedEnd && borderStyle.borderedEnd,
        //   borderedHorizontal && borderStyle.borderedHorizontal,
        //   borderedVertical && borderStyle.borderedVertical,
        // )}
        data-testid={testID}
        style={styles}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Text.displayName = 'Text';
