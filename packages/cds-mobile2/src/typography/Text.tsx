import React, { forwardRef, useMemo } from 'react';
import {
  type StyleProp,
  type TextProps as NativeTextProps,
  type TextStyle,
  Animated,
  StyleSheet,
  Text as NativeText,
} from 'react-native';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { accessibleOpacityDisabled } from '@cbhq/cds-common2/tokens/interactable';

import { useTheme } from '../hooks/useTheme';
import { type StyleProps, getStyles } from '../styles/styleProps';

export type TextProps = StyleProps &
  Omit<NativeTextProps, 'style'> & {
    children?: React.ReactNode;
    style?: Animated.WithAnimatedValue<StyleProp<TextStyle>>;
    animated?: boolean;
    font?: ThemeVars.FontFamily;
    inherit?: boolean;
    disabled?: boolean;
    mono?: boolean;
    underline?: boolean;
    tabularNumbers?: boolean;
    numberOfLines?: number;
    ellipsize?: NativeTextProps['ellipsizeMode'];
    noWrap?: boolean;
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: TextStyle['color'];
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetBackground?: TextStyle['backgroundColor'];
    /** Used to locate this element in unit and end-to-end tests. */
    testID?: string;
  };

const styles = StyleSheet.create({
  disabled: {
    opacity: accessibleOpacityDisabled,
  },
  ellipsize: {
    overflow: 'hidden',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  tabularNumbers: {
    fontVariant: ['tabular-nums'],
  },
});

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

      disabled,
      mono,
      underline,
      tabularNumbers,
      numberOfLines = 1,
      ellipsize,
      noWrap,

      testID,
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
      font = 'body',
      fontFamily = font,
      fontSize = font,
      fontWeight = font,
      lineHeight = font,
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
    const monoFontFamily = mono && theme.fontFamilyMono?.[fontFamily];

    const propStyles = useMemo(
      () => [
        disabled && styles.disabled,
        underline && styles.underline,
        tabularNumbers && styles.tabularNumbers,
        ellipsize && styles.ellipsize,
        monoFontFamily ? { fontFamily: monoFontFamily } : undefined,
        dangerouslySetColor ? { color: dangerouslySetColor } : undefined,
        dangerouslySetBackground ? { backgroundColor: dangerouslySetBackground } : undefined,
      ],
      [
        disabled,
        underline,
        tabularNumbers,
        ellipsize,
        monoFontFamily,
        dangerouslySetColor,
        dangerouslySetBackground,
      ],
    );

    const memoizedStyles = useMemo(
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
            ...(inherit
              ? undefined
              : {
                  fontFamily,
                  fontSize,
                  fontWeight,
                  lineHeight,
                }),
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
        propStyles,
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
        propStyles,
        style,
        inherit,
      ],
    );

    return (
      <Component
        ref={ref}
        allowFontScaling
        ellipsizeMode={ellipsize}
        maxFontSizeMultiplier={1}
        numberOfLines={noWrap ? 1 : numberOfLines}
        style={memoizedStyles}
        testID={testID}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Text.displayName = 'Text';
