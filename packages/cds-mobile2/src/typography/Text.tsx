import React, { forwardRef, memo, useMemo } from 'react';
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

import { useTextAlign } from '../hooks/useTextAlign';
import { useTheme } from '../hooks/useTheme';
import { type StyleProps, getStyles } from '../styles/styleProps';

export type TextProps = StyleProps &
  Omit<NativeTextProps, 'style'> & {
    children?: React.ReactNode;
    style?: Animated.WithAnimatedValue<StyleProp<TextStyle>>;
    animated?: boolean;
    /**
     * Specifies text alignment. On mobile, the value `justify` is only supported on iOS and fallbacks to `start` on Android.
     * @default start
     */
    align?: 'start' | 'end' | 'center' | 'justify';
    /**
     * Set text font family.
     * @default body
     */
    font?: ThemeVars.FontFamily;
    /** Should the Text component inherit styles of parent */
    inherit?: boolean;
    /**
     * Add disabled opacity style to text
     */
    disabled?: boolean;
    /**
     * Use CoinbaseMono font
     */
    mono?: boolean;
    /**
     * Set text decoration to underline.
     * @default false
     */
    underline?: boolean;
    /**
     * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
     * @default false
     */
    tabularNumbers?: boolean;
    /**
     * Truncates text after wrapping to a defined number of lines.
     */
    numberOfLines?: number;
    /**
     * Choose ellipsize mode.
     * @link [React Native docs](https://reactnative.dev/docs/text#ellipsizemode)
     */
    ellipsize?: NativeTextProps['ellipsizeMode'];
    /**
     * Set text to be in a single line.
     * @default false
     */
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

export const Text = memo(
  forwardRef<NativeText, TextProps>(
    (
      {
        children,
        style,
        animated,
        inherit,
        disabled,
        mono,
        underline,
        tabularNumbers,
        numberOfLines,
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
        color = 'fg',
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
        align = 'start',
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
      const textAlign = useTextAlign(align);
      const monoFontFamily = mono && theme.fontFamilyMono?.[fontFamily];
      const textTransformValue = textTransform ?? theme.textTransform[fontFamily];
      const computedNumberOfLines =
        noWrap || (ellipsize && typeof numberOfLines === 'undefined') ? 1 : numberOfLines;

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
              textDecorationStyle,
              textDecorationColor,
              textDecorationLine,
              textTransform: textTransformValue,
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
              ...textAlign,
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
          inherit,
          fontFamily,
          fontSize,
          fontWeight,
          lineHeight,
          textDecorationStyle,
          textDecorationColor,
          textDecorationLine,
          textTransformValue,
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
          textAlign,
          theme,
          propStyles,
          style,
        ],
      );

      if (!children) return null;

      return (
        <Component
          ref={ref}
          allowFontScaling
          ellipsizeMode={ellipsize}
          maxFontSizeMultiplier={1}
          numberOfLines={computedNumberOfLines}
          style={memoizedStyles}
          testID={testID}
          {...props}
        >
          {children}
        </Component>
      );
    },
  ),
);

Text.displayName = 'Text';
