import React, { useMemo } from 'react';

import { TextBaseProps, Typography, PaletteForeground } from '@cbhq/cds-common';
import { isChildrenFalsy } from '@cbhq/cds-common/utils/isChildrenFalsy';
import { pascalCase } from '@cbhq/cds-utils';
import { Animated, Text, TextStyle, TextProps as RNTextProps, StyleSheet } from 'react-native';

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
  const TextComponent: React.FC<TextProps> = ({
    children,
    color = 'foreground',
    align = 'start',
    tabularNumbers = false,
    ellipsize,
    animated,
    dangerouslySetStyle,
    deprecatedLineHeight,
    // TODO: replace with glyph
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    // RN Text props
    ...props
  }) => {
    const palette = usePalette();

    const textAlign = useTextAlign(align);

    const textStyles = useTypographyStyles(name);

    // TODO: Update React Native to not override this and remove deprecatedLineHeight
    const lineHeight = useMemo(() => {
      if (deprecatedLineHeight === undefined) {
        return textStyles?.lineHeight;
      } else if (deprecatedLineHeight === 'none') {
        return undefined;
      } else {
        return deprecatedLineHeight;
      }
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
      if ('textTransform' in textStyles) return;
      if (transform) {
        return { textTransform: transform };
      }
    }, [textStyles, transform]);

    const style = useMemo(
      () => [
        spacingStyles,
        textAlign,
        textStyles,
        textTransform,
        {
          color: palette[color],
          lineHeight,
          overflow: ellipsize ? ('hidden' as const) : ('visible' as const),
        },
        tabularNumbers && styles.tabularNumbers,
        underline && styles.underline,
        dangerouslySetStyle as TextStyle,
      ],
      [
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
      ]
    );

    if (isChildrenFalsy(children)) {
      return null;
    }

    const TextComponent = animated ? Animated.Text : Text;

    return (
      <TextComponent
        numberOfLines={numberOfLines}
        {...ellipsizeProps}
        {...props}
        selectable={selectable !== 'none'}
        style={style as TextStyle}
      >
        {children}
      </TextComponent>
    );
  };

  TextComponent.displayName = `Text${pascalCase(name)}`;
  return TextComponent;
};
