import React, { useMemo } from 'react';

import { TextBaseProps, Typography, PaletteForeground, SharedProps } from '@cbhq/cds-common';
import { isChildrenFalsy } from '@cbhq/cds-common/utils/isChildrenFalsy';
import { pascalCase } from '@cbhq/cds-utils';
import { Animated, Text, TextStyle, TextProps as RNTextProps, StyleSheet } from 'react-native';

import { fontScaleProps } from '../hooks/useDeviceScaleToCdsScale';
import { usePalette } from '../hooks/usePalette';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { useTextAlign } from '../hooks/useTextAlign';
import { OmitStyle, DangerouslySetStyle } from '../types';
import { useTypographyStyles } from './useTypographyStyles';

export type { Typography };

const styles = StyleSheet.create({
  tabularNumbers: {
    fontVariant: ['tabular-nums'],
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

export const numberStyles = styles.tabularNumbers;

export interface TextProps
  extends TextBaseProps,
    SharedProps,
    OmitStyle<RNTextProps, 'selectable'>,
    DangerouslySetStyle<TextStyle> {
  /**
   * Text color. Accepts a valid `PaletteForeground` alias.
   * @default foreground
   */
  color?: PaletteForeground;
  /**
   * Choose ellipsize mode.
   * @link [React Native docs](https://reactnative.dev/docs/text#ellipsizemode)
   */
  ellipsize?: RNTextProps['ellipsizeMode'];
  /**
   * Override line-height. This is deprecated since overriding this prevents line height from being scale aware.
   * @deprecated
   */
  deprecatedLineHeight?: number | 'none';
}

export const createText = (name: Typography) => {
  const TextComponent: React.FC<TextProps> = function TextComponent({
    children,
    color = 'foreground',
    align = 'start',
    tabularNumbers = false,
    ellipsize,
    animated,
    dangerouslySetStyle,
    deprecatedLineHeight,
    // TODO: replace with glyph
    slashedZero,
    selectable = 'none',
    underline,
    noWrap,
    transform,
    // Spacing
    spacing,
    spacingTop,
    spacingBottom,
    spacingStart,
    spacingEnd,
    spacingVertical,
    spacingHorizontal,
    dangerouslySetColor,
    // RN Text props
    ...props
  }) {
    const palette = usePalette();

    const textAlign = useTextAlign(align);

    const textStyles = useTypographyStyles(name);

    // TODO: Update React Native to not override this and remove deprecatedLineHeight
    const lineHeight = useMemo(() => {
      if (deprecatedLineHeight === undefined) {
        return textStyles?.lineHeight;
      }
      if (deprecatedLineHeight === 'none') {
        return undefined;
      }
      return deprecatedLineHeight;
    }, [deprecatedLineHeight, textStyles?.lineHeight]);

    const spacingStyles = useSpacingStyles({
      spacing,
      spacingBottom,
      spacingEnd,
      spacingHorizontal,
      spacingStart,
      spacingTop,
      spacingVertical,
    });

    // TODO: Maybe update to align web and mobile APIs
    const numberOfLines = noWrap ? 1 : props.numberOfLines;
    const ellipsizeProps = ellipsize && {
      numberOfLines: numberOfLines || 1,
      ellipsizeMode: ellipsize,
    };

    // Only allow text transform if not already bundled in text styles for a given scale
    const textTransform = useMemo(() => {
      if (!('textTransform' in textStyles) && transform) {
        return { textTransform: transform };
      }
      return undefined;
    }, [textStyles, transform]);

    const style = useMemo(
      () => [
        spacingStyles,
        textAlign,
        textStyles,
        textTransform,
        {
          color: dangerouslySetColor ?? palette[color],
          lineHeight,
          overflow: ellipsize ? ('hidden' as const) : ('visible' as const),
        },
        tabularNumbers && styles.tabularNumbers,
        underline && styles.underline,
        dangerouslySetStyle as TextStyle,
      ],
      [
        dangerouslySetColor,
        spacingStyles,
        textStyles,
        textTransform,
        palette,
        textAlign,
        lineHeight,
        color,
        tabularNumbers,
        underline,
        dangerouslySetStyle,
        ellipsize,
      ],
    );

    if (isChildrenFalsy(children)) {
      return null;
    }

    const TextComp = animated ? Animated.Text : Text;

    return (
      <TextComp
        numberOfLines={numberOfLines}
        {...ellipsizeProps}
        {...props}
        selectable={selectable !== 'none'}
        style={style as TextStyle}
        {...fontScaleProps}
      >
        {children}
      </TextComp>
    );
  };

  TextComponent.displayName = `Text${pascalCase(name)}`;
  return TextComponent;
};
